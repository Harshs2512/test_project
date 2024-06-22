import Quiz from "models/QuizModel";
import connectDB from "db/newdb";
const Handler = async (req, res) => {
  if (req.method === "GET") {
    return getAllQuiz(req, res);
  }else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};
const getAllQuiz = async (req, res) => {
  await connectDB();
  try {
    let query = {};
    if (req.query.QuizCategory) {
      query = { QuizCategory: req.query.QuizCategory };
    }
    const quizes = await Quiz.find(query).select("-media").select("-image");
    res.status(200).json({
      success: true,
      quizes,
    });
  } catch (error) {
    console.error("Error fetching quizs:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export default Handler;
