// import node module libraries
import { useState, useEffect,useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    QuizQuillEditor
} from 'widgets';
import {
    Button,
    Form,
    Row,
    Col,
    Card,
    Image,

} from "react-bootstrap";
import { useRouter } from "next/router";
// import profile layout wrapper
import ProfileLayout from "layouts/marketing/instructor/ProfileLayout";
const QuestinUpdate = () => {
    const router = useRouter();
    const { questionId, quizId } = router.query;
    const [setsingleQuiz, setsetsingleQuiz] = useState();
    const [answer, setAnswer] = useState("");
    const [explanation, setExplanation] = useState('')
    const [singleq, setSingleq] = useState();
    const [questionType, setQuestionType] = useState('')
    const fetchQuiz = useCallback(async () => {
        try {
            const response = await axios.get(`/api/quiz/${quizId}`);
            setsetsingleQuiz(response.data.quiz);
        } catch (error) {
            console.error("Error fetching quiz:", error);
        }
    }, [quizId]);

    const getSingleQuestion = useCallback(async () => {
        try {
            const response = await axios.get(
                `/api/quiz/quizQu/getSingleQ?quizId=${quizId}&questionId=${questionId}`);
            setSingleq(response.data);
        } catch (error) {
            console.error("Error updating question:", error);
            toast.error("Question is not Updated");
        }
    }, [quizId, questionId]);

    useEffect(() => {
        fetchQuiz();
        getSingleQuestion();
    }, [fetchQuiz, getSingleQuestion]);


    useEffect(() => {
        if (singleq) {
            setQuestionNumber(singleq && singleq.question.question_number);
            setQuestion(singleq && singleq.question.question);
            setQuestionType(singleq && singleq.question.question_type);
            setOptions(singleq && singleq.question.options);
            setAnswer(singleq && singleq.question.answer);
            setExplanation(singleq && singleq.question.explanation);
        }
    }, [singleq]);
    const handleEditQuestion = async (quizId, questionId) => {
        try {
            const response = await axios.put(
                `/api/quiz/quizQu/question?quizId=${quizId}&questionId=${questionId}`, updatedQuestion);
            ;
            router.back();
            toast.success("Question Updated Successfully")
        } catch (error) {
            console.error("Error updating question:", error);
            toast.error("Question is not Updated")
        }
    }
    const [questionNumber, setQuestionNumber] = useState();
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState([
        { text: "", correctAnswer: false },
        { text: "", correctAnswer: false },
    ]);

    const updatedQuestion = {
        question_number: questionNumber,
        question_type: questionType,
        question: question,
        options: options,
        answer: answer,
        explanation: explanation,


    }
    const handleAddOption = () => {
        setOptions([...options, { text: "", correctAnswer: false }]);
    };
    const handleRemoveOption = (index) => {
        setOptions(options.filter((_, i) => i !== index));
    };
    const handleOptionChange = (index, newText) => {
        setOptions(
            options.map((opt, i) => (i === index ? { ...opt, text: newText } : opt))
        );
    };
    const handleSwitchChange = (index) => {
        setOptions(
            options.map((opt, i) =>
                i === index ? { ...opt, correctAnswer: !opt.correctAnswer } : opt
            )
        );
    };
    const handleRadioChange = (index) => {
        const updatedOptions = [...options];
        updatedOptions.forEach((option, i) => {
            option.correctAnswer = i === index;
        });

        setOptions(updatedOptions);
    };
    const handleAnswerChange = (newValue) => {
        setAnswer(newValue);
    };
    const handleContentChange = (value) => {
        setExplanation(value)
    };
    //***************************************************************************** */
    return (
        <ProfileLayout>
            <ToastContainer />
            <Card className="mb-4">
                <Card.Body>
                    <div className="d-lg-flex justify-content-between align-items-center">
                        {setsingleQuiz && setsingleQuiz ? (
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
                                            {setsingleQuiz && setsingleQuiz.title}
                                        </Link>
                                    </h3>
                                    <div>
                                        <span>
                                            <span className="me-2 align-middle">
                                                <i className="fe fe-list"></i>
                                            </span>
                                            {setsingleQuiz && setsingleQuiz.questions_list.length} Questions
                                        </span>
                                        <span className="ms-2">
                                            <span className="me-2 align-middle">
                                                <i className="fe fe-clock"></i>
                                            </span>
                                            {setsingleQuiz && setsingleQuiz.hours} Hours
                                            {setsingleQuiz && setsingleQuiz.minutes} Minutes
                                            {setsingleQuiz && setsingleQuiz.seconds} Seconds
                                        </span>
                                        <span className="ms-2">
                                            <span className="me-2 align-middle">
                                                <i className="fe fe-file-text"></i>
                                            </span>
                                            Result
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="p-3">Loading......</p>
                        )}
                        <div className="d-none d-lg-block">
                        </div>
                    </div>
                </Card.Body>
            </Card>
            <div>
                <Form>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Question Type</Form.Label>
                                <Form.Control
                                    placeholder="Question Type"
                                    type="text"
                                    value={questionType}
                                    onChange={(e) => setQuestionType(e.target.value)}
                                    disabled />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col className="mt-2">
                                <Form.Label>Question</Form.Label>
                                <Form.Control
                                    placeholder="Write Question"
                                    type="text"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                />
                            </Col>
                        </Row>
                    </Form.Group>

                    {singleq && singleq.question.question_type === "fill_in_blank" ?
                        <div>
                            <Form.Label>Answer</Form.Label>
                            <Form.Control
                                placeholder="Enter the answer"
                                type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                            />
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label className='me-5'>Answer Explanation</Form.Label>
                                    <QuizQuillEditor

                                        value={explanation}
                                        onChange={handleContentChange}
                                    />
                                </Form.Group>
                            </Col>
                        </div>
                        :
                        singleq && singleq.question.question_type === "true_false" ?
                            <div>
                                <Form.Label className="mt-4">Correct Answer</Form.Label>
                                <div>
                                    <label className="me-2 mx-2">
                                        <input className="ms-4"
                                            type="radio"
                                            value={answer}
                                            checked={answer === true}
                                            onChange={() => handleAnswerChange(true)}
                                        />
                                        {" "}True
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value={answer}
                                            checked={answer === false}
                                            onChange={() => handleAnswerChange(false)}
                                        />
                                        {' '} False
                                    </label>
                                </div>
                                <Col className="mt-4">
                                    <Form.Group className="mb-3">
                                        <Form.Label className='me-5'>Answer Explanation</Form.Label>
                                        <QuizQuillEditor

                                            value={explanation}
                                            onChange={handleContentChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </div>
                            :

                            singleq && singleq.question.question_type === "single_choice" ?
                                <div>
                                    <Form.Label className="mt-4">Single Choice Correct Answer</Form.Label>
                                    {options.map((option, index) => (
                                        <div key={index}>

                                            <Row>
                                                <Col>
                                                    <Form.Label>Option</Form.Label>
                                                    <Form.Control
                                                        placeholder="Option"
                                                        type="text"
                                                        value={option.text}
                                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                                    />
                                                </Col>
                                                <Col className="d-flex mt-4">
                                                    <Form.Check
                                                        type="radio"
                                                        className="mt-3 mx-2"
                                                        checked={option.correctAnswer}
                                                        onChange={() => handleRadioChange(index)}
                                                    />
                                                    <Button
                                                        className=" mt-2 btn-sm"
                                                        onClick={() => handleRemoveOption(index)}
                                                    >
                                                        Remove Option
                                                    </Button>
                                                    <span className="mx-4 mt-3">Correct Answer: {option.correctAnswer.toString()}</span>
                                                </Col>
                                            </Row>

                                        </div>
                                    ))}
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label className='mt-5'>Answer Explanation</Form.Label>
                                            <QuizQuillEditor

                                                value={explanation}
                                                onChange={handleContentChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </div>
                                :
                           <>
                                    {options.map((option, index) => (
                                        <div key={index}>
                                            <Row className="mt-5">
                                                <Col>
                                                    <Form.Label>Option</Form.Label>
                                                    <Form.Control
                                                        placeholder="Option"
                                                        type="text"
                                                        value={option.text}
                                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                                    />
                                                </Col>
                                                <Col className=" mt-5">
                                                    <input type="checkbox" className="mx-4"
                                                        checked={option.correctAnswer}
                                                        onChange={() => handleSwitchChange(index)}
                                                        color="primary"
                                                    />
                                                    <Button
                                                        type="button"
                                                        className="p-1"
                                                        onClick={() => handleRemoveOption(index)}
                                                    >
                                                        Remove Option
                                                    </Button>
                                                    <span className="mx-4">Correct Answer: {option.correctAnswer.toString()}</span>
                                                </Col>

                                            </Row>

                                        </div>
                                    ))}
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label className='mt-3'>Answer Explanation</Form.Label>
                                            <QuizQuillEditor

                                                value={explanation}
                                                onChange={handleContentChange}
                                            />
                                        </Form.Group>
                                    </Col>
                          </>
                    }
                    <Form.Group>
                        <Form.Label></Form.Label>
                        <Row>
                            <Col>
                                <Button onClick={handleAddOption} className="btn-sm">
                                    Add Option
                                </Button>
                            </Col>
                            <Col>
                                <Button variant="primary" className="btn-sm" onClick={() => handleEditQuestion(quizId, questionId)} >
                                    Update Question
                                </Button>
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
            </div>
        </ProfileLayout>
    );
};
export default QuestinUpdate;
