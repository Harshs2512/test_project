import db from 'db/db';
import comparePlansModel from 'models/siteSettings/secondPage/comparePlansModel';

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
        const existingData = await comparePlansModel.findById(id);
        if (!existingData) {
            return res.status(500).send({ message: 'Info Not Found' })
        }
        const plan = {
            plan: req?.body?.plan.map((item) => ({
                plantype: item.plantype,
                coursename: item.coursename,
            }))
        }
        const planfeature = {
            planfeature: req?.body?.planfeature.map((item) => ({
                featuretitle: item.featuretitle,
                featurelist: item.featurelist.map((listitem) => ({
                    subtitle: listitem.subtitle,
                    basic: listitem.basic,
                    advance: listitem.advance,
                }))
            }))
        }
        existingData.pagetitle = req.body.pagetitle;
        existingData.pagedescription = req.body.pagedescription;
        existingData.plan = plan.plan;
        existingData.planfeature = planfeature.planfeature;
        await existingData.save();
        res.status(201).json({
            message: "Updated success fully",
            existingData
        });
    }
    catch (error) {
        res.status(500).send("Somthing Went Wrong")
    };
};

export default handler;