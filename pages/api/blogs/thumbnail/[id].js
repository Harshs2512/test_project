import connectDB from 'db/newdb';
import Blog from "models/BlogModel";

const getpostthumbnail = async (req, res) => {
    await connectDB();
    try {
        const response = await Blog.findById(req.query.id).select("thumbnail");
        if (response) {
            res.setHeader("Content-type", response.thumbnail.contentType);
            return res.status(200).send(response.thumbnail.data);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr while getting photo",
            error,
        });
    }
}

export default getpostthumbnail