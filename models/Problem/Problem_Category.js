import mongoose from "mongoose";

const Problem_categorySchema = mongoose.Schema(
  {
    catName: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ["live", "pending"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);
const ProblemCategory = mongoose.models.ProblemCategory || mongoose.model("ProblemCategory", Problem_categorySchema);
export default ProblemCategory;