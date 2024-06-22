import ourofflineprogramSectionModel from "models/siteSettings/secondPage/ourofflineprogramSectionModel";
import fs from "fs";
import connectDB from "db/newdb";
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

    await connectDB()
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

            const course = getSingleValueFromArray(fields.course);
            const image = files.image;

            // // Check if the title is a valid string

            if (typeof course !== "string" || course.trim().length === 0) {
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

            const cardData = new ourofflineprogramSectionModel({
                course,
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