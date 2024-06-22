import mongoose from 'mongoose';

const OurTeamSchema = new mongoose.Schema({
    name: String,
    position: String,
    image: {
        data: Buffer,
        contentType: String,
    },
}, { timestamps: true });
const OurTeamSchemaModel = mongoose.models.OurTeam || mongoose.model('OurTeam', OurTeamSchema);

export default OurTeamSchemaModel;