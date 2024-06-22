
import connectDB from 'db/newdb';
import Category from "models/CategoryModel";
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
  const category = await Category.findByIdAndDelete(req.query.id);
  if (category) {
    return res.send({ message: "Category deleted successfully" });
  } else {
    return res.status(404).send({ message: "Category not found" });
  }
};

const getHandler = async (req, res) => {
  await connectDB();
  try {
    const category = await Category.findById(req.query.id)
    if (category) {
      return res.status(200).send({
        message: "This is the One Category search",
        category
      })
    } else {
      return res.status(404).send({ message: "Category not found this Id .." });
    }
  }
  catch (err) {
    res.status(500).json(err)
  }

};

const putHandler = async (req, res) => {
  await connectDB();
  const category = await Category.findById(req.query.id);
  if (category) {
    category.catName = req.body.catName;
    category.status = req.body.status;
    category.slug = slugify(req.body.catName);
    await category.save();
    return res.send({ message: "Category updated successfully" });
  } else {
    return res.status(404).send({ message: "Category not found" });
  }
};

export default handler;