import connectDB from 'db/newdb';
import careerGoalsModel from 'models/siteSettings/secondPage/careerGoalsModel';
const formidable = require("formidable");
import fs from 'fs';
import path from 'path';

// Disable body parsing, so we can use formidable for file uploads
export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req, res) => {
    await connectDB();
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

            const { steps } = fields;
            const { image } = files;
            const buttontitle = getSingleValueFromArray(fields.buttontitle);
            try {
                if (image) {
                    if (image.size > 100000000) {
                        return res
                            .status(500)
                            .send({ error: "Photo should be less than 1mb" });
                    }
                }
                let newImage
                if (image[0]) {
                    const imageData = Buffer.from(fs.readFileSync(image[0].filepath));
                    const imageContentType = image[0].mimetype;
                    newImage =
                    {
                        data: imageData,
                        contentType: imageContentType,
                    }
                }
                else {
                    return res
                        .status(500)
                        .send({ error: "Image is requied" });
                }
                const newRecord = new careerGoalsModel(
                    {
                        buttontitle,
                        steps: JSON.parse(steps),
                        image: newImage
                    });

                await newRecord.save();
                res.status(201).json({ message: 'Added successfully' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Something went wrong' });
            }
        });
    } catch (error) {
        res.status(400).json({ error: 'Method not allowed' });
    }
};

export default handler;
