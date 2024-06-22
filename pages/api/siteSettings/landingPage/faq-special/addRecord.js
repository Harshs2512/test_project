import FaqSpecial from 'models/siteSettings/landingPage/faqwithTitleModel';
import connectDB from 'db/newdb';
const formidable = require("formidable");

export const config = {
    api: {
        bodyParser: false,
    },
};


const handler = (req, res) => {
    if (req.method === 'POST') {
        return postHandler(req, res);
    }
    else if (req.method === 'GET') {
        return getHandler(req, res);
    }
    else {
        return res.status(400).send("Method not allow")
    }
}

const postHandler = async (req, res) => {
    await connectDB();

    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const form = new formidable.IncomingForm();

    try {
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).send({ error: "Error parsing form data" });
            }
            let topics = fields.topics;
            if (typeof topics === 'string') {
                try {
                    topics = JSON.parse(topics);
                } catch (parseError) {
                    return res.status(400).send({ error: "Invalid JSON format for topics" });
                }
            }
            if (!Array.isArray(topics) || topics.length === 0) {
                return res.status(400).send({ error: "Invalid topics data" });
            }
            const newTopics = topics.map((topic) => {
                if (!topic.title || !Array.isArray(topic.questions)) {
                    throw new Error("Invalid topic structure");
                }
                const questions = topic.questions.map((question) => ({
                    question: question.question,
                    answer: question.answer,
                }));
                return {
                    title: topic.title,
                    Questions: questions,
                };
            });
            const newData = new FaqSpecial({
                titles: newTopics,
            });
            console.log(newData, "newData");
            await newData.save();

            res.status(201).send({
                success: true,
                message: "FAQ Created Successfully",
            });
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error: error.message || "Error in creating FAQ",
        });
    }
}

const getHandler = async (req, res) => {
    await connectDB();
    try {
        const records = await FaqSpecial.find();
        if (records) {
            res.status(200).json(records)
        } else {
            res.status(404).send({ message: 'No data found' });
        };
    }
    catch (error) {
        res.status(500).send("Somthing Went Wrong")
    };
};
export default handler;