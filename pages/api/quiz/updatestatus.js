import connectDB from "db/newdb";
import Quizes from "models/QuizModel";

const updatestatus = async (req, res) => {
    await connectDB();
    try {
        const { id, is_published } = req.body
        const existingQuizes = await Quizes.findById(id);
        if (!existingQuizes) {
            return res.status(404).send({ error: "Course not found" });
        }
        existingQuizes.is_published = is_published
        await existingQuizes.save();
        res.status(200).send({
            success: true,
            message: "Course Updated Successfully",
            updatedQuizes: existingQuizes,
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