import mongoose from 'mongoose';

const JobandinternshipSchema = new mongoose.Schema({

    job_title: String,
    experience:String,
    sallary:String,
    qualification:String,
    post_type:String,
    company_name:String,
    skils:String,
    description:String,
    location:String,
    companyImage: {
        data: Buffer,
        contentType: String,
    },
}, { timestamps: true });
const JobIntern = mongoose.models.JobAndInternship || mongoose.model('JobAndInternship', JobandinternshipSchema);

export default JobIntern;