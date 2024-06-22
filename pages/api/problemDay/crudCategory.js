import ProblemCategory from "models/Problem/Problem_Category";
import connectDB from "db/newdb";

export default async function codeAssignmentHandler(req, res) {
  switch (req.method) {
    case "GET":
      await getAllCategory(req, res);
      break;
    case "POST":
      await createCategory(req, res);
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
const getAllCategory = async (req, res) => {
  await connectDB();
  try {
    const Category = await ProblemCategory.find();
    res.status(200).json(Category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createCategory = async (req, res) => {
  await connectDB();
  try {
    const { catName } = req.body;
    if (!catName) {
      return res.status(400).json({ error: "catName Name is required" });
    }
    const existingCategory = await ProblemCategory.findOne({ catName });
    if (existingCategory) {
      return res
        .status(400)
        .json({ error: "Category with this name already exists" });
    }
    const assignment = new ProblemCategory({ catName });
    try {
      const savedAssignment = await assignment.save();
      res.status(201).json(savedAssignment);
    } catch (error) {
      console.error("Error saving catName:", error);
      res.status(500).json({ error: "Error saving catName" });
    }
  } catch (error) {
    console.error("Error parsing form:", error);
    res.status(500).json({ error: "Error parsing form data" });
  }
};
