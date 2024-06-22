import Razorpay from "razorpay";
import Order from "models/OrderModel";
import connectDB from "db/newdb"
const instance = new Razorpay({
  key_id: "rzp_live_hUsARCAPAsSBNo",
  key_secret: "orYn68rFNV3EBr7I4zaO4vNG",
});
const handler = async (req, res) => {
  if (req.method === "GET") {
    return getAllorder(req, res);
  } else if (req.method === "POST") {
    return createorder(req, res);
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};
const createorder = async (req, res) => {
  await connectDB();
  try {
    const {
      user_detail,
      purchase_item,
      total_item,
      total_price,
      payment_details,
    } = req.body;
    const options = {
      amount: total_price * 100,
      currency: "INR",
    };
    instance.orders.create(options, async (error, order) => {
      try {
        if (error) {
          console.error("Razorpay order creation error:", error);
          return res.status(500).json({ success: false, error: error.message });
        }
        const order_id = order.id;
        const newOrder = new Order({
          user_detail,
          purchase_item,
          total_item,
          order_id,
          total_price,
          payment_details,
        });
        try {
          const savedOrder = await newOrder.save();
          res.status(201).json({ success: true, data: { order_id, ...savedOrder } });
        } catch (saveError) {
          console.error("Order save error:", saveError);
          res.status(500).json({ success: false, error: saveError.message });
        }
      } catch (instanceError) {
        console.error("Razorpay instance callback error:", instanceError);
        res.status(500).json({ success: false, error: instanceError.message });
      }
    });
  }  catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
const getAllorder = async (req, res) => {
  await connectDB();
  try {
    const orderData = await Order.find();
    res.status(200).json(orderData);
  } catch (error) {
    console.error("Error fetching order data:", error); // Disconnect in case of error too
    res.status(500).json({ error: "An error occurred while fetching order data" });
  }
};

export default handler;
