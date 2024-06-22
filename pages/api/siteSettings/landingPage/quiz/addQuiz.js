

import connectDB from "db/newdb"
import QuizGuid from "models/siteSettings/quizGuid";
import slugify from "slugify";
const formidable = require("formidable");
export const config = {
  api: {
    bodyParser: false,
  },
};
const Handler = async (req, res) => {
  if (req.method === "GET") {
    return getAllQuiz(req, res);
  } else if (req.method === "POST") {
    return createQuiz(req, res);
  } else if (req.method=== "DELETE") {
    return deleteHandler(req,res);
  } else if (req.method === "PUT") {
    return UpdateQuiz(req, res);
  }else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};
const getAllQuiz = async (req, res) => {
  await connectDB();
  try {
    const quizLive = await QuizGuid.find();
    
    res.status(200).json({ success: true, quizLive })
  } catch (error) {
    console.log(error, "fetching Quiz Order Data Error");
    res.status(500).json({ error: "An error occurred while fetching quiz order data" });
  }
}
const deleteHandler = async (req, res) => {
    const id = req.query.id
    await connectDB();
    const quiz = await QuizGuid.findByIdAndDelete(id);
    if (quiz) {
      return res.status(200).send({ message: "quiz deleted successfully" });
    } else {
      return res.status(404).send({ message: "quiz not found" });
    }
  };
const createQuiz = async (req, res) => {
  const form = new formidable.IncomingForm();
  await connectDB();
  try {
    form.parse(req, async (err, fields) => {
      if (err) {
        return res.status(500).send({ error: "Error parsing form data" });
      }
      const getSingleValueFromArray = (value) => {
        if (Array.isArray(value) && value.length > 0) {
          return value[0];
        }
        return value;
      };
      const title = getSingleValueFromArray(fields.title);
      const questions_list = JSON.parse(fields.questions_list);
      if (typeof title !== "string" || title.trim().length === 0) {
        return res.status(500).send({ error: "Invalid Title" });
      }      
      const quiz = await new QuizGuid({
        title,
        slug: slugify(title),
        questions_list,
      });
      await quiz.save();
      res.status(201).json({
        success: true,
        message: "Quiz Created Successfully",
      });
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Error in creating quiz",
    });
  }
};

const UpdateQuiz = async (req, res) => {
  const form = new formidable.IncomingForm();
  await connectDB();
  try {
    form.parse(req, async (err, fields) => {
      const existingData = await QuizGuid.findById(fields.id);
      if (!existingData) {
        return res.status(500).send({ message: "Not found" });
      }
      if (err) {
        return res.status(500).send({ error: "Error parsing form data" });
      }
      const getSingleValueFromArray = (value) => {
        if (Array.isArray(value) && value.length > 0) {
          return value[0];
        }
        return value;
      };
      const title = getSingleValueFromArray(fields.title);
      const questions_list = JSON.parse(fields.questions_list);
      if (typeof title !== "string" || title.trim().length === 0) {
        return res.status(500).send({ error: "Invalid Title" });
      }  
      
      
      existingData.title = title;
      existingData.questions_list = questions_list;

      await existingData.save();
      res.status(201).json({
        success: true,
        message: "Quiz updated Successfully",
      });
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Error in creating quiz",
    });
  }
};
export default Handler;
