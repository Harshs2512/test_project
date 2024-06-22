import db from "db/db";
import faqwithImageModel from "models/siteSettings/secondPage/faqwithImageMode";

const getlogo = async (req, res) => {
    await db.connect();
    try {
        const response = await faqwithImageModel.findById(req.query.id).select("-imageone").select("imagesecond");
        if (response) {
            res.setHeader("Content-type", response.imagesecond.contentType);
            return res.status(200).send(response.imagesecond.data);
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