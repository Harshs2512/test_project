import Razorpay from "razorpay"
import connectDB from "db/newdb";
const instance = new Razorpay({
  key_id: "rzp_live_hUsARCAPAsSBNo",
  key_secret: "orYn68rFNV3EBr7I4zaO4vNG",
});
const handler = async (req, res) => {
  if (req.method === 'GET') {
    return PaymentDetail(req, res);
  }else if (req.method === 'POST') {
    return createorder(req, res);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};
const PaymentDetail = async (req, res) => {
  await connectDB();
      try {
        const {paymentId} = req.query;
        const paymentData = await instance.payments.fetch(paymentId)
        res.status(200).json(paymentData);
      } catch (error) {
        console.log(error, "fetching Payment Data Error");
        res.status(500).json({ error: "An error occurred while fetching payment data" });
      }
  };

export default handler;
