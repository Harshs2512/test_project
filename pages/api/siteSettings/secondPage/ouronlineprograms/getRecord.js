import connectDB from 'db/newdb';
import ouronlineprogramSectionModel from 'models/siteSettings/secondPage/ouronlineprogramSectionModel';

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
        const records = await ouronlineprogramSectionModel.find().select("-image");
        if (records) {
            res.status(200).json(records)
        } else {
            res.status(404).send({ message: 'No data found' });
        };
    }
    catch (error) {
        console.log(error)
        res.status(500).send("Somthing Went Wrong!")
    };
};

export default handler;