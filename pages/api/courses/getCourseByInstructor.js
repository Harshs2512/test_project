import Course from "models/CourseModel";
import connectDB from 'db/newdb';

const CourseByInstructor = async (req, res) => {
    await connectDB();
    try {
        const instructorId = req?.query?.userId;
        const courses = await Course.find({ created_by: instructorId });
        res.status(200).json({ success: true, courses });
    } catch (err) {
        console.log(err);
    }
}

export default CourseByInstructor;