
import ContestCategory from "models/Code_Contest/Contest_Category"
import connectDB from "db/newdb"
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
    const Category = await ContestCategory.find();
    res.status(200).json(Category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const createCategory = async (req, res) => {
  await connectDB();
  try {
    const { catName } = req.body;
    if (!catName) {
      return res.status(400).json({ error: "catName Name is required" });
    }
    const existingCategory = await ContestCategory.findOne({ catName });
    if (existingCategory) {
      return res.status(400).json({ error: "Category with this name already exists" });
    }
    const assignment = new ContestCategory({ catName });
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
  } finally {
  }
};
