import connectDB from "db/newdb";
import Guided_Course from "models/Guided-path/guid-courseModel";


const getthumbnail = async (req, res) => {
    try {
        await connectDB();
        const id = req.query.id;
        const contest = await Guided_Course.findById(id);
        if (contest?.image?.data) {
            res.setHeader("Content-type", contest.image.contentType);
            return res.status(200).send(contest.image.data);
        } else {
            res.status(404).send({
                success: false,
                message: "Photo not found for the provided ID",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error while getting photo",
            error,
        });
    } 
}


export default getthumbnail