import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    title: String,

    projectbrief: String,
    start_date: String,
    duedate: String,
    privacy: String,
    client_name: String,
    budget: String,
    priority: String,
    categories: String,
    progress: {
        type: String,
        default: "0",
    },
    status: {
        type: String,
        enum: ["Pending", "Finished", "Progress","Cancle"],
        default: "Pending",
    },
    icon: {
        data: Buffer,
        contentType: String,
    },
    coverimage: {
        data: Buffer,
        contentType: String,
    },
}, { timestamps: true });
const ProjectModel = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

export default ProjectModel;