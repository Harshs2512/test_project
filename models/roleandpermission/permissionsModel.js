import mongoose from "mongoose";

const permissionSchema = mongoose.Schema({
    permissionname: String,
    assignedto: String,
}, { timestamps: true })

const PermissionModel = mongoose.models.permission || mongoose.model('permission', permissionSchema);

export default PermissionModel;