import mongoose from "mongoose"

const enquirySectionSchema = new mongoose.Schema({
    title: String,
    description: String,
    bulletpoints: [{
        bulletpoint: String
    }],
}, { timestamps: true });

const enquirysectionModel = mongoose.models.enquirysection || mongoose.model('enquirysection', enquirySectionSchema);

export default enquirysectionModel;