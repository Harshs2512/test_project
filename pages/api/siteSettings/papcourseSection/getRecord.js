import connectDB from "db/newdb";
import papCourseModel from 'models/siteSettings/papCourseModel';

const handler = (req, res) => {
    if (req.method === 'GET') {
        return getHandler(req, res);
    }
    else {
        return res.status(400).send("Method not allow")
    }
}

const getHandler = async (req, res) => {
    await connectDB();
    try {
        const records = await papCourseModel.find().select('-courses.imageFile');
        if (records) {
            res.status(200).json(records)
        } else {
            res.status(404).send({ message: 'No data found' });
        };
    }
    catch (error) {
        res.status(500).send("Somthing Went Wrong")
    };
};

export default handler;