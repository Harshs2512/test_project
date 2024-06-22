import Course from "models/CourseModel";
import ReviewAndRatingModel from "models/ReviewAndRatingModel";
import connectDB from "db/newdb"

const handler = async (req, res) => {
  if (req.method === "GET") {
    return getSingleCourse(req, res);
  } else if (req.method === "PUT") {
    return updatecourse(req, res);
  } else if (req.method === "DELETE") {
    return deleteSingleCourse(req, res);
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};

const deleteSingleCourse = async (req, res) => {
  await connectDB();
  const course = await Course.findByIdAndDelete(req.query.id);
  await ReviewAndRatingModel.deleteMany({ courseId: req.query.id });
  if (course) {
    return res.send({ message: "course deleted successfully" });
  } else {
    return res.status(404).send({ message: "course not found" });
  }
};

const getSingleCourse = async (req, res) => {
  await connectDB();
  const { id } = req.query;
  const findData = { slug: id };
  const course = await Course.find(findData).select("-media.thumbnail");
  if (course) {
    return res.send({ message: "this is single course", course });
  } else {
    return res.status(404).send({ message: "course not found by this id " });
  }
};



export default handler;