import circularCarouselModel from "models/siteSettings/landingPage/circularCarouselModel";
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

            const company_name = getSingleValueFromArray(fields.company_name);
            const company_logo = files.company_logo;
            // // Check if the title is a valid string

            if (typeof company_name !== "string" || company_name.trim().length === 0) {
                return res.status(500).send({ error: "Invalid company name" });
            }

            if (company_logo) {
                if (company_logo.size > 100000000) {
                    return res
                        .status(500)
                        .send({ error: "company_logo should be less than 1mb" });
                }
            }

            const company_logoData = Buffer.from(fs.readFileSync(company_logo[0].filepath));
            const company_logoContentType = company_logo[0].mimetype;

            const cardData = new circularCarouselModel({
                company_name,
                company_logo: {
                    data: company_logoData,
                    contentType: company_logoContentType,
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