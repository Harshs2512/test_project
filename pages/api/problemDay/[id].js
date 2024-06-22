import Problem from "models/Problem/problemModel";
import connectDB from "db/newdb"
const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      return await findSingleProblem(req, res);
    } else if (req.method === "DELETE") {
      return await deleteProblem(req, res);
    } else {
      return res.status(400).send({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error in handler:", error);
    return res.status(500).send({ message: "Internal server error." });
  }
};

const deleteProblem = async (req, res) => {
   await connectDB();
  try {
    const problem = await Problem.findByIdAndDelete(req.query.id);
    if (problem) {
      return res.send({ message: "Problem deleted successfully" });
    } else {
      return res.status(404).send({ message: "Problem not found" });
    }
  } catch (error) {
    console.error("Error in deleteProblem:", error);
    return res.status(500).send({ message: "Internal server error." });
  } 
};

const findSingleProblem = async (req, res) => {
  await connectDB();
  try {
    const problem = await Problem.findById(req.query.id).select("-image");
    if (problem) {
      return res.send({ message: "Single problem found", problem });
    } else {
      return res.status(404).send({ message: "Problem not found" });
    }
  } catch (error) {
    console.error("Error in findSingleProblem:", error);
    return res.status(500).send({ message: "Internal server error." });
  } 
};

export default handler;
