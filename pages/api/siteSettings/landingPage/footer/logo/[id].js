import connectDB from 'db/newdb';
import footerModel from "models/siteSettings/landingPage/footerModel";

const getLogo = async (req, res) => {
    await connectDB();
    try {
        const response = await footerModel.findById(req.query.id).select("logo").select("-sociallinks.sociallinklogo");
        if (response) {
            res.setHeader("Content-type", response.logo.contentType);
            return res.status(200).send(response.logo.data);
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

export default getLogo;