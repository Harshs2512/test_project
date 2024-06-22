import { verifyWebhookSignature } from "../razorpay-utils";
import connectDB from "db/newdb";
import EventModel from "models/EventModel";
import Order from "models/OrderModel";

export default async function handler(req, res) {
  await connectDB();
  if (req.method === "POST") {
    const body = JSON.stringify(req.body);
    const signature = req.headers["x-razorpay-signature"];
    if (verifyWebhookSignature(body, signature)) {
      const eventType = req.body.event;
      const eventData = req.body.payload;
      //For updating order model data
      const paymentId = eventData.payment && eventData.payment.entity && eventData.payment.entity.id;
      const order_id = eventData.payment && eventData.payment.entity && eventData.payment.entity.order_id;
      const payment_status = eventData.payment && eventData.payment.entity && eventData.payment.entity.status;
      const order_status = eventData.order.entity.status;
      if (eventType === "payment.captured") {
        const payment_id = paymentId;
      } else if (eventType === "payment.failed") {
        const payment_id = paymentId;
      }
      const newEvent = new EventModel({ eventData });
      await newEvent.save();
      // Update the Existing Order Model
      const existingOrder = await Order.findOne({ order_id });
      if (!existingOrder) {
        return res.status(404).json({ message: "Order not found" });
      } else {
      }

      // Update payment_status and order_status
      existingOrder.payment_details.payment_status = payment_status;
      existingOrder.order_status = order_status;
      existingOrder.payment_details.payment_id = paymentId;
      // Save the updated order
      const updatedOrder = await existingOrder.save();
      res.status(200).json({ message: "Webhook event processed", eventData});
    } else {
      console.error("Webhook signature verification failed");
      res
        .status(403)
        .json({ message: "Webhook signature verification failed" });
    }
  }
}
