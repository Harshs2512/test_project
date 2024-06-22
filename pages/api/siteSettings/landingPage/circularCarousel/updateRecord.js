import circularCarouselModel from "models/siteSettings/landingPage/circularCarouselModel";
import connectDB from 'db/newdb';
import fs from "fs";
const formidable = require("formidable");

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req, res) => {
    if (req.method === "PUT") {
        return updatecourse(req, res);
    } else {
        return res.status(400).send({ message: "Method not allowed" });
    }
};

const updatecourse = async (req, res) => {
    const form = new formidable.IncomingForm();
    await connectDB();
    try {
        form.parse(req, async (err, fields, files) => {
            const existingData = await circularCarouselModel.findById(fields.id);
            if (!existingData) {
                return res.status(500).send({ message: "Not found" })
            }
            if (err) {
                return res.status(500).send({ error: "Error parsing form data" });
            };
            const getSingleValueFromArray = (value) => {
                if (Array.isArray(value) && value.length > 0) {
                    return value[0];
                }
                return value;
            };
            const company_logo = files.company_logo;

            if (company_logo) {
                const company_name = getSingleValueFromArray(fields.company_name);
                existingData.company_name = company_name;
                const company_logoFile = files?.company_logo[0];
                if (company_logoFile.size > 100000000) {
                    return res.status(500).send({ error: "image should be less than 10mb" });
                }
                const company_logoData = fs.readFileSync(company_logoFile.filepath);
                const company_logoContentType = company_logoFile.mimetype;
                const company_logo = {
                    data: company_logoData,
                    contentType: company_logoContentType,
                }
                existingData.company_logo = company_logo;
                await existingData.save();
                res.status(201).send({
                    message: "Blog is updated",
                    existingData
                });

            }
            else {
                const company_name = getSingleValueFromArray(fields.company_name);
                existingData.company_name = company_name;
                await existingData.save();
                res.status(201).send({
                    message: "data is updated",
                    existingData
                })
            }
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating placementStoryModel",
        });
    }
};

export default handler;