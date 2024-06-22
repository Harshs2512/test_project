import Blog from "models/BlogModel"
import slugify from "slugify";
import connectDB from 'db/newdb';
import fs from "fs";
const formidable = require("formidable");
import cloudinary from "utils/cloudinary";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    await connectDB();

    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Error parsing form data:', err);
            return res.status(500).send({ error: 'Error parsing form data' });
        }

        const getSingleValueFromArray = (value) => {
            if (Array.isArray(value) && value.length > 0) {
                return value[0];
            }
            return value;
        };

        const title = getSingleValueFromArray(fields.title);
        const description = getSingleValueFromArray(fields.description);
        const slug = getSingleValueFromArray(fields.slug);
        const metatags = fields.metatags;
        const thumbnail = files.thumbnail;

        if (!thumbnail) {
            return res.status(500).send({ error: "Thumbnail is Required" });
        }

        if (thumbnail.size > 10000000) {
            return res.status(500).send({ error: "Thumbnail should be less than 10MB" });
        }

        if (typeof title !== "string" || title.trim().length === 0) {
            return res.status(500).send({ error: "Invalid Title" });
        }

        try {
            const filePath = thumbnail[0].filepath;
            const fileStream = fs.createReadStream(filePath);

            const cloudinaryUploadStream = cloudinary.uploader.upload_stream(
                { upload_preset: 'gas10okj' },
                async (error, result) => {
                    if (error) {
                        console.error('Error uploading to Cloudinary:', error);
                        return res.status(500).send({
                            success: false,
                            message: 'Error in uploading to Cloudinary',
                            error: error,
                        });
                    } else {
                        const thumbnailURL = result.secure_url;

                        const blogsdata = new Blog({
                            title,
                            slug: slugify(title, { lower: true }), // use slugify for creating the slug
                            description,
                            metatags,
                            postcategory: fields.postcategory,
                            content: fields.content.join(""),
                            thumbnail: thumbnailURL, // store the URL instead of Buffer
                        });

                        await blogsdata.save();

                        res.status(201).send({
                            success: true,
                            message: "Post Created Successfully",
                            blogsdata
                        });
                    }
                }
            );

            fileStream.pipe(cloudinaryUploadStream);
        } catch (uploadError) {
            console.error('Error uploading to Cloudinary:', uploadError);
            res.status(500).send({
                success: false,
                message: 'Error in uploading to Cloudinary',
                error: uploadError,
            });
        }
    });
}