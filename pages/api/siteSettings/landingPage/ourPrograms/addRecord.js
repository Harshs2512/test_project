import ourProgramModel from "models/siteSettings/landingPage/ourProgramModel";
import connectDB from 'db/newdb';
import fs from "fs";
const formidable = require("formidable");

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    await connectDB();
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
            const buttontitle = getSingleValueFromArray(fields.buttontitle);
            const description = getSingleValueFromArray(fields.description);
            const image = files.image

            if (typeof title !== "string" || title.trim().length === 0) {
                return res.status(500).send({ error: "Invalid title" });
            }
            if (typeof buttontitle !== "string" || buttontitle.trim().length === 0) {
                return res.status(500).send({ error: "Invalid buttontitle" });
            }
            if (typeof description !== "string" || description.trim().length === 0) {
                return res.status(500).send({ error: "Invalid description" });
            }

            if (image) {
                if (image.size > 100000000) {
                    return res
                        .status(500)
                        .send({ error: "company_logo should be less than 1mb" });
                }
            }

            const imageData = Buffer.from(fs.readFileSync(image[0].filepath));
            const imageContentType = image[0].mimetype;

            let bulletpoints = [];
            if (fields.bulletpoints) {
                try {
                    bulletpoints = JSON.parse(fields.bulletpoints);
                } catch (error) {
                    return res.status(500).send({ error: "Invalid bulletpoints" });
                }
            }

            const newCards = bulletpoints.map((section, index) => {
                return {
                    title: section.points,
                };
            });

            const newData = new ourProgramModel({
                title,
                image: {
                    data: imageData,
                    contentType: imageContentType
                },
                buttontitle,
                description,
                bulletpoints: newCards,
            });

            await newData.save();
            res.status(201).send({
                success: true,
                message: "Post Created Successfully",
            });
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating program",
        });
    }
};