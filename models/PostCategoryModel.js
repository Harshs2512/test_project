import mongoose from "mongoose";

const PostCategorySchema = mongoose.Schema(
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

// Create a virtual property to get the count of blogs associated with this category
PostCategorySchema.virtual('blogCount', {
  ref: 'Blog', // The model to use for the calculation
  localField: '_id', // The field in the current model that is used as the foreign key
  foreignField: 'postcategory', // The field in the referenced model that is used as the foreign key
  count: true // Set this to true to get the count of related documents
});

const PostCategory = mongoose.models.PostCategory || mongoose.model("PostCategory", PostCategorySchema);
export default PostCategory;
