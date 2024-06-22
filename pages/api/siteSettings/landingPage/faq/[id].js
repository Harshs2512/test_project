import connectDB from 'db/newdb';
import faqModel from 'models/siteSettings/landingPage/faqModel';

const handler = (req, res) => {
    if (req.method === 'GET') {
        return getHandler(req, res);
    }
    if (req.method === 'POST') {
        return postHandler(req, res);
    }
    if (req.method === 'DELETE') {
        return deleteHandler(req, res);
    }
    if (req.method === 'PUT') {
        return putHandler(req, res);
    }
    else {
        return res.status(400).send("Method not allow")
    }
}

const getHandler = async (req, res) => {
    await connectDB();
    try {
        const records = await faqModel.findById(req.query.id);
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

const deleteHandler = async (req, res) => {
    await connectDB();
    try {
        const records = await faqModel.findByIdAndDelete(req.query.id);
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

const putHandler = async (req, res) => {
    await connectDB();
    try {
        const existingData = await faqModel.findById(req.query.id);
        if (!existingData) {
            return res.status(500).send({ message: 'Info Not Found' })
        }
        existingData.question = req.body.question;
        existingData.answer = req.body.answer;
        await existingData.save();
        res.status(201).json({
            message: "Updated success fully",
            existingData
        })
    }
    catch (error) {
        res.status(500).send("Somthing Went Wrong")
    };
};

const postHandler = async (req, res) => {
    await connectDB();
    try {
        const records = await faqModel.findByIdAndDelete(req.query.id);
        if (records) {
            res.status(200).json(records)
        } else {
            res.status(500).send({ message: 'No categories found' });
        };
    }
    catch (error) {
        res.status(500).send("Somthing Went Wrong")
    };
};

export default handler;