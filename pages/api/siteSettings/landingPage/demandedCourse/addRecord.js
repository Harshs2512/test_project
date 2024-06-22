import demandedCourse from "models/siteSettings/landingPage/demandedCourseModel";
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

            const routelink = getSingleValueFromArray(fields.routelink);
            const thumbnail = files.thumbnail;
            // // Check if the title is a valid string

            if (typeof routelink !== "string" || routelink.trim().length === 0) {
                return res.status(500).send({ error: "Invalid company name" });
            }

            if (thumbnail) {
                if (thumbnail.size > 100000000) {
                    return res
                        .status(500)
                        .send({ error: "company_logo should be less than 1mb" });
                }
            }

            const thumbnailData = Buffer.from(fs.readFileSync(thumbnail[0].filepath));
            const thumbnailContentType = thumbnail[0].mimetype;

            const cardData = new demandedCourse({
                routelink,
                thumbnail: {
                    data: thumbnailData,
                    contentType: thumbnailContentType,
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