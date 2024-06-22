
import Order from "models/OrderModel"
import connectDB from 'db/newdb'
const handler = async (req, res) => {
    if (req.method === 'GET') {
        return findOrder(req, res);
    } else if (req.method === 'POST') {
        return createorder(req, res);
    } else {
        return res.status(400).send({ message: 'Method not allowed' });
    }
};

const findOrder = async (req, res) => {
    await connectDB();
    try {
        const orderData = await Order.find({ order_status: { $ne: 'pending' } }).select('-purchase_item');
        res.status(200).json(orderData);
    } catch (error) {
        console.log(error, "fetching Order Data Error");
        res.status(500).json({ error: "An error occurred while fetching order data" });
    }
};

export default handler;
