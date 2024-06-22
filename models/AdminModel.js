import mongoose from "mongoose";
import fs from 'fs';
import path from 'path';
const currentDirectory = process.cwd();

// Define the relative path to the image
const imagePath = 'public/images/avatar/default-avatar.jpg';

// Join the current directory with the relative path
const imagePathAbsolute = path.join(currentDirectory, imagePath);

// Read the image file
const defaultImageBuffer = fs.readFileSync(imagePathAbsolute);
const adminSchema = new mongoose.Schema(
    {
        image: {
            data: {
                type: Buffer,
                default: defaultImageBuffer,
            },
            contentType: {
                type: String,
                default: "image/jpeg",
            },
            required: [false, "Upload profile image"],
        },

        fname: {
            type: String,
            required: [true, "Please Enter Your Name"],
            maxLength: [30, "Name cannot exceed 30 characters"],
            minlength: [2, "Name should have more than 4 characters"],
        },

        lname: {
            type: String,
            required: [true, "Please Enter Your Last Name"],
            maxLength: [30, "Name cannot exceed 30 characters"],
            minlength: [2, "Name should have more than 4 characters"],
        },

        dob: {
            type: String,
            required: [false, "Please Enter Your Date of Birth"],
        },

        contact: {
            type: String,
            required: [false, "Please Enter Your Contact Number"],
            maxLength: [10, "Name cannot exceed 10 number"],
            minlength: [9, "Name should have more than 9 number"],
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: [false, "Please Select Your Gender"],
        },

        address: {
            type: String,
            required: [false, 'Please fill full address'],
            default: '',
        },

        zipcode: {
            type: String,
            required: [false],
            default: ''
        },

        mystate: {
            type: String,
            required: [false, 'Please fill State'],
            default: '',
        },

        country: {
            type: String,
            required: [false, 'Please fill Country'],
            default: 'India',
        },

        email: {
            type: String,
            required: [true, "email is required"],
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: [false, 'Enter Mobile number']
        },

        roles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'rolemodel'
        }],

        resetToken: {
            type: String
        }
    },
    {
        timestamps: true,
    }
)

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
export default Admin;