// import Order from "models/OrderModel";
// import connectDB from 'db/newdb';

// const handler = async (req, res) => {
//     if (req.method === 'GET') {
//         return getHandler(req, res);
//     } else {
//         return res.status(400).send({ message: 'Method not allowed' });
//     }
// };

// const getHandler = async (req, res) => {
//     await connectDB();
//     const { course_title, mock_title, contest_title } = req.query;
    
//     let matchCondition = { "purchase_item.title": { $ne: null }, order_status: { $ne: 'pending' } };
    
//     if (course_title) {
//         matchCondition["purchase_item.course_title"] = course_title;
//     } else if (mock_title) {
//         matchCondition["purchase_item.title"] = mock_title;
//     } else if (contest_title) {
//         matchCondition["purchase_item.title"] = contest_title;
//     }

//     try {
//         // Fetch transactions based on the match condition
//         const transactions = await Order.aggregate([
//             { $unwind: "$purchase_item" },
//             // { $match: matchCondition },
//             { $project: { 
//                 "order_id": 1,
//                 // "purchase_item.title": 1,
//                 "purchase_item.totalSales": 1,
//                 "purchase_item.order_date": 1,
//                 "purchase_item.customer_name": 1 
//             }}
//         ]);

//         // Calculate total revenue
//         const totalRevenue = await Order.aggregate([
//             { $unwind: "$purchase_item" },
//             // { $match: matchCondition },
//             { $group: {
//                 _id: null,
//                 totalRevenue: { $sum: "$purchase_item.totalSales" }
//             }},
//             { $project: { _id: 0, totalRevenue: 1 } }
//         ]);

//         // Combine the total revenue with transactions in the response
//         res.status(200).json({ totalRevenue: totalRevenue[0]?.totalRevenue || 0, transactions });
//     } catch (error) {
//         console.log(error, "fetching Data Error");
//         res.status(500).json({ error: "An error occurred while fetching data" });
//     }
// };

// export default handler;
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
        // Aggregate to calculate total revenue by date
        const revenueByDate = await Order.aggregate([
            { $unwind: "$purchase_item" },
            { $match: {order_status: { $ne: 'pending' } } },
            { $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$purchase_item.createdAt" } },
                totalRevenue: { $sum: "$totalSales" }
            }},
            // { $project: { _id: 0, date: "$_id", totalRevenue: 1 } },
            // { $sort: { date: 1 } } // Optional: Sort by date
        ]);

        res.status(200).json(revenueByDate);
    } catch (error) {
        console.log(error, "fetching Data Error");
        res.status(500).json({ error: "An error occurred while fetching data" });
    }
};

export default handler;
