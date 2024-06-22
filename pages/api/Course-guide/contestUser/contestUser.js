import ContestUser from "models/Contests/contest_user";
import connectDB from "db/newdb"
const handler = async (req, res) => {
  if (req.method === "GET") {
    return getHandler(req, res);
  } else if (req.method === "POST") {
    return postHandler(req, res);
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};
const postHandler = async (req, res) => {
  await connectDB();
  try {
    const { full_name, email, contact, qualification, message, contest_id } = req.body;
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    if (!isValidEmail(email)) {
      return res.status(405).json({ error: "Invalid email address" });
    }
    const contestUser = new ContestUser({
      full_name,
      email,
      contact,
      qualification,
      message,
      contest_id,
    });
    const existingUser = await ContestUser.findOne({ contest_id });
    if (existingUser) {
      return res.status(400).json({ error: "This email already exists" });
    } 
    const savedContestUser = await contestUser.save();
    return res.status(201).json({
      message: "You have successfully registered for this contest",
      savedContestUser,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


const getHandler = async (req, res) => {
  await connectDB();
  try {
    const user = await ContestUser.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    try {
    } catch (error) {
      console.error("Error disconnecting from database:", error);
    }
  }
};

export default handler;
