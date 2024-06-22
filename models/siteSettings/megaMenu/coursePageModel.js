import mongoose from "mongoose";

const coursePageSchema = new mongoose.Schema({
    course_name: {
        type: String,
        required: [true, "name is required"],
    },
    slug: {
        type: String,
        lowercase: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "megamenucategory",
        required: [true, "Category is required"]
    },
    sectiontitle: {
        type: String,
        required: [true, "name is required"],
    },
    typedtitle_first: {
        type: String,
        required: [true, "title is required"],
    },
    typedtitle_second: {
        type: String,
        required: [true, "title is required"],
    },
    typedtitle_third: {
        type: String,
        required: [true, "title is required"],
    },
    student_image: {
        data: Buffer,
        contentType: String,
    },
    thumbnail: {
        data: Buffer,
        contentType: String,
    }
}, { timestamps: true });

const CoursePage = mongoose.models.coursepage || mongoose.model("coursepage", coursePageSchema);

export default CoursePage;