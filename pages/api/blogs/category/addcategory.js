import connectDB from 'db/newdb';
import PostCategory from "models/PostCategoryModel"
import slugify from 'slugify'
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';



export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
        res.status(401).json({
            success: false,
            error: "Unauthorized",
        });
        return;
    }
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }
    await connectDB();
    try {
        const category_data = await PostCategory.find({});
        // Set the timeout to 30 seconds
        if (category_data.length > 0) {

            let checking = false;
            for (let i = 0; i < category_data.length; i++) {
                if (
                    category_data[i]["title"].toLowerCase() === req.body.title.toLowerCase()) {
                    checking = true;
                    break;
                }
            }
            if (checking === false) {
                const cat_data = await new PostCategory({
                    title: req.body.title,
                    slug: slugify(req.body.title),
                }).save();
                res.status(201).send({ success: true, message: "Successfully Added (" + req.body.title + ") Ctegory", data: cat_data });

            } else {
                res.status(400).send({
                    success: false,
                    message: "this category(" + req.body.title + ") is already exists",
                });
            }
        } else {
            const category = await PostCategory.create({
                title: req.body.title,
                slug: slugify(req.body.title)
            });
            const cat_data = await category.save();
            res.status(201).json({
                success: true,
                message: "Category Data",
                data: cat_data,
            });
        }
        //category find end code
    } catch (error) {
        res.status(400).send({ success: false, msg: error.stack });
    }
}
