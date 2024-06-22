import connectDB from 'db/newdb';
import courseLogoModel from "models/siteSettings/secondPage/course-logo";
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
        return updatecourse(req, res);
    }
    else {
        return res.status(400).send("method not allow")
    }
}

const getHandler = async (req, res) => {
    await connectDB();
    try {
        const records = await courseLogoModel.find().select("-course_logo");
        if (records) {
            res.status(200).json(records)
        } else {
            res.status(404).send({ message: 'No course data found' });
        };
    }
    catch (error) {
        res.status(500).send("Somthing Went Wrong")
    };
};

const addHandler = async (req, res) => {
    const form = new formidable.IncomingForm();

    await connectDB();
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

            const course_name = getSingleValueFromArray(fields.course_name);
            const course_logo = files.course_logo;
            // // Check if the title is a valid string

            if (typeof course_name !== "string" || course_name.trim().length === 0) {
                return res.status(500).send({ error: "Invalid course name" });
            }

            if (course_logo) {
                if (course_logo.size > 100000000) {
                    return res
                        .status(500)
                        .send({ error: "course_logo should be less than 1mb" });
                }
            }

            const course_logoData = Buffer.from(fs.readFileSync(course_logo[0].filepath));
            const course_logoContentType = course_logo[0].mimetype;

            const cardData = new courseLogoModel({
                course_name,
                course_logo: {
                    data: course_logoData,
                    contentType: course_logoContentType,
                },
            });

            await cardData.save();
            res.status(201).send({
                success: true,
                message: "course Logo Created Successfully",
                cardData,
            });
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating course logo",
        });
    }
};


const updatecourse = async (req, res) => {
    const form = new formidable.IncomingForm();
    await connectDB();
    try {
        form.parse(req, async (err, fields, files) => {
            const existingData = await courseLogoModel.findById(fields.id);
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
            const course_logo = files.course_logo;

            if (course_logo) {
                const course_name = getSingleValueFromArray(fields.course_name);
                existingData.course_name = course_name;
                const course_logoFile = files?.course_logo[0];
                if (course_logoFile.size > 100000000) {
                    return res.status(500).send({ error: "image should be less than 10mb" });
                }
                const course_logoData = fs.readFileSync(course_logoFile.filepath);
                const course_logoContentType = course_logoFile.mimetype;
                const course_logo = {
                    data: course_logoData,
                    contentType: course_logoContentType,
                }
                existingData.course_logo = course_logo;
                await existingData.save();
                res.status(201).send({
                    message: "course name and logo is updated",
                    existingData
                });

            }
            else {
                const course_name = getSingleValueFromArray(fields.course_name);
                existingData.course_name = course_name;
                await existingData.save();
                res.status(201).send({
                    message: "course name and logo is updated",
                    existingData
                })
            }
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating course logo and name",
        });
    }
};
export default handler;