
import Tutorials from "models/Tutorials/tutorialModel"
import slugify from "slugify";
import connectDB from "db/newdb"
import { getSession } from "next-auth/react";
const formidable = require("formidable");
export const config = {
  api: {
    bodyParser: false,
  },
};
const Handler = async (req, res) => {
  if (req.method === "GET") {
    return getAllTutorial(req, res);
  } else if (req.method === "POST") {
    return createTutorial(req, res);
  }else if(req.method === 'PUT') {
    return updateTutorial(req, res);
  }else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};

const createTutorial = async (req, res) => {
  const session = await getSession({ req })
await connectDB();
  try {
    const form = new formidable.IncomingForm();
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
      const category = getSingleValueFromArray(fields.category);
      const course_level = getSingleValueFromArray(fields.course_level);
      const duration = getSingleValueFromArray(fields.duration);
      const Tools = getSingleValueFromArray(fields.Tools);
      const description = getSingleValueFromArray(fields.description);
      const  questionsList = JSON.parse(fields. questionsList);
      const guide = await new Tutorials({
        title,
        category,
        course_level,
        duration,
        Tools,
        description,
        slug: slugify(title),
        questionsList,
        created_by: session.user,
      });
      await guide.save();
      res.status(201).json({
        success: true,
        message: "guide Created Successfully",
      });
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Error in creating guide",
    });
  }
};
const updateTutorial = async (req, res) => {
  const session = await getSession({ req })
  const form = new formidable.IncomingForm();
      await connectDB();
  try {

    form.parse(req, async (err, fields, files) => {
      const existingData = await Tutorials.findById(fields.id);
      if (!existingData) {
        return res.status(500).send({ message: "Not found" });
      }
      if (err) {
        return res.status(500).send({ error: "Error parsing form data" });
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
      const category = getSingleValueFromArray(fields.category);
      const course_level = getSingleValueFromArray(fields.course_level);
      const duration = getSingleValueFromArray(fields.duration);
      const Tools = getSingleValueFromArray(fields.Tools);
      const description = getSingleValueFromArray(fields.description);
      const  questionsList = JSON.parse(fields. questionsList);

      existingData.title = title;
      existingData.slug = slugify(title);
      existingData.category = category;
      existingData.course_level = course_level;
      existingData.duration = duration;
      existingData.Tools = Tools;
      existingData.questionsList = questionsList;
      existingData.description = description;

      await existingData.save();
      res.status(200).json({
        success: true,
        message: "guide Updated Successfully",
      });
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Error in Updated guide",
    });
  }
};
const getAllTutorial = async (req, res) => {
  await connectDB();
  try {
    let query = {};
    if (req.query.category) {
      query = { category: req.query.category };
    }
    const coursesGuide = await Tutorials.find(query);
    res.status(200).json({ success: true, coursesGuide });

  } catch (error) {
    console.log(error, "Fetching Updated guided path Data Error");
    res.status(500).json({ error: "An error occurred while fetching Updated guided path data" });
  } 
};


export default Handler;
