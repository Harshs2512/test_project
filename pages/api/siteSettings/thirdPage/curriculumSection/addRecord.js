import connectDB from 'db/newdb';
import Curriculum from 'models/siteSettings/thirdPage/offlinecurriculumSectionModel';

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
        const { feature1, feature2, feature3, feature4, section, sectionid, videolink } = req.body;

        if (!feature1 || !feature2 || !feature3 || !feature4 || !sectionid || !videolink) {
            return res.status(400).send({ error: "All feature fields are required" });
        }

        const newSection = section.map((item) => ({
            title: item.title,
            description: item.description,
            topics: item.topics.map((topic) => ({
                topic: topic.topic
            })),
        }))

        const cardData = new Curriculum({
            videolink: videolink,
            feature1: feature1,
            feature2: feature2,
            feature3: feature3,
            feature4: feature4,
            sectionid: sectionid,
            section: newSection,
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