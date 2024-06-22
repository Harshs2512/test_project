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
        const topmocks = await Order.aggregate([
            { $unwind: "$purchase_item" },
            { $match: { "purchase_item.contest_title": { $ne: null }} },
            { $sort: { "purchase_item.totalSales": -1 } },
            { $project: { "purchase_item.image": 0 } }
        ]);

        res.status(200).json(topmocks);
    } catch (error) {
        console.log(error, "fetching Data Error");
        res.status(500).json({ error: "An error occurred while fetching data" });
    }
};

export default handler;