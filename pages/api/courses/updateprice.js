import connectDB from 'db/newdb';
import Course from "models/CourseModel";

const updateprice = async (req, res) => {
    await connectDB();
    try {
        const { currentprice, actualprice, courseId } = req.body
        const existingCourse = await Course.findById(courseId);
        if (!existingCourse) {
            return res.status(404).send({ error: "Course not found" });
        }
        existingCourse.currentprice = currentprice;
        existingCourse.actualprice = actualprice;
        await existingCourse.save();
        res.status(200).send({
            success: true,
            message: "Course Updated Successfully",
            updatedCourse: existingCourse,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating course",
        });
    }
};
export default updateprice