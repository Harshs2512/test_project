
import CourseModel from "models/Contests/contestModel"
import connectDB from 'db/newdb'
const handler = async (req, res) => {
    if (req.method === 'GET') {
        return getHandler(req, res);
    } else {
        return res.status(400).send({ message: 'Method not allowed' });
    }
};

const getHandler = async (req, res) => {
    await connectDB();
    try {
        const recentCourses = await CourseModel.find().sort({ createdAt: -1 }).select('-image').select('-contest_description').select('-questionsList').limit(5);
        res.status(200).json(recentCourses);
    } catch (error) {
        console.log(error, "fetching Order Data Error");
        res.status(500).json({ error: "An error occurred while fetching order data" });
    }
};

export default handler;
