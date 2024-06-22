import permissionsModel from "models/roleandpermission/permissionsModel";
import connectDB from 'db/newdb';

const Handler = async (req, res) => {
  if (req.method === "GET") {
    return getPermissions(req, res);
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};

const getPermissions = async (req, res) => {
    await connectDB();
    try {
        const permissions = await permissionsModel.find({});
        res.status(200).json({
            success: true,
            permissions,
        });

    } catch (error) {
        console.error("Error fetching permissions:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
}


export default Handler;
