import Roles from "models/roleandpermission/rolesModel";
import connectDB from 'db/newdb';

const Handler = async (req, res) => {
  if (req.method === "GET") {
    return getRoles(req, res);
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};

const getRoles = async (req, res) => {
  await connectDB();
  try {
    const roles = await Roles.find();
    res.status(200).json({
      success: true,
      roles,
    });

  }
  catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}


export default Handler;
