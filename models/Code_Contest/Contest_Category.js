import mongoose from "mongoose";

const Contest_categorySchema = mongoose.Schema(
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
const ConestCategory = mongoose.models.ConestCategory || mongoose.model("ConestCategory", Contest_categorySchema);
export default ConestCategory;