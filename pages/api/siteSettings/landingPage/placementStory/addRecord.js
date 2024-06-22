import placementStoryModel from "models/siteSettings/landingPage/placementStoryModel";
import connectDB from 'db/newdb';
import fs from "fs";
const formidable = require("formidable");

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    await connectDB()

    if (req.method !== 'POST') {
        return res.status(405).end();
    }

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
            const student_name = getSingleValueFromArray(fields.student_name);
            const student_icon = files.student_icon;
            const company_logo = files.company_logo;
            // // Check if the title is a valid string

            if (typeof title !== "string" || title.trim().length === 0) {
                return res.status(500).send({ error: "Invalid title" });
            }

            if (typeof description !== "string" || description.trim().length === 0) {
                return res.status(500).send({ error: "Invalid description" });
            }

            if (typeof student_name !== "string" || student_name.trim().length === 0) {
                return res.status(500).send({ error: "Invalid student_name" });
            }

            if (company_logo) {
                if (company_logo.size > 100000000) {
                    return res
                        .status(500)
                        .send({ error: "company_logo should be less than 1mb" });
                }
            }

            if (student_icon) {
                if (student_icon.size > 100000000) {
                    return res
                        .status(500)
                        .send({ error: "Thumbnail should be less than 1mb" });
                }
            }

            const company_logoData = Buffer.from(fs.readFileSync(company_logo[0].filepath));
            const company_logoContentType = company_logo[0].mimetype;

            const student_iconData = Buffer.from(fs.readFileSync(student_icon[0].filepath));
            const student_iconContentType = student_icon[0].mimetype;

            const cardData = new placementStoryModel({
                title,
                description,
                student_name,
                company_logo: {
                    data: company_logoData,
                    contentType: company_logoContentType,
                },
                student_icon: {
                    data: student_iconData,
                    contentType: student_iconContentType,
                }
            });

            await cardData.save();
            res.status(201).send({
                success: true,
                message: "Post Created Successfully",
                cardData,
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