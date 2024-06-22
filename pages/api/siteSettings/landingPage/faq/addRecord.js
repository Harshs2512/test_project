import connectDB from 'db/newdb';
import faqModel from 'models/siteSettings/landingPage/faqModel';

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
        const question = req.body.question;
        const answer = req.body.answer;
        const data = new faqModel({
            question: question,
            answer: answer,
        })
        await data.save();
        res.status(201).send({
            success: true,
            message: "Created Successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).send("Somthing Went Wrong")
    };
};

export default handler;