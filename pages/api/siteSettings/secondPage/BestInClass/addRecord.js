import BestClass from "models/siteSettings/secondPage/Best-in-class";
import connectDB from "db/newdb";
import fs from "fs";
const formidable = require("formidable");

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method === "GET") {
    return getAllJob(req, res);
  } else if (req.method === "DELETE") {
    return deleteData(req, res);
  } else if (req.method === "PUT") {
    return UpdateData(req, res);
  } else if (req.method === "POST") {
    return adddata(req, res);
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};
// deleteHandler
const adddata = async (req, res) => {
  await connectDB();
  const form = new formidable.IncomingForm();
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
      const description = getSingleValueFromArray(fields.description);
      const image = files.image;
      if (typeof title !== "string" || title.trim().length === 0) {
        return res.status(500).send({ error: "Please enter title" });
      }
      if (image) {
        if (image.size > 100000000) {
          return res
            .status(500)
            .send({ error: "Photo should be less than 1mb" });
        }
      }
      const imageData = Buffer.from(fs.readFileSync(image[0].filepath));
      const imageContentType = image[0].mimetype;
      const cardData = new BestClass({
        title,
        description,
        image: {
          data: imageData,
          contentType: imageContentType,
        },
      });
      await cardData.save();
      res.status(201).send({
        success: true,
        message: "Post Created Successfully",
        cardData,
      });
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating course",
    });
  }
};

const getAllJob = async (req, res) => {
  await connectDB();
  try {
    const Data = await BestClass.find().select("-image");
    res.status(200).json({ success: true, Data });
  } catch (error) {
    console.log("Error best classes Data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching Best Class data" });
  }
};

const deleteData = async (req, res) => {
  await connectDB();
  try {
    const id = req.query.id;
    const records = await BestClass.findByIdAndDelete(id);
    if (records) {
      res.status(200).json(records);
    } else {
      res.status(404).send({ message: "No categories found" });
    }
  } catch (error) {
    res.status(500).send("Somthing Went Wrong");
    console.log(error);
  }
};
const UpdateData = async (req, res) => {
  const form = new formidable.IncomingForm();
  await connectDB();
  try {
    form.parse(req, async (err, fields, files) => {
      const existingData = await BestClass.findById(fields.id);
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
      const description = getSingleValueFromArray(fields.description);
      const image = files.image;
      if (typeof title !== "string" || title.trim().length === 0) {
        return res.status(500).send({ error: "Please enter title" });
      }
      if (image) {
        if (image.size > 100000000) {
          return res
            .status(500)
            .send({ error: "Photo should be less than 1mb" });
        }
        const imageContentType = image[0].mimetype;
        const imageData = Buffer.from(fs.readFileSync(image[0].filepath));
        existingData.image = {
          data: imageData,
          contentType: imageContentType,
        };
      }

      existingData.title = title;
      existingData.description = description;

      await existingData.save();
      res.status(201).json({
        success: true,
        message: "Data updated Successfully",
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
export default handler;
