import AdminModel from "models/AdminModel";
import db from "db/db";

const handler = async (req, res) => {
    if (req.method === "GET") {
        return getHandler(req, res);
    } else {
        return res.status(400).send({ message: "Method not allowed" });
    }
};

const getHandler = async (req, res) => {
    await db.connect();
    const users = await AdminModel.find().select("-image");
    await db.disconnect();
    res.send(users);
};

export default handler;