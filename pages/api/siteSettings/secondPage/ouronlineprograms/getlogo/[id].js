import connectDB from "db/newdb";
import ouronlineprogramSectionModel from "models/siteSettings/secondPage/ouronlineprogramSectionModel";

const getlogo = async (req, res) => {
    try {
        await connectDB();
        const response = await ouronlineprogramSectionModel.findById(req.query.id).select("image");
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

export default getlogo;