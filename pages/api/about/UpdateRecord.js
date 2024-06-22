import OurTeamSchemaModel from "models/siteSettings/about/ourteamModel";
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
      const existingData = await OurTeamSchemaModel.findById(fields.id);
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
      const name = getSingleValueFromArray(fields.name);
      const position = getSingleValueFromArray(fields.position);
      const image = files.image;
      existingData.name = name;
      existingData.position = position;
      if (image) {
        const imageFile = files?.image[0];
        if (imageFile.size > 100000000) {
          return res
            .status(500)
            .send({ error: "image should be less than 1mb" });
        }
        const imageData = Buffer.from(
          fs.readFileSync(imageFile.filepath)
        );
        const imageContentType = imageFile.mimetype;
        const image = {
          data: imageData,
          contentType: imageContentType,
        };
        existingData.image = image;
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
      message: "Error in creating team member",
    });
  }
};

export default handler;
