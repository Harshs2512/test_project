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
    const { year, month, id } = req.query;

    try {
        let matchConditions = {
            'purchase_item.course_title': { $ne: null },
            order_status: { $ne: 'pending' },
            'purchase_item._id': id
        };

        if (year) {
            if (isNaN(year) || year < 1900 || year > new Date().getFullYear() + 1) {
                return res.status(400).json({ error: "Invalid year parameter" });
            }
            matchConditions.$expr = { $eq: [{ $year: '$createdAt' }, parseInt(year)] };
        }

        if (month && month !== 'all') {
            if (isNaN(month) || month < 1 || month > 12) {
                return res.status(400).json({ error: "Invalid month parameter" });
            }
            matchConditions.$expr = {
                $and: [
                    { $eq: [{ $year: '$createdAt' }, parseInt(year)] },
                    { $eq: [{ $month: '$createdAt' }, parseInt(month)] }
                ]
            };
        }

        const orders = await Order.aggregate([
            { $unwind: '$purchase_item' },
            { $match: matchConditions },
            {
                $group: {
                    _id: {
                        courseId: "$purchase_item._id",
                        courseTitle: "$purchase_item.course_title",
                        date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
                    },
                    dailySales: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: {
                        courseId: "$_id.courseId",
                        courseTitle: "$_id.courseTitle"
                    },
                    totalSales: { $sum: "$dailySales" },
                    salesByDate: {
                        $push: {
                            date: "$_id.date",
                            sales: "$dailySales"
                        }
                    }
                }
            },
            { $match: { "_id.courseId": { $ne: null } } },
            { $sort: { totalSales: -1 } },
            { $limit: 5 },
            {
                $project: {
                    _id: "$_id.courseId",
                    courseTitle: "$_id.courseTitle",
                    totalSales: 1,
                    salesByDate: 1
                }
            }
        ]);

        res.status(200).json(orders);
    } catch (error) {
        console.log(error, 'fetching Order Data Error');
        res.status(500).json({ error: 'An error occurred while fetching order data' });
    }
};

export default handler;