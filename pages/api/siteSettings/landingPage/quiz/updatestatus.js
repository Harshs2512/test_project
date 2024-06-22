import connectDB from "db/newdb"
import QuizGuid from "models/siteSettings/quizGuid";

const updatestatus = async (req, res) => {
     await connectDB();
    try {
        const { id, is_published } = req.body
        const existingQuizes = await QuizGuid.findById(id);
        if (!existingQuizes) {
            return res.status(404).send({ error: "Quiz not found" });
        }
        existingQuizes.is_published = is_published
        await existingQuizes.save();
        res.status(200).send({
            success: true,
            message: "Quiz Updated Successfully",
            updatedQuizes: existingQuizes,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating Quiz",
        });
    }
};
export default updatestatus