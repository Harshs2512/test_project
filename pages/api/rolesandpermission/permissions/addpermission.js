import permissionsModel from "models/roleandpermission/permissionsModel";
import connectDB from 'db/newdb';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }
    await connectDB();
    try {
        const permissionname = req.body.permission;
        const cardData = new permissionsModel({
            permissionname,
        });

        await cardData.save();
        res.status(201).send({
            success: true,
            message: "Created Successfully",
            cardData,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating course",
        });
    }
}