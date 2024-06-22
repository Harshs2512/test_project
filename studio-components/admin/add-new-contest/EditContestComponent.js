import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Row, Card, Form, Button } from "react-bootstrap";
import { ReactQuillEditor, ContestQuillEditor } from "widgets";
const EditContestComponent = () => {
  const quillRef = useRef(null);
  const [existingData, setexistingData] = useState();
  const router = useRouter();
  const [image, setImage] = useState(null);
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
      constrants: "",
      problem_Examplation: "",
    },
  ]);
  const handleExplanationChange = (value, index) => {  
    setQuestionsList((prevList) =>
      prevList.map((q, i) =>
        i === index ? { ...q, problem_Statement: value } : q
      )
    );
  };
  
  const ConstrantsChange = (value, index) => {
    setQuestionsList((prevList) =>
      prevList.map((q, i) => (i === index ? { ...q, constrants: value } : q))
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
                j === exampleIndex
                  ? { ...ex, explanation_sample: String(value) }
                  : ex
              ),
            }
          : q
      )
    );
  };

  const ContestDescription = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      contest_description: value,
    }));
    if (quillRef.current) {
      const length = value.length;
      quillRef.current.editor.setSelection(length, length);
    }
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
    endDate: "",
    contest_description: "",
    questionsList: [],
  });
  const handleAddQuestion = () => {
    setQuestionsList((prevList) => [
      ...prevList,
      {
        question_number: prevList.length + 1,
        problem_title: "",
        problem_level: "",
        problem_hour: "",
        problem_minute: "",
        problem_second: "",
        Function_data: "",
        testCases: [],
        example: [],
      },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    setQuestionsList((prevList) => prevList.filter((q, i) => i !== index));
  };
  const findContest = async (req, res) => {
    try {
      const res = await axios.get(`/api/Contest/${router.query.contestId}`);
      setexistingData(res && res.data && res.data.contest);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (router.query.contestId) {
      findContest();
    }
  }, []);
  useEffect(() => {
    if (existingData) {
      setFormData({
        contest_title: existingData.contest_title || "",
        category: existingData.category || "",
        contest_level: existingData.contest_level || "",
        start_date: existingData.contest_startDate || "",
        endDate: existingData.contest_endDate || "",
        questionsList: existingData.questionsList || [],
        contest_description: existingData.contest_description || "",
      });
      if (existingData.questionsList) {
        setQuestionsList(existingData.questionsList);
      }
    }
  }, [existingData]);
  const [category, setCategory] = useState("");

  const ContestLevel = [
    { value: "Easy", label: "Easy" },
    { value: "Modrate", label: "Modrate" },
    { value: "Hard", label: "Hard" },
  ];
  const getcategories = async (req, res) => {
    try {
      const res = await axios.get(`/api/Contest/crudCategory`);
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
  return (
    <Form>
      <ToastContainer />
      {/* Card */}
      <Card className="mb-3">
        <Card.Header className="border-bottom px-4 py-3">
          <h3 className="mb-0">
            <u>Basic Information for Update Contest</u>
          </h3>
        </Card.Header>
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="ContestTitle">Contest Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Contest Title"
              id="Contest_title"
              name="Contest_title"
              value={formData.contest_title}
              onChange={(e) =>
                setFormData({ ...formData, contest_title: e.target.value })
              }
              required
            />
            <Form.Text className="text-muted">
              Write a 60 character contest title.
            </Form.Text>
            <br />
          </Form.Group>
          <Form.Group className="mb-5">
            <Form.Label>Contest Category</Form.Label>
            <Form.Select
              onChange={handleChangeCategory}
              value={formData.category}
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
          <Form.Group className="mb-3">
            <Form.Label>Contest level</Form.Label>
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

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="start_date">Started Date</Form.Label>
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
                <Form.Text className="text-muted">
                  select date but not select previous date
                </Form.Text>
                <br />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="endDate">Ended Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="enter date of ended contest"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  required
                />
                <Form.Text className="text-muted">
                  Select date of ended date
                </Form.Text>
                <br />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label className="me-5">Contest Description</Form.Label>
            <ReactQuillEditor
              value={formData.contest_description}
              onChange={(value) => ContestDescription(value)}
              quillRef={(ref) => (quillRef.current = ref)}
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
                <Col lg={2}>
                  <Form.Label>Problem Number</Form.Label>
                  <Form.Control
                    type="number"
                    className="text-muted"
                    value={question.question_number}
                    onChange={(e) =>
                      setQuestionsList((prevList) =>
                        prevList.map((q, i) =>
                          i === questionIndex
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
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="problemTitle">
                      problem Title
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Problem Title"
                      id="problem_title"
                      name="problem_title"
                      value={question.problem_title}
                      onChange={(e) =>
                        setQuestionsList((prevList) =>
                          prevList.map((q, i) =>
                            i === questionIndex
                              ? { ...q, problem_title: e.target.value }
                              : q
                          )
                        )
                      }
                      required
                    />
                    <Form.Text className="text-muted">
                      Write a 60 character contest title.
                    </Form.Text>
                    <br />
                  </Form.Group>
                </Col>
                <Form.Group className="mb-3">
                  <Form.Label className="me-5">Problem Statement</Form.Label>
                  <ReactQuillEditor
                     value={question.problem_Statement}
                    onChange={(value) =>
                      handleExplanationChange(value, questionIndex)
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Problem level</Form.Label>
                  <Form.Select
                    value={question.problem_level}
                    onChange={(e) =>
                      setQuestionsList((prevList) =>
                        prevList.map((q, i) =>
                          i === questionIndex
                            ? { ...q, problem_level: e.target.value }
                            : q
                        )
                      )
                    }
                    required
                  >
                    <option value="">Select problem level</option>
                    {ContestLevel.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="me-5">Problem Constraints</Form.Label>
                  <ReactQuillEditor
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
                          setQuestionsList((prevList) =>
                            prevList.map((q, i) =>
                              i === questionIndex
                                ? { ...q, problem_hour: e.target.value }
                                : q
                            )
                          )
                        }
                        required
                      >
                        <option value="">Select hours</option>
                        {Array.from(
                          { length: 12 },
                          (_, index) => index + 1
                        ).map((hour) => (
                          <option key={hour} value={hour}>
                            {hour}
                          </option>
                        ))}
                      </Form.Select>

                      <Form.Text className="text-muted">
                        select date but not select previous date
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
                          setQuestionsList((prevList) =>
                            prevList.map((q, i) =>
                              i === questionIndex
                                ? { ...q, problem_minute: e.target.value }
                                : q
                            )
                          )
                        }
                        required
                      >
                        <option value="">Select minute</option>
                        {Array.from(
                          { length: 59 },
                          (_, index) => index + 1
                        ).map((hour) => (
                          <option key={hour} value={hour}>
                            {hour}
                          </option>
                        ))}
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
                          setQuestionsList((prevList) =>
                            prevList.map((q, i) =>
                              i === questionIndex
                                ? { ...q, problem_second: e.target.value }
                                : q
                            )
                          )
                        }
                        required
                      >
                        <option value="">Select seconds</option>
                        {Array.from(
                          { length: 59 },
                          (_, index) => index + 1
                        ).map((hour) => (
                          <option key={hour} value={hour}>
                            {hour}
                          </option>
                        ))}
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
                  <ReactQuillEditor
                    value={question.problem_Examplation}
                    onChange={(value) =>
                      handleExplanationDetail(value, questionIndex)
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
                      <Form.Group>
                        <Form.Label>Test Case Output:{index + 1}</Form.Label>
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
                      <Form.Group>
                        <Form.Label>Marks{index + 1}</Form.Label>
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
                      <Form.Group>
                        <Form.Label>Sample input: {index + 1}</Form.Label>
                        <Form.Control
                          type="text"
                          value={example.input_sample}
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
                      <Form.Group>
                        <Form.Label>Sample Output:{index + 1}</Form.Label>
                        <Form.Control
                          type="text"
                          value={example.output_sample}
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
                      <Form.Group>
                        <Form.Label>
                          Sample Explanation : {index + 1}
                        </Form.Label>
                        <ContestQuillEditor
                          value={question.example[index].explanation_sample}
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
                  <Col>
                    <Form.Label></Form.Label>
                    <Button
                      type="button"
                      className="mx-7 p-1"
                      onClick={() => handleRemoveQuestion(questionIndex)}
                    >
                      Remove Question
                    </Button>
                  </Col>
                  <Form.Label></Form.Label>
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
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default EditContestComponent;
