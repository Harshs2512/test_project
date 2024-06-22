import rolesModel from "models/roleandpermission/rolesModel";
import connectDB from 'db/newdb';
import { getSession } from "next-auth/react";

const handler = async (req, res) => {

    const session = await getSession({ req });
    // if (!session || (session && !session.user.isAdmin)) {
    //     res.status(401).send("Admin signin required");
    // }
    if (req.method === "GET") {
        return getHandler(req, res);
    }
    if (req.method === "DELETE") {
        return deleteHandler(req, res);
    }
    if (req.method === "PUT") {
        return putHandler(req, res);
    }
    else {
        return res.status(400).send({ message: "Method not allowed" });
    }
};

const getHandler = async (req, res) => {
    await connectDB();
    try {
        const user = await rolesModel.findById(req.query.id);
        res.status(201).send(user);
    }
    catch (error) {
        conssole.log(error)
        res.status(500).send({ message: error })
    }
};

const deleteHandler = async (req, res) => {
    await connectDB();
    try {
        const user = await rolesModel.findByIdAndDelete(req.query.id)
        res.status(200).send(user)
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: error })
    }
};

const putHandler = async (req, res) => {
    await connectDB();
    try {
        const { rolename } = req.body;
        const { selectedpermission } = req.body;
        const user = await rolesModel.findByIdAndUpdate(req.query.id, { rolename, selectedpermission })
        res.status(201).send(user)
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: error })
    }
}

export default handler;