import connectDB from 'db/newdb';
import Curriculum from 'models/siteSettings/thirdPage/offlinecurriculumSectionModel';

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
        const id = req.body.id;
        const feature1 = req.body.feature1;
        const feature2 = req.body.feature2;
        const feature3 = req.body.feature3;
        const feature4 = req.body.feature4;
        const videolink = req.body.videolink;
        const section = req.body.section;

        const existingData = await Curriculum.findById(id);
        if (!existingData) {
            return res.status(500).json({ message: 'Info Not Found' })
        }
        const newSection = section.map((item) => ({
            title: item.title,
            description: item.description,
            topics: item.topics.map((i) => ({ topic: i.topic })),
        }));

        existingData.feature1 = feature1;
        existingData.feature2 = feature2;
        existingData.feature3 = feature3;
        existingData.feature4 = feature4;
        existingData.videolink = videolink;
        existingData.section = newSection;

        await existingData.save();
        res.status(201).json({
            message: "Updated success fully"
        })
    }
    catch (error) {
        res.status(500).send("Somthing Went Wrong")
    };
};

export default handler;