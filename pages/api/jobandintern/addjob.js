import JobIntern from "models/jobandInternship/jobIntern";
import slugify from "slugify";
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
  } else if (req.method === "PUT") {
    return UpdateJob(req, res);
  } else if (req.method === "POST") {
    return addjob(req, res);
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};

const UpdateJob = async (req, res) => {
  await connectDB();
  const form = new formidable.IncomingForm();
  try {
    form.parse(req, async (err, fields, files) => {
      const existingData = await JobIntern.findById(fields.id);
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
      const job_title = getSingleValueFromArray(fields.job_title);
      const experience = getSingleValueFromArray(fields.experience);
      const sallary = getSingleValueFromArray(fields.sallary);
      const qualification = getSingleValueFromArray(fields.qualification);
      const post_type = getSingleValueFromArray(fields.post_type);
      const company_name = getSingleValueFromArray(fields.company_name);
      const skils = getSingleValueFromArray(fields.skils);
      const description = getSingleValueFromArray(fields.description);
      const location = getSingleValueFromArray(fields.location);
      const companyImage = files.companyImage;
      // // Check if the title is a valid string

      existingData.job_title = job_title;
      existingData.experience = experience;
      existingData.sallary = sallary;
      existingData.qualification = qualification;
      existingData.post_type = post_type;
      existingData.company_name = company_name;
      existingData.skils = skils;
      existingData.description = description;
      existingData.location = location;
      if (
        typeof company_name !== "string" ||
        company_name.trim().length === 0
      ) {
        return res.status(500).send({ error: "Invalid company_name" });
      }

      if (typeof job_title !== "string" || job_title.trim().length === 0) {
        return res.status(500).send({ error: "Invalid company_name" });
      }

      if (companyImage) {
        const companyImageFile = files?.companyImage[0];
        if (companyImageFile.size > 100000000) {
          return res
            .status(500)
            .send({ error: "company_logo should be less than 1mb" });
        }
        const companyImageData = Buffer.from(
          fs.readFileSync(companyImageFile.filepath)
        );
        const companyImageContentType = companyImageFile.mimetype;
        const companyImage = {
          data: companyImageData,
          contentType: companyImageContentType,
        };
        existingData.companyImage = companyImage;
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
      message: "Error in creating course",
    });
  }
};
const addjob = async (req, res) => {
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
      const job_title = getSingleValueFromArray(fields.job_title);
      const experience = getSingleValueFromArray(fields.experience);
      const sallary = getSingleValueFromArray(fields.sallary);
      const qualification = getSingleValueFromArray(fields.qualification);
      const post_type = getSingleValueFromArray(fields.post_type);
      const company_name = getSingleValueFromArray(fields.company_name);
      const skils = getSingleValueFromArray(fields.skils);
      const description = getSingleValueFromArray(fields.description);
      const location = getSingleValueFromArray(fields.location);
      const companyImage = files.companyImage;
      // // Check if the title is a valid string
      if (
        typeof company_name !== "string" ||
        company_name.trim().length === 0
      ) {
        return res.status(500).send({ error: "Invalid company_name" });
      }

      if (typeof job_title !== "string" || job_title.trim().length === 0) {
        return res.status(500).send({ error: "Invalid company_name" });
      }

      if (companyImage) {
        if (companyImage.size > 100000000) {
          return res
            .status(500)
            .send({ error: "company_logo should be less than 1mb" });
        }
      }
      const company_logoData = Buffer.from(
        fs.readFileSync(companyImage[0].filepath)
      );
      const company_logoContentType = companyImage[0].mimetype;
      const jobData = new JobIntern({
        job_title,
        experience,
        sallary,
        qualification,
        post_type,
        company_name,
        skils,
        description,
        location,
        companyImage: {
          data: company_logoData,
          contentType: company_logoContentType,
        },
      });
      await jobData.save();
      res.status(201).send({
        success: true,
        message: "Job and InternShip Created Successfully",
        jobData,
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
    const jobData = await JobIntern.find().select("-companyImage");
    res.status(200).json({ success: true, jobData });
  } catch (error) {
    console.log("Error fetching Quiz Order Data:", error);
    res.status(500).json({ error: "An error occurred while fetching quiz order data" });
  }
};

export default handler;
