import ReviewandRatingModel from "models/ReviewAndRatingModel";
import connectDB from "db/newdb";

const handler = async (req, res) => {
    if (req.method === "GET") {
        return getHandler(req, res);
    }
    else {
        return res.status(400).send({ message: "Method not allowed" });
    }
};

const getHandler = async (req, res) => {
    try {
        await connectDB();
        const user = await ReviewandRatingModel.find();
        res.status(200).send(user);
    } catch (error) {
        console.error("Error in getHandler:", error);
        res.status(500).send("Internal Server Error");
    }
};


export default handler;