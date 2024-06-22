import demandedCourseModel from "models/siteSettings/landingPage/demandedCourseModel";
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
            const existingData = await demandedCourseModel.findById(fields.id);
            if (!existingData) {
                return res.status(500).send({ message: "Not found" })
            }
            if (err) {
                return res.status(500).send({ error: "Error parsing form data" });
            };
            const getSingleValueFromArray = (value) => {
                if (Array.isArray(value) && value.length > 0) {
                    return value[0];
                }
                return value;
            };
            const thumbnail = files.thumbnail;

            if (thumbnail) {
                const routelink = getSingleValueFromArray(fields.routelink);
                existingData.routelink = routelink;
                const thumbnailFile = files?.thumbnail[0];
                if (thumbnailFile.size > 100000000) {
                    return res.status(500).send({ error: "image should be less than 10mb" });
                }
                const thumbnailData = fs.readFileSync(thumbnailFile.filepath);
                const thumbnailContentType = thumbnailFile.mimetype;
                const thumbnail = {
                    data: thumbnailData,
                    contentType: thumbnailContentType,
                }
                existingData.thumbnail = thumbnail;
                await existingData.save();
                res.status(201).send({
                    message: "Blog is updated",
                    existingData
                });

            }
            else {
                const routelink = getSingleValueFromArray(fields.routelink);
                existingData.routelink = routelink;
                await existingData.save();
                res.status(201).send({
                    message: "data is updated",
                    existingData
                })
            }
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating placementStoryModel",
        });
    }
};

export default handler;