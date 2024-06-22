
import Tutorials from "models/Tutorials/tutorialModel"
import db from "db/db";
import connectDB from "db/newdb"
const handler = async (req, res) => {
  if (req.method === "GET") {
    return findSingleTutorial(req, res);
  } else if (req.method === "DELETE") {
    return deleteTutorial(req, res);
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};

const deleteTutorial = async (req, res) => {
  await connectDB();
  const guide = await Tutorials.findByIdAndDelete(req.query.id);
  if (guide) {
    return res.send({ message: "tutorial deleted successfully" });
  } else {
    return res.status(404).send({ message: "tutorial not found" });
  }
};

const findSingleTutorial = async (req, res) => {
  await connectDB();
  const guide = await Tutorials.findById(req.query.id);
  if (guide) {
    return res.send({ message: "Single tutorial finded",guide });
  } else {
    return res.status(404).send({ message: "tutorial not found" });
  }
};


export default handler;