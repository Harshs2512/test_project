import MockModel from 'models/QuizModel';
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
        const mocks = await MockModel.find().select("-questions_list").select("-image");
        res.status(200).json({ success: true, mocks });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

export default handler;