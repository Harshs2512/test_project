import mongoose from 'mongoose';

const careerGoalsModelSchema = new mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String,
    },
    buttontitle: String,
    steps: [{
        title: String,
        description: String,
    }],
}, { timestamps: true });

const careerGoalsModel = mongoose.models.careergoals || mongoose.model('careergoals', careerGoalsModelSchema);

export default careerGoalsModel;