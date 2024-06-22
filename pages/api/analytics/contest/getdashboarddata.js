import contestModel from 'models/Contests/contestModel';
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
        const contests = await contestModel.find().select('-image').select('-questionsList').select('-contest_description');
        res.status(200).json({ success: true, contests });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

export default handler;