import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    course_title: {
        type: String,
        required: [true, "Title is required"]
    },
    slug: {
        type: String,
        required: true,
    },
    course_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Category is required"]
    },
    level: {
        type: String,
        enum: ['Intermediate', 'Beginners', 'Advance'],
        default: 'Beginners',
        required: [true, "Level is required"]
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    media: {
        thumbnail: {
            data: Buffer,
            contentType: String,
        },
        url: {
            type: String,
            required: [true, "url is required"]
        }
    },
    section: [
        {
            section_name: String,
            lecture: [
                {
                    lecture_name: String,
                    videos_details: {
                        video: String,
                        description: String
                    },
                    isApproved:{
                        type: String,
                        default: false
                    }
                }
            ],
        },
    ],
    requirment: {
        type: String,
        required: [true, "Tags are required"]
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',    
        required: [true, "User is required"]
    },
    is_published: {
        type: String,
        enum: ['live', 'pending', 'reject'],
        default: 'pending',
    },
    actualprice:{
        type: String,
        required:[true, "Selling price is required"],
        default: 0
    },
    currentprice:{
        type: String,
        required:[true, "Discounted price is required"],
        default: 0
    }
},
    { timestamps: true }
);

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
export default Course;