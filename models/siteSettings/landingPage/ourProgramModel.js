import mongoose from 'mongoose';

const offlineProgramsModelSchema = new mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String,
    },
    buttontitle: String,
    title: String,
    description: String,
    bulletpoints: [{
        title: String,
    }],

}, { timestamps: true });

const offlineProgramsModel = mongoose.models.offlinePrograms || mongoose.model('offlinePrograms', offlineProgramsModelSchema);

export default offlineProgramsModel;