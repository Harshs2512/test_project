import Quiz from "models/QuizModel";
import connectDB from 'db/newdb'
const QuizByInstructor = async (req, res) => {
    await connectDB();
    try {
        const instructorId = req?.query?.userId;
        const quizes = await Quiz.find({ created_by: instructorId });
        res.status(200).json({ success: true, quizes });
    } catch (err) {
        console.log(err);
    }
}

export default QuizByInstructor;