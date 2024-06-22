import AdminModel from "models/AdminModel";
import connectDB from 'db/newdb';

const handler = async (req, res) => {
    // const session = await getSession({ req });
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
        const user = await AdminModel.findById(req.query.id).select("-image");
        res.status(201).send(user);
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
};

const deleteHandler = async (req, res) => {
    await connectDB();
    try {
        const user = await AdminModel.findByIdAndDelete(req.query.id)
        res.status(200).send(user)
    }
    catch (error) {
        console.log(error)
    }
};

const putHandler = async (req, res) => {
    await connectDB();
    try {
        const { fname, lname, email, roles } = req.body;
        const user = await AdminModel.findByIdAndUpdate(req.query.id, { fname, lname, email, roles })
        res.status(201).send(user)
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: error })
    }
}

export default handler;