import connectDB from 'db/newdb';
import courseLogoModel from "models/siteSettings/secondPage/course-logo";


const getCompanylogo = async (req, res) => {
    await connectDB();
    try {
        const response = await courseLogoModel.findById(req.query.id).select("course_logo");
        if (response) {
            res.setHeader("Content-type", response.course_logo.contentType);
            return res.status(200).send(response.course_logo.data);
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