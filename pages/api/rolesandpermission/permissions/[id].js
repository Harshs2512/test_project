import permissionsModel from "models/roleandpermission/permissionsModel";
import connectDB from 'db/newdb';
import { getSession, useSession } from "next-auth/react";

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
        const user = await permissionsModel.findById(req.query.id);
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
        const user = await permissionsModel.findByIdAndDelete(req.query.id)
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
        const { fname, lname, email, role } = req.body;
        const user = await permissionsModel.findByIdAndUpdate(req.query.id, { fname, lname, email, role })
        res.status(201).send(user)
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: error })
    }
}

export default handler;