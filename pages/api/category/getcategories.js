import Category from "models/CategoryModel";
import connectDB from 'db/newdb';

const getCategories = async (req, res) => {
  await connectDB();
  try {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export default getCategories;
