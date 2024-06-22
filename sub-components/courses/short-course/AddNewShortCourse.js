import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Row, Card, Form, Button } from "react-bootstrap";
import { GuidEditor } from "widgets";

const AddNewShortCourse = () => {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const { id, action } = router.query;
  const [courseDescription, setCourseDescription] = useState("");
  const [selectedSubjectImages, setSelectedSubjectImages] = useState([]);
  const [existingSubjectImages, setExistingSubjectImages] = useState([]);
  const courseDescriptionHandle = (value) => {
    setCourseDescription(value);
  };
  const [existingImage, setExistingImage] = useState(null);
  const handleSubjectImagesChange = (files) => {
    const imageFiles = Array.from(files).map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    setSelectedSubjectImages(imageFiles);
  };

  const [formData, setFormData] = useState({
    course_title: "",
    project: "",
    course_level: "",
    duration: "",
  });
  const fetchCourses = async () => {
    try {
      const response = await axios.get(`/api/courses/short-course/${id}`);
      const data = response.data && response.data.course;
      if (!data) {
        throw new Error("No data found in the response");
      }
      setFormData({
        course_title: data.course_title || "",
        project: data.project || "",
        duration: data.duration || "",
        course_level: data.course_level || "",
      });
      setCourseDescription(data.course_description);
      setExistingImage(data.image); 
      setExistingSubjectImages(data.subjectImages); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCourses();
    }
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDatas = new FormData();
      formDatas.append("course_title", formData.course_title);
      formDatas.append("project", formData.project);
      formDatas.append("course_level", formData.course_level);
      formDatas.append("duration", formData.duration);
      formDatas.append("course_description", courseDescription);
      for (let i = 0; i < selectedSubjectImages.length; i++) {
        formDatas.append("subjectImages", selectedSubjectImages[i]);
      }
      if (image) {
        formDatas.append("image", image);
      }
      if (action === "update") {
        const response = await axios.put(
          `/api/courses/short-course/crudCourse?id=${id}`,
          formDatas
        );
        if (response.status === 200) {
          toast.success("Course updated successfully");
          router.back();
        } else {
          toast.error("Course not updated. Please try again.");
          console.error("Error updated Course:", response);
        }
      } else {
        const response = await axios.post(
          "/api/courses/short-course/crudCourse",
          formDatas
        );
        if (response.status === 201) {
          toast.success("Course added successfully");
          router.back();
        } else {
          toast.error("Course not added. Please try again.");
          console.error("Error creating Course: else", response);
        }
      }
    } catch (error) {
      toast.error("Course not added. Please try again.");
      console.error("Error creating Course catch:", error.response);
    }
  };

  const ContestLevel = [
    { value: "Easy", label: "Easy" },
    { value: "Modrate", label: "Modrate" },
    { value: "Hard", label: "Hard" },
  ];

  const Projects = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  const handleChangeProject = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, project: value });
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <ToastContainer />
      <Card className="mb-3">
        <Card.Header className="border-bottom px-4 py-3">
          <h3 className="mb-0">
            <u> Add New Course </u>
          </h3>
        </Card.Header>
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="CourseTitle">Course Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Course Title"
              id="Course_title"
              name="Course_title"
              value={formData.course_title || ""}
              onChange={(e) =>
                setFormData({ ...formData, course_title: e.target.value })
              }
              required
            />
            <Form.Text className="text-muted">
              Write a 60 character Course title.
            </Form.Text>
            <br />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="subjectImages">
              Upload Subject Logo:
            </Form.Label>
            <Form.Control
              type="file"
              id="subjectImages"
              name="subjectImages"
              multiple
              onChange={(e) => handleSubjectImagesChange(e.target.files)}
            />
            {selectedSubjectImages.length > 0 && (
              <div>
                <h5>Selected Subject Logos:</h5>
                <ul>
                  {selectedSubjectImages.map((image, index) => (
                    <li key={index}>
                      <p>{image.name}</p>
                      <img src={image.url} alt={image.name} width="100" />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {existingSubjectImages.length > 0 && (
              <div>
                <h5>Existing Subject Logos:</h5>
                <ul>
                  {existingSubjectImages.map((image, index) => (
                    <li key={index}>
                      <p>{image._id}</p>
                      <img
                        src={`data:${image.contentType};base64,${Buffer.from(
                          image.data.data
                        ).toString("base64")}`}
                        alt={`Existing Image ${index + 1}`}
                        width="100"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-5">
                <Form.Label>Project</Form.Label>
                <Form.Select
                  value={formData.project}
                  onChange={handleChangeProject}
                >
                  <option value="">Select Project</option>
                  {Projects &&
                    Projects.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Course level</Form.Label>
                <Form.Select
                  value={formData.course_level}
                  onChange={(e) =>
                    setFormData({ ...formData, course_level: e.target.value })
                  }
                  required
                >
                  <option value="">Select Course level</option>
                  {ContestLevel.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="duration">Course Duration</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Course Duration"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  required
                />
                <br />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label className="me-5">Course Description</Form.Label>
            <GuidEditor
              value={courseDescription}
              onChange={courseDescriptionHandle}
            />
          </Form.Group>
          <Form.Label>Course Thumbnail Image</Form.Label>
          <Form.Group className="mb-1 input-group">
            <Form.Control
              id="image"
              type="file"
              name="image"
              className="form-control"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            
            <Form.Text className="text-muted">
              Upload your course Test image here. It must meet our course image
              quality standards to be accepted. Important guidelines: 750x440
              pixels; .jpg, .jpeg,. gif, or .png. no text on the image.
            </Form.Text>
            {existingImage && (
              <div>
                <h5>Existing Course Image:</h5>
                <img
                  src={`data:${existingImage.contentType};base64,${Buffer.from(
                    existingImage.data.data
                  ).toString("base64")}`}
                  alt="Existing Course Image"
                  width="100"
                />
              </div>
            )}
            {image && (
              <div>
                <h5>New Course Image:</h5>
                <img src={URL.createObjectURL(image)} alt="New Course Image" width="100" />
              </div>
            )}
          </Form.Group>
        </Card.Body>
        <Card.Body></Card.Body>
      </Card>
      <Button variant="info" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddNewShortCourse;
