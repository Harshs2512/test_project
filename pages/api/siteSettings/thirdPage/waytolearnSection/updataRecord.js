import connectDB from 'db/newdb';
import waytolearnSectionModel from 'models/siteSettings/thirdPage/waytolearnSectionModel';

const handler = (req, res) => {
    if (req.method === 'PUT') {
        return putHandler(req, res);
    }
    else {
        return res.status(400).send("Method not allow")
    }
}

const putHandler = async (req, res) => {
    await connectDB();
    try {
        const id = req.body._id;
        const existingData = await waytolearnSectionModel.findById(id);
        if (!existingData) {
            return res.status(500).json({ message: 'Info Not Found' })
        }
        const card_one = {
            cardtitle: req?.body?.card_one?.cardtitle,
            bulletpoints: req?.body?.card_one?.bulletpoints.map((item) => ({
                bulletpoint: item.bulletpoint
            })),
        }
        const card_second = {
            cardtitle: req?.body?.card_second?.cardtitle,
            bulletpoints: req?.body?.card_second?.bulletpoints.map((item) => ({
                bulletpoint: item.bulletpoint
            })),
        }
        existingData.title = req.body.title;
        existingData.description = req.body.description;
        existingData.card_one = card_one;
        existingData.card_second = card_second;
        await existingData.save();
        res.status(201).json({
            message: "Updated success fully",
            existingData
        })
    }
    catch (error) {
        res.status(500).send("Somthing Went Wrong")
    };
    await db.disconnect();
};

export default handler;