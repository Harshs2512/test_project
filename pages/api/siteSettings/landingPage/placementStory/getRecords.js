
import connectDB from 'db/newdb';
import placementStoryModel from 'models/siteSettings/landingPage/placementStoryModel';

const handler = (req, res) => {
    if (req.method === 'GET') {
        return getHandler(req, res);
    }
    else {
        return res.status(400).send({ message: "method not allow" })
    }
}

const getHandler = async (req, res) => {
    await connectDB();
    try {
        const records = await placementStoryModel.find().select("-company_logo").select("-student_icon");
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

export default handler;