// import mongoose from "mongoose";

// const QuestionSchema = new mongoose.Schema({
//     question: String,
//     answer: String,
// });

// const FaqwithTitleSchema = new mongoose.Schema({
//     titles: [{
//         title: String,
//         Questions: [QuestionSchema]
//     }]
// }, { timestamps: true });

// const FaqSpecial = mongoose.models.faqspecial || mongoose.model

import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
});

const FaqwithTitleSchema = new mongoose.Schema({
    titles: [{
        title: { type: String, required: true },
        Questions: [QuestionSchema]
    }]
}, { timestamps: true });

const FaqSpecial = mongoose.models.FaqSpecial || mongoose.model('FaqSpecial', FaqwithTitleSchema);

export default FaqSpecial;
