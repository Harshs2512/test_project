import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Row, Card, Form, Button } from "react-bootstrap";
import { QuizQuillEditor, FormSelectLevel } from "widgets";
import { useSession } from "next-auth/react";

const QuizInformation = () => {
  const { data: session } = useSession();
  const userId = session?.user?._id;
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const handleContentChange = (value, index) => {
    setQuestionsList((prevList) =>
      prevList.map((q, i) => (i === index ? { ...q, explanation: value } : q))
    );
  };
  const handleHoursChange = (e) => {
    const inputValue = parseInt(e.target.value);
    setHours(inputValue);
  };

  const handleMinutesChange = (e) => {
    const inputValue = parseInt(e.target.value);
    setMinutes(inputValue);
  };

  const handleSecondsChange = (e) => {
    const inputValue = parseInt(e.target.value);
    setSeconds(inputValue);
  };
  const [questionsList, setQuestionsList] = useState([
    {
      question_number: 1,
      question: "",
      options: [],
      explanation: "",
    },
  ]);
  const answers = questionsList
    .map((question) => {
      if (question.question_type === "fill_in_blank") {
        return {
          question_number: question.question_number,
          answer: question.answer,
        };
      } else if (question.question_type === "true_false") {
        return {
          question_number: question.question_number,
          answer: question.correctAnswer ? "true" : "false",
        };
      }
      return null;
    })
    .filter((answer) => answer !== null);

  const [formData, setFormData] = useState({
    QuizCategory: "",
    level: "",
  });
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend  = new FormData();
      formDataToSend .append("QuizCategory", formData?.QuizCategory);
      formDataToSend .append("level", formData?.level);
      formDataToSend .append("title", title);
      formDataToSend .append("hours", hours);
      formDataToSend .append("minutes", minutes);
      formDataToSend .append("seconds", seconds);
      formDataToSend .append("image", image);
      formDataToSend .append("questions_list", JSON.stringify(questionsList));
      formDataToSend .append("answers", JSON.stringify(answers));

      const response = await axios.post("/api/quiz/addquiz", formDataToSend , {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          userId: userId,
        },
      });
      if (response.status === 201) {
        toast.success("Quiz Added Successfully");
        router.back();
      } else {
        toast.error("Quiz Not Added. Please try again.");
        console.error("Error creating quiz:", response.data.error);
      }
    } catch (error) {
      toast.error("Quiz Not Added. Please try again.");
      console.error("Error creating quiz:", error.response.data);
    }
  };
  const handleAddOption = (index) => {
    setQuestionsList((prevList) =>
      prevList.map((q, i) =>
        i === index
          ? {
              ...q,
              options: [...q.options, { text: "", correctAnswer: false }],
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
        question_number: prevList.length + 1,
        question_type: "",
        question: "",
        options: [],
        explanation: "",
      },
    ]);
  };
  const handleRemoveQuestion = (index) => {
    setQuestionsList((prevList) => prevList.filter((q, i) => i !== index));
  };
  const handleSwitchChange = (questionIndex, optionIndex) => {
    setQuestionsList((prevList) =>
      prevList.map((q, i) =>
        i === questionIndex
          ? {
              ...q,
              options: q.options.map((opt, oi) =>
                oi === optionIndex
                  ? { ...opt, correctAnswer: !opt.correctAnswer }
                  : opt
              ),
            }
          : q
      )
    );
  };
  const CoursesLevel = [
    { value: "Intermediate", label: "Intermediate" },
    { value: "Beginners", label: "Beginners" },
    { value: "Advance", label: "Advance" },
  ];
  const getcategories = async (req, res) => {
    try {
      const res = await axios.get(`/api/category/getcategories`);
      setCategory(res?.data?.categories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getcategories();
  }, []);

  const handleChangeCategory = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, QuizCategory: value });
  };
  return (
    <Form onSubmit={handleFormSubmit}>
      <ToastContainer />
      {/* Card */}
      <Card className="mb-3">
        <Card.Header className="border-bottom px-4 py-3">
          <h4 className="mb-0">Basic Information for Create Mock Test</h4>
        </Card.Header>
        {/* Card body */}
        <Card.Body>
          {/* Title */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="title">Mock Test Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Mock Test Name"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Form.Text className="text-muted">
              Write a 60 character Mock Test title.
            </Form.Text>
          </Form.Group>
          {/* Duration */}
          <Row>
            <Col>
              <Form.Group className="mb-5">
                <Form.Label>Category</Form.Label>
                <Form.Select onChange={handleChangeCategory}>
                  <option value="">Select Category</option>
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
                <Form.Label>Mock level</Form.Label>
                <FormSelectLevel
                  options={CoursesLevel}
                  id="level"
                  name="level"
                  placeholder="Select level"
                  onChange={(e) =>
                    setFormData({ ...formData, level: e.target.value })
                  }
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="hours">Hours</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Hours"
                  name="hours"
                  id="hours"
                  value={hours}
                  onChange={handleHoursChange}
                />
                <Form.Text className="text-muted">
                  Only Enter Numeric value
                </Form.Text>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="minutes">Minutes</Form.Label>
                <Form.Control
                  type="number"
                  placeholder=" Enter Minutes"
                  name="minutes"
                  id="minutes"
                  value={minutes}
                  onChange={handleMinutesChange}
                />
                <Form.Text className="text-muted">
                  Only Enter Numeric value
                </Form.Text>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="seconds">Seconds</Form.Label>
                <Form.Control
                  type="number"
                  placeholder=" Enter Seconds"
                  name="seconds"
                  id="seconds"
                  value={seconds}
                  onChange={handleSecondsChange}
                />
                <Form.Text className="text-muted">
                  Only Enter Numeric value
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <div>
            <p>
              Total Time: {hours} hours {minutes} minutes {seconds} seconds
            </p>
          </div>
          {/* Quiz image upload */}
          <Form.Label>Mock Test Cover Image</Form.Label>
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
              Upload your Mock Test image here. It must meet our Mock image
              quality standards to be accepted. Important guidelines: 750x440
              pixels; .jpg, .jpeg,. gif, or .png. no text on the image.
            </Form.Text>
          </Form.Group>
          {/* Quiz Question Details */}
          <Form.Label className="my-4">Mock Test Question Details</Form.Label>

          {questionsList.map((question, index) => (
            <div key={index}>
              <Row>
                <Col>
                  <Form.Label className="mt-3">Question Number</Form.Label>
                  <Form.Control
                    type="number"
                    className="text-muted"
                    value={question.question_number}
                    onChange={(e) =>
                      setQuestionsList((prevList) =>
                        prevList.map((q, i) =>
                          i === index
                            ? {
                                ...q,
                                question_number: parseInt(e.target.value),
                              }
                            : q
                        )
                      )
                    }
                    disabled
                  />
                </Col>
                <Col>
                  <Form.Label className="mt-3">Question Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={question.question_type}
                    onChange={(e) =>
                      setQuestionsList((prevList) =>
                        prevList.map((q, i) =>
                          i === index
                            ? { ...q, question_type: e.target.value }
                            : q
                        )
                      )
                    }
                    required
                  >
                    <option value="">Select Choice</option>
                    <option value="single_choice">Single Choice</option>
                    <option value="multiple_choice">Multiple Choice</option>
                    <option value="fill_in_blank">Fill in the Blank</option>
                    <option value="true_false">True/False</option>
                  </Form.Control>
                </Col>
              </Row>
              {/* Options */}

              <Col>
                <Form.Label className="mt-3">Question</Form.Label>
                <Form.Control
                  placeholder="Write Question"
                  type="text"
                  value={question.question}
                  onChange={(e) =>
                    setQuestionsList((prevList) =>
                      prevList.map((q, i) =>
                        i === index ? { ...q, question: e.target.value } : q
                      )
                    )
                  }
                />
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="mt-3">Answer Explanation</Form.Label>
                  <QuizQuillEditor
                    value={question.explanation}
                    onChange={(value) => handleContentChange(value, index)}
                  />
                </Form.Group>
              </Col>
              {question.question_type === "multiple_choice" && (
                <div>
                  <Form.Label className="mt-3">Answer Options</Form.Label>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <Row>
                        <Col>
                          <Form.Label>Option</Form.Label>
                          <Form.Control
                            placeholder="Option"
                            type="chekbox"
                            value={option.text}
                            onChange={(e) =>
                              setQuestionsList((prevList) =>
                                prevList.map((q, i) =>
                                  i === index
                                    ? {
                                        ...q,
                                        options: q.options.map((opt, oi) =>
                                          oi === optionIndex
                                            ? { ...opt, text: e.target.value }
                                            : opt
                                        ),
                                      }
                                    : q
                                )
                              )
                            }
                          />
                        </Col>
                        <Col className=" mt-5">
                          <input
                            type="checkbox"
                            className="mx-4"
                            checked={option.correctAnswer}
                            onChange={() =>
                              handleSwitchChange(index, optionIndex)
                            }
                            color="primary"
                          />

                          <Button
                            type="button"
                            onClick={() =>
                              handleRemoveOption(index, optionIndex)
                            }
                          >
                            Remove Option
                          </Button>
                          <span className="mx-3">
                            Answer : {option.correctAnswer.toString()}
                          </span>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </div>
              )}
              {question.question_type === "single_choice" && (
                <div>
                  <Form.Label>Options</Form.Label>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <Row className="mt-4">
                        <Col>
                          <Form.Label>Option</Form.Label>
                          <Form.Control
                            placeholder="Option"
                            type="text"
                            value={option.text}
                            onChange={(e) =>
                              setQuestionsList((prevList) =>
                                prevList.map((q, i) =>
                                  i === index
                                    ? {
                                        ...q,
                                        options: q.options.map((opt, oi) =>
                                          oi === optionIndex
                                            ? { ...opt, text: e.target.value }
                                            : opt
                                        ),
                                      }
                                    : q
                                )
                              )
                            }
                          />
                        </Col>
                        <Col className="d-flex mt-5">
                          <Form.Check
                            className="mx-4 mt-2"
                            type="radio"
                            name={`correctAnswer-${index}`}
                            id={`correctAnswer-${index}-${optionIndex}`}
                            checked={option.correctAnswer}
                            onChange={() =>
                              setQuestionsList((prevList) =>
                                prevList.map((q, i) =>
                                  i === index
                                    ? {
                                        ...q,
                                        options: q.options.map((opt, oi) =>
                                          oi === optionIndex
                                            ? { ...opt, correctAnswer: true }
                                            : { ...opt, correctAnswer: false }
                                        ),
                                      }
                                    : q
                                )
                              )
                            }
                          />
                          <Button
                            className="p-1"
                            type="button"
                            onClick={() =>
                              handleRemoveOption(index, optionIndex)
                            }
                          >
                            Remove Option
                          </Button>
                          <span className="mx-4 mt-2">
                            Answer : {option.correctAnswer.toString()}
                          </span>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </div>
              )}

              {question.question_type === "fill_in_blank" && (
                <div>
                  <Form.Label>Answer</Form.Label>
                  <Form.Control
                    placeholder="Enter the answer"
                    type="text"
                    value={question.answer}
                    onChange={(e) =>
                      setQuestionsList((prevList) =>
                        prevList.map((q, i) =>
                          i === index ? { ...q, answer: e.target.value } : q
                        )
                      )
                    }
                  />
                </div>
              )}
              {question.question_type === "true_false" && (
                <div>
                  <Form.Label>Correct Answer</Form.Label>
                  <Form.Check
                    type="radio"
                    label="True"
                    name={`true_false_${index}`}
                    checked={question.correctAnswer === true}
                    onChange={() =>
                      setQuestionsList((prevList) =>
                        prevList.map((q, i) =>
                          i === index ? { ...q, correctAnswer: true } : q
                        )
                      )
                    }
                  />
                  <Form.Check
                    type="radio"
                    label="False"
                    name={`true_false_${index}`}
                    checked={question.correctAnswer === false}
                    onChange={() =>
                      setQuestionsList((prevList) =>
                        prevList.map((q, i) =>
                          i === index ? { ...q, correctAnswer: false } : q
                        )
                      )
                    }
                  />
                </div>
              )}
              <Form.Group>
                <Row className="mt-3">
                  <Form.Label></Form.Label>
                  {question.question_type === "true_false" ||
                  question.question_type === "fill_in_blank" ? (
                    " "
                  ) : (
                    <Col>
                      <Button
                        type="button"
                        className="p-1"
                        onClick={() => handleAddOption(index)}
                      >
                        Add Option
                      </Button>
                    </Col>
                  )}
                  <Col>
                    <Form.Label></Form.Label>
                    <Button
                      type="button"
                      className="mx-7 p-1"
                      onClick={() => handleRemoveQuestion(index)}
                    >
                      Remove Question
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
                  variant="primary"
                  type="button"
                  onClick={handleAddQuestion}
                >
                  Add Question
                </Button>
              </Col>
              <Form.Label></Form.Label>
            </Row>
          </Form.Group>
        </Card.Body>
      </Card>
      {/* Button */}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default QuizInformation;
