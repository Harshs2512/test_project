import mongoose from "mongoose"

const faqSchema = new mongoose.Schema({
    question: String,
    answer: String,
}, { timestamps: true });

const faqModel = mongoose.models.faq || mongoose.model('faq', faqSchema);

export default faqModel