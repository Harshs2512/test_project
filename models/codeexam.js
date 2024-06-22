const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  assignmentName: String,
  questions: [
    {
      questionName: String,
      subjectName: String,
      topic: String,
      company: String,
      marks: Number,
      results: [
        {
          studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
          },
          code: [],
          marks: {
            type: Number,
          },
        },
      ],
      testCases: [
        {
          input: String,
          output: String,
          // marks: Number,
        },
      ],
      selectedLevels: [String],
      validTime: {
        type: Date,
        required: true,
        validate: {
          validator: function(value) { 
            if (value instanceof Date) {
              const hours = value.getHours();
              const minutes = value.getMinutes();
              const seconds = value.getSeconds();
              if (hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60 && seconds >= 0 && seconds < 60) {
                return true;
              }
            }
            return false;
          },
          message: 'Valid time required (hh:mm:ss)'
        }
      }
    },
  ],
  visibility: {
    type: String,
    default: "true",
  },
});
module.exports =
  mongoose.models.CodeAssignmentExam ||
  mongoose.model("CodeAssignmentExam", assignmentSchema);
