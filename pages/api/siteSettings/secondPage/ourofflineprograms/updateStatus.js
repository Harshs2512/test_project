import connectDB from 'db/newdb';
import ourofflineprogramSectionModel from 'models/siteSettings/secondPage/ourofflineprogramSectionModel';

const handler = (req, res) => {
    if (req.method === 'PUT') {
        return putHandler(req, res);
    }
    else {
        return res.status(400).send("Method not allow")
    }
}

const putHandler = async (req, res) => {
    await connectDB();
    try {
        const existingData = await ourofflineprogramSectionModel.find().select("-image");
        if (existingData) {
            const status = req.body.status;
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

export default handler;