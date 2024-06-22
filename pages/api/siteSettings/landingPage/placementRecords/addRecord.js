import placementRecordsModel from "models/siteSettings/landingPage/placementRecordsModel";
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

            const company_name = getSingleValueFromArray(fields.company_name);
            const student_name = getSingleValueFromArray(fields.student_name);
            const position = getSingleValueFromArray(fields.position);
            const percentage = getSingleValueFromArray(fields.percentage);
            const placed_date = getSingleValueFromArray(fields.placed_date);
            const course = getSingleValueFromArray(fields.course);
            const Video_url = getSingleValueFromArray(fields.Video_url);
            const campus_type = getSingleValueFromArray(fields.campus_type);
            const collage_name = getSingleValueFromArray(fields.collage_name);
            const coding_number = getSingleValueFromArray(fields.coding_number);
            const selected_round = getSingleValueFromArray(fields.selected_round);
            const student_icon = files.student_icon;
            const company_logo = files.company_logo;
            // // Check if the title is a valid string

            if (typeof company_name !== "string" || company_name.trim().length === 0) {
                return res.status(500).send({ error: "Invalid company_name" });
            }
            if (typeof student_name !== "string" || student_name.trim().length === 0) {
                return res.status(500).send({ error: "Invalid company_name" });
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

            const cardData = new placementRecordsModel({
                company_name,
                student_name,
                position,
                percentage,
                placed_date,
                campus_type,
                course,
                Video_url,
                collage_name,
                coding_number,
                selected_round,
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
                message: "Placement record Created Successfully",
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