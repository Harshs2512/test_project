const crypto = require("crypto");
import connectDB from "db/newdb";
import { NextResponse } from "next/server";
import Payment from "models/payment";

const handler = async (req, res) => {
  if (req.method === "GET") {
    return getAllPayment(req, res);
  } else if (req.method === "PUT") {
    return updatepayment(req, res);
  } else if (req.method === "POST") {
    return createpayment(req, res);
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};
const createpayment = async (req, res) => {
  await connectDB();
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", "orYn68rFNV3EBr7I4zaO4vNG")
      .update(body.toString())
      .digest("hex");
    const isAuthentic = expectedSignature === razorpay_signature;
    if (isAuthentic) {
      const payment = new Payment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      await payment.save();
      res.status(201).json({ message: "success", payment });
    } else {
      return NextResponse.json(
        {
          message: "fail",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllPayment = async (req, res) => {
  
  try {
    await db.connect();
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
