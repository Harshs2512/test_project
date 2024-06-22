import mongoose from "mongoose"

const CarouselButtonSchema = new mongoose.Schema({
    title: String,
    cards: [{
        img: {
            data: Buffer,
            contentType: String,
        },
        cardtitle: String,
        description: String,
    }],
}, { timestamps: true });

const CarouselButton = mongoose.models.carouselbutton || mongoose.model('carouselbutton', CarouselButtonSchema);

export default CarouselButton;