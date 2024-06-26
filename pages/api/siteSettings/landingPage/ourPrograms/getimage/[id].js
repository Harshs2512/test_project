import connectDB from 'db/newdb';
import ourProgramModel from "models/siteSettings/landingPage/ourProgramModel";


const getImage = async (req, res) => {
    await connectDB();
    try {
        const response = await ourProgramModel.findById(req.query.id).select("image");
        if (response) {
            res.setHeader("Content-type", response.image.contentType);
            return res.status(200).send(response.image.data);
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

export default getImage;