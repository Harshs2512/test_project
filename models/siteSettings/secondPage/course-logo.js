import mongoose from "mongoose"

const CourseLogoSchema = new mongoose.Schema({
    course_name: String,
    course_logo: {
        data: Buffer,
        contentType: String,
    },
}, { timestamps: true });

const courseLogoModel = mongoose.models.courseLogo || mongoose.model('courseLogo', CourseLogoSchema);

export default courseLogoModel;