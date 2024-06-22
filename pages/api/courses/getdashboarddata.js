import CourseModel from 'models/CourseModel';
import connectDB from "db/newdb";


const handler = async (req, res) => {
    if (req.method === 'GET') {
        return getHandler(req, res);
    }
    else {
        return res.status(400).send({ message: 'Method not allowed' });
    }
};

const getHandler = async (req, res) => {
    await connectDB();
    try {
        const courses = await CourseModel.find().select("-media").select("-section").select("-description").limit(8);
        res.status(200).json({ success: true, courses });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

export default handler;