import mongoose from "mongoose"

const heroSectionSchema = new mongoose.Schema({
    heading: String,
    prefix: String,
    suffix: String,
    typed_one: String,
    typed_two: String,
    description: String,
    highlight1: String,
    highlight2: String,
    highlight3: String,
}, { timestamps: true });

const herosectionModel = mongoose.models.herosection || mongoose.model('herosection', heroSectionSchema);

export default herosectionModel;