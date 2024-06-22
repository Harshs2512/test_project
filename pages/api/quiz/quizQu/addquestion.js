import Quiz from "models/QuizModel";
import db from "db/db";

const addQuestionHandler = async (req, res) => {
    const quizIdObject = req.query;
    const quizId = quizIdObject.quizId;
    const questionsList = req.body;
    try {
        await db.connect();
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).send({ message: 'Quiz not found' });
        }
        questionsList.forEach((question) => {
            quiz.questions_list.push(question);
        });
        // Save the updated quiz
        const updatedQuiz = await quiz.save();
        return res.status(200).send({ message: "Success Running page....", updatedQuiz });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
}

export default addQuestionHandler;
