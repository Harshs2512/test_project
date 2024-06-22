import connectDB from 'db/newdb';
import heroSectionModel from 'models/siteSettings/thirdPage/heroSectionModel';

const handler = (req, res) => {
    if (req.method === 'POST') {
        return postHandler(req, res);
    }
    else {
        return res.status(400).send("Method not allow")
    }
}

const postHandler = async (req, res) => {
    await connectDB();
    try {
        const { title, description, type, startdate, duration, enquirynumber, link, sectionid, features } = req.body;

        // Validate feature properties
        if (!title || !description || !type || !startdate || !duration || !enquirynumber || !link || !sectionid) {
            return res.status(400).send({ error: "All feature fields are required" });
        }

        const cardData = new heroSectionModel({
            title: title,
            description: description,
            type: type,
            duration: duration,
            startdate: startdate,
            enquirynumber: enquirynumber,
            link: link,
            sectionid: sectionid,
            features: features,
        });
        await cardData.save();

        res.status(201).json({
            message: "Added success fully"
        })
    }
    catch (error) {
        res.status(500).send("Somthing Went Wrong")
    };
};

export default handler;