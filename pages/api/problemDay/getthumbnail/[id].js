import connectDB from "db/newdb";
import Problem from "models/Problem/problemModel";

const getthumbnail = async (req, res) => {
    await connectDB();
    try {
        const problem = await Problem.findById(req.query.id);
        if (problem && problem.image && problem.image.data) {
            res.setHeader("Content-type", problem.image.contentType);
            return res.status(200).send(problem.image.data);
        } else {
            return res.status(404).send({ message: "Thumbnail not found for this problem ID." });
        }
    } catch (error) {
        console.error("Error in getthumbnail:", error);
        return res.status(500).send({
            success: false,
            message: "Error while getting photo",
            error,
        });
    }
}

export default getthumbnail;
