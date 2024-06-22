import mongoose from "mongoose";

const ouronlineprogramSchema = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
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

const ouronlineprogramModel = mongoose.models.ouronlineprogram || mongoose.model('ouronlineprogram', ouronlineprogramSchema);

export default ouronlineprogramModel;