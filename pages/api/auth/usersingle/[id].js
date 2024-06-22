import UserModel from "models/UserModel";
import connectDB from 'db/newdb';

const handler = async (req, res) => {
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
    const user = await UserModel.findById(req.query.id);
    res.send(user);
};

const deleteHandler = async (req, res) => {
    await connectDB();
    try {
        const user = await UserModel.findByIdAndDelete(req.query.id)
        res.status(200).send(user)
    }
    catch (error) {
        console.log(error)
    }
};

const putHandler = async (req, res) => {
    await connectDB();
    try {
        const { fname, lname, email, role } = req.body;
        const user = await UserModel.findByIdAndUpdate(req.query.id, { fname, lname, email, role })
        res.status(201).send(user)
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: error })
    }
}

export default handler;