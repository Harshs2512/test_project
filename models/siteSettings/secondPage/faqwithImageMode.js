import mongoose from "mongoose"

const faqwithImageSchema = new mongoose.Schema({
    question: String,
    answer: String,
    imageone: {
        data: Buffer,
        contentType: String,
    },
    imagesecond: {
        data: Buffer,
        contentType: String,
    },
}, { timestamps: true });

const faqwithImageModel = mongoose.models.faqwithimage || mongoose.model('faqwithimage', faqwithImageSchema);

export default faqwithImageModel;