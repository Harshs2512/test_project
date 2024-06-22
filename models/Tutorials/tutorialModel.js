import mongoose from "mongoose";

const TutorialSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    slug: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    duration: {
      type: String,
    },
    Tools: {
      type: String,
    },
    course_level: {
      type: String,
      enum: ["Intermediate", "Beginners", "Advance"],
      default: "Beginners",
      required: [true, "Level is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    questionsList: [
      {
        chapter: String,
        options: [
          {
            TopicName: String,
            explanation: {
              type: String,
            },
          },
        ],
      },
    ],
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    is_published: {
      type: String,
      enum: ["live", "pending", "reject"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Tutorial =
  mongoose.models.Tutorial ||
  mongoose.model("Tutorial", TutorialSchema);
export default Tutorial;
