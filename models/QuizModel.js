import mongoose from "mongoose";
const questionSchema = new mongoose.Schema({
  question_number: Number,
  question: String,
  options: [],
  explanation: {
    type: String,
  },
  question_type: String,
  answer: mongoose.Schema.Types.Mixed,
});

const quizSchema = new mongoose.Schema(
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
    QuizCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    level: {
      type: String,
      enum: ["Intermediate", "Beginners", "Advance"],
      default: "Beginners",
      required: [true, "Level is required"],
    },
    hours: {
      type: Number,
      default: 0,
    },
    minutes: {
      type: Number,
      default: 0,
    },
    seconds: {
      type: Number,
      default: 0,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    questions_list: [questionSchema],
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    is_published: {
      type: String,
      enum: ["live", "pending", "reject"],
      default: "pending",
    },
    actualprice: {
      type: String,
      required: [true, "Selling price is required"],
      default: 0,
    },
    currentprice: {
      type: String,
      required: [true, "Discounted price is required"],
      default: 0,
    },
  },

  { timestamps: true }
);

const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);

export default Quiz;
