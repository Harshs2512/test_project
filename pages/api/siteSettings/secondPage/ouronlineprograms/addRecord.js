import ouronlineprogramSectionModel from "models/siteSettings/secondPage/ouronlineprogramSectionModel";
import connectDB from "db/newdb";
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

            const category = getSingleValueFromArray(fields.category);
            const image = files.image;

            // // Check if the title is a valid string

            if (typeof category !== "string" || category.trim().length === 0) {
                return res.status(500).send({ error: "Please enter category" });
            };
            
            if (image) {
                if (image.size > 100000000) {
                    return res
                        .status(500)
                        .send({ error: "company_logo should be less than 1mb" });
                }
            };

            const imageData = Buffer.from(fs.readFileSync(image[0].filepath));
            const imageContentType = image[0].mimetype;

            const cardData = new ouronlineprogramSectionModel({
                category,
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
    }
    catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating course",
        });
    }
}