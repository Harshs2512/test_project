import OurTeamSchemaModel from "models/siteSettings/about/ourteamModel";
import connectDB from 'db/newdb';
import fs from "fs";
const formidable = require("formidable");

export const config = {
    api: {
        bodyParser: false,
    },
};
const handler = (req, res) => {
    if(req.method === 'POST'){
        return addHandler(req,res);
    }else if(req.method === 'GET'){
        return getHandler(req, res);
    }
    if(req.method === 'DELETE'){
        return deleteHandler(req, res);
    }
}

const getHandler = async (req, res) => {
    await connectDB();
    try {
        const records = await OurTeamSchemaModel.find().select("-image");
        if (records) {
            res.status(200).json(records)
        } else {
            res.status(404).send({ message: 'No categories found' });
        };
    }
    catch (error) {
        res.status(500).send("Somthing Went Wrong")
    };
};
const addHandler = async (req, res) => {
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
            const name = getSingleValueFromArray(fields.name);
            const position = getSingleValueFromArray(fields.position);
            const image = files.image;
            if (typeof name !== "string" || name.trim().length === 0) {
                return res.status(500).send({ error: "Invalid company_name" });
            }
            if (image) {
                if (image.size > 100000000) {
                    return res
                        .status(500)
                        .send({ error: "Thumbnail should be less than 1mb" });
                }
            }
            const imageData = Buffer.from(fs.readFileSync(image[0].filepath));
            const imageContentType = image[0].mimetype;
            const teamData = new OurTeamSchemaModel({
                name,
                position,
                image: {
                    data: imageData,
                    contentType: imageContentType,
                }
            });
            await teamData.save();
            res.status(201).send({
                success: true,
                message: "Post Created Successfully",
                teamData,
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
const deleteHandler = async (req, res) => {
    await connectDB();
    try {
        const records = await OurTeamSchemaModel.findByIdAndDelete();
        if (records) {
            res.status(200).json(records)
        } else {
            res.status(404).send({ message: 'No categories found' });
        };
    }
    catch (error) {
        res.status(500).send("Somthing Went Wrong")
    };
};
export default handler;