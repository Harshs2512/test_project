import connectDB from 'db/newdb';
import courseLogoModel from "models/siteSettings/secondPage/course-logo";
const handler = (req, res) => {
    if (req.method === 'GET') {
        return getHandler(req, res);
    }
    if (req.method === 'DELETE') {
        return deleteHandler(req, res);
    }
    else {
        return res.status(400).send("Method not allow")
    }
}

const getHandler = async (req, res) => {
    await connectDB();
    try {
        const records = await courseLogoModel.findById(req.query.id).select('-course_logo');
        if (records) {
            res.status(200).json(records)
        } else {
            res.status(404).send({ message: 'No course data found' });
        };
    }
    catch (error) {
        res.status(500).send("Somthing Went Wrong")
    };
};

const deleteHandler = async (req, res) => {
    await connectDB();
    try {
        const records = await courseLogoModel.findByIdAndDelete(req.query.id);
        if (records) {
            res.status(200).json(records)
        } else {
            res.status(404).send({ message: 'No course data found' });
        };
    }
    catch (error) {
        res.status(500).send("Somthing Went Wrong")
        console.log(error)
    };
};

export default handler;