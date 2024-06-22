import mongoose from "mongoose";
const questionSchema = new mongoose.Schema({
    problem_Statement: {
      type: String,
    },
     problem_Constraints: {
      type: String,
    },
    problem_hour: {
      type: Number,
      default: 0
    },
    problem_minute: {
      type: Number,
      default: 0
    },
    problem_second: {
      type: Number,
      default: 0
    },
    problem_Examplation: {
      type: String,
    },
   Function_data:{
    type:String,
   },
    example: [
      {
        input_sample: {
          type: String,
        },
        output_sample: {
          type: String,
        },
        explanation_sample: {
          type: String,
        },
      },
    ],
    testCases: [
      {
        input: {
          type: String,
        },
        output: {
          type: String,
        },
        marks: {
          type: String,
        },
      },
    ],
});
const problemSchema = mongoose.Schema(
  {
    contest_title: {
      type: String,
    },
    slug: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProblemCategory",
  },
    contest_level: {
      type: String,
      enum: ["Easy", "Modrate", "Hard"],
      default: "Easy",
    },
    contest_startDate: {
      type: String,
    },
    contest_description: {
      type: String,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    companyImages: [
      {
        data: Buffer,
        contentType: String,
      }
    ],
    questionsList: [questionSchema],
  },
  { timestamps: true }
);

const Problem =
  mongoose.models.Problem || mongoose.model("Problem", problemSchema);
export default Problem;
