import connectDB from "db/newdb";
import ProjectModel from "models/Project/projectModel";
const updatestatus = async (req, res) => {
    await connectDB();
    try {
        const { id, status } = req.body
        const existingProject = await ProjectModel.findById(id);
        if (!existingProject) {
            return res.status(404).send({ error: "Course not found" });
        }
        existingProject.status = status
        await existingProject.save();
        res.status(200).send({
            success: true,
            message: "Project Updated Successfully",
            updatedProject: existingProject,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating course",
        });
    }
};
export default updatestatus