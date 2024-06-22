import connectDB from 'db/newdb';
import coursePageModel from "models/siteSettings/megaMenu/coursePageModel";

const getCompanylogo = async (req, res) => {
    await connectDB();
    try {
        const response = await coursePageModel.findById(req.query.id).select("student_image");
        if (response) {
            res.setHeader("Content-type", response.student_image.contentType);
            return res.status(200).send(response.student_image.data);
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