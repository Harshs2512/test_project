import ReviewandRatingModel from "models/ReviewAndRatingModel";
import db from "db/db";

const handler = async (req, res) => {
    if (req.method === "POST") {
        return postHandler(req, res);
    }
    else {
        return res.status(400).send({ message: "Method not allowed" });
    }
};
const postHandler = async (req, res) => {
    
    try {
        await db.connect()
        const reviewandrating = await ReviewandRatingModel.create({
            username: req.body.username,
            courseId: req.body.courseId,
            ratings: req.body.ratings,
            reviews: req.body.reviews,
        });
        const data = await reviewandrating.save();
        res.status(201).json({
            success: true,
            message: "Thank you, your review is saved",
            data: data,
        });
        await db.disconnect()
    }
    catch (error) {
        res.status(500).send({ message: "Sothing went wrong" })
    }
}

export default handler;