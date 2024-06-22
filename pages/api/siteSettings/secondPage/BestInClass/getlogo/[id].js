import connectDB from "db/newdb";
import BestClass from "models/siteSettings/secondPage/Best-in-class";

const getlogo = async (req, res) => {
    await connectDB();
    try {
        const response = await BestClass.findById(req.query.id).select("image");
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