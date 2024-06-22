import carouselButtonModel from "models/siteSettings/landingPage/carouselButtonModel";
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

            const id = getSingleValueFromArray(fields.id);
            const title = getSingleValueFromArray(fields.title);
            const existingData = await carouselButtonModel.findById(id);

            if (!existingData) {
                return res.status(500).send({ error: "Carousel Button data not found" });
            }

            const cardsArray = JSON.parse(fields.cards);
            const newCards = cardsArray.map((cardItem, cardIndex) => {
                const logoFile = files[`img_${cardIndex}`] && files[`img_${cardIndex}`][0];
                return {
                    cardtitle: cardItem.cardtitle,
                    description: cardItem.description,
                    img: logoFile
                        ? {
                            data: Buffer.from(fs.readFileSync(logoFile.filepath)),
                            contentType: logoFile.mimetype,
                        }
                        : null,
                };
            });
            existingData.title = title;
            existingData.cards = newCards;
            await existingData.save();

            res.status(201).send({
                success: true,
                message: "Carousel Button Updated Successfully",
                existingData,
            });
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating carousel button",
        });
    }
}