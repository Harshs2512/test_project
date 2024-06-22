import mongoose from "mongoose";

const comparePlansSchema = new mongoose.Schema({
    pagetitle: String,
    pagedescription: String,
    plan: [{
        plantype: String,
        coursename: String,
    }],
    planfeature: [{
        featuretitle: String,
        featurelist: [{
            subtitle: String,
            basic: { type: Boolean, default: false },
            advance: { type: Boolean, default: false },
        }]
    }]

}, { timestamps: true })

const comparePlansModel = mongoose.models.compareplans || mongoose.model('compareplans', comparePlansSchema);

export default comparePlansModel;