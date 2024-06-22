
import Order from 'models/OrderModel'
import connectDB from "db/newdb";
export const config = {
  api: {
    bodyParser: false,
  },
};
const Handler = async (req, res) => {
  if (req.method === "GET") {
    return getAllContest(req, res);
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};
const getAllContest = async (req, res) => {
  await connectDB();
  try {
    const userId = req?.query?.userId;
    const quizOrders = await Order.find({
      user_detail: userId,
      order_status: 'paid'
    }).select('purchase_item');
    const purchaseItems = quizOrders.map(order => order.purchase_item);
    const filteredPurchaseItems = purchaseItems
      .map(item => item.filter(subItem => subItem.topic))
      .filter(item => item.length > 0);
    res.status(200).json({ success: true, filteredPurchaseItems })
  } catch (error) {
    console.log(error, "fetching Contest Order Data Error");
    res.status(500).json({ error: "An error occurred while fetching Contest order data" });
  }
}

export default Handler;
