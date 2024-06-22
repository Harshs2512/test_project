import InstructorModel from "models/InstructorModel";
import connectDB from "db/newdb";
import bcryptjs from "bcryptjs";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }
  try {
    const { fname, lname, email, password, roles } = req.body;
    if (
      !fname ||
      !lname ||
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 5
    ) {
      res.status(422).json({
        message: "Validation error",
      });
      return;
    }

    await connectDB();
    const existingUser = await InstructorModel.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({
        message: "User already exist!"
      });
      return;
    }

    const newUser = await InstructorModel({
      fname,
      lname,
      email,
      password: bcryptjs.hashSync(password),
      roles
    });

    const user = await newUser.save();

    res.status(201).send({
      message: "Created user",
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      role: user.role,
    });
  }
  catch (err) {
    console.log(err.response)
    res.status(500).json(err.response)
  }

};

export default handler;
