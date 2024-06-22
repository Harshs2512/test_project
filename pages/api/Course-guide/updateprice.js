import connectDB from 'db/newdb';
import Guided_Course from "models/Guided-path/guid-courseModel";

const updateprice = async (req, res) => {
    await connectDB();
    try {
        const { currentprice, actualprice, courseId } = req.body
        const existingContest = await Guided_Course.findById(courseId);
        if (!existingContest) {
            return res.status(404).send({ error: "Contest not found" });
        }
        existingContest.currentprice = currentprice;
        existingContest.actualprice = actualprice;
        await existingContest.save();
        res.status(200).send({
            success: true,
            message: "Contest Updated Successfully",
            updatedContest: existingContest,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating Contest",
        });
    }
};
export default updateprice