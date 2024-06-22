import connectDB from 'db/newdb';
import ourofflineprogramSectionModel from 'models/siteSettings/secondPage/ourofflineprogramSectionModel';

const handler = (req, res) => {
    if (req.method === 'PUT') {
        return putHandler(req, res);
    }
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
        const existingData = await ourofflineprogramSectionModel.findById(req.query.id).select("-image");
        if (existingData) {
            res.status(201).json({ existingData })
        } else {
            res.status(404).send({ message: 'No data found' });
        };
    }
    catch (error) {
        res.status(500).send("Somthing Went Wrong")
    };
};

const putHandler = async (req, res) => {
    await connectDB();
    try {
        const existingData = await ourofflineprogramSectionModel.findById(req.query.id).select("-image");
        if (existingData) {
            const status = req.body.action;
            existingData.status = status;
            await existingData.save();
            res.status(201).json({
                message: "Updated success fully",
                existingData
            })
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
        const records = await ourofflineprogramSectionModel.findByIdAndDelete(req.query.id);
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

export default handler;