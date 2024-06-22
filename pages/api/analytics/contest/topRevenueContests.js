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
    try {
        const topRevenuecontests = await Order.aggregate([
            { $unwind: "$purchase_item" },
            { $match: { "purchase_item.contest_title": { $ne: null } } },
            {
                $group: {
                    _id: {
                        contestId: "$purchase_item._id",
                        contestTitle: "$purchase_item.contest_title",
                        date: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } }
                    },
                    dailyRevenue: { $sum: { $toDouble: "$total_price" } },
                    totalSales: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: { contestId: "$_id.contestId", contestTitle: "$_id.contestTitle" },
                    totalRevenue: { $sum: "$dailyRevenue" },
                    totalSales: { $sum: "$totalSales" },
                    revenueByDate: {
                        $push: {
                            date: "$_id.date",
                            revenue: "$dailyRevenue"
                        }
                    }
                }
            },
            { $project: { "purchase_item.topic": 0 } },
            { $project: { "purchase_item.contest_description": 0 } },
            { $match: { _id: { $ne: null } } },
            { $sort: { totalRevenue: -1 } },
            { $limit: 5 },
            {
                $project: {
                    _id: "$_id.contestId",
                    contestTitle: "$_id.contestTitle",
                    totalRevenue: 1,
                    totalSales: 1,
                    revenueByDate: 1
                }
            }
        ]);
        res.status(200).json(topRevenuecontests);
    } catch (error) {
        console.log(error, "fetching Data Error");
        res.status(500).json({ error: "An error occurred while fetching data" });
    }
};

export default handler;