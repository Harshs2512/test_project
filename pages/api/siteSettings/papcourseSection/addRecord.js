import connectDB from 'db/newdb';
import fs from "fs";
import papcourseModel from "models/siteSettings/papCourseModel";
import slugify from 'slugify';
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
            console.log(fields)
            console.log(files)
            if (err) {
                return res.status(500).send({ error: "Error parsing form data" });
            }

            const getSingleValueFromArray = (value) => {
                if (Array.isArray(value) && value.length > 0) {
                    return value[0];
                }
                return value;
            };

            const course = getSingleValueFromArray(fields.course);
            const sectiontitle = getSingleValueFromArray(fields.sectiontitle);

            if (typeof sectiontitle !== "string" || sectiontitle.trim().length === 0) {
                return res.status(500).send({ error: "Invalid title" });
            }

            const coursesArray = JSON.parse(fields.courses);
            const newCards = coursesArray.map((section, index) => {
                const logoFile = files[`img_${index}`] && files[`img_${index}`][0];
                return {
                    coursetitle: section.coursetitle,
                    slug: slugify(section.coursetitle),
                    duration: section.duration,
                    internship: section.internship,
                    placement: section.placement,
                    topics: section.topics,
                    imageFile: logoFile
                        ? {
                            data: Buffer.from(fs.readFileSync(logoFile.filepath)),
                            contentType: logoFile.mimetype,
                        }
                        : null,
                };
            });

            const newData = new papcourseModel({
                course: course,
                sectiontitle: sectiontitle,
                courses: newCards
            });

            await newData.save();
            res.status(201).send({
                success: true,
                message: "Post Created Successfully",
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