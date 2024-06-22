import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Row, Card, Form, Button } from "react-bootstrap";
import { TutorialEditor } from "widgets";

const AddCourseGuide = () => {
  const router = useRouter();
  const { id, action } = router.query;
  const [category, setCategory] = useState("");
  const fetchGuide = async () => {
    try {
      const response = await axios.get(`/api/tutorial/${id}`);
      const data = response && response.data && response.data.guide;
      setFormData({
        id: data._id || "",
        title: data.title || "",
        categorys: data.category || "",
        course_level: data.course_level || "",
        duration: data.duration || "",
        Tools: data.Tools || "",
        description: data.description || "",
        questionsList: data.questionsList || [],
      });
      setQuestionsList(
        data.questionsList.map((q) => ({
          chapter: q.chapter || "",
          options: q.options.map((opt) => ({
            ...opt,
            explanation: opt.explanation || "",
            TopicName: opt.TopicName || "",
          })),
        }))
      );
    } catch (error) {
      console.error("Order Fetching error:", error);
    }
  };

  const [questionsList, setQuestionsList] = useState([
    {
      chapter: "",
      options: [],
    },
  ]);
  useEffect(() => {
    if (id) {
      fetchGuide();
    }
  }, [id]);
  const handleContentChange = (value, questionIndex, optionIndex) => {
    setQuestionsList((prevList) =>
      prevList.map((q, i) =>
        i === questionIndex
          ? {
              ...q,
              options: q.options.map((opt, oi) =>
                oi === optionIndex ? { ...opt, explanation: value } : opt
              ),
            }
          : q
      )
    );
  };

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    categorys: "",
    course_level: "",
    duration: "",
    Tools: "",
    description: "",
    questionsList: [],
  });
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formDatas = new FormData();
    formDatas.append("id", formData.id);
    formDatas.append("title", formData.title);
    formDatas.append("category", formData.categorys);
    formDatas.append("course_level", formData.course_level);
    formDatas.append("duration", formData.duration);
    formDatas.append("Tools", formData.Tools);
    formDatas.append("description", formData.description);
    formDatas.append("questionsList", JSON.stringify(questionsList));
    try {
      if (action === "update") {
        const response = await axios.put("/api/tutorial/guided", formDatas);
        if (response.status === 200) {
          toast.success("Updated");
          router.back();
        }
        if (response.error) {
          toast.error(response.error);
        }
      } else {
        const response = await axios.post("/api/tutorial/guided", formDatas);
        if (response.status === 201) {
          toast.success("guided Added Successfully");
          router.back();
        } else {
          toast.error("guided Not Added. Please try again.");
          console.error("Error creating guided:", response.data.error);
        }
      }
    } catch (error) {
      toast.error("guided Not Added. Please try again.");
      console.error("Error creating guided:", error.response.data);
    }
  };

  const handleAddOption = (index) => {
    setQuestionsList((prevList) =>
      prevList.map((q, i) =>
        i === index
          ? {
              ...q,
              options: [...q.options, { explanation: "", TopicName: "" }],
            }
          : q
      )
    );
  };
  const handleRemoveOption = (questionIndex, optionIndex) => {
    setQuestionsList((prevList) =>
      prevList.map((q, i) =>
        i === questionIndex
          ? {
              ...q,
              options: q.options.filter((opt, oi) => oi !== optionIndex),
            }
          : q
      )
    );
  };
  const handleAddQuestion = () => {
    setQuestionsList((prevList) => [
      ...prevList,
      {
        chapter: "",
        options: [],
      },
    ]);
  };
  const handleRemoveQuestion = (index) => {
    setQuestionsList((prevList) => prevList.filter((q, i) => i !== index));
  };

  const getcategories = async (req, res) => {
    try {
      const res = await axios.get(`/api/category/getcategories`);
      setCategory(res && res.data && res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getcategories();
  }, []);
  const handleChangeCategory = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, categorys: value });
  };
  const ContestLevel = [
    { value: "Beginners", label: "Beginners" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advance", label: "Advance" },
  ];
  return (
    <Form onSubmit={handleFormSubmit}>
      <ToastContainer />
      {/* Card */}
      <Card className="mb-3">
        <Card.Header className="border-bottom px-4 py-3">
          <h3 className="mb-0">Basic Information for Create Tutorial</h3>
        </Card.Header>
        {/* Card body */}
        <Card.Body>
          {/* Title */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="title">Tutorial Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tutorial Title"
              name="title"
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
            <Form.Text className="text-muted">
              Write a 60 character Guide Course Title.
            </Form.Text>
          </Form.Group>
          {/* Duration */}
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="hours">Course Duration</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="60 day's"
                  name="duration"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                />
                <Form.Text className="text-muted">6 months</Form.Text>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-5">
                <Form.Label>Course Guide Category</Form.Label>
                <Form.Select
                  onChange={handleChangeCategory}
                  value={formData.categorys}
                >
                  <option value="">Select Course Category</option>
                  {category &&
                    category.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.catName}
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
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="Tools">Requirment Tools</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.Tools}
                  onChange={(e) =>
                    setFormData({ ...formData, Tools: e.target.value })
                  }
                />
                <Form.Text className="text-muted">
                  Enter required tool, like PC and Vs Code
                </Form.Text>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="description">
                  Define Short description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
                <Form.Text className="text-muted">
                  Enter Short description
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          {/* Quiz Question Details */}
          <h3>Content Details</h3>
          {questionsList.map((question, index) => (
            <div key={index}>
              <Row>
                <Col>
                  <Form.Label className="mt-2">Enter Chapter</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="chapter 1"
                    value={question.chapter}
                    onChange={(e) =>
                      setQuestionsList((prevList) =>
                        prevList.map((q, i) =>
                          i === index ? { ...q, chapter: e.target.value } : q
                        )
                      )
                    }
                    required
                  ></Form.Control>
                </Col>
              </Row>
              {/* Options */}
              <div>
                <h3 className="mt-2">Lecture Details</h3>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <Row>
                      <Col>
                        <Form.Label>Topic Name</Form.Label>
                        <Form.Control
                          placeholder="Introduction"
                          value={option.TopicName}
                          onChange={(e) =>
                            setQuestionsList((prevList) =>
                              prevList.map((q, i) =>
                                i === index
                                  ? {
                                      ...q,
                                      options: q.options.map((opt, oi) =>
                                        oi === optionIndex
                                          ? {
                                              ...opt,
                                              TopicName: e.target.value,
                                            }
                                          : opt
                                      ),
                                    }
                                  : q
                              )
                            )
                          }
                        />
                      </Col>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Label className="mt-3">
                        Content Explanation
                      </Form.Label>
                      <TutorialEditor
                        value={question.options[optionIndex].explanation}
                        onChange={(value) =>
                          handleContentChange(value, index, optionIndex)
                        }
                      />
                    </Form.Group>
                    <Col className="mt-5">
                      <Button
                        className="btn btn-sm btn-info"
                        onClick={() => handleRemoveOption(index, optionIndex)}
                      >
                        Remove Lecture
                      </Button>
                    </Col>
                  </div>
                ))}
              </div>
              <Form.Group>
                <Row className="mt-3">
                  <Form.Label></Form.Label>
                  <Col>
                    <Button
                      className="p-1 btn  btn-info"
                      onClick={() => handleAddOption(index)}
                    >
                      Add Lecture
                    </Button>
                  </Col>
                  <Col>
                    <Form.Label></Form.Label>
                    <Button
                      className="mx-7 p-1 btn-info"
                      onClick={() => handleRemoveQuestion(index)}
                    >
                      Remove Chapter
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </div>
          ))}
          <Form.Group>
            <Row className="mt-5">
              <Col>
                <Button
                  className="p-1"
                  variant="info"
                  onClick={handleAddQuestion}
                >
                  Add Chapter
                </Button>
              </Col>
              <Form.Label></Form.Label>
            </Row>
          </Form.Group>
        </Card.Body>
      </Card>
      {/* Button */}
      <Button variant="info" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddCourseGuide;
