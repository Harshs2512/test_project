import db from "db/db";
import QuizModel from "models/QuizModel";

const getthumbnail = async (req, res) => {
    
    try {
        await db.connect();
        const blog = await QuizModel.findById(req.query.id);
        if (blog.image) {
            res.setHeader("Content-type", blog.image.contentType);
            return res.status(200).send(blog.image.data);
        }
    } 
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Erorr while getting photo",
            error,
        });
    }
    await db.disconnect();
}

export default getthumbnail