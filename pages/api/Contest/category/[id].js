
import connectDB from "db/newdb"
import ContestCategory from "models/Code_Contest/Contest_Category"
import slugify from "slugify";

const handler = async (req, res) => {
  if (req.method === "GET") {
    return getHandler(req, res);
  } else if (req.method === "PUT") {
    return putHandler(req, res);
  } else if (req.method === "DELETE") {
    return deleteHandler(req, res);
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};

const deleteHandler = async (req, res) => {
  await connectDB();
  const category = await ContestCategory.findByIdAndDelete(req.query.id);
  if (category) {
    return res.send({ message: "Category deleted successfully" });
  } else {
    return res.status(404).send({ message: "Category not found" });
  }
};

const getHandler = async (req, res) => {
  await connectDB();
  try {
    const category = await ContestCategory.findById(req.query.id);
    if (category) {
      return res.status(200).send({
          message: "This is the One Category search",
          category
      });
    } else {
      return res.status(404).send({ message: "Category not found for this ID" });
    }
  } catch (error) {
    console.error("Error fetching category:", error);
    await db.disconnect();
    return res.status(500).send({ message: "An error occurred while fetching category" });
  }
};


const putHandler = async (req, res) => {
  await connectDB();
  try {
    const category = await ContestCategory.findById(req.query.id);
    if (category) {
      category.catName = req.body.catName;
      category.status = req.body.status;
      category.slug = slugify(req.body.catName);
      await category.save();
      return res.send({ message: "Category updated successfully" });
    } else {
      return res.status(404).send({ message: "Category not found" });
    }
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).send({ message: "An error occurred while updating category" });
  }
};


export default handler;