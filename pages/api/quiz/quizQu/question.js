import Quiz from "models/QuizModel";
import db from "db/db";

// import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  if (req.method === "GET") {
    return getHandler(req, res);
  } else if (req.method === "PUT") {
    return putHandler(req, res);
  } else if (req.method === "DELETE") {
    return deleteHandler(req, res);
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};

const deleteHandler = async (req, res) => {
  try {
    await db.connect(); 
    const { quizId, questionId } = req.query;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).send({ message: 'Quiz not found' });
    }
    const questionIndex = quiz.questions_list.findIndex(
      (question) => question._id.toString() === questionId
    );
    if (questionIndex === -1) {
      return res
        .status(404)
        .send({ message: 'Question not found in the quiz' });
    }
    quiz.questions_list.splice(questionIndex, 1);
    await quiz.save();
    return res.send({ message: 'Question deleted successfully', quiz });
  } catch (error) {
    console.error('Error deleting question:', error);
    return res.status(500).send({ message: 'Internal server error' });
  }
};
const getHandler = async (req, res) => {

  const quiz = await Quiz.findById(req.query.id);
  if (quiz) {
    await db.connect();
    return res.status(200).send({
      message: "This is the One Quiz",
      quiz,
    });
  } else {
    await db.disconnect();
    return res.status(404).send({ message: "quiz not found this id ......." });
  }
};
const putHandler = async (req, res) => {
  try {
    await db.connect();
    const quizId = req.query.quizId;
    const questionId = req.query.questionId;
    const updatedQuestion = req.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).send({ message: 'Quiz not found this id...' });
    }
    const questionIndex = quiz.questions_list.findIndex((question) => question._id.toString() === questionId);
    if (questionIndex === -1) {
      return res.status(404).send({ message: 'Question not found' });
    }
    quiz.questions_list[questionIndex] = updatedQuestion;
    const updatedQuiz = await quiz.save();
    return res.status(200).send({ message: "Success Running page....", updatedQuiz });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};


export default handler;
