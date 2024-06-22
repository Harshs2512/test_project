import careerGoalsModel from "models/siteSettings/secondPage/careerGoalsModel";
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
    if (req.method !== 'PUT') {
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

            const id = getSingleValueFromArray(fields.id);
            const buttontitle = getSingleValueFromArray(fields.buttontitle);
            const image = files.image;

            const existingData = await careerGoalsModel.findById(id);

            if (!existingData) {
                return res.status(404).send({ error: "Data not found" });
            }

            if (typeof buttontitle !== "string" || buttontitle.trim().length === 0) {
                return res.status(400).send({ error: "Invalid buttontitle" });
            }

            if (image) {
                if (image.size > 100000000) {
                    return res
                        .status(400)
                        .send({ error: "Image should be less than 1mb" });
                }

                const imageData = fs.readFileSync(image.filepath);
                const imageContentType = image.mimetype;
                existingData.image = {
                    data: imageData,
                    contentType: imageContentType
                };
            }

            const newSteps = JSON.parse(fields.steps).map((item) => ({
                title: item.title,
                description: item.description
            }));

            existingData.buttontitle = buttontitle;
            existingData.steps = newSteps;

            await existingData.save();

            res.status(200).send({
                success: true,
                message: "Updated Successfully",
                existingData,
            });
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error: error.message || error,
            message: "Error in updating career goals",
        });
    }
}