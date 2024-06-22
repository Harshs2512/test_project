import mongoose from 'mongoose';

const placementRecordsSchema = new mongoose.Schema({
    company_name: String,
    student_name: String,
    position: String,
    percentage: String,
    placed_date: String,
    course:String,
    Video_url: String,
    campus_type: String,
    collage_name: String,
    coding_number: String,
    selected_round: String,
    company_logo: {
        data: Buffer,
        contentType: String,
    },
    student_icon: {
        data: Buffer,
        contentType: String,
    },
}, { timestamps: true });
const placementRecordsModel = mongoose.models.placementRecords || mongoose.model('placementRecords', placementRecordsSchema);

export default placementRecordsModel;