import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Row, Card, Form, Button } from "react-bootstrap";
import { ProblemExplanaton, ReactQuillEditor, GuidEditor } from "widgets";
const AddNewproblem = () => {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const { id, action } = router.query;
  const [contestDescription, setContestDescription] = useState("");
  const [selectedCompanyImages, setSelectedCompanyImages] = useState([]);
  const [questionsList, setQuestionsList] = useState([
    {
      question_number: 1,
      problem_title: "",
      problem_level: "",
      problem_hour: "",
      problem_minute: "",
      problem_second: "",
      Function_data: "",
      testCases: [{ input: "", output: "", marks: "" }],
      example: [
        { input_sample: "", output_sample: "", explanation_sample: "" },
      ],
      problem_Statement: "",
      problem_Constraints: "",
      problem_Examplation: "",
    },
  ]);
  const ContestDescription = (value, index) => {
    setContestDescription(value);
  };
  const handleExplanationChange = (value, index) => {
    setQuestionsList((prevList) =>
      prevList.map((q, i) =>
        i === index ? { ...q, problem_Statement: value } : q
      )
    );
  };
  const ConstrantsChange = (value, index) => {
    setQuestionsList((prevList) =>
      prevList.map((q, i) =>
        i === index ? { ...q, problem_Constraints: value } : q
      )
    );
  };
  const handleExplanationDetail = (value, index) => {
    setQuestionsList((prevList) =>
      prevList.map((q, i) =>
        i === index ? { ...q, problem_Examplation: value } : q
      )
    );
  };
  const SampleExplanation = (value, setIndex, exampleIndex) => {
    setQuestionsList((prevList) =>
      prevList.map((q, i) =>
        i === setIndex
          ? {
              ...q,
              example: q.example.map((ex, j) =>
                j === exampleIndex ? { ...ex, explanation_sample: value } : ex
              ),
            }
          : q
      )
    );
  };
  const handleTimeChange = (type, value, questionIndex) => {
    setQuestionsList((prevQuestionsList) => {
      const updatedQuestionsList = [...prevQuestionsList];
      const updatedQuestion = { ...updatedQuestionsList[questionIndex] };
      if (type === "hour") {
        updatedQuestion.problem_hour = value;
      } else if (type === "minute") {
        updatedQuestion.problem_minute = value;
      } else if (type === "second") {
        updatedQuestion.problem_second = value;
      }
      updatedQuestionsList[questionIndex] = updatedQuestion;
      return updatedQuestionsList;
    });
  };
  const addsample = (questionIndex) => {
    setQuestionsList((prevList) => {
      const updatedList = [...prevList];
      updatedList[questionIndex] = {
        ...updatedList[questionIndex],
        example: [
          ...updatedList[questionIndex].example,
          {
            input_sample: "",
            output_sample: "",
            explanation_sample: "",
          },
        ],
      };
      return updatedList;
    });
  };
  const [formData, setFormData] = useState({
    contest_title: "",
    category: "",
    contest_level: "",
    start_date: "",
    questionsList: [],
  });
  const fetchProblem = async () => {
    try {
      const response = await axios.get(`/api/problemDay/${id}`);
      const data = response.data && response.data.problem;
      console.log(data);
      if (!data) {
        throw new Error("No data found in the response");
      }

      const mappedTopics = data.questionsList.map((question) => ({
        problem_title: question.problem_title || "",
        problem_Statement: question.problem_Statement || "",
        problem_hour: question.problem_hour || "",
        problem_minute: question.problem_minute || "",
        problem_second: question.problem_second || "",
        Function_data: question.Function_data || "",
        testCases: question.testCases || [{ input: "", output: "", marks: "" }],
        example: question.example || [
          { input_sample: "", output_sample: "", explanation_sample: "" },
        ],
        problem_Constraints: question.problem_Constraints || "",
        problem_Examplation: question.problem_Examplation || "",
      }));
      setQuestionsList(mappedTopics);
      setFormData({
        contest_title: data.contest_title || "",
        category: data.category || "",
        contest_level: data.contest_level || "",
        start_date: data.contest_startDate || "",
      });

      setContestDescription(data.contest_description);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProblem();
    }
  }, [id]);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDatas = new FormData();
      formDatas.append("contest_title", formData.contest_title);
      formDatas.append("category", formData.category);
      formDatas.append("contest_level", formData.contest_level);
      formDatas.append("contest_startDate", formData.start_date);
      formDatas.append("contest_description", contestDescription);
      formDatas.append(
        "questionsList",
        JSON.stringify(
          questionsList.map((question) => ({
            problem_hour: question.problem_hour,
            problem_minute: question.problem_minute,
            problem_second: question.problem_second,
            Function_data: question.Function_data,
            problem_Statement: question.problem_Statement,
            problem_Constraints: question.problem_Constraints,
            problem_Examplation: question.problem_Examplation,
            example: question.example,
            testCases: question.testCases,
          }))
        )
      );
      for (let i = 0; i < selectedCompanyImages.length; i++) {
        formDatas.append("companyImages", selectedCompanyImages[i]);
      }
      if (image) {
        formDatas.append("image", image);
      }
      if (action === "update") {
        const response = await axios.put(
          `/api/problemDay/crudProblem?id=${id}`,
          formDatas
        );
        if (response.status === 200) {
          toast.success("Contest updated successfully");
          router.back();
        } else {
          toast.error("Contest not updated. Please try again.");
          console.error("Error updated contest:", response);
        }
      } else {
        const response = await axios.post(
          "/api/problemDay/crudProblem",
          formDatas
        );
        if (response.status === 201) {
          toast.success("Problem added successfully");
          router.back();
        } else {
          toast.error("Problem not added. Please try again.");
          console.error("Error creating Problem: else", response);
        }
      }
    } catch (error) {
      toast.error("Problem not added. Please try again.");
      console.error("Error creating Problem catch:", error.response);
    }
  };
  //**************************************fend Update Contest ************************************************** */
  const [category, setCategory] = useState("");

  const ContestLevel = [
    { value: "Easy", label: "Easy" },
    { value: "Modrate", label: "Modrate" },
    { value: "Hard", label: "Hard" },
  ];
  const getcategories = async (req, res) => {
    try {
      const res = await axios.get(`/api/problemDay/crudCategory`);
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getcategories();
  }, []);
  const handleChangeCategory = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, category: value });
  };
  const handleInputExample = (questionIndex, exampleIndex, value, type) => {
    setQuestionsList((prevList) => {
      const updatedList = [...prevList];
      updatedList[questionIndex].example[exampleIndex][type] = value;
      return updatedList;
    });
  };
  const removeExample = (questionIndex, exampleIndex) => {
    setQuestionsList((prevList) => {
      const updatedList = [...prevList];
      updatedList[questionIndex].example.splice(exampleIndex, 1);
      return updatedList;
    });
  };

  const addTestCase = (questionIndex) => {
    setQuestionsList((prevList) => {
      const updatedList = [...prevList];
      updatedList[questionIndex] = {
        ...updatedList[questionIndex],
        testCases: [
          ...updatedList[questionIndex].testCases,
          { input: "", output: "", marks: "" },
        ],
      };
      return updatedList;
    });
  };
  const handleInputChange = (questionIndex, testCaseIndex, value, type) => {
    setQuestionsList((prevList) => {
      const updatedList = [...prevList];
      updatedList[questionIndex].testCases[testCaseIndex][type] = value;
      return updatedList;
    });
  };

  const removeTestCase = (questionIndex, testCaseIndex) => {
    setQuestionsList((prevList) => {
      const updatedList = [...prevList];
      updatedList[questionIndex].testCases.splice(testCaseIndex, 1);
      return updatedList;
    });
  };
  const handleCompanyImagesChange = (files) => {
    setSelectedCompanyImages([...files]);
  };
  return (
    <Form onSubmit={handleFormSubmit}>
      <ToastContainer />
      {/* Card */}
      <Card className="mb-3">
        <Card.Header className="border-bottom px-4 py-3">
          <h3 className="mb-0">
            <u>Basic Information for Add New Problem Of The Day</u>
          </h3>
        </Card.Header>
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="ContestTitle">Problem Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Contest Title"
              id="Contest_title"
              name="Contest_title"
              value={formData.contest_title || ""}
              onChange={(e) =>
                setFormData({ ...formData, contest_title: e.target.value })
              }
              required
            />
            <Form.Text className="text-muted">
              Write a 60 character Problem title.
            </Form.Text>
            <br />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="companyImages">
              Upload Company Images:
            </Form.Label>
            <Form.Control
              type="file"
              id="companyImages"
              name="companyImages"
              multiple
              onChange={(e) => handleCompanyImagesChange(e.target.files)}
            />
            {selectedCompanyImages.length > 0 && (
              <div>
                <h5>Selected Company Images:</h5>
                <ul>
                  {selectedCompanyImages.map((image, index) => (
                    <li key={index}>{image.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-5">
                <Form.Label>Contest Category</Form.Label>
                <Form.Select
                  value={formData.category}
                  onChange={handleChangeCategory}
                >
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
                <Form.Label>Problem level</Form.Label>
                <Form.Select
                  value={formData.contest_level}
                  onChange={(e) =>
                    setFormData({ ...formData, contest_level: e.target.value })
                  }
                  required
                >
                  <option value="">Select contest level</option>
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
                <Form.Label htmlFor="start_date">Select Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="enter date of satrted contest"
                  id="start_date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={(e) =>
                    setFormData({ ...formData, start_date: e.target.value })
                  }
                  required
                />
                <br />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label className="me-5">Problem Description</Form.Label>
            <GuidEditor
              value={contestDescription}
              onChange={ContestDescription}
            />
          </Form.Group>
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
        </Card.Body>
        <Card.Body>
          {questionsList.map((question, questionIndex) => (
            <div key={questionIndex}>
              <Row>
                <h2>
                  <u>ENTER PROBLEM DETAILS</u>
                </h2>
                <Form.Group className="mb-3">
                  <Form.Label className="me-5">Problem Statement</Form.Label>
                  <GuidEditor
                    onChange={(value) =>
                      handleExplanationChange(value, questionIndex)
                    }
                    value={
                      questionsList[questionIndex]?.problem_Statement || ""
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="me-5">Problem Constraints</Form.Label>
                  <GuidEditor
                    value={question.problem_Constraints}
                    onChange={(value) => ConstrantsChange(value, questionIndex)}
                  />
                </Form.Group>
                <Row>
                  <Form.Label htmlFor="SelectTime">Average Time</Form.Label>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Select
                        as="select"
                        placeholder="select hours"
                        id="hour"
                        name="hour"
                        value={question.problem_hour}
                        onChange={(e) =>
                          handleTimeChange(
                            "hour",
                            e.target.value,
                            questionIndex
                          )
                        }
                        required
                      >
                        <option value="">Select hours</option>
                        {Array.from({ length: 12 }, (_, index) => index).map(
                          (hour) => (
                            <option key={hour} value={hour}>
                              {hour}
                            </option>
                          )
                        )}
                      </Form.Select>

                      <Form.Text className="text-muted">
                        Select date but not select previous date
                      </Form.Text>
                      <br />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Select
                        as="select"
                        placeholder="select minute"
                        id="minute"
                        name="minute"
                        value={question.problem_minute}
                        onChange={(e) =>
                          handleTimeChange(
                            "minute",
                            e.target.value,
                            questionIndex
                          )
                        }
                        required
                      >
                        <option value="">Select minute</option>
                        {Array.from({ length: 60 }, (_, index) => index).map(
                          (minute) => (
                            <option key={minute} value={minute}>
                              {minute}
                            </option>
                          )
                        )}
                      </Form.Select>
                      <Form.Text className="text-muted">
                        Select date of ended date
                      </Form.Text>
                      <br />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Select
                        as="select"
                        placeholder="select seconds"
                        id="seconds"
                        name="seconds"
                        value={question.problem_second}
                        onChange={(e) =>
                          handleTimeChange(
                            "second",
                            e.target.value,
                            questionIndex
                          )
                        }
                        required
                      >
                        <option value="">Select seconds</option>
                        {Array.from({ length: 60 }, (_, index) => index).map(
                          (second) => (
                            <option key={second} value={second}>
                              {second}
                            </option>
                          )
                        )}
                      </Form.Select>
                      <Form.Text className="text-muted">
                        Select date of ended date
                      </Form.Text>
                      <br />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="me-5">
                    Explanation in Details
                  </Form.Label>
                  <GuidEditor
                    onChange={(value) =>
                      handleExplanationDetail(value, questionIndex)
                    }
                    value={
                      questionsList[questionIndex]?.problem_Examplation || ""
                    }
                  />
                </Form.Group>
              </Row>
              <Col>
                <Form.Label>Problem Function</Form.Label>
                <Form.Control
                  placeholder="Write Function"
                  as="textarea"
                  rows={3}
                  value={question.Function_data}
                  onChange={(e) =>
                    setQuestionsList((prevList) =>
                      prevList.map((q, i) =>
                        i === questionIndex
                          ? { ...q, Function_data: e.target.value }
                          : q
                      )
                    )
                  }
                />
              </Col>
              <Form.Group>
                <h3>
                  <u>Test Cases</u>
                </h3>
                {question &&
                  question.testCases &&
                  question.testCases.map((testCase, index) => (
                    <div key={index} className="mb-4 border rounded p-4">
                      <Row>
                        <Col>
                          <Form.Group>
                            <Form.Label>Test Case Input:{index + 1}</Form.Label>
                            <Form.Control
                              type="text"
                              value={testCase.input}
                              onChange={(e) =>
                                handleInputChange(
                                  questionIndex,
                                  index,
                                  e.target.value,
                                  "input"
                                )
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group>
                            <Form.Label>
                              Test Case Output:{index + 1}
                            </Form.Label>
                            <Form.Control
                              type="text"
                              value={testCase.output}
                              onChange={(e) =>
                                handleInputChange(
                                  questionIndex,
                                  index,
                                  e.target.value,
                                  "output"
                                )
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group>
                            <Form.Label>Marks:{index + 1}</Form.Label>
                            <Form.Control
                              type="text"
                              value={testCase.marks}
                              onChange={(e) =>
                                handleInputChange(
                                  questionIndex,
                                  index,
                                  e.target.value,
                                  "marks"
                                )
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Button
                        className="my-2 p-1 btn-sm"
                        type="button"
                        variant="info"
                        onClick={() => removeTestCase(questionIndex, index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
              </Form.Group>
              <Form.Group>
                <Row className="mt-3">
                  <Form.Label></Form.Label>
                  <Col>
                    <Button
                      type="button"
                      className="btn-sm"
                      onClick={() => addTestCase(questionIndex)}
                      variant="primary"
                    >
                      Add Test Case
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group>
                <h3>
                  <u>Add Example</u>
                </h3>
                {question &&
                  question.example &&
                  question.example.map((example, index) => (
                    <div key={index} className="mb-4 border rounded p-4">
                      <Row>
                        <Col>
                          <Form.Group>
                            <Form.Label>Sample input: {index + 1}</Form.Label>
                            <Form.Control
                              type="text"
                              value={example.input_sample} // Set the value here
                              onChange={(e) =>
                                handleInputExample(
                                  questionIndex,
                                  index,
                                  e.target.value,
                                  "input_sample"
                                )
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group>
                            <Form.Label>Sample Output:{index + 1}</Form.Label>
                            <Form.Control
                              type="text"
                              value={example.output_sample} // Set the value here
                              onChange={(e) =>
                                handleInputExample(
                                  questionIndex,
                                  index,
                                  e.target.value,
                                  "output_sample"
                                )
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group>
                        <Form.Label>
                          Sample Explanation : {index + 1}
                        </Form.Label>
                        <ProblemExplanaton
                          value={example.explanation_sample}
                          onChange={(value) =>
                            SampleExplanation(value, questionIndex, index)
                          }
                        />
                      </Form.Group>
                      <Button
                        className="my-2 p-1 btn-sm"
                        type="button"
                        variant="info"
                        onClick={() => removeExample(questionIndex)}
                      >
                        Remove Example
                      </Button>
                    </div>
                  ))}
              </Form.Group>
              <Form.Group>
                <Row className="mt-5">
                  <Col>
                    <Button
                      type="button"
                      className="btn-sm"
                      onClick={() => addsample(questionIndex)}
                      variant="primary"
                    >
                      Add Example sample
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </div>
          ))}
        </Card.Body>
      </Card>
      <Button variant="info" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddNewproblem;
