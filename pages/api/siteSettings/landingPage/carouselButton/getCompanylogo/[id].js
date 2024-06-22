import connectDB from 'db/newdb';
import carouselButtonModel from "models/siteSettings/landingPage/carouselButtonModel";

const getCompanylogo = async (req, res) => {
    await connectDB();
    try {
        const response = await carouselButtonModel.findById(req.query.id).select("cards");
        if (response) {
            res.setHeader("Content-type", response.cards[req.query.index].img.contentType);
            return res.status(200).send(response.cards[req.query.index].img.data);
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