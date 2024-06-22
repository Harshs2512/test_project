import BlogModel from "models/BlogModel";
import connectDB from 'db/newdb';
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
    const post = await BlogModel.findByIdAndDelete(req.query.id);
    if (post) {
        return res.send({ message: "Post deleted successfully" });
    } else {
        return res.status(404).send({ message: "Post not found" });
    }
};

const getHandler = async (req, res) => {
    await connectDB();
    const post = await BlogModel.findById(req.query.id).select('-thumbnail');
    res.status(200).send(post);
};

const putHandler = async (req, res) => {
    await connectDB();
    const post = await BlogModel.findById(req.query.id);
    if (post) {
        post.title = req.body.title;
        post.status = req.body.status;
        post.slug = slugify(req.body.title);
        await post.save();
        return res.send({ message: "post updated successfully" });
    } else {
        return res.status(404).send({ message: "post not found" });
    }
};

export default handler;