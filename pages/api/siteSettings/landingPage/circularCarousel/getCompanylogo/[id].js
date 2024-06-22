import connectDB from 'db/newdb';
import circularCarouselModel from "models/siteSettings/landingPage/circularCarouselModel";

const getCompanylogo = async (req, res) => {
    await connectDB();
    try {
        const response = await circularCarouselModel.findById(req.query.id).select("company_logo");
        if (response) {
            res.setHeader("Content-type", response.company_logo.contentType);
            return res.status(200).send(response.company_logo.data);
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