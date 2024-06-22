import ReviewandRatingModel from "models/ReviewAndRatingModel";
import connectDB from "db/newdb"
const handler = async (req, res) => {
    if (req.method === "POST") {
        return postHandler(req, res);
    }
    if (req.method === "GET") {
        return getHandler(req, res);
    }
    if (req.method === "DELETE") {
        return deleteHandler(req, res);
    }
    if (req.method === "PUT") {
        return putHandler(req, res);
    }
    else {
        return res.status(400).send({ message: "Method not allowed" });
    }
};

const getHandler = async (req, res) => {
    await connectDB()
    try {
        const user = await ReviewandRatingModel.findById(req?.query?.id).populate('username', 'fname lname');
        res.status(200).send(user);
    }
    catch (error) {
        res.status(500).send({ message: "Sothing went wrong" })
        console.log(error)
    }

};

const deleteHandler = async (req, res) => {
    await connectDB()
    try {
        const review = await ReviewandRatingModel.findByIdAndDelete(req.query.id)
        res.status(200).send(review)
    }
    catch (error) {
        console.log(error)
    }
};

const postHandler = async (req, res) => {
    await connectDB()
    try {
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
    }
    catch (error) {
        res.status(500).send({ message: "Sothing went wrong" })
        console.log(error)
    }
};

const putHandler = async (req, res) => {
    await connectDB()
    try {
        const { id, is_published } = req.body
        const existingReview = await ReviewandRatingModel.findById(id);
        if (!existingReview) {
            return res.status(404).send({ error: "Course not found" });
        }
        existingReview.is_published = is_published
        await existingReview.save();
        res.status(200).send({
            success: true,
            message: "Course Updated Successfully",
            updatedReview: existingReview,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating course",
        });
    }
};

export default handler;