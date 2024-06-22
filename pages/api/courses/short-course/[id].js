import ShortCourse from "models/ShortCoursesModel";
import connectDB from "db/newdb"
const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      return await findSingleCourse(req, res);
    } else {
      return res.status(400).send({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error in handler:", error);
    return res.status(500).send({ message: "Internal server error." });
  }
};

const findSingleCourse = async (req, res) => {
  await connectDB();
  try {
    const course = await ShortCourse.findById(req.query.id);
    if (course) {
      return res.send({ message: "Single course found", course });
    } else {
      return res.status(404).send({ message: "Course not found" });
    }
  } catch (error) {
    console.error("Error in findSingleCourse:", error);
    return res.status(500).send({ message: "Internal server error." });
  } 
};

export default handler;
