import mongoose from "mongoose";

const ourofflineprogramSchema = mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'coursepage',
    },
    image: {
        data: Buffer,
        contentType: String,
    },
    status: {
        type: String,
        enum: ['live', 'pending'],
        default: 'live',
    }
})

const ourofflineprogramModel = mongoose.models.ourofflineprogram || mongoose.model('ourofflineprogram', ourofflineprogramSchema);

export default ourofflineprogramModel;