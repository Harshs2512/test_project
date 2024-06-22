import categoryModel from "models/siteSettings/megaMenu/categoryModel";
import slugify from 'slugify'
import connectDB from 'db/newdb';
import { toast } from "react-toastify";

const addcategory = async (req, res) => {
    await connectDB();
    try {
        const category_data = await categoryModel.find().maxTimeMS(30000);
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
                const cat_data = await new categoryModel({
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
            const category = await categoryModel.create({
                title: req.body,
                slug: slugify(req.body),
            });
            res.status(201).json({
                success: true,
                category,
            });
            const cat_data = await category.save();
            res
                .status(400)
                .send({ success: true, message: "Category Data", data: cat_data });
            if (res.status === 201) {
                toast.success("Created")
            }
        }
    } catch (error) {
        res.status(400).send({ success: false, msg: error.stack });
    }
}

export default addcategory