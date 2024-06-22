import mongoose from "mongoose";

const MegamenuCategorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ['live', 'pending'],
      default: 'live',
    },
  },
  {
    timestamps: true,
  }
);

const MegamenuCategory = mongoose.models.megamenucategory || mongoose.model("megamenucategory", MegamenuCategorySchema);

export default MegamenuCategory;