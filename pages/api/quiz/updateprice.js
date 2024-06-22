import Quiz from "models/QuizModel";
import connectDB from 'db/newdb'
const updateprice = async (req, res) => {
    await connectDB();
    try {
        const { currentprice, actualprice, courseId } = req.body
        const existingQuiz = await Quiz.findById(courseId);
        if (!existingQuiz) {
            return res.status(404).send({ error: "Course not found" });
        }
        existingQuiz.currentprice = currentprice;
        existingQuiz.actualprice = actualprice;
        await existingQuiz.save();
        res.status(200).send({
            success: true,
            message: "Course Updated Successfully",
            updatedQuiz: existingQuiz,
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
export default updateprice