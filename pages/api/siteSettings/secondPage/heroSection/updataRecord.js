import connectDB from 'db/newdb';
import heroSectionModel from 'models/siteSettings/secondPage/heroSectionModel';

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
        const existingData = await heroSectionModel.findById(id);
        if (!existingData) {
            return res.status(500).send({ message: 'Info Not Found' })
        }
        existingData.heading = req.body.heading;
        existingData.prefix = req.body.prefix;
        existingData.suffix = req.body.suffix;
        existingData.typed_one = req.body.typed_one;
        existingData.typed_two = req.body.typed_two;
        existingData.description = req.body.description;
        existingData.highlight1 = req.body.highlight1;
        existingData.highlight2 = req.body.highlight2;
        existingData.highlight3 = req.body.highlight3;
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