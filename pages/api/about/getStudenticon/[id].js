
import OurTeamSchemaModel from "models/siteSettings/about/ourteamModel";
import connectDB from 'db/newdb';

const getImage = async (req, res) => {
    await connectDB();
    const id = req?.query?.id;
    try {
        const response = await OurTeamSchemaModel.findById(id);
        
        if ( response?.image?.data) {
            res.setHeader("Content-type", response?.image?.contentType);
            return res.status(200).send(response?.image?.data);
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