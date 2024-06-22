import mongoose from "mongoose";
const questionSchema = new mongoose.Schema({
  question: String,
  options: [],
});

const quizGuidSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    slug: {
      type: String,
      default: "slug",
      lowercase: true,
    },
    questions_list: [questionSchema],
    is_published: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
  },
  { timestamps: true }
);

const QuizGuid = mongoose.models.QuizGuid || mongoose.model("QuizGuid", quizGuidSchema);

export default QuizGuid;
