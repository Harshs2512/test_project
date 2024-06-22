import connectDB from 'db/newdb';
import placementRecordsModel from 'models/siteSettings/landingPage/placementRecordsModel';

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
        const records = await placementRecordsModel.findById(req.query.id).select('-student_icon').select('-company_logo');
        if (records) {
            res.status(200).json(records)
        } else {
            res.status(404).send({ message: 'No categories found' });
        };
    }
    catch (error) {
        res.status(500).send("Somthing Went Wrong")
    };
};

const deleteHandler = async (req, res) => {
    await connectDB();
    try {
        const records = await placementRecordsModel.findByIdAndDelete(req.query.id);
        if (records) {
            res.status(200).json(records)
        } else {
            res.status(404).send({ message: 'No categories found' });
        };
    }
    catch (error) {
        res.status(500).send("Somthing Went Wrong")
    };
};

export default handler;