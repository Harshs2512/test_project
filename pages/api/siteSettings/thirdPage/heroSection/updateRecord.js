import connectDB from 'db/newdb';
import heroSectionModel from 'models/siteSettings/thirdPage/heroSectionModel';

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
    console.log(req.body)
    try {
        const { heading, description, type, startdate, duration, enquirynumber, link, features } = req.body;
        const id = req.body.id;
        const existingData = await heroSectionModel.findById(id);
        if (!existingData) {
            return res.status(500).json({ message: 'Info Not Found' })
        }
        existingData.title = heading;
        existingData.description = description;
        existingData.type = type;
        existingData.startdate = startdate;
        existingData.duration = duration;
        existingData.enquirynumber = enquirynumber;
        existingData.link = link;
        existingData.features = features;
        await existingData.save();
        res.status(201).json({ message: "Updated success fully" })
    }
    catch (error) {
        res.status(500).send("Somthing Went Wrong")
    };
};

export default handler;