import faqwithImageMode from "models/siteSettings/secondPage/faqwithImageMode";
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
    await connectDB();
    const form = new formidable.IncomingForm();
    try {
        form.parse(req, async (err, fields, files) => {
            const existingData = await faqwithImageMode.findById(fields.id);
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

            const imageone = files.imageone;
            const imagesecond = files.imagesecond;
            const question = getSingleValueFromArray(fields.question);
            const answer = getSingleValueFromArray(fields.answer);
            existingData.question = question;
            existingData.answer = answer;

            if (imageone) {
                const imageoneFile = files?.imageone[0];
                if (imageoneFile.size > 100000000) {
                    return res.status(500).send({ error: "image should be less than 10mb" });
                }
                const imageoneData = fs.readFileSync(imageoneFile.filepath);
                const imageoneContentType = imageoneFile.mimetype;
                const imageone = {
                    data: imageoneData,
                    contentType: imageoneContentType,
                }
                existingData.imageone = imageone;
            }
            
            if (imagesecond) {
                const imagesecondFile = files?.imagesecond[0];
                if (imagesecondFile.size > 100000000) {
                    return res.status(500).send({ error: "image should be less than 10mb" });
                }
                const imagesecondData = fs.readFileSync(imagesecondFile.filepath);
                const imagesecondContentType = imagesecondFile.mimetype;
                const imagesecond = {
                    data: imagesecondData,
                    contentType: imagesecondContentType,
                }
                existingData.imagesecond = imagesecond;
            }

            await existingData.save();
            res.status(201).send({
                message: "Data is updated",
                existingData
            });
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