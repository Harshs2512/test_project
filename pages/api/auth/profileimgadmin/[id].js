import connectDB from 'db/newdb';
import AdminModel from "models/AdminModel";
import Instructor from 'models/InstructorModel';
import User from 'models/UserModel';

const getpostthumbnail = async (req, res) => {

    await connectDB();
    try {
        const response = await Instructor.findById(req.query.id).select("image");
        const response1 = await AdminModel.findById(req.query.id).select("image");
        const response2 = await User.findById(req.query.id).select("image");
        if (response) {
            res.setHeader("Content-type", response.image.contentType);
            return res.status(200).send(response.image.data);
        };
        if (response1) {
            res.setHeader("Content-type", response1.image.contentType);
            return res.status(200).send(response1.image.data);
        };
        if (response2) {
            res.setHeader("Content-type", response2.image.contentType);
            return res.status(200).send(response2.image.data);
        };
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting photo",
            error,
        });
    }
}

export default getpostthumbnail;