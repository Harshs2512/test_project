import connectDB from 'db/newdb';
import enquirySectionModel from 'models/siteSettings/secondPage/enquirySectionModel';

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
        const id = req.body._id;
        const existingData = await enquirySectionModel.findById(id);
        if (!existingData) {
            return res.status(500).send({ message: 'Info Not Found' })
        }
        const Bulletpoints = req.body.bulletpoint.map((item) => ({
            bulletpoint: item.bulletpoint
        }))
        existingData.title = req.body.title;
        existingData.description = req.body.description;
        existingData.bulletpoints = Bulletpoints;
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

export default handler;