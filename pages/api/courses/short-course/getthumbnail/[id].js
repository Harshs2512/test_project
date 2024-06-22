import connectDB from 'db/newdb';
import ShortCourse from "models/ShortCoursesModel";


const getthumbnail = async (req, res) => {
    await connectDB();
    try {
        const courses = await ShortCourse.findById(req.query.id);
        if (courses && courses.image && courses.image.data) {
            res.setHeader("Content-type", courses.image.contentType);
            return res.status(200).send(courses.image.data);
        } else {
            return res.status(404).send({ message: "Thumbnail not found for this courses ID." });
        }
    } catch (error) {
        console.error("Error in getthumbnail:", error);
        return res.status(500).send({
            success: false,
            message: "Error while getting photo",
            error,
        });
    }
}

export default getthumbnail;
