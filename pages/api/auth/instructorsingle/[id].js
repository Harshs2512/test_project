import InstructorModel from "models/InstructorModel";
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
    const user = await InstructorModel.findById(req.query.id).select("-image");
    res.send(user);
};

const deleteHandler = async (req, res) => {
    await connectDB();
    try {
        const user = await InstructorModel.findByIdAndDelete(req.query.id)
        res.status(200).send(user)
    }
    catch (error) {
        console.log(error)
    }
};

const putHandler = async (req, res) => {
    await connectDB();
    try {
        const { fname, lname, email, roles, verified } = req.body;
        const user = await InstructorModel.findByIdAndUpdate(req.query.id, { fname, lname, email, roles, verified })
        res.status(201).send(user)
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: error })
    }
}

export default handler;