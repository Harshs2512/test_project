import mongoose from "mongoose"

const demandedCourseSchema = new mongoose.Schema({
    routelink: String,
    thumbnail: {
        data: Buffer,
        contentType: String,
    },
}, { timestamps: true });

const demandedCourseModel = mongoose.models.demandedCourse || mongoose.model('demandedCourse', demandedCourseSchema);

export default demandedCourseModel;