
import Contest from "models/Contests/contestModel";
import connectDB from "db/newdb"

const handler = async (req, res) => {
  if (req.method === "GET") {
    return findSingleContest(req, res);
  } else if (req.method === "DELETE") {
    return deleteContest(req, res);
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};

const deleteContest = async (req, res) => {
  await connectDB();
  try {
    const contest = await Contest.findByIdAndDelete(req.query.id);
    if (contest) {
      return res.send({ message: "Contest deleted successfully" });
    } else {
      return res.status(404).send({ message: "Contest not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  } finally {
  }
};


const findSingleContest = async (req, res) => {
  await connectDB();
  try {
    const contest = await Contest.findById(req.query.id).select("-image");
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