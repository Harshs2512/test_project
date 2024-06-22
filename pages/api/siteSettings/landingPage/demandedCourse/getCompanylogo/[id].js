import connectDB from 'db/newdb';
import demandedCourseModel from "models/siteSettings/landingPage/demandedCourseModel";

const getCompanylogo = async (req, res) => {
    await connectDB();
    try {
        const response = await demandedCourseModel.findById(req.query.id).select("thumbnail");
        if (response) {
            res.setHeader("Content-type", response.thumbnail.contentType);
            return res.status(200).send(response.thumbnail.data);
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

export default getCompanylogo;