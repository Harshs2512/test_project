import CourseModel from "models/CourseModel";
import connectDB from 'db/newdb';

const getallcourse = async (req, res) => {
    await connectDB();
    try {
        let query = {};
        if (req.query.category) {
            query = { course_category: req.query.category };
        }
        const courses = await CourseModel.find(query).select("-media"); 
        res.status(200).json({ success: true, courses });
    } catch (error) {
        console.log("Error fetching courses:", error);
        res.status(500).json({ error: "An error occurred while fetching courses data" });
    }
};

  
export default getallcourse;
