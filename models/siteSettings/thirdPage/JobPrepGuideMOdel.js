import mongoose from "mongoose";

const CourseJobPrepration = mongoose.Schema(
    {
        sectionTitle: {
            type: String,
            required: [true, "section title is required"]
        },
        sectionDescription: {
            type: String,
            required: [true, "Section Description is required"]
        },
        course: [
            {
                title: {
                    type: String,
                },
                description:{
                    type:String
                }
            }
        ]
    },
    {
        timestamps: true,
    }
);

const JobPrepration = mongoose.models.JobPrepration || mongoose.model("JobPrepration", CourseJobPrepration);
export default JobPrepration;
