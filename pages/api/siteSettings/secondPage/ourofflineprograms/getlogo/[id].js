import connectDB from "db/newdb";
import ourofflineprogramSectionModel from "models/siteSettings/secondPage/ourofflineprogramSectionModel";

const getlogo = async (req, res) => {
    await connectDB();
    try {
        const response = await ourofflineprogramSectionModel.findById(req.query.id).select("image");
        if (response) {
            res.setHeader("Content-type", response.image.contentType);
            return res.status(200).send(response.image.data);
        }
        res.status(200).send({ message: "Done!!" })
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