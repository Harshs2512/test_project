import mongoose from "mongoose";

const reviewandratingSchema = mongoose.Schema(
    {
        username: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, "User is required"]
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: [true, "Course id is required"]
        },
        ratings: {
            type: String,
            required: [true, "Rating is required"],
            default: '1'
        },
        reviews: {
            type: String,
        },
        is_published: {
            type: String,
            enum: ['accept', 'pending'],
            default: 'accept'   
        }
    },
    {
        timestamps: true,
    }
);

const ReviewandRatings = mongoose.models.ReviewandRatings || mongoose.model("ReviewandRatings", reviewandratingSchema);
export default ReviewandRatings;
