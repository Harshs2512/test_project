import Quiz from "models/QuizModel";
import db from "db/db";

const getSingleQ = async (req, res) => {
  try {
    await db.connect();
    const { quizId, questionId } = req.query;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).send({ message: 'Quize Not found' })
    }
    const question = quiz.questions_list.find(
      (question) => question._id.toString() === questionId
    );
    if (!question) {
      return res.status(404).send({ message: 'Question not found in the quiz' });
    }
    return res.status(200).send({ question });
  await db.disconnect();

  } catch (error) {
    console.error('Error fetching question:', error);
    return res.status(500).send({ message: 'Internal server error' });
  }
};
export default getSingleQ;