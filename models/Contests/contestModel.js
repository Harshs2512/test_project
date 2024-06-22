import mongoose from "mongoose";
const questionSchema = new mongoose.Schema({
 
    problem_title: {
      type: String,
    },
    problem_Statement: {
      type: String,
    },
    problem_level: {
      type: String,
      enum: ["Easy", "Modrate", "Hard"],
      default: "Easy",
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
const contestSchema = mongoose.Schema(
  {
    contest_title: {
      type: String,
    },
    slug: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ConestCategory",
  },
    contest_level: {
      type: String,
      enum: ["Easy", "Modrate", "Hard"],
      default: "Easy",
    },
    
    contest_startDate: {
      type: String,
    },
    contest_endDate: {
      type: String,
    },
    contest_description: {
      type: String,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    questionsList: [questionSchema],
    is_published: {
      type: String,
      enum: ['live', 'pending', 'reject'],
      default: 'pending',
  },
  actualprice:{
      type: String,
      required:[true, "Selling price is required"],
      default: 0
  },
  currentprice:{
      type: String,
      required:[true, "Discounted price is required"],
      default: 0
  }
  },
  { timestamps: true }
);

const Contest =
  mongoose.models.Contest || mongoose.model("Contest", contestSchema);
export default Contest;
