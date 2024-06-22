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
        const topRevenueCourses = await Order.aggregate([
            { $unwind: "$purchase_item" },
            { $match: { "purchase_item.course_title": { $ne: null }, order_status: { $ne: 'pending' } } },
            {
                $group: {
                    _id: {
                        courseId: "$purchase_item._id",
                        courseTitle: "$purchase_item.course_title",
                        date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
                    },
                    dailyRevenue: { $sum: { $toDouble: "$total_price" } },
                    totalSales: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: {
                        courseId: "$_id.courseId",
                        courseTitle: "$_id.courseTitle"
                    },
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
            { $match: { "_id.courseId": { $ne: null } } },
            { $sort: { totalRevenue: -1 } },
            { $limit: 5 },
            {
                $project: {
                    _id: "$_id.courseId",
                    courseTitle: "$_id.courseTitle",
                    totalRevenue: 1,
                    totalSales: 1,
                    revenueByDate: 1
                }
            }
        ]);
        res.status(200).json(topRevenueCourses);
    } catch (error) {
        console.log(error, "fetching Data Error");
        res.status(500).json({ error: "An error occurred while fetching data" });
    }
};

export default handler;
