
import Order from "models/OrderModel"
import connectDB from 'db/newdb'
const handler = async (req, res) => {
    if (req.method === 'GET') {
        return getHandler(req, res);
    }else {
        return res.status(400).send({ message: 'Method not allowed' });
    }
};

const getHandler = async (req, res) => {
    await connectDB();
    try {
        const orderData = await Order.aggregate([
            { $unwind: "$purchase_item" },
            { $match: { "purchase_item.course_title": { $ne: null }, order_status: { $ne: 'pending' } } },
            { $sort: { "purchase_item.totalSales": -1 } },
            { $project: { "purchase_item": 0 } }
        ]);;
        res.status(200).json(orderData);
    } catch (error) {
        console.log(error, "fetching Order Data Error");
        res.status(500).json({ error: "An error occurred while fetching order data" });
    }
};

export default handler;
