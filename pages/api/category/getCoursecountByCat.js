import Course from 'models/CourseModel';
import connectDB from 'db/newdb';
const getCoursecountByCat = async (req, res) => {
  await connectDB();
  try {
    const course = await Course.find();
    const courseCountByCategory = {};
    course.forEach((course) => {
      const category = course?.course_category;
      const categoryId = category._id.toString();

      if (!courseCountByCategory[categoryId]) {
        courseCountByCategory[categoryId] = 1;
      } else {
        courseCountByCategory[categoryId]++;
      }
    });

    if (courseCountByCategory) {
      res.status(201).send({
        success: true,
        message: "Post Created Successfully",
        courseCountByCategory,
      });
    }
  } catch (error) {
    console.log('Error fetching blogs:', error);
  }
};

export default getCoursecountByCat;