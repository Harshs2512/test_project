import db from "db/db";
import Tutorials from "models/Tutorials/tutorialModel"
import connectDB from 'db/newdb'
const updatestatus = async (req, res) => {
    await connectDB();
    try {
        const { id, is_published } = req.body
        const existingCourse = await Tutorials.findById(id);
        if (!existingCourse) {
            return res.status(404).send({ error: "Course not found" });
        }
        existingCourse.is_published = is_published
        await existingCourse.save();
        res.status(200).send({
            success: true,
            message: "Course tutorials Updated Successfully",
            updatedCourse: existingCourse,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating course tutorials",
        });
    }
};
export default updatestatus