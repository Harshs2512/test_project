import Course from "models/CourseModel";
import Order from 'models/OrderModel';
import slugify from "slugify";
import connectDB from 'db/newdb';
import fs from "fs";
import { getSession } from "next-auth/react";
const formidable = require("formidable");
export const config = {
    api: {
        bodyParser: false,
    },
};
const handler = async (req, res) => {
    if (req.method === "GET") {
        return getAllPurchaseCourse(req, res);
    } else if (req.method === "PUT") {
        return updatecourse(req, res);
    } else if (req.method === "POST") {
        return addcourse(req, res);
    } else {
        return res.status(400).send({ message: "Method not allowed" });
    }
};
const addcourse = async (req, res) => {
    await connectDB();
    const session = await getSession({ req })
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
            const course_title = getSingleValueFromArray(fields.course_title);
            const level = getSingleValueFromArray(fields.level);
            const description = getSingleValueFromArray(fields.description);
            const is_published = getSingleValueFromArray(fields.is_published);
            const created_by = session.user._id
            const media = fields.media;
            const section = fields.section;
            const requirment = fields.requirment.join(', ');
            const thumbnail = files.thumbnail;
            if (typeof course_title !== "string" || course_title.trim().length === 0) {
                return res.status(500).send({ error: "Invalid course_Title" });
            }
            if (thumbnail) {
                if (thumbnail.size > 10000000) {
                    return res
                        .status(500)
                        .send({ error: "Thumbnail should be less than 1mb" });
                }
            }
            const thumbnailData = fs.readFileSync(thumbnail[0].filepath);
            const thumbnailContentType = thumbnail[0].mimetype;
            const courses = new Course({
                course_title,
                course_category: fields.course_category[0],
                level,
                description,
                media: {
                    thumbnail: {
                        data: thumbnailData,
                        contentType: thumbnailContentType,
                    },
                    url: JSON.parse(fields.media[0]).url,
                },
                section: JSON.parse(fields.section[0]).map(section => ({
                    section_name: section.section_name,
                    lecture: section.lecture.map(lecture => ({
                        lecture_name: lecture.lecture_name,
                        videos_details: {
                            video: lecture.videos_details.video,
                            description: lecture.videos_details.description,
                        },
                    })),
                })),
                created_by,
                requirment,
                slug: slugify(course_title),
                is_published,
            });
            await courses.save();
            res.status(201).send({
                success: true,
                message: "Course Created Successfully",
                courses,
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating course",
        });
    }
};

const getAllPurchaseCourse = async (req, res) => {
    await connectDB();
    try {
        const userId = req?.query?.userId;
        const orders = await Order.find({
            user_detail: userId,
            order_status: 'paid'
        }).select('purchase_item');
        if (!orders || orders.length === 0) {
            return res.status(404).json({ error: "No purchase items found for the user" });
        }
        const filteredPurchaseItems = orders.map(order => order.purchase_item);
        const purchaseItems = filteredPurchaseItems
            .map(item => item.filter(subItem => subItem.course_title))
            .filter(item => item.length > 0);
        res.status(200).json({ success: true, purchaseItems });
    } catch (error) {
        console.error("Error fetching purchase items:", error);
        res.status(500).json({ error: "An error occurred while fetching purchase items" });
    }
};
const updatecourse = async (req, res) => {
    await connectDB();
    const id = req.query.id
    const form = new formidable.IncomingForm();
    try {
        const existingCourse = await Course.findById(id);
        if (!existingCourse) {
            return res.status(404).send({ error: "Course not found" });
        }
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
            const thumbnail = files.course_thumbnail
            if (thumbnail) {
                const course_title = getSingleValueFromArray(fields.course_title);
                const level = getSingleValueFromArray(fields.level);
                const description = getSingleValueFromArray(fields.description);
                const is_published = getSingleValueFromArray(fields.is_published);
                const requirment = fields.requirment.join(', ');
                const thumbnailFile = files.course_thumbnail[0];
                if (thumbnailFile.size > 10000000) {
                    return res.status(500).send({ error: "Thumbnail should be less than 1mb" });
                }
                const thumbnailData = fs.readFileSync(thumbnailFile.filepath);
                const thumbnailContentType = thumbnailFile.mimetype;
                const media = {
                    thumbnail: {
                        data: thumbnailData,
                        contentType: thumbnailContentType,
                    },
                    url: JSON.parse(fields.media[0]).url,
                }
                const slug = slugify(course_title);
                existingCourse.course_title = course_title;
                existingCourse.slug = slug;
                existingCourse.level = level;
                existingCourse.description = description;
                existingCourse.requirment = requirment;
                existingCourse.is_published = is_published;
                existingCourse.media = media;
                await existingCourse.save();
                res.status(201).send({
                    success: true,
                    message: "Course Created Successfully",
                    existingCourse,
                });
            }
            else {
                const course_title = getSingleValueFromArray(fields.course_title);
                const level = getSingleValueFromArray(fields.level);
                const description = getSingleValueFromArray(fields.description);
                const is_published = getSingleValueFromArray(fields.is_published);
                const requirment = fields.requirment.join(', ');
                const slug = slugify(course_title);
                const section = {
                    section: JSON.parse(fields.section[0]).map(section => ({
                        section_name: section.section_name,
                        lecture: section.lecture.map(lecture => ({
                            lecture_name: lecture.lecture_name,
                            videos_details: {
                                video: lecture.videos_details.video,
                                description: lecture.videos_details.description,
                            },
                            isApproved: lecture.isApproved
                        })),
                    }))
                };
                existingCourse.course_title = course_title;
                existingCourse.slug = slug;
                existingCourse.level = level;
                existingCourse.description = description;
                existingCourse.requirment = requirment;
                existingCourse.is_published = is_published;
                existingCourse.section = section.section;
                await existingCourse.save();
                res.status(201).send({
                    success: true,
                    message: "Course Created Successfully",
                    existingCourse,
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating course",
        });
    }
};

export default handler;