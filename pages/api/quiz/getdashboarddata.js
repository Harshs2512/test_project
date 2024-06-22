import Quiz from "models/QuizModel";
import connectDB from "db/newdb";

const Handler = async (req, res) => {
    if (req.method === "GET") {
        return getAllQuiz(req, res);
    } else {
        return res.status(400).send({ message: "Method not allowed" });
    }
};
const getAllQuiz = async (req, res) => {
    await connectDB();
    try {
        const quizes = await Quiz.find().select("-media").select("-image").select("-questions_list").limit(8);
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
