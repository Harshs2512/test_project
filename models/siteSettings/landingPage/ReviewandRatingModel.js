import mongoose from "mongoose";

const reviewandratingSchema = mongoose.Schema(
    {
        ratings: {
            type: String,
            required: [true, "Rating is required"],
            default: '1'
        },

        reviews: {
            type: String,
        },

        student_name: {
            type: String,
        },

        is_published: {
            type: String,
            enum: ['accept', 'pending'],
            default: 'pending'
        },

        studentImage: {
            data: Buffer,
            contentType: String,
        },
    },
    {
        timestamps: true,
    }
);

const ReviewandAndRatings = mongoose.models.ReviewandAndRatings || mongoose.model("ReviewandAndRatings", reviewandratingSchema);
export default ReviewandAndRatings;