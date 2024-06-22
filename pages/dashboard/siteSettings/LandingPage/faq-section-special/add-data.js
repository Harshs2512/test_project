import React, { Fragment, useState } from 'react';
import {
    Card, Row, Col, Button, Breadcrumb, Form
} from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddData = () => {
    const [topics, setTopics] = useState([]);
    const [currentTopic, setCurrentTopic] = useState({ title: '', questions: [] });

    const addQuestion = () => {
        setCurrentTopic({
            ...currentTopic,
            questions: [...currentTopic.questions, { question: '', answer: '' }]
        });
    };

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...currentTopic.questions];
        updatedQuestions[index][field] = value;
        setCurrentTopic({ ...currentTopic, questions: updatedQuestions });
    };

    const removeQuestion = (index) => {
        const updatedQuestions = [...currentTopic.questions];
        updatedQuestions.splice(index, 1);
        setCurrentTopic({ ...currentTopic, questions: updatedQuestions });
    };

    const removeQuestionFromTopic = (topicIndex, questionIndex) => {
        const updatedTopics = [...topics];
        updatedTopics[topicIndex].questions.splice(questionIndex, 1);
        setTopics(updatedTopics);
    };

    const addQuestionToTopic = (topicIndex) => {
        const updatedTopics = [...topics];
        updatedTopics[topicIndex].questions.push({ question: '', answer: '' });
        setTopics(updatedTopics);
    };

    const handleQuestionChangeInTopic = (topicIndex, questionIndex, field, value) => {
        const updatedTopics = [...topics];
        updatedTopics[topicIndex].questions[questionIndex][field] = value;
        setTopics(updatedTopics);
    };

    const addTopic = () => {
        if (currentTopic.title.trim() === '') {
            toast.error('Topic title is required');
            return;
        }
        setTopics([...topics, currentTopic]);
        setCurrentTopic({ title: '', questions: [] });
    };

    const removeTopic = (index) => {
        const updatedTopics = [...topics];
        updatedTopics.splice(index, 1);
        setTopics(updatedTopics);
    };

    const handleTopicChange = (field, value) => {
        setCurrentTopic({ ...currentTopic, [field]: value });
    };

    const submitData = async () => {
        const data = {
            topics: topics
        };
    
        try {
            const res = await axios.post(`/api/siteSettings/landingPage/faq-special/addRecord`, data);
            if (res.status === 201) {
                toast.success("Data added successfully");
                setTopics([]);
            } else {
                toast.info("An error occurred");
            }
        } catch (err) {
            toast.error(err.response.data.message || "An error occurred");
        }
    };
    
    return (
        <Fragment>
            <ToastContainer />
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-md-flex ">
                        <div className="mb-3 mb-md-0">
                            <h1 className="mb-1 h2 fw-bold">Add FAQs</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href="#">FAQs</Breadcrumb.Item>
                                <Breadcrumb.Item active>Add FAQs</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                </Col>
            </Row>

            <Row className='align-items-center justify-content-between'>
                <Col lg={6} md={12} sm={12}>
                    {topics.map((topic, index) => (
                        <Card key={index} className='mb-3'>
                            <Card.Header className='d-flex justify-content-between'>
                                <div>
                                    <h4 className="">Topic {index + 1}: {topic.title}</h4>
                                </div>
                                <div>
                                    <Button variant="danger" className='float-right' onClick={() => removeTopic(index)}>Remove Topic</Button>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                {topic.questions.map((question, qIndex) => (
                                    <div key={qIndex} className="mb-3">
                                        <Form.Group id={`question_${index}_${qIndex}`} className='mb-3'>
                                            <Form.Label>Question {qIndex + 1}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter question"
                                                value={question.question}
                                                onChange={(e) => handleQuestionChangeInTopic(index, qIndex, 'question', e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group id={`answer_${index}_${qIndex}`} className='mb-3'>
                                            <Form.Label>Answer</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter answer"
                                                value={question.answer}
                                                onChange={(e) => handleQuestionChangeInTopic(index, qIndex, 'answer', e.target.value)}
                                            />
                                        </Form.Group>
                                        <Button variant="danger" onClick={() => removeQuestionFromTopic(index, qIndex)}>Remove Question</Button>
                                    </div>
                                ))}
                                <Button variant="secondary" onClick={() => addQuestionToTopic(index)} className='mb-3'>
                                    Add Question to Topic
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
            </Row>
            <Row className='align-items-center justify-content-between'>
                <Col lg={6} md={12} sm={12}>
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center border-bottom card-header-height mb-4" >
                            <h4 className="mb-0">Add FAQ Topics and Questions</h4>
                        </Card.Header>
                        <Card.Body className="p-0 mx-10">
                            <Form>
                                <Form.Group id="topicTitle" className='mb-2'>
                                    <Form.Label>Topic Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter topic title"
                                        value={currentTopic.title}
                                        onChange={(e) => handleTopicChange('title', e.target.value)}
                                    />
                                </Form.Group>

                                <Row>
                                    {currentTopic.questions.map((item, index) => (
                                        <Col xl={12} md={6} key={index}>
                                            <Card className='bg-gray-200 p-3 mb-2'>
                                                <Form.Group id={`question_${index}`} className='mb-1'>
                                                    <Form.Label>Question {index + 1}</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter question"
                                                        value={item.question}
                                                        onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                                                    />
                                                </Form.Group>
                                                <Form.Group id={`answer_${index}`} className='mb-1'>
                                                    <Form.Label>Answer</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter answer"
                                                        value={item.answer}
                                                        onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                                                    />
                                                </Form.Group>
                                                <Button variant="danger" onClick={() => removeQuestion(index)}>Remove Question</Button>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                                <Button variant="secondary" onClick={addQuestion} className='mb-3'>
                                    Add Question
                                </Button>
                            </Form>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <Button variant="primary" onClick={addTopic} className='mb-3'>
                                        Add Topic
                                    </Button>
                                </div>
                                <div>
                                    <Button variant="success" onClick={submitData} className='mb-3'>
                                        Save All Topics
                                    </Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        </Fragment>
    );
};

export default AddData;
