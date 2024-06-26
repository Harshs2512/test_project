import Contest from "models/Contests/contestModel";
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
      await getContest(req, res);
      break;
    case "POST":
      await createContest(req, res);
      break;
    case "PUT":
      await updateContest(req, res);
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
const createContest = async (req, res) => {
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
      const questionsList = JSON.parse(fields.questionsList);
      const newContest = new Contest({
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
        questionsList,
      });
      const savedContest = await newContest.save();
      res
        .status(201)
        .json({ message: "Contest saved successfully", savedContest });
    });
  } catch (error) {
    console.error("Error creating contest:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateContest = async (req, res) => {
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
      
      const {contestId} = req.query;
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

      const questionsList = JSON.parse(fields.questionsList);

      const updatedContest = {
        contest_title,
        slug: slugify(contest_title),
        ...(image && image.length > 0 && {
          image: {
            data: imageData,
            contentType: imageContentType,
          }
        }),
        category,
        contest_level,
        contest_startDate,
        contest_endDate,
        contest_description: contest_description,
        questionsList,
      };

      const savedContest = await Contest.findByIdAndUpdate(
        contestId,
        updatedContest,
        { new: true }
      );

      if (!savedContest) {
        return res.status(404).json({ error: "Contest not found" });
      }

      res
        .status(200)
        .json({ message: "Contest updated successfully", savedContest });
    });
  } catch (error) {
    console.error("Error updating contest:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getContest = async (req, res) => {
  await connectDB();
  try {
    const Contests = await Contest.find().select("-image");
    res.status(200).json({ message: "All Contests", Contests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
  }
};
