import connectDB from 'db/newdb';
import ProjectModel from "models/Project/projectModel";

const getStudenticon = async (req, res) => {
    await connectDB();
    try {
        const response = await ProjectModel.findById(req.query.id).select("coverimage");
        if (response) {
            res.setHeader("Content-type", response.coverimage.contentType);
            return res.status(200).send(response.coverimage.data);
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

export default getStudenticon;