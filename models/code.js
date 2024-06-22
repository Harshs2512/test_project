const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  assignmentName: String,
  questions: [
    {
      questionName: String,
      subjectName: String,
      topic: String,
      description: String,
      company: String,
      marks: Number,
      results:[{
        studentId:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
        },
        code:[],
        marks:{
          type:Number
        }

      }],
      testCases: [
        {
          input:String,
          output: String,
          // marks: Number,
        },
      ],
      selectedLevels: [String],
    },
  ],
 
  visibility:{
    type:String,
    default:"true"
  }
});
module.exports = mongoose.models.CodeAssignment || mongoose.model("CodeAssignment", assignmentSchema);

