import connectDB from 'db/newdb';
import Course from "models/CourseModel";

const getthumbnail = async (req, res) => {
    await connectDB();
    try {
        const course = await Course.findById(req?.query?.id);
        if (course?.media?.thumbnail?.data) {
            res.setHeader("Content-type", course?.media?.thumbnail?.contentType);
            return res.status(200).send(course?.media?.thumbnail?.data);
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

export default getthumbnail