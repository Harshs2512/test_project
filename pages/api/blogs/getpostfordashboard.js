import Post from 'models/BlogModel';
import connectDB from 'db/newdb';

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
        const blogs = await Post.find().select("-content").limit(8);
        res.status(200).json({ success: true, blogs });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

export default handler;