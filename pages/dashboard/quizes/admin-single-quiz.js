// import node module libraries
import { useState, useEffect, Fragment,useCallback} from "react";
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QuizQuillEditor } from "widgets";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import {
  Card,
  Modal,
  Button,
  Form,
  Image,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";
import { useRouter } from "next/router";
import Loading from '../../loading'
const QuizSingle = () => {
  const router = useRouter();
  const { quizId } = router.query;
  const [setsingleQuiz, setsetsingleQuiz] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [showModelExplanation, setShowModelExplanation] = useState(false);
  const [explanationData, setExplanationData] = useState('')
  const fetchQuiz = useCallback(async () => {
    try {
      const response = await axios.get(`/api/quiz/${quizId}`);
      setsetsingleQuiz(response.data.quiz);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  },[quizId]);
  useEffect(() => {
    if (quizId) {
      fetchQuiz();
    }
  }, [quizId,fetchQuiz]);
  const handleDeleteQuestion = async (quizId, questionId) => {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success ms-2',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          const response = axios.delete(
            `/api/quiz/quizQu/question?quizId=${quizId}&questionId=${questionId}`
          );
          if (response) {
            fetchQuiz();
          }
          else {
            toast.error("something went wrong")
          }
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    } catch (error) {
      toast.error("Somtihing went wrong");
      console.log(error)
    }
  }
  const showExplanation = async (quizId, questionId) => {
    setShowModelExplanation(true);
    try {
      const response = await axios.get(
        `/api/quiz/quizQu/getSingleQ?quizId=${quizId}&questionId=${questionId}`);
      ;
      setExplanationData(response.data)
    } catch (error) {
      console.error("Error updating question:", error);
    }

  }
  const handleClose = () => {
    setShowModelExplanation(false);
  }
  //***************************************************************************** */

  const handleAddNewQuestions = async (quizId, questionsList) => {
    try {
      const response = await axios.post(`/api/quiz/quizQu/addquestion?quizId=${quizId}`, questionsList);
      toast.success("Question added successfully");
      setModalShow(false);
      fetchQuiz();

    } catch (error) {
      console.error("Error adding question:", error);
      toast.error("Failed to add question");
    }
  };

  //***************************************************************************** */
  const AddNewQuestion = (props) => {
    const lastQuestionNumber = setsingleQuiz && setsingleQuiz.questions_list && setsingleQuiz.questions_list.length > 0
      ? setsingleQuiz.questions_list.length
      : 0
    const [questionsList, setQuestionsList] = useState([
      {
        question_number: lastQuestionNumber + 1,
        question: "",
        options: [],
        explanation: ""
      },
    ]);
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
    const handleContentChange = (value, index) => {
      setQuestionsList((prevList) =>
        prevList.map((q, i) =>
          i === index ? { ...q, explanation: value } : q
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
          question_number: prevList.length > 0 ? prevList[prevList.length - 1].question_number + 1 : 1,
          question_type: "",
          question: "",
          options: [],
          explanation: ''
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
    return (
      <Modal className="modal-lg"
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>Add New Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
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
                      disabled />
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
                      required>
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
                    <Form.Label className='mt-3'>Answer Explanation</Form.Label>
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
                          <Col className="mt-4">
                            <input type="checkbox" className="mx-4"
                              checked={option.correctAnswer}
                              onChange={() =>
                                handleSwitchChange(index, optionIndex)
                              }
                              color="primary"
                            />
                            <Button
                              type="button"
                              onClick={() => handleRemoveOption(index, optionIndex)}
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
                              onClick={() => handleRemoveOption(index, optionIndex)}
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
                            i === index
                              ? { ...q, answer: e.target.value }
                              : q
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
                    {question.question_type === "true_false" || question.question_type === "fill_in_blank" ? " " :
                      <Col>
                        <Button
                          type="button" className="p-1"
                          onClick={() => handleAddOption(index)}
                        >
                          Add Option
                        </Button>
                      </Col>
                    }
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
                  <Button className="p-1"
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
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="secondary" className="p-1" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" className="p-1" onClick={() => handleAddNewQuestions(quizId, questionsList)} >
            Add New Question
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const handleUpdate = async (id, status) => {
    try {
      const res = await axios.put(`/api/quiz/updatestatus`, { id: id, is_published: status })
      if (res) {
        toast.success(`Course Updated successfully`, {
          onClose: () => {
            router.push("/dashboard/quizes/all-quizes");
          },
        });
      } else {
        toast.error("something went wrong")
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
      console.log(error)
    }
  }
  return (
    <Fragment >
      <ToastContainer />
      <Card className="mb-4">
        <Card.Body>
          <div className="d-lg-flex justify-content-between align-items-center">
            {setsingleQuiz ? (
              <div className="d-flex align-items-center">
                <Link href="#">
                  {setsingleQuiz.image && (
                    <Image
                      src={`data:${setsingleQuiz.image.contentType
                        };base64,${Buffer.from(setsingleQuiz.image.data).toString(
                          "base64"
                        )}`}
                      alt={`Quiz ${setsingleQuiz._id}`}
                      className="rounded img-4by3-lg"
                    />
                  )}
                </Link>
                <div className="ms-3">
                  <h3 className="mb-2">
                    <Link href="#" className="text-inherit">
                      {setsingleQuiz.title}
                    </Link>
                  </h3>
                  <div>
                    <span>
                      <span className="me-2 align-middle">
                        <i className="fe fe-list"></i>
                      </span>
                      {setsingleQuiz.questions_list.length} Questions
                    </span>
                    <span className="ms-2">
                      <span className="me-2 align-middle">
                        <i className="fe fe-clock"></i>
                      </span>
                      {setsingleQuiz.hours} Hours {setsingleQuiz.minutes} Minutes {setsingleQuiz.seconds} seconds
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p>Loading......</p>
            )}
            <div className="d-none d-lg-block">
              <Button variant="primary" onClick={() => setModalShow(true)}>
                Add new Questions
              </Button>
              <AddNewQuestion
                quizId={quizId}
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </div>
          </div>
        </Card.Body>
      </Card>
      {setsingleQuiz ? (
        <div>
          {setsingleQuiz.questions_list.map((question, index) => (
            <Card className="mb-4" key={index}>
              <Card.Body>
                <div key={index}>
                  <Card.Header className="text-inherit">
                    <h4>
                      Question {index + 1}: {question.question}
                    </h4>
                  </Card.Header>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="d-flex">
                      <Row style={{ width: "50rem" }}>
                        <Col>
                          <ListGroup variant="flush">
                            <ListGroup.Item>{option.text}</ListGroup.Item>
                          </ListGroup>
                        </Col>
                        <Col>
                          <ListGroup variant="flush">

                            <ListGroup.Item key={optionIndex}>
                              {" "}
                              {option.correctAnswer.toString()}
                            </ListGroup.Item>

                          </ListGroup>
                        </Col>
                      </Row>
                    </div>
                  ))}
                  <div className="mt-3">
                    {question.question_type === "true_false" && (

                      <p className="mx-4">Correct Answer: {question.answer ? "True" : "False"}</p>

                    )}
                    {question.question_type === "fill_in_blank" && (
                      <p className="mx-4">Correct Answer: {question.answer}</p>
                    )}
                  </div>
                  <div className="mt-3">
                    <Link
                      href={{
                        pathname: "QuestionUpdate",
                        query: { questionId: question._id, quizId: quizId },
                      }}
                      className="btn btn-outline-success ms-2"
                    >
                      Update
                    </Link>
                    <button onClick={() => showExplanation(quizId, question._id)}
                      className="btn btn-outline-success ms-2"
                    >
                      Show Explanation
                    </button>
                    <Link
                      href="#"
                      className="btn btn-outline-danger ms-2"
                      onClick={() => handleDeleteQuestion(quizId, question._id)}
                    >
                      Delete
                    </Link>

                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <Loading />
      )}

      <Modal show={showModelExplanation} onHide={handleClose} className="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>Answer Explanation Of Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div dangerouslySetInnerHTML={{
            __html: explanationData && explanationData.question.explanation
          }}></div>
        </Modal.Body>
      </Modal>
      <div>
        {setsingleQuiz && setsingleQuiz.is_published === "pending" ?
          <>
            <Button
              href="#"
              variant="outline"
              className="btn-outline-secondary btn-sm"
              onClick={() => handleUpdate(quizId, 'reject')}>
              Reject
            </Button>{' '}
            <Button href="#" variant="success" className="btn-sm" onClick={() => handleUpdate(quizId, 'live')}>
              Approved
            </Button>
          </>
          :

          <Button href="#" variant="warning" className="btn-sm" onClick={() => handleUpdate(quizId, 'pending')}>
            Pending
          </Button>
        }
      </div>
    </Fragment>
  );
};
export default QuizSingle;



