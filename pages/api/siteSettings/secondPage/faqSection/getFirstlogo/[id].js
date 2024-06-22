import connectDB from 'db/newdb';
import faqwithImageModel from "models/siteSettings/secondPage/faqwithImageMode";

const getlogo = async (req, res) => {
    await connectDB();
    try {
        const response = await faqwithImageModel.findById(req.query.id).select("imageone").select("-imagesecond");
        if (response) {
            res.setHeader("Content-type", response.imageone.contentType);
            return res.status(200).send(response.imageone.data);
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

export default getlogo;