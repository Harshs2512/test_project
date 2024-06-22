import connectDB from 'db/newdb';
import ReviewandRatingModel from 'models/siteSettings/landingPage/ReviewandRatingModel';

const handler = (req, res) => {
    if (req.method === 'GET') {
        return getHandler(req, res);
    }
    if (req.method === 'DELETE') {
        return deleteHandler(req, res);
    }
    if (req.method === 'PUT') {
        return updateHandler(req, res);
    }
    else {
        return res.status(400).send("Method not allow")
    }
}

const getHandler = async (req, res) => {
    await connectDB();
    try {
        const records = await ReviewandRatingModel.findById(req.query.id).select('-studentImage');
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
        const records = await ReviewandRatingModel.findByIdAndDelete(req.query.id);
        if (records) {
            res.status(200).json(records)
        } else {
            res.status(404).send({ message: 'No categories found' });
        };
    }
    catch (error) {
        res.status(500).send("Somthing Went Wrong")
        console.log(error)
    };
};


const updateHandler = async (req, res) => {
    await connectDB();
    try {
        const records = await ReviewandRatingModel.findById(req.query.id);
        records.is_published = req.body.is_published;
        records.save();
        res.status(200).json(records)

    }
    catch (error) {
        res.status(500).send("Somthing Went Wrong")
        console.log(error)
    };
};

export default handler;