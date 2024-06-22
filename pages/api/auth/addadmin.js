import Admin from "models/AdminModel";
import db from "db/db";
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

    await db.connect();
    const existingUser = await Admin.findOne({ email: email });
    if (existingUser) {
      res.status(400).send({
        message: "User Exist!"
      });
      await db.disconnect();
      return;
    }

    const newUser = await Admin({
      fname,
      lname,
      email,
      password: bcryptjs.hashSync(password),
      roles
    });

    const user = await newUser.save();

    await db.disconnect();

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
    console.log(err)
    res.status(500).json({ massage: err })
  }

};

export default handler;
