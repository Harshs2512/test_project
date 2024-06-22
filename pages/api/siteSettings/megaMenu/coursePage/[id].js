
import connectDB from 'db/newdb';
import Category from "models/siteSettings/megaMenu/coursePageModel";
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
    const data = await Category.findById(req.query.id)
    if (data) {
      return res.status(200).send({
        message: "This is the One Category search",
        data
      })
    } else {
      return res.status(404).send({ message: "Category not found this Id .." });
    }
  }
  catch (error) {
    console.log(error)
    res.status(500).send({ message: "error", error })
  }

};

const putHandler = async (req, res) => {
  await connectDB();
  const category = await Category.findById(req.query.id);
  if (category) {
    category.title = req.body.title;
    category.slug = slugify(req.body.title);
    await category.save();
    return res.status(200).send({ message: "Category updated successfully" });
  } else {
    return res.status(404).send({ message: "Category not found" });
  }
};

export default handler;