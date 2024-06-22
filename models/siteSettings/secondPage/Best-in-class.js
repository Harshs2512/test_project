import mongoose from 'mongoose';

const BestInClassSchema = new mongoose.Schema({

    title: String,
    description:String,
    image: {
        data: Buffer,
        contentType: String,
    },
}, { timestamps: true });
const BestClass = mongoose.models.BestINClass || mongoose.model('BestINClass', BestInClassSchema);

export default BestClass;