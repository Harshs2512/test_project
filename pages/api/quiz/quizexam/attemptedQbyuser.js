import db from "db/db";
import QuizResult from "models/Quizexam-model"


const QuizAttemptedByUser = async (req, res) => {
    try {
        await db.connect();
        const userId = req?.query?.userId;
        const uniqueCombinations = await QuizResult.distinct("quizId", { created_by: userId });
        const distinctQuizzes = await Promise.all(
            uniqueCombinations.map(async (quizId) => {
                const firstAttempt = await QuizResult.findOne({ created_by: userId, quizId }).sort({ createdAt: 1 });
                return firstAttempt;
            })
        );
        res.status(200).json({ success: true, quizes: distinctQuizzes });
        await db.disconnect();

    } catch (err) {
        console.log(err);
    } finally {
        await db.disconnect();
    }
}


export default QuizAttemptedByUser;