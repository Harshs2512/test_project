import Category from "models/CategoryModel";
import slugify from 'slugify'
import connectDB from 'db/newdb';

const addcategories = async (req, res) => {
    await connectDB();
    try {
        const category_data = await Category.find().maxTimeMS(30000); // Set the timeout to 30 seconds
        if (category_data.length > 0) {
            let checking = false;
            for (let i = 0; i < category_data.length; i++) {
                if (
                    category_data[i]["catName"].toLowerCase() === req.body.catName.toLowerCase()) {
                    checking = true;
                    break;
                }
            }
            if (checking === false) {
                const cat_data = await new Category({
                    catName: req.body.catName,
                    slug: slugify(req.body.catName),
                }).save();
                res.status(200).send({ success: true, message: "Successfully Added (" + req.body.catName + ") Ctegory", data: cat_data });
            } else {
                res.status(400).send({
                    success: false,
                    message: "this category(" + req.body.catName + ") is already exists",
                });
            }
        } else {
            const category = await Category.create(req.body);
            res.status(201).json({
                success: true,
                category,
            });
            const cat_data = await category.save();
            res
                .status(400)
                .send({ success: true, message: "Category Data", data: cat_data });
        }
        //category find end code
    } catch (error) {
        res.status(400).send({ success: false, msg: error.stack });
    }
}

export default addcategories