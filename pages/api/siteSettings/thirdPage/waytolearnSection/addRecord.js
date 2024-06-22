import connectDB from 'db/newdb';
import waytolearnSectionModel from 'models/siteSettings/thirdPage/waytolearnSectionModel';

const handler = (req, res) => {
    if (req.method === 'POST') {
        return postHandler(req, res);
    }
    else {
        return res.status(400).send("Method not allow")
    }
}

const postHandler = async (req, res) => {
    await connectDB();
    try {
        const title = req.body.title;
        const description = req.body.description;
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
        const card_third = {
            cardtitle: req?.body?.card_third?.cardtitle,
            bulletpoints: req?.body?.card_third?.bulletpoints.map((item) => ({
                bulletpoint: item.bulletpoint
            })),
        }
        const card_forth = {
            cardtitle: req?.body?.card_forth?.cardtitle,
            bulletpoints: req?.body?.card_forth?.bulletpoints.map((item) => ({
                bulletpoint: item.bulletpoint
            })),
        };

        const cardData = new waytolearnSectionModel({
            title: title,
            description: description,
            card_one: card_one,
            card_second: card_second,
            card_third: card_third,
            card_forth: card_forth,
        });

        await cardData.save();

        res.status(201).json({
            message: "Updated success fully",
            existingData
        })
    }
    catch (error) {
        res.status(500).send("Somthing Went Wrong")
    };
};

export default handler;