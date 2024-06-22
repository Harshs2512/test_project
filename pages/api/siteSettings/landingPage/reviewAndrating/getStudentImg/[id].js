import connectDB from 'db/newdb';
import ReviewandRatingModel from "models/siteSettings/landingPage/ReviewandRatingModel";

const getCompanylogo = async (req, res) => {
    try {
        await connectDB();
        const response = await ReviewandRatingModel.findById(req.query.id);
        if (response) {
            res.setHeader("Content-type", response.studentImage.contentType);
            return res.status(200).send(response.studentImage.data);
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