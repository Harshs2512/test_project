import mongoose from "mongoose";

const papcourseSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "coursepage",
        required: [true, "Category is required"]
    },
    sectiontitle: String,
    courses: [{
        coursetitle: String,
        slug: String,
        duration: String,
        internship: String,
        placement: Boolean,
        topics: String,
        imageFile: {
            data: Buffer,
            contentType: String,
        }
    }]
}, { timestamps: true });

const papcourseModel = mongoose.models.papcourse || mongoose.model('papcourse', papcourseSchema);

export default papcourseModel;