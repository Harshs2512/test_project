import carouselButtonModel from "models/siteSettings/landingPage/carouselButtonModel";
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
            const id = getSingleValueFromArray(fields.id)

            if (typeof title !== "string" || title.trim().length === 0) {
                return res.status(500).send({ error: "Invalid title" });
            }

            const cardsArray = JSON.parse(fields.cards);
            const newCards = cardsArray.map((section, index) => {
                const logoFile = files[`img_${index}`] && files[`img_${index}`][0];
                return {
                    cardtitle: section.cardtitle,
                    description: section.description,
                    img: logoFile
                        ? {
                            data: Buffer.from(fs.readFileSync(logoFile.filepath)),
                            contentType: logoFile.mimetype,
                        }
                        : null,
                };
            });

            const newData = new carouselButtonModel({
                title: title,
                cards: newCards
            });

            await newData.save();
            res.status(201).send({
                success: true,
                message: "Post Created Successfully",
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