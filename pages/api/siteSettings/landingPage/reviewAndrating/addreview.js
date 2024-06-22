import ReviewandRatingModel from "models/siteSettings/landingPage/ReviewandRatingModel";
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

    try {
        await connectDB()
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

            const ratings = getSingleValueFromArray(fields.ratings);
            const reviews = getSingleValueFromArray(fields.reviews);
            const student_name = getSingleValueFromArray(fields.student_name);
            const studentImage = files.studentImage;

            // // Check if the title is a valid string

            if (typeof reviews !== "string" || reviews.trim().length === 0) {
                return res.status(500).send({ error: "Invalid title" });
            }

            if (studentImage) {
                if (studentImage.size > 100000000) {
                    return res
                        .status(500)
                        .send({ error: "Thumbnail should be less than 1mb" });
                }
            }

            const student_iconData = Buffer.from(fs.readFileSync(studentImage[0].filepath));
            const student_iconContentType = studentImage[0].mimetype;

            const cardData = new ReviewandRatingModel({
                ratings,
                reviews,
                student_name,
                studentImage: {
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