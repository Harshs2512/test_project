import UserModel from "models/UserModel";
import connectDB from 'db/newdb';

const handler = async (req, res) => {
    if (req.method === "GET") {
        return getHandler(req, res);
    } else {
        return res.status(400).send({ message: "Method not allowed" });
    }
};

const getHandler = async (req, res) => {
    await connectDB();
    const users = await UserModel.find().select("-image");
    res.send(users);
};

export default handler;