import PostCategory from "models/PostCategoryModel";
import connectDB from "db/newdb";
import slugify from "slugify";

const handler = async (req, res) => {
    // const session = await getSession({ req });
    // if (!session || (session && !session.user.isAdmin)) {
    //     res.status(401).send("Admin signin required");
    // }
    if (req.method === "GET") {
        return getHandler(req, res);
    } else if (req.method === "PUT") {
        return putHandler(req, res);
    } else if (req.method === "DELETE") {
        return deleteHandler(req, res);
    } else {
        return res.status(400).send({ message: "Method not allowed" });
    }
};

const deleteHandler = async (req, res) => {
    await connectDB();
    try {
        const category = await PostCategory.findByIdAndDelete(req.query.id);
        if (category) {
            return res.send({ message: "course deleted successfully" });
        } else {
            return res.status(404).send({ message: "course not found" });
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "somthing went wrong" })
    }

};

const getHandler = async (req, res) => {
    await connectDB();
    try {
        const category = await PostCategory.findById(req.query.id);
        res.status(200).send(category);
    }
    catch (error) {
        res.status(500).send({ message: "somthing went wrong" })
    }
};

const putHandler = async (req, res) => {
    await connectDB();
    const category = await PostCategory.findById(req.query.id);
    if (category) {
        category.title = req.body.title;
        category.status = req.body.status;
        category.slug = slugify(req.body.title);
        await category.save();
        return res.send({ message: "Category updated successfully" });
    } else {
        return res.status(404).send({ message: "Category not found" });
    }
};

export default handler;