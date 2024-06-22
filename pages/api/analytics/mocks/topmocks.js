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
        const topCourses = await Order.aggregate([
            { $unwind: "$purchase_item" },
            { $match: { "purchase_item.title": { $ne: null }, order_status: { $ne: 'pending' } } },
            {
                $group: {
                    _id: {
                        title: "$purchase_item.title",
                        date: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } }
                    },
                    dailySales: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: "$_id.title",
                    totalSales: { $sum: "$dailySales" },
                    revenueByDate: {
                        $push: {
                            date: "$_id.date",
                            sales: "$dailySales"
                        }
                    }
                }
            },
            { $match: { _id: { $ne: null } } },
            { $sort: { totalSales: -1 } },
            { $limit: 5 }
        ]);

        res.status(200).json(topCourses);
    } catch (error) {
        console.log(error, "fetching Data Error");
        res.status(500).json({ error: "An error occurred while fetching data" });
    }
};

export default handler;