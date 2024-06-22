import mongoose from "mongoose";
import Contest from './contestModel'
// Read the image file
const Contest_userSchema = new mongoose.Schema(
    
    {
        full_name: {
            type: String,
            required: [true, "Please Enter Your Name"],
            maxLength: [30, "Name cannot exceed 30 characters"],
            minlength: [2, "Name should have more than 4 characters"],
        },
        email: {
            type: String,
            required: [true, "email is required"],
            
        },
        
        contact: {
            type: String,
            required: [false, "Please Enter Your Contact Number"],
            maxLength: [10, "Name cannot exceed 10 number"],
            minlength: [9, "Name should have more than 9 number"],
        },
        qualification: {
            type: String,
        },

        message: {
            type: String,
        },
        contest_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contest",
            unique: true
        }, 

    },
    {
        timestamps: true,
    }
)

const ContestUser = mongoose.models.ContestUser || mongoose.model("ContestUser", Contest_userSchema);
export default ContestUser;