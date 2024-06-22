import connectDB from "db/newdb";
import heroSectionModel from 'models/siteSettings/thirdPage/heroSectionModel';

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
        const records = await heroSectionModel.find({ _id: req.query.id });
        if (records) {
            res.status(200).json(records)
        } else {
            res.status(404).send({ message: 'No data found' });
        };
    }
    catch (error) {
        res.status(500).send(error)
    };
};

export default handler;