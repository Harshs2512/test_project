import mongoose from 'mongoose';

const placementStorySchema = new mongoose.Schema({
    title: String,
    description: String,
    student_name: String,
    company_logo: {
        data: Buffer,
        contentType: String,
    },
    student_icon: {
        data: Buffer,
        contentType: String,
    },
}, { timestamps: true });

const placementStoryModel = mongoose.models.placementStory || mongoose.model('placementStory', placementStorySchema);

export default placementStoryModel