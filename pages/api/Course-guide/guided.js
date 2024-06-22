import Guided_Course from "models/Guided-path/guid-courseModel";
import connectDB from "db/newdb";
import slugify from "slugify";
import fs from "fs";
const formidable = require("formidable");
export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function codeAssignmentHandler(req, res) {
  switch (req.method) {
    case "GET":
      await getLearnings(req, res);
      break;
    case "POST":
      await createLearning(req, res);
      break;
    case "PUT":
      await updateLearning(req, res);
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
const updateLearning = async (req, res) => {
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
      const { guideId } = req.query;
      const contest = await Guided_Course.findById(guideId);
      if (!contest) {
        return res.status(404).json({ error: "Contest not found" });
      }
      const contest_title = getSingleValueFromArray(fields.contest_title);
      const category = getSingleValueFromArray(fields.category);
      const contest_level = getSingleValueFromArray(fields.contest_level);
      const contest_startDate = getSingleValueFromArray(
        fields.contest_startDate
      );
      const contest_endDate = getSingleValueFromArray(fields.contest_endDate);
      const contest_description = getSingleValueFromArray(
        fields.contest_description
      );
      const { image } = files;
      let imageData, imageContentType;

      if (image && image.length > 0) {
        imageData = fs.readFileSync(image[0].filepath);
        imageContentType = image[0].mimetype;
      }

      const topics = JSON.parse(fields.topics);

      // Update contest fields
      contest.contest_title = contest_title;
      contest.slug = slugify(contest_title);
      if (imageData && imageContentType) {
        contest.image = {
          data: imageData,
          contentType: imageContentType,
        };
      }
      contest.category = category;
      contest.contest_level = contest_level;
      contest.contest_startDate = contest_startDate;
      contest.contest_endDate = contest_endDate;
      contest.contest_description = contest_description;
      contest.topic = topics;

      const updatedContest = await contest.save();
      res
        .status(200)
        .json({
          message: "Learning path updated successfully",
          updatedContest,
        });
    });
  } catch (error) {
    console.error("Error updating Learning path:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createLearning = async (req, res) => {
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
      const contest_title = getSingleValueFromArray(fields.contest_title);
      const category = getSingleValueFromArray(fields.category);
      const contest_level = getSingleValueFromArray(fields.contest_level);
      const contest_startDate = getSingleValueFromArray(
        fields.contest_startDate
      );
      const contest_endDate = getSingleValueFromArray(fields.contest_endDate);
      const contest_description = getSingleValueFromArray(
        fields.contest_description
      );
      const { image } = files;
      const imageData = fs.readFileSync(image[0].filepath);
      const imageContentType = image[0].mimetype;
      const topics = JSON.parse(fields.topics);
      const newContest = new Guided_Course({
        contest_title,
        slug: slugify(contest_title),
        image: {
          data: imageData,
          contentType: imageContentType,
        },
        category,
        contest_level,
        contest_startDate,
        contest_endDate,
        contest_description: contest_description,
        topic: topics,
      });
      const savedContest = await newContest.save();
      res
        .status(201)
        .json({ message: "Learning path saved successfully", savedContest });
    });
  } catch (error) {
    console.error("Error creating Learning path:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getLearnings = async (req, res) => {
  await connectDB();
  try {
    let query = {};
    if (req.query.category) {
      query = { category: req.query.category };
    }
    const Learning = await Guided_Course.find(query).select("-image");
    res.status(200).json({ message: "All Learning", Learning });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
