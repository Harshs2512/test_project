import Quiz from "models/QuizModel";
import Order from 'models/OrderModel'
import slugify from "slugify";
import connectDB from 'db/newdb'
import fs from "fs";
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
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};
const getAllQuiz = async (req, res) => {
  await connectDB();
  try {
    const userId = req?.query?.userId;
    const quizOrders = await Order.find({
      user_detail: userId,
      order_status: 'paid'
    }).select('purchase_item');
    const purchaseItems = quizOrders.map(order => order.purchase_item);
    const filteredPurchaseItems = purchaseItems
      .map(item => item.filter(subItem => subItem.title))
      .filter(item => item.length > 0);
    res.status(200).json({ success: true, filteredPurchaseItems })
  } catch (error) {
    console.log(error, "fetching Quiz Order Data Error");
    res.status(500).json({ error: "An error occurred while fetching quiz order data" });
  }
}

const createQuiz = async (req, res) => {
  const userId = req?.query?.userId;
  const form = new formidable.IncomingForm();
  await connectDB();
  try {
    form.parse(req, async (err, fields, files) => {
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
      const hours = getSingleValueFromArray(fields.hours);
      const QuizCategory = getSingleValueFromArray(fields.QuizCategory);
      const level = getSingleValueFromArray(fields.level);
      const minutes = getSingleValueFromArray(fields.minutes);
      const seconds = getSingleValueFromArray(fields.seconds);
      const editorContent = getSingleValueFromArray(fields.editorContent);
      const { image } = files;
      const imageData = fs.readFileSync(image[0].filepath);
      const imageContentType = image[0].mimetype;
      const questions_list = JSON.parse(fields.questions_list);
      const is_published = getSingleValueFromArray(fields.is_published);
      if (typeof title !== "string" || title.trim().length === 0) {
        return res.status(500).send({ error: "Invalid Title" });
      }
      if (image) {
        if (image.size > 10000000) {
          return res
            .status(500)
            .send({ error: "image should be less than 1mb" });
        }
      }
      const questionsWithAnswers = questions_list.map((question) => {
        if (question.question_type === "fill_in_blank") {
          const answer = question.answer;
          return { ...question, answer };
        } else if (question.question_type === "true_false") {
          const answer = question.correctAnswer;
          return { ...question, answer };
        }
        return {
          ...question,
          quillEditorContent: editorContent,
        };
      });
      const quiz = await new Quiz({
        title,
        QuizCategory,
        level,
        hours,
        minutes,
        seconds,
        slug: slugify(title),
        image: {
          data: imageData,
          contentType: imageContentType,
        },
        questions_list: questionsWithAnswers,
        created_by: userId,
        is_published,
        quillEditorContent: editorContent,
      });
      await quiz.save();
      res.status(201).json({
        success: true,
        message: "Quiz Created Successfully",
      });
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error in creating quiz",
    });
  }
};
export default Handler;
