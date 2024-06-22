import rolesModel from "models/roleandpermission/rolesModel";
import connectDB from 'db/newdb';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }
    await connectDB();
    try {
        const rolename = req.body.rolename;
        // const selectedpermission = req.body.selectedpermission.map((item) => ({
        //     permission: item.permission,
        //     create: item.create,
        //     read: item.read,
        //     update: item.update,
        //     delete: item.delete,
        // }));
        const selectedpermission = req.body.selectedpermission;

        const cardData = new rolesModel({
            rolename,
            selectedpermission
        });

        await cardData.save();
        res.status(201).send({
            success: true,
            message: "Post Created Successfully",
            cardData,
        });
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating course",
        });
    }
}