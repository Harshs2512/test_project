import PostCategory from "models/PostCategoryModel";
import connectDB from "db/newdb";

const handler = async (req, res) => {
    if (req.method === "GET") {
        return getHandler(req, res);
    } else {
        return res.status(400).send({ message: "Method not allowed" });
    }
};

const getHandler = async (req, res) => {
    await connectDB();
    try {
        const categories = await PostCategory.find();
        res.status(200).json({
            success: true,
            categories,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};

export default handler;