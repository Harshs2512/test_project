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
  await db.connect();
  const quiz = await Quiz.findByIdAndDelete(req.query.id);
  if (quiz) {
    return res.send({ message: "quiz deleted successfully" });
  } else {
    return res.status(404).send({ message: "quiz not found" });
  }
};

const getHandler = async (req, res) => {
  await db.connect();
  const quiz = await Quiz.findById(req.query.id)
  if (quiz) {
    await db.disconnect();
    return res.status(200).send({
        message:"This is the One Quiz",
        quiz
    })
  }else{
    await db.disconnect();
    return res.status(404).send({ message: "quiz not found" });
  }
};

const putHandler = async (req, res) => {
  await db.connect();
  const quiz = await Quiz.findById(req.query.id);
  if (quiz) {
    quiz.title = req.body.title;
    quiz.slug = req.body.slug
    quiz.duration = req.body.duration;
    quiz.image =req.body.image;
    await quiz.save();
    return res.send({ message: "Quiz updated successfully" });
  } else {
    return res.status(404).send({ message: "quiz not found" });
  }
};

export default handler;