import connectDB from 'db/newdb';
import papCourseModel from "models/siteSettings/papCourseModel";

const getCompanylogo = async (req, res) => {
    await connectDB();
    try {
        const response = await papCourseModel.findById(req.query.id).select('courses')
        if (response) {
            res.setHeader("Content-type", response.courses[req.query.index].imageFile.contentType);
            return res.status(200).send(response.courses[req.query.index].imageFile.data);
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