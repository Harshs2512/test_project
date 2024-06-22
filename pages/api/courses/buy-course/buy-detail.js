import Order from 'models/OrderModel';
import connectDB from 'db/newdb';
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
    if (req.method === "GET") {
        return getAllOrder(req, res);
    } else {
        return res.status(400).send({ message: "Method not allowed" });
    }
};
const getAllOrder = async (req, res) => {
    await connectDB();
    try {
        const userId = req?.query?.userId;
        const Orders = await Order.find({
            user_detail: userId,
            order_status: 'paid'
        });
        res.status(200).json({ success: true, Orders })
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching order data" });
    }
}
export default handler;