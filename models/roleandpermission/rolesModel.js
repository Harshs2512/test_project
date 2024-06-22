import mongoose from "mongoose";

const rolesSchema = mongoose.Schema({
    rolename: String,
    selectedpermission: [],
}, { timestamps: true })

const RoleModel = mongoose.models.rolemodel || mongoose.model('rolemodel', rolesSchema);

export default RoleModel;