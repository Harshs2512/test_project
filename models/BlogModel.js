import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  thumbnail: {
    type: String, // Changed to String to store the URL
    required: true,
  },
  title: {
    type: String,
    maxlength: [100, "Description cannot exceed 500 characters"],
    required: [true, "Enter title"]
  },
  description: {
    type: String,
    maxlength: [500, "Description cannot exceed 500 characters"],
    required: [true, "Please Enter Description"]
  },
  slug: {
    type: String,
    lowercase: true,
  },
  content: {
    type: String,
    required: [true, "Enter content"]
  },
  metatags: [{
    type: String,
  }],
  postcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PostCategory',
    required: [true, "Category is required"]
  },
  status: {
    type: String,
    enum: ['live', 'pending'],
    default: 'live',
  },
}, { timestamps: true });

const BlogModel = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default BlogModel;
