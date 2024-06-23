import Post from 'models/BlogModel';
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
        const categories = await Post.find().select('-content');
        if (categories) {
            // l
            res.status(200).send(categories);
        } else {
            res.status(404).send({ message: 'No categories found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

export default handler;
