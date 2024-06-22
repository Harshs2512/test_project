import mongoose from 'mongoose';

const why = new mongoose.Schema({

    title: String,
    Description:String,
    videoUrl:String,
    is_published: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive",
      },
}, { timestamps: true });
const WhyUs = mongoose.models.Why_us || mongoose.model('Why_us', why);

export default WhyUs;