import QuizResult from 'models/Quizexam-model';
import db from "db/db";
import mongoose from "mongoose";

const answerSubmit = async (req, res) => {
  try {
    await db.connect();
    const { quizId, answers } = req.body;
    const userId = req.query.id

    const questionAnswers = Object.entries(answers).map(([questionId, answer]) => ({
      questionId: questionId,
      answer,
    }));
    const quizResult = new QuizResult({
      quizId: new mongoose.Types.ObjectId(quizId),
      questions_list: questionAnswers,
      created_by: userId,
    });
    const savedQuizResult = await quizResult.save();
    res.status(200).json({ message: 'Answers submitted successfully', quizResult: savedQuizResult });
    await db.disconnect();
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ message: 'Error occurred while submitting answers' });
  }
  await db.disconnect();
};

export default answerSubmit;
