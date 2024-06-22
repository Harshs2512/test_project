import BlogModel from 'models/BlogModel';
import connectDB from 'db/newdb';

const getBlogCountByCategory = async (req, res) => {
  await connectDB();
  try {
    // Query blogs and populate the 'postcategory' field to get the category details
    const blogs = await BlogModel.find().populate('postcategory');

    // Create an object to store the blog count for each category
    const blogCountByCategory = {};

    // Calculate the blog count for each category
    blogs.forEach((blog) => {
      const category = blog.postcategory;
      const categoryId = category._id.toString(); // Convert ObjectId to string for easy comparison

      // If the category is not in the object, initialize its count to 1, else increment the count
      if (!blogCountByCategory[categoryId]) {
        blogCountByCategory[categoryId] = 1;
      } else {
        blogCountByCategory[categoryId]++;
      }
    });

    // You can use this object to display the blog count for each category in your UI
    if (blogCountByCategory) {
      res.status(201).send({
        success: true,
        message: "Post Created Successfully",
        blogCountByCategory,
      });
    }
  } catch (error) {
    console.log('Error fetching blogs:', error);
  }
};

export default getBlogCountByCategory;