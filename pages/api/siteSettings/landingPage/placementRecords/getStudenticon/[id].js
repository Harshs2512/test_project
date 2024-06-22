import connectDB from 'db/newdb';
import placementRecordsModel from "models/siteSettings/landingPage/placementRecordsModel";

const getStudenticon = async (req, res) => {
    await connectDB();
    try {
        const response = await placementRecordsModel.findById(req.query.id).select("student_icon");
        if (response) {
            res.setHeader("Content-type", response.student_icon.contentType);
            return res.status(200).send(response.student_icon.data);
        }
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Erorr while getting photo",
            error,
        });
    }
};

export default getStudenticon;