import mongoose from "mongoose"

const circularCarouselSchema = new mongoose.Schema({
    company_name: String,
    company_logo: {
        data: Buffer,
        contentType: String,
    },
}, { timestamps: true });

const circularCarouselModel = mongoose.models.circularCarousel || mongoose.model('circularCarousel', circularCarouselSchema);

export default circularCarouselModel;