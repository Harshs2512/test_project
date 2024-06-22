import Guided_Course from "models/Guided-path/guid-courseModel";
import connectDB from "db/newdb"

const handler = async (req, res) => {
  if (req.method === "GET") {
    return findSingleData(req, res);
  } else if (req.method === "DELETE") {
    return deleteGuide(req, res);
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};

const deleteGuide = async (req, res) => {
  await connectDB();
  try {
    const contest = await Guided_Course.findByIdAndDelete(req.query.id);
    if (contest) {
      return res.send({ message: "Guided deleted successfully" });
    } else {
      return res.status(404).send({ message: "Guided not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  } finally {
  }
};


const findSingleData = async (req, res) => {
  await connectDB();
  try {
    const contest = await Guided_Course.findById(req.query.id).select("-image");
    if (contest) {
      return res.send({ message: "Single Contest found", contest });
    } else {
      return res.status(404).send({ message: "Contest not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};



export default handler;