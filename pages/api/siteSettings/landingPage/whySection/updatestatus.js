import connectDB from "db/newdb"
import WhyUs from "models/siteSettings/landingPage/whyusModel";

const updatestatus = async (req, res) => {
     await connectDB();
    try {
        const { id, is_published } = req.body
        const existingData = await WhyUs.findById(id);
        if (!existingData) {
            return res.status(404).send({ error: "Quiz not found" });
        }
        existingData.is_published = is_published
        await existingData.save();
        res.status(200).send({
            success: true,
            message: "Quiz Updated Successfully",
            updatedData: existingData,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating Quiz",
        });
    }
};
export default updatestatus