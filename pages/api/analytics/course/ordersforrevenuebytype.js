import Order from "models/OrderModel";
import connectDB from 'db/newdb';

const handler = async (req, res) => {
    if (req.method === 'GET') {
        return getHandler(req, res);
    } else {
        return res.status(400).send({ message: 'Method not allowed' });
    }
};

const getHandler = async (req, res) => {
    await connectDB();
    const { type, year, month } = req.query; // Get the time period and specific year/month from query parameters
    console.log(type, year, month);
    try {
        let matchCriteria = {
            "purchase_item.course_title": { $ne: null },
            order_status: { $ne: 'pending' }
        };

        if (type === 'Monthly' && year && month) {
            matchCriteria = {
                ...matchCriteria,
                $expr: {
                    $and: [
                        { $eq: [{ $year: "$createdAt" }, parseInt(year)] },
                        { $eq: [{ $month: "$createdAt" }, parseInt(month)] }
                    ]
                }
            };
        } else if (type === 'Yearly' && year) {
            matchCriteria = {
                ...matchCriteria,
                $expr: {
                    $eq: [{ $year: "$createdAt" }, parseInt(year)]
                }
            };
        }

        let groupBy;
        if (type === 'Monthly') {
            groupBy = { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } };
        } else if (type === 'Yearly') {
            groupBy = { year: { $year: "$createdAt" } };
        } else if (type === 'Weekly') {
            groupBy = { year: { $year: "$createdAt" }, week: { $week: "$createdAt" } };
        } else {
            return res.status(400).json({ error: "Invalid time period specified" });
        }

        const orderData = await Order.aggregate([
            { $unwind: "$purchase_item" },
            { $match: matchCriteria },
            {
                $group: {
                    _id: groupBy,
                    totalRevenue: { $sum: { $toDouble: "$total_price" } }
                }
            },
            { $sort: { "_id.year": 1, ...(type === 'Monthly' ? { "_id.month": 1 } : {}), ...(type === 'Weekly' ? { "_id.week": 1 } : {}) } }
        ]);

        const formattedData = orderData.map(item => {
            let period;
            if (type === 'Monthly') {
                period = `${item._id.year}-${item._id.month}`;
            } else if (type === 'Yearly') {
                period = `${item._id.year}`;
            } else if (type === 'Weekly') {
                period = `${item._id.year}-W${item._id.week}`;
            }
            return {
                period,
                revenue: item.totalRevenue
            };
        });

        res.status(200).json(formattedData);
    } catch (error) {
        console.log(error, "fetching Order Data Error");
        res.status(500).json({ error: "An error occurred while fetching order data" });
    }
};

export default handler;