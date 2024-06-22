import coursePageModel from "models/siteSettings/megaMenu/coursePageModel";
import connectDB from "db/newdb";
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
  await connectDB();
  try {  
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      const existingData = await coursePageModel.findById(fields.id);
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
      const student_image = files.student_image;
      const course_name = getSingleValueFromArray(fields.course_name);
      const section_title = getSingleValueFromArray(fields.section_title);
      const typedtitle_one = getSingleValueFromArray(fields.typedtitle_one);
      const typedtitle_second = getSingleValueFromArray(
        fields.typedtitle_second
      );
      const typedtitle_third = getSingleValueFromArray(fields.typedtitle_third);
      const category = getSingleValueFromArray(fields.category);

      existingData.course_name = course_name;
      existingData.sectiontitle = section_title;
      existingData.typedtitle_first = typedtitle_one;
      existingData.typedtitle_second = typedtitle_second;
      existingData.typedtitle_third = typedtitle_third;
      existingData.category = category;

      if (student_image) {
        const student_imageFile = files?.student_image[0];
        if (student_imageFile.size > 100000000) {
          return res
            .status(500)
            .send({ error: "image should be less than 10mb" });
        }
        const student_imageData = fs.readFileSync(student_imageFile.filepath);
        const student_imageContentType = student_imageFile.mimetype;
        const student_image = {
          data: student_imageData,
          contentType: student_imageContentType,
        };
        existingData.student_image = student_image;
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
