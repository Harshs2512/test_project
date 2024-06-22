import BlogModel from "models/BlogModel";
import slugify from "slugify";
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
        const existingBlog = await BlogModel.findById(req.query.id);
        if (!existingBlog) {
            return res.status(500).send({ message: 'Course Not Found' })
        }
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).send({ error: "Error parsing form data" });
            };
            const getSingleValueFromArray = (value) => {
                if (Array.isArray(value) && value.length > 0) {
                    return value[0];
                }
                return value;
            };
            const title = getSingleValueFromArray(fields.title);
            const description = getSingleValueFromArray(fields.description);
            const content = getSingleValueFromArray(fields.content);
            const postcategory = getSingleValueFromArray(fields.postcategory);
            const slug = getSingleValueFromArray(fields.slug);
            const thumbnail = files.thumbnail;
            if (thumbnail) {
                const thumbnailFile = files.thumbnail[0];
                if (thumbnailFile.size > 10000000) {
                    return res.status(500).send({ error: "Thumbnail should be less than 1mb" });
                }
                const thumbnailData = fs.readFileSync(thumbnailFile.filepath);
                const thumbnailContentType = thumbnailFile.mimetype;
                const thumbnail = {
                    data: thumbnailData,
                    contentType: thumbnailContentType,
                }
                existingBlog.thumbnail = thumbnail;
            }
            existingBlog.title = title;
            existingBlog.slug = slugify(slug);
            existingBlog.description = description;
            existingBlog.content = content;
            existingBlog.postcategory = postcategory;
            await existingBlog.save();
            res.status(201).send({
                message: "Blog is updated",
                success: true
            })
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating BlogModel",
        });
    }
};

export default handler;