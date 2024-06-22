const crypto = require("crypto");
const razorpayWebhookSecret = "123456789";

export function verifyWebhookSignature(body, signature) {
  const expectedSignature = crypto
    .createHmac("sha256", razorpayWebhookSecret)
    .update(body)
    .digest("hex");
  return signature === expectedSignature;
}
