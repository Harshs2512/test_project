import coursePageModel from "models/siteSettings/megaMenu/coursePageModel";
import connectDB from 'db/newdb';
import fs from "fs";
import slugify from "slugify";
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

            const course_name = getSingleValueFromArray(fields.course_name);
            const category = getSingleValueFromArray(fields.category);
            const sectiontitle = getSingleValueFromArray(fields.section_title);
            const typedtitle_first = getSingleValueFromArray(fields.typedtitle_one);
            const typedtitle_second = getSingleValueFromArray(fields.typedtitle_second);
            const typedtitle_third = getSingleValueFromArray(fields.typedtitle_third);
            const slug = slugify(course_name);
            const student_image = files.student_image;
            const thumbnail = files.thumbnail;
            // Check if the title is a valid string

            if (typeof course_name !== "string" || course_name.trim().length === 0) {
                return res.status(500).send({ error: "Invalid course name" });
            }
            if (typeof sectiontitle !== "string" || sectiontitle.trim().length === 0) {
                return res.status(500).send({ error: "Invalid sectio title" });
            }
            if (typeof typedtitle_first !== "string" || typedtitle_first.trim().length === 0) {
                return res.status(500).send({ error: "Invalid typedtitle first" });
            }
            if (typeof typedtitle_second !== "string" || typedtitle_second.trim().length === 0) {
                return res.status(500).send({ error: "Invalid typedtitle second" });
            }
            if (typeof typedtitle_third !== "string" || typedtitle_third.trim().length === 0) {
                return res.status(500).send({ error: "Invalid typedtitle third" });
            }

            if (student_image) {
                if (student_image.size > 100000000) {
                    return res
                        .status(500)
                        .send({ error: "company_logo should be less than 1mb" });
                }
            }

            if (thumbnail) {
                if (thumbnail.size > 100000000) {
                    return res
                        .status(500)
                        .send({ error: "company_logo should be less than 1mb" });
                }
            }

            const student_imageoData = Buffer.from(fs.readFileSync(student_image[0].filepath));
            const student_imageContentType = student_image[0].mimetype;
            const thumbnailData = Buffer.from(fs.readFileSync(thumbnail[0].filepath));
            const thumbnailContentType = thumbnail[0].mimetype;

            const cardData = new coursePageModel({
                course_name,
                slug,
                typedtitle_first,
                typedtitle_second,
                typedtitle_third,
                sectiontitle,
                category,
                student_image: {
                    data: student_imageoData,
                    contentType: student_imageContentType,
                },
                thumbnail: {
                    data: thumbnailData,
                    contentType: thumbnailContentType,
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