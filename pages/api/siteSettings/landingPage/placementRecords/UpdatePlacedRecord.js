import placementRecordsModel from "models/siteSettings/landingPage/placementRecordsModel";
import connectDB from 'db/newdb';
import fs from "fs";
const formidable = require("formidable");

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method === "PUT") {
    return updatecourse(req, res);
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};

const updatecourse = async (req, res) => {
  const form = new formidable.IncomingForm();
  await connectDB();
  try {
    form.parse(req, async (err, fields, files) => {
      const existingData = await placementRecordsModel.findById(fields.id);
      if (!existingData) {
        return res.status(500).send({ message: "Info Not Found" });
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

      const company_name = getSingleValueFromArray(fields.company_name);
      const student_name = getSingleValueFromArray(fields.student_name);
      const position = getSingleValueFromArray(fields.position);
      const percentage = getSingleValueFromArray(fields.percentage);
      const course = getSingleValueFromArray(fields.course);
            const Video_url = getSingleValueFromArray(fields.Video_url);
      const placed_date = getSingleValueFromArray(fields.placed_date);
      const campus_type = getSingleValueFromArray(fields.campus_type);
      const collage_name = getSingleValueFromArray(fields.collage_name);
      const coding_number = getSingleValueFromArray(fields.coding_number);
      const selected_round = getSingleValueFromArray(fields.selected_round);
      const company_logo = files.company_logo;
      const student_icon = files.student_icon;

      existingData.company_name = company_name;
      existingData.student_name = student_name;
      existingData.position = position;
      existingData.percentage = percentage;
      existingData.placed_date = placed_date;
      existingData.course = course;
      existingData.Video_url = Video_url;
      existingData.campus_type = campus_type;
      existingData.collage_name = collage_name;
      existingData.coding_number = coding_number;
      existingData.selected_round = selected_round;

      if (company_logo) {
        const companyImageFile = files?.company_logo[0];
        if (companyImageFile.size > 100000000) {
          return res
            .status(500)
            .send({ error: "company_logo should be less than 1mb" });
        }
        const companyImageData = Buffer.from(
          fs.readFileSync(companyImageFile.filepath)
        );
        const companyImageContentType = companyImageFile.mimetype;
        const company_logo = {
          data: companyImageData,
          contentType: companyImageContentType,
        };
        existingData.company_logo = company_logo;
      }
      if (student_icon) {
        const studentImageFile = files?.student_icon[0];
        if (studentImageFile.size > 100000000) {
          return res
            .status(500)
            .send({ error: "student_icon should be less than 1mb" });
        }
        const studentImageData = Buffer.from(
          fs.readFileSync(studentImageFile.filepath)
        );
        const studentImageContentType = studentImageFile.mimetype;
        const student_icon = {
          data: studentImageData,
          contentType: studentImageContentType,
        };
        existingData.student_icon = student_icon;
      }
      await existingData.save();
      res.status(200).send({
        message: "Data is updated",
        existingData,
      });
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating placementStoryModel",
    });
  }
};

export default handler;
