import connectDB from 'db/newdb';
import Guided_Course from "models/Guided-path/guid-courseModel";
const updatestatus = async (req, res) => {
    await connectDB();
    try {
        const { id, is_published } = req.body
        const existingContest = await Guided_Course.findById(id);
        if (!existingContest) {
            return res.status(404).send({ error: "Contest not found" });
        }
        existingContest.is_published = is_published
        await existingContest.save();
        res.status(200).send({
            success: true,
            message: "Contest Updated Successfully",
            updatedContest: existingContest,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating Contest",
        });
    }
};
export default updatestatus