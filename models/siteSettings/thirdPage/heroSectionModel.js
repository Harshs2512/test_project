import mongoose from "mongoose";

const courseheroSchema = new mongoose.Schema({
    sectionid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "papcourse",
        required: [true, "Category is required"]
    },
    title: String,
    description: String,
    type: String,
    duration: String,
    startdate: String,
    enquirynumber: String,
    link: String,
    features: [String],
}, { timestamps: true });

const courseheroModel = mongoose.models.coursehero || mongoose.model('coursehero', courseheroSchema);

export default courseheroModel;