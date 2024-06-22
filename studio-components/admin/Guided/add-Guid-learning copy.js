import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Row, Card, Form, Button } from "react-bootstrap";
import { GuidEditor, ReactQuillEditor } from "widgets";
const AddLearningGuide = () => {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [contestDescription, setContestDescription] = useState("");
  const { guideId, action } = router.query;
  const [topics, setTopics] = useState([
    {
      topic_name: "",
      questionsList: [
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
          Problem_statement: "",
          problem_Constraints: "",
          DetailsExamplation: "",
        },
      ],
    },
  ]);
  console.log(topics)
  const ContestDescription = (value, index) => {
    setContestDescription(value);
  };

  const ConstrantsChange = (value, topicIndex, questionIndex) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic, tIndex) =>
        tIndex === topicIndex
          ? {
              ...topic,
              questionsList: topic.questionsList.map((question, qIndex) =>
                qIndex === questionIndex
                  ? { ...question, problem_Constraints: value }
                  : question
              ),
            }
          : topic
      )
    );
  };
  const handleExplanationDetail = (value, topicIndex, questionIndex) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic, tIndex) =>
        tIndex === topicIndex
          ? {
              ...topic,
              questionsList: topic.questionsList.map((question, qIndex) =>
                qIndex === questionIndex
                  ? { ...question, DetailsExamplation: value }
                  : question
              ),
            }
          : topic
      )
    );
  };

  const SampleExplanation = (value, topicIndex, questionIndex, index) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic, tIndex) =>
        tIndex === topicIndex
          ? {
              ...topic,
              questionsList: topic.questionsList.map((question, qIndex) =>
                qIndex === questionIndex
                  ? {
                      ...question,
                      example: question.example.map((example, eIndex) =>
                        eIndex === index
                          ? { ...example, explanation_sample: value }
                          : example
                      ),
                    }
                  : question
              ),
            }
          : topic
      )
    );
  };

  const addsample = (topicIndex, questionIndex) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic, tIndex) =>
        tIndex === topicIndex
          ? {
              ...topic,
              questionsList: topic.questionsList.map((question, qIndex) =>
                qIndex === questionIndex
                  ? {
                      ...question,
                      example: [
                        ...question.example,
                        {
                          input_sample: "",
                          output_sample: "",
                          explanation_sample: "",
                        },
                      ],
                    }
                  : question
              ),
            }
          : topic
      )
    );
  };

  const [formData, setFormData] = useState({
    contest_title: "",
    category: "",
    contest_level: "",
    start_date: "",
    endDate: "",
    topics: [],
  });
  const fetchLearnGuid = async () => {
    try {
      const response = await axios.get(`/api/Course-guide/${guideId}`);
      const data = response.data && response.data.contest;
      console.log(data);
      if (!data) {
        throw new Error("No data found in the response");
      }

      const mappedTopics = data.topic.map((topic) => ({
        topic_name: topic.topic_name || "",
        questionsList: topic.questionsList.map((question) => ({
          question_number: question.question_number || 1,
          problem_title: question.problem_title || "",
          problem_level: question.problem_level || "",
          problem_hour: question.problem_hour || "",
          problem_minute: question.problem_minute || "",
          problem_second: question.problem_second || "",
          Function_data: question.Function_data || "",
          testCases: question.testCases || [
            { input: "", output: "", marks: "" },
          ],
          example: question.example || [
            { input_sample: "", output_sample: "", explanation_sample: "" },
          ],
          Problem_statement: question.problem_Constraints || "",
          problem_Constraints: question.problem_Constraints || "",
          DetailsExplanation: "",
        })),
      }));
      console.log(mappedTopics)
      setTopics(mappedTopics);
      setFormData({
        contest_title: data.contest_title || "",
        category: data.category || "",
        contest_level: data.contest_level || "",
        start_date: data.contest_startDate || "",
        endDate: data.contest_endDate || "",
      });

      setContestDescription(data.contest_description);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (guideId) {
      fetchLearnGuid();
    }
  }, [guideId]);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDatas = new FormData();
      formDatas.append("contest_title", formData.contest_title);
      formDatas.append("category", formData.category);
      formDatas.append("contest_level", formData.contest_level);
      formDatas.append("contest_startDate", formData.start_date);
      formDatas.append("contest_endDate", formData.endDate);
      formDatas.append("contest_description", contestDescription);
      formDatas.append(
        "topics",
        JSON.stringify(
          topics.map((topic) => ({
            topic_name: topic.topic_name,
            questionsList: topic.questionsList.map((question) => ({
              question_number: question.question_number,
              problem_title: question.problem_title,
              problem_level: question.problem_level,
              problem_hour: question.problem_hour,
              problem_minute: question.problem_minute,
              problem_second: question.problem_second,
              Function_data: question.Function_data,
              testCases: question.testCases.map((testCase) => ({
                input: testCase.input,
                output: testCase.output,
                marks: testCase.marks,
              })),
              example: question.example.map((sample) => ({
                input_sample: sample.input_sample,
                output_sample: sample.output_sample,
                explanation_sample: sample.explanation_sample,
              })),
              Problem_statement: question.Problem_statement,
              problem_Constraints: question.problem_Constraints,
              DetailsExamplation: question.DetailsExamplation,
            })),
          }))
        )
      );
      if (image) {
        formDatas.append("image", image);
      }
      const response = await axios.post("/api/Course-guide/guided", formDatas);
      if (response.status === 201) {
        toast.success("Contest added successfully");
        router.back();
      } else {
        toast.error("Contest not added. Please try again.");
        console.error("Error creating contest:", response);
      }
    } catch (error) {
      toast.error("Contest not added. Please try again.");
      console.error("Error creating contest:", error.response);
    }
  };
  const handleAddTopic = () => {
    setTopics((prevList) => [
      ...prevList,
      {
        Topic_name: "",
        questionsList: [],
      },
    ]);
  };

  const RemoveTopics = (index) => {
    setTopics((prevList) => prevList.filter((q, i) => i !== index));
  };
  const handleAddQuestion = (topicIndex) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic, index) =>
        index === topicIndex
          ? {
              ...topic,
              questionsList: [
                ...topic.questionsList,
                {
                  question_number: topic.questionsList.length + 1,
                  problem_title: "",
                  problem_level: "",
                  problem_hour: "",
                  problem_minute: "",
                  problem_second: "",
                  Function_data: "",
                  testCases: [],
                  example: [],
                },
              ],
            }
          : topic
      )
    );
  };
  const handleRemoveQuestion = (topicIndex, questionIndex) => {
    setTopics((prevTopics) =>
      prevTopics.map((prevTopic, index) =>
        index === topicIndex
          ? {
              ...prevTopic,
              questionsList: prevTopic.questionsList.filter(
                (question, qIndex) => qIndex !== questionIndex
              ),
            }
          : prevTopic
      )
    );
  };
  const handleAddTestCase = (topicIndex, questionIndex) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic, tIndex) =>
        tIndex === topicIndex
          ? {
              ...topic,
              questionsList: topic.questionsList.map((question, qIndex) =>
                qIndex === questionIndex
                  ? {
                      ...question,
                      testCases: [
                        ...question.testCases,
                        { input: "", output: "", marks: "" },
                      ],
                    }
                  : question
              ),
            }
          : topic
      )
    );
  };

  const handleRemoveTestCase = (topicIndex, questionIndex, testCaseIndex) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic, tIndex) =>
        tIndex === topicIndex
          ? {
              ...topic,
              questionsList: topic.questionsList.map((question, qIndex) =>
                qIndex === questionIndex
                  ? {
                      ...question,
                      testCases: question.testCases.filter(
                        (_, i) => i !== testCaseIndex
                      ),
                    }
                  : question
              ),
            }
          : topic
      )
    );
  };

  //**************************************fend Update Contest ************************************************** */
  const [category, setCategory] = useState("");

  const ContestLevel = [
    { value: "Beginners", label: "Beginners" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
  ];
  const QuestionLevel = [
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
  const handleInputExample = (
    topicIndex,
    questionIndex,
    exampleIndex,
    value,
    field
  ) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic, tIndex) =>
        tIndex === topicIndex
          ? {
              ...topic,
              questionsList: topic.questionsList.map((question, qIndex) =>
                qIndex === questionIndex
                  ? {
                      ...question,
                      example: question.example.map((ex, eIndex) =>
                        eIndex === exampleIndex ? { ...ex, [field]: value } : ex
                      ),
                    }
                  : question
              ),
            }
          : topic
      )
    );
  };

  const removeExample = (topicIndex, questionIndex, exampleIndex) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic, tIndex) =>
        tIndex === topicIndex
          ? {
              ...topic,
              questionsList: topic.questionsList.map((question, qIndex) =>
                qIndex === questionIndex
                  ? {
                      ...question,
                      example: question.example.filter(
                        (_, eIndex) => eIndex !== exampleIndex
                      ),
                    }
                  : question
              ),
            }
          : topic
      )
    );
  };

  const handleTopicNameChange = (value, topicIndex) => {
    setTopics((prevList) =>
      prevList.map((topic, i) =>
        i === topicIndex ? { ...topic, topic_name: value } : topic
      )
    );
  };
  const handleQuestionChange = (value, topicIndex, questionIndex) => {
    setTopics((prevList) =>
      prevList.map((topic, i) =>
        i === topicIndex
          ? {
              ...topic,
              questionsList: topic.questionsList.map((question, j) =>
                j === questionIndex
                  ? { ...question, problem_title: value }
                  : question
              ),
            }
          : topic
      )
    );
  };
  const handleProblemLevelChange = (value, topicIndex, questionIndex) => {
    setTopics((prevList) =>
      prevList.map((topic, i) =>
        i === topicIndex
          ? {
              ...topic,
              questionsList: topic.questionsList.map((question, j) =>
                j === questionIndex
                  ? { ...question, problem_level: value }
                  : question
              ),
            }
          : topic
      )
    );
  };
  const handleTimeChange = (field, value, topicIndex, questionIndex) => {
    setTopics((prevList) =>
      prevList.map((topic, i) =>
        i === topicIndex
          ? {
              ...topic,
              questionsList: topic.questionsList.map((question, j) =>
                j === questionIndex
                  ? { ...question, [`problem_${field}`]: value }
                  : question
              ),
            }
          : topic
      )
    );
  };
  const handleFunctionChange = (value, topicIndex, questionIndex) => {
    setTopics((prevList) =>
      prevList.map((topic, i) =>
        i === topicIndex
          ? {
              ...topic,
              questionsList: topic.questionsList.map((question, j) =>
                j === questionIndex
                  ? { ...question, Function_data: value }
                  : question
              ),
            }
          : topic
      )
    );
  };
  const handleInputChange = (
    topicIndex,
    questionIndex,
    testCaseIndex,
    value,
    field
  ) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic, tIndex) =>
        tIndex === topicIndex
          ? {
              ...topic,
              questionsList: topic.questionsList.map((question, qIndex) =>
                qIndex === questionIndex
                  ? {
                      ...question,
                      testCases: question.testCases.map((testCase, tcIndex) =>
                        tcIndex === testCaseIndex
                          ? { ...testCase, [field]: value }
                          : testCase
                      ),
                    }
                  : question
              ),
            }
          : topic
      )
    );
  };

  const handleProblemState = (value, topicIndex, questionIndex) => 
    setTopics((prevTopics) =>
      prevTopics.map((topic, tIndex) =>
        tIndex === topicIndex
          ? {
              ...topic,
              questionsList: topic.questionsList.map((question, qIndex) =>
                qIndex === questionIndex
                  ? { ...question, Problem_statement: value }
                  : question
              ),
            }
          : topic
      )
    );
  return (
    <Form onSubmit={handleFormSubmit}>
      <ToastContainer />
      {/* Card */}
      <Card className="mb-3">
        <Card.Header className="border-bottom px-4 py-3">
          <h3 className="mb-0">
            <u>Basic Information for Create Learning Path</u>
          </h3>
        </Card.Header>
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="ContestTitle">Path Title</Form.Label>
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
              Write a 60 character contest title.
            </Form.Text>
            <br />
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
            </Col>
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
                  Didn't select previous Date
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
              onChange={ContestDescription}
              value={contestDescription}
            />
          </Form.Group>
          <Form.Label>Cover Image</Form.Label>
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
              Upload your image here. It must meet our Mock image quality
              standards to be accepted. Important guidelines: 750x440 pixels;
              .jpg, .jpeg,. gif, or .png. no text on the image.
            </Form.Text>
          </Form.Group>
        </Card.Body>
        <Card.Body>
          {topics.map((topic, topicIndex) => (
            <div key={topicIndex}>
              <Row>
                <h2>
                  <u>Enter Topic</u>
                </h2>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor={`topic_name_${topicIndex}`}>
                      Topic Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Topic Name"
                      id={`topic_name_${topicIndex}`}
                      name={`topic_name_${topicIndex}`}
                      value={topic.topic_name}
                      onChange={(e) =>
                        handleTopicNameChange(e.target.value, topicIndex)
                      }
                      required
                    />
                    <Form.Text className="text-muted">
                      Write a 60 character contest title.
                    </Form.Text>
                    <br />
                  </Form.Group>
                </Col>
              </Row>
              {topic.questionsList.map((question, questionIndex) => (
                <div key={questionIndex}>
                  {/* Render your question fields here */}
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="problemTitle">
                          Question Title
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Question Title"
                          id="problem_title"
                          name="problem_title"
                          value={question.problem_title}
                          onChange={(e) =>
                            handleQuestionChange(
                              e.target.value,
                              topicIndex,
                              questionIndex
                            )
                          }
                          required
                        />
                        <Form.Text className="text-muted">
                          Enter the title of the problem.
                        </Form.Text>
                        <br />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Problem level</Form.Label>
                        <Form.Select
                          value={question.problem_level}
                          onChange={(e) =>
                            handleProblemLevelChange(
                              e.target.value,
                              topicIndex,
                              questionIndex
                            )
                          }
                          required
                        >
                          <option value="">Select problem level</option>
                          {QuestionLevel.map((level) => (
                            <option key={level.value} value={level.value}>
                              {level.label}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label className="me-5">Problem Statement</Form.Label>
                    <GuidEditor
                      onChange={(value) =>
                        handleProblemState(value, topicIndex, questionIndex)
                      }
                      value={
                        topics[topicIndex]?.questionsList[questionIndex]
                          ?.Problem_statement || ""
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="me-5">
                      Problem Constraints
                    </Form.Label>
                    <GuidEditor
                      onChange={(value) =>
                        ConstrantsChange(value, topicIndex, questionIndex)
                      }
                      value={
                        topics[topicIndex]?.questionsList[questionIndex]
                          ?.problem_Constraints || ""
                      }
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
                              topicIndex,
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
                              topicIndex,
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
                              topicIndex,
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
                        handleExplanationDetail(
                          value,
                          topicIndex,
                          questionIndex
                        )
                      }
                      value={
                        topics[topicIndex].questionsList[questionIndex]
                          .DetailsExamplation
                      }
                    />
                  </Form.Group>
                  <Form.Label>Problem Function</Form.Label>
                  <Form.Control
                    placeholder="Write Function"
                    as="textarea"
                    rows={3}
                    value={question.Function_data} // Set the value here
                    onChange={(e) =>
                      handleFunctionChange(
                        e.target.value,
                        topicIndex,
                        questionIndex
                      )
                    }
                  />

                  <Form.Group>
                    <h3>
                      <u>Test Cases</u>
                    </h3>
                    {question?.testCases?.map((testCase, index) => (
                      <div key={index} className="mb-4 border rounded p-4">
                        <Row>
                          <Col>
                            <Form.Group>
                              <Form.Label>
                                Test Case Input:{index + 1}
                              </Form.Label>
                              <Form.Control
                                type="text"
                                value={testCase.input}
                                onChange={(e) =>
                                  handleInputChange(
                                    topicIndex,
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
                                    topicIndex,
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
                                    topicIndex,
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
                        {/* Remove Test Case Button */}
                        <Button
                          className="my-2 p-1 btn-sm"
                          type="button"
                          variant="info"
                          onClick={() =>
                            handleRemoveTestCase(
                              topicIndex,
                              questionIndex,
                              index
                            )
                          }
                        >
                          Remove
                        </Button>
                      </div>
                    ))}

                    {/* Add Test Case Button */}
                    <Row className="mt-3">
                      <Col>
                        <Button
                          type="button"
                          className="btn-sm"
                          onClick={() =>
                            handleAddTestCase(topicIndex, questionIndex)
                          }
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
                    {question?.example.map((example, index) => (
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
                                    topicIndex,
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
                                value={example.output_sample}
                                onChange={(e) =>
                                  handleInputExample(
                                    topicIndex,
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
                          <GuidEditor
                            onChange={(value) =>
                              SampleExplanation(
                                value,
                                topicIndex,
                                questionIndex,
                                index
                              )
                            }
                            value={example.explanation_sample} // Set the value here
                          />
                        </Form.Group>

                        <Button
                          className="my-2 p-1 btn-sm"
                          type="button"
                          variant="info"
                          onClick={() =>
                            removeExample(topicIndex, questionIndex, index)
                          }
                        >
                          Remove Example
                        </Button>
                      </div>
                    ))}
                  </Form.Group>
                  <Row className="mb-4">
                    <Col>
                      <Button
                        type="button"
                        className="btn-sm"
                        onClick={() => addsample(topicIndex, questionIndex)}
                        variant="primary"
                      >
                        Add Example sample
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        className="p-1"
                        variant="danger"
                        type="button"
                        onClick={() =>
                          handleRemoveQuestion(topicIndex, questionIndex)
                        }
                      >
                        Remove Question
                      </Button>
                    </Col>
                  </Row>
                  {/* Add other fields for the question */}
                </div>
              ))}
              <Row>
                <Col>
                  <Button
                    className="p-1"
                    variant="primary"
                    type="button"
                    onClick={() => handleAddQuestion(topicIndex)}
                  >
                    Add Question
                  </Button>
                </Col>
                <Col>
                  <Form.Label></Form.Label>
                  <Button
                    type="button"
                    className="mx-7 p-1"
                    onClick={() => RemoveTopics(topicIndex)}
                  >
                    Remove Topic
                  </Button>
                </Col>
              </Row>
            </div>
          ))}

          <Form.Group>
            <Row className="mt-5">
              <Col>
                <Button
                  className="p-1"
                  variant="primary"
                  type="button"
                  onClick={handleAddTopic}
                >
                  Add Topic
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

export default AddLearningGuide;
