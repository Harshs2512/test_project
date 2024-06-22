import mongoose from "mongoose";

// const answerSchema = new mongoose.Schema({
//     question_number: Number,
//     answer: String,
// });

const questionSchema = new mongoose.Schema({
    question_number: Number,
    questionId: mongoose.Types.ObjectId,
    answer: mongoose.Schema.Types.Mixed,
});

const quizresultSchema = new mongoose.Schema(
    {
        quizId: {
            type: mongoose.Types.ObjectId,
            ref: "Quiz",
        },
        questions_list: [questionSchema],
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        score:Number,
        incorrectCount:Number,
        correctCount:Number
    },
    { timestamps: true }
);

const QuizResult = mongoose.models.QuizResult || mongoose.model("QuizResult", quizresultSchema);

export default QuizResult;
