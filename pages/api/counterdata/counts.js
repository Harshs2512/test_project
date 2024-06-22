import bcryptjs from "bcryptjs";
import User from "models/UserModel";
import Blogs from "models/BlogModel";
import BlogsCategory from "models/PostCategoryModel";
import Course from "models/CourseModel";
import db from "db/db";
import { getSession } from "next-auth/react";
import Instructor from "models/InstructorModel";
import Quiz from "models/QuizModel";
import Contest from "models/Contests/contestModel";

const handler = async (req, res) => {
  if (req.method != "GET") {
    return res.status(400).send({
      message: `${req.method} not supported`,
    });
  }
  await db.connect();

  const session = await getSession({ req });
  // if (!session) {
  //   res.status(401).send("Signin required");
  // }
  const studentFilter = { role: 'user' };

  const toCountUser = await User.find().count();
  const toCountBlogs = await Blogs.find().count();
  const toCountCourse = await Course.find().count();
  const toCountBlogsCategory = await BlogsCategory.find().count();
  const toCountStudents = await User.find(studentFilter).count();
  const toCountInstructors = await Instructor.find().count();
  const toCountMock = await Quiz.find().count();
  const toCountContest = await Contest.find().count();

  const counterData = {
    Users : toCountUser,
    Blogs : toCountBlogs,
    Course : toCountCourse,
    Mocks : toCountMock,
    Contest : toCountContest,
    Blogs_category : toCountBlogsCategory,
    Students_count : toCountStudents,
    Instructor_count : toCountInstructors,
  }
  await db.disconnect();

  res.send({
    message: "User updated",
    counterData
  });
};

export default handler;
