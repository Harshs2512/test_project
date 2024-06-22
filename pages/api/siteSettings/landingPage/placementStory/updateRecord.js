import placementStoryModel from "models/siteSettings/landingPage/placementStoryModel";
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
            const existingData = await placementStoryModel.findById(fields.id);
            if (!existingData) {
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
            const company_logo = files.company_logo;
            const student_icon = files.student_icon;

            if (company_logo || student_icon) {
                const title = getSingleValueFromArray(fields.title);
                const description = getSingleValueFromArray(fields.description);
                const student_name = getSingleValueFromArray(fields.student_name);
                existingData.title = title;
                existingData.description = description;
                existingData.student_name = student_name;

                if (company_logo) {
                    const company_logoFile = files?.company_logo[0];
                    if (company_logoFile.size > 100000000) {
                        return res.status(500).send({ error: "image should be less than 10mb" });
                    }
                    const company_logoData = fs.readFileSync(company_logoFile.filepath);
                    const company_logoContentType = company_logoFile.mimetype;
                    const company_logo = {
                        data: company_logoData,
                        contentType: company_logoContentType,
                    }
                    existingData.company_logo = company_logo;
                    if (student_icon) {
                        const student_iconFile = files?.student_icon[0];
                        if (!student_iconFile) {
                            return res.status(500).send({ error: "student icon logo is requied" });
                        }
                        if (student_iconFile.size > 100000000) {
                            return res.status(500).send({ error: "image should be less than 10mb" });
                        }
                        const student_iconData = fs.readFileSync(student_iconFile.filepath);
                        const student_iconContentType = student_iconFile.mimetype;
                        const student_icon = {
                            data: student_iconData,
                            contentType: student_iconContentType,
                        }
                        existingData.student_icon = student_icon;
                        await existingData.save();
                        res.status(201).send({
                            message: "updated successfuly",
                        });
                    }
                    else {
                        await existingData.save();
                        res.status(201).send({
                            message: "Blog is updated",
                        });
                    }

                }
            }
            else {
                const title = getSingleValueFromArray(fields.title);
                const description = getSingleValueFromArray(fields.description);
                const student_name = getSingleValueFromArray(fields.student_name);
                existingData.title = title;
                existingData.description = description;
                existingData.student_name = student_name;
                await existingData.save();
                res.status(201).send({
                    message: "Blog is updated",
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