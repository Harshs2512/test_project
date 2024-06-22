
import ShortCourse from "models/ShortCoursesModel";
import connectDB from "db/newdb";
import slugify from "slugify";
import fs from "fs";
const formidable = require("formidable");
export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function codeAssignmentHandler(req, res) {
  switch (req.method) {
    case "GET":
      await getCourse(req, res);
      break;
    case "POST":
      await createCourse(req, res);
      break;
    case "PUT":
      await updateCourse(req, res);
      break;
    case "DELETE":
      await deleteCourse(req, res);
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
const createCourse = async (req, res) => {
  await connectDB();
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).send({ error: "Error parsing form data" });
      }
      const getSingleValueFromArray = (value) => {
        if (Array.isArray(value) && value.length > 0) {
          return value[0];
        }
        return value;
      };
      const course_title = getSingleValueFromArray(fields.course_title);
      const project = getSingleValueFromArray(fields.project);
      const course_level = getSingleValueFromArray(fields.course_level);
      const duration = getSingleValueFromArray(fields.duration);
      const course_description = getSingleValueFromArray(
        fields.course_description
      );
      const { image } = files;
      const imageData = fs.readFileSync(image[0].filepath);
      const imageContentType = image[0].mimetype;
      const subjectImages = Array.isArray(files.subjectImages)
        ? files.subjectImages
        : [files.subjectImages];
      const subjectImagesData = subjectImages.map((image) => ({
        data: fs.readFileSync(image.filepath),
        contentType: image.mimetype,
      }));

      const newCourse = new ShortCourse({
        course_title,
        slug: slugify(course_title),
        image: {
          data: imageData,
          contentType: imageContentType,
        },
        subjectImages: subjectImagesData,
        project,
        course_level,
        duration,
        course_description,
      });
      const savedCourse = await newCourse.save();
      res
        .status(201)
        .json({ message: "Course saved successfully", savedCourse });
    });
  } catch (error) {
    console.error("Error creating contest:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateCourse = async (req, res) => {
  await connectDB();
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).send({ error: "Error parsing form data" });
      }
      const getSingleValueFromArray = (value) => {
        if (Array.isArray(value) && value.length > 0) {
          return value[0];
        }
        return value;
      };

      const courseId = req.query.id; 

      const course_title = getSingleValueFromArray(fields.course_title);
      const project = getSingleValueFromArray(fields.project);
      const course_level = getSingleValueFromArray(fields.course_level);
      const duration = getSingleValueFromArray(fields.duration);
      const course_description = getSingleValueFromArray(fields.course_description);

      const courseToUpdate = await ShortCourse.findById(courseId);
      if (!courseToUpdate) {
        return res.status(404).json({ error: "Course not found" });
      }

      if (course_title) {
        courseToUpdate.course_title = course_title;
        courseToUpdate.slug = slugify(course_title);
      }
      if (project) {
        courseToUpdate.project = project;
      }
      if (course_level) {
        courseToUpdate.course_level = course_level;
      }
      if (duration) {
        courseToUpdate.duration = duration;
      }
      if (course_description) {
        courseToUpdate.course_description = course_description;
      }

      if (files.image) {
        const image = files.image[0];
        const imageData = fs.readFileSync(image.filepath);
        const imageContentType = image.mimetype;
        courseToUpdate.image = {
          data: imageData,
          contentType: imageContentType,
        };
      }

      if (files.subjectImages) {
        const subjectImages = Array.isArray(files.subjectImages)
          ? files.subjectImages
          : [files.subjectImages];
        const subjectImagesData = subjectImages.map((image) => ({
          data: fs.readFileSync(image.filepath),
          contentType: image.mimetype,
        }));
        courseToUpdate.subjectImages = subjectImagesData;
      }

      const updatedCourse = await courseToUpdate.save();
      res.status(200).json({ message: "Course updated successfully", updatedCourse });
    });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCourse = async (req, res) => {
  await connectDB();
  try {
    const courses = await ShortCourse.find().select("-image");
    return res.status(200).json({ message: "All Short Courses", courses });
  } catch (error) {
    console.error("Error in getProblem:", error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  await connectDB();
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "Course ID is required" });
    }

    const deletedCourse = await ShortCourse.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully", deletedCourse });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};