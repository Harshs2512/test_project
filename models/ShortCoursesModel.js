import mongoose from "mongoose";
const shortcoursesSchema = mongoose.Schema(
  {
    course_title: {
      type: String,
    },
    slug: {
      type: String,
    },
    course_level: {
      type: String,
      enum: ["Easy", "Modrate", "Hard"],
      default: "Easy",
    },
    project: {
        type: String,
        enum: ["Yes", "No"],
        default: "No",
      },
    duration: {
      type: String,
    },
    course_description: {
      type: String,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    subjectImages: [
      {
        data: Buffer,
        contentType: String,
      }
    ],
  },
  { timestamps: true }
);

const ShortCourse =
  mongoose.models.ShortCourse || mongoose.model("ShortCourse", shortcoursesSchema);
export default ShortCourse;
