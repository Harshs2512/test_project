
import ProjectModel from "models/Project/projectModel";
import connectDB from 'db/newdb';
import fs from "fs";
const formidable = require("formidable");

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = (req, res) => {
    if (req.method === 'GET') {
        return getHandler(req, res);
    }
    if (req.method === 'POST') {
        return addHandler(req, res);
    }if (req.method === "PUT") {
        return updateHandler(req, res);
    }
    if(req.method == 'DELETE'){
        return deleteHandler(req,res);
    }
    else {
        return res.status(400).send("method not allow")
    }
}

const updateHandler = async (req, res) => {
    const form = new formidable.IncomingForm();
    await connectDB();
    try {
      form.parse(req, async (err, fields, files) => {
        const existingData = await ProjectModel.findById(fields.id);
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

        const title = getSingleValueFromArray(fields.title);
            const projectbrief = getSingleValueFromArray(fields.projectbrief);
            const start_date = getSingleValueFromArray(fields.start_date);
            const duedate = getSingleValueFromArray(fields.duedate);
            const privacy = getSingleValueFromArray(fields.privacy);
            const client_name = getSingleValueFromArray(fields.client_name);
            const budget = getSingleValueFromArray(fields.budget);
            const priority = getSingleValueFromArray(fields.priority);
            const categories = getSingleValueFromArray(fields.categories);
            const icon = files.icon;
            const coverimage = files.coverimage;
  
        existingData.title = title;
        existingData.projectbrief = projectbrief;
        existingData.start_date = start_date;
        existingData.duedate = duedate;
        existingData.privacy = privacy;
        existingData.client_name = client_name;
        existingData.budget = budget;
        existingData.priority = priority;
        existingData.categories = categories;
          
        if (icon) {
          const iconFile = files?.icon[0];
          if (iconFile.size > 100000000) {
            return res
              .status(500)
              .send({ error: "icon should be less than 1mb" });
          }
          const iconData = Buffer.from(
            fs.readFileSync(iconFile.filepath)
          );
          const iconContentType = iconFile.mimetype;
          
          const icon = {
            data: iconData,
            contentType: iconContentType,
          };
          existingData.icon = icon;
        }
        if (coverimage) {
          const coverImageFile = files?.coverimage[0];
          if (coverImageFile.size > 100000000) {
            return res
              .status(500)
              .send({ error: "coverimage should be less than 1mb" });
          }
          const coverImageData = Buffer.from(
            fs.readFileSync(coverImageFile.filepath)
          );
          const coverImageContentType = coverImageFile.mimetype;
          const coverimage = {
            data: coverImageData,
            contentType: coverImageContentType,
          };
          existingData.coverimage = coverimage;
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
const addHandler = async (req, res) => {
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
            const projectbrief = getSingleValueFromArray(fields.projectbrief);
            const start_date = getSingleValueFromArray(fields.start_date);
            const duedate = getSingleValueFromArray(fields.duedate);
            const privacy = getSingleValueFromArray(fields.privacy);
            const client_name = getSingleValueFromArray(fields.client_name);
            const budget = getSingleValueFromArray(fields.budget);
            const priority = getSingleValueFromArray(fields.priority);
            const categories = getSingleValueFromArray(fields.categories);
            // const progress = getSingleValueFromArray(fields.progress);
            const icon = files.icon;
            const coverimage = files.coverimage;
            // // Check if the title is a valid string
            if (icon) {
                if (icon.size > 100000000) {
                    return res
                        .status(500)
                        .send({ error: "icon should be less than 1mb" });
                }
            }
            if (coverimage) {
                if (coverimage.size > 100000000) {
                    return res
                        .status(500)
                        .send({ error: "coverimage should be less than 1mb" });
                }
            }


            const iconData = Buffer.from(fs.readFileSync(icon[0].filepath));
            const iconContentType = icon[0].mimetype;

            const coverimageData = Buffer.from(fs.readFileSync(coverimage[0].filepath));
            const coverimageContentType = coverimage[0].mimetype;

            const projectData = new ProjectModel({
                title,
                projectbrief,
                start_date,
                duedate,
                privacy,
                client_name,
                budget,
                priority,
                categories,
                coverimage: {
                    data: coverimageData,
                    contentType: coverimageContentType,
                },
                icon: {
                    data: iconData,
                    contentType: iconContentType,
                }
            });
            
            await projectData.save();
            res.status(201).send({
                success: true,
                message: "Placement record Created Successfully",
                projectData,
            });
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating course",
        });
    }
}

const getHandler = async (req, res) => {
    await connectDB();
    try {
        if (req.query.id) {
            const record = await ProjectModel.findById(req.query.id).select("-icon -coverimage");
            if (record) {
                res.status(200).json(record);
            } else {
                res.status(404).send({ message: 'Project not found' });
            }
        } else {
            const records = await ProjectModel.find().select("-icon -coverimage");
            if (records.length > 0) {
                res.status(200).json(records);
            } else {
                res.status(404).send({ message: 'No projects found' });
            }
        }
    } catch (error) {
        res.status(500).send("Something Went Wrong");
    }
};

const deleteHandler = async (req, res) => {
    await connectDB();
    try {
        const projectId = req.query.id;
        const records = await ProjectModel.findByIdAndDelete(projectId);
        if (records) {
            res.status(200).json({ message: 'Project Deleted Successfully' });
        } else {
            res.status(404).send({ message: 'Project not found' });
        }
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).send("Something Went Wrong");
    }
};

export default handler;