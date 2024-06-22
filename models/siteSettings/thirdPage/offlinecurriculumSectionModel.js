import mongoose from "mongoose";

const offcurriculumSchema = new mongoose.Schema({
    sectionid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "papcourse",
        required: [true, "Category is required"]
    },
    videolink: String,
    feature1: String,
    feature2: String,
    feature3: String,
    feature4: String,
    section: [{
        title: String,
        description: String,
        topics: [{
            topic: String
        }],
    }]
}, { timestamps: true });

const offcurriculumModel = mongoose.models.offlinecurriculum || mongoose.model('offlinecurriculum', offcurriculumSchema);

export default offcurriculumModel;