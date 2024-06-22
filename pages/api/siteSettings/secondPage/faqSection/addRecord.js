import faqwithImageModel from "models/siteSettings/secondPage/faqwithImageMode";
import connectDB from 'db/newdb';
import fs from "fs";
const formidable = require("formidable");

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(405).end();
    }

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

            const question = getSingleValueFromArray(fields.question);
            const answer = getSingleValueFromArray(fields.answer);
            const imageone = files.imageone;
            const imagesecond = files.imagesecond;

            // // Check if the title is a valid string

            if (typeof question !== "string" || question.trim().length === 0) {
                return res.status(500).send({ error: "Please enter question" });
            };

            if (typeof answer !== "string" || answer.trim().length === 0) {
                return res.status(500).send({ error: "Please enter answer" });
            };
            
            if (imageone) {
                if (imageone.size > 100000000) {
                    return res
                        .status(500)
                        .send({ error: "company_logo should be less than 1mb" });
                }
            }
            if (imagesecond) {
                if (imagesecond.size > 100000000) {
                    return res
                        .status(500)
                        .send({ error: "company_logo should be less than 1mb" });
                }
            }

            const imageoneData = Buffer.from(fs.readFileSync(imageone[0].filepath));
            const imageoneContentType = imageone[0].mimetype;
            const imagesecondData = Buffer.from(fs.readFileSync(imagesecond[0].filepath));
            const imagesecondContentType = imagesecond[0].mimetype;

            const cardData = new faqwithImageModel({
                question,
                answer,
                imageone: {
                    data: imageoneData,
                    contentType: imageoneContentType,
                },
                imagesecond: {
                    data: imagesecondData,
                    contentType: imagesecondContentType,
                },
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