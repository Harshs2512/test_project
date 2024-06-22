import db from "db/db";
import QuizResult from "models/Quizexam-model";

const ResultByQuizId = async (req, res) => {
    const quizId = req.query.quizId;
    
    try {
        await db.connect();
        const quizResult = await QuizResult.find({ quizId: quizId });
        if (!quizResult) {
            return res.status(404).json({ success: false, message: "Quiz result not found" });
        }
        res.status(200).json({ success: true, quizResult });
    await db.disconnect();

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
    await db.disconnect();
}

export default ResultByQuizId;
