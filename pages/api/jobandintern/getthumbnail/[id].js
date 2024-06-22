import connectDB from "db/newdb";
import JobIntern from "models/jobandInternship/jobIntern";

const getthumbnail = async (req, res) => {
    await connectDB();
    try {
        const problem = await JobIntern.findById(req.query.id);
        if (problem && problem.companyImage && problem.companyImage.data) {
            res.setHeader("Content-type", problem.companyImage.contentType);
            return res.status(200).send(problem.companyImage.data);
        }
    } 
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Error while getting photo",
            error,
        });
    }
}

export default getthumbnail;
