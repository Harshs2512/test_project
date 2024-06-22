// import node module libraries
import React, { Fragment, useEffect, useState } from 'react';
import {
    Card, Row, Col, Button, Breadcrumb, Modal, Form
} from 'react-bootstrap';
import Link from 'next/link';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GKTippy } from 'widgets';
import { useRouter } from 'next/router';

const AddCurriculum = () => {
    const router = useRouter()
    const pid = router.query?.pid
    const [selectedId, setSelectedId] = useState([])
    const [alldata, setAlldata] = useState([])
    const [category, setCategory] = useState([])

    const [formData, setFormData] = useState({
        videolink: '',
        feature1: '',
        feature2: '',
        feature3: '',
        feature4: '',
        section: [{
            title: '',
            description: '',
            topics: [{ topic: '' }]
        }]
    });

    const fetchCourse = async () => {
        try {
            const res = await axios.get(`/api/siteSettings/thirdPage/curriculumSection/${pid}`);
            if (res.status === 200) {
                const courseData = res.data[0];
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    id: courseData?._id || '',
                    sectionid: courseData?.sectionid || '',
                    videolink: courseData?.videolink || '',
                    feature1: courseData?.feature1 || '',
                    feature2: courseData?.feature2 || '',
                    feature3: courseData?.feature3 || '',
                    feature4: courseData?.feature4 || '',
                    section: courseData?.section.map((item) => ({
                        title: item.title || '',
                        description: item.description || '',
                        topics: item.topics.map((topic) => ({ topic: topic.topic || '' })),
                    })) || [],
                }));

            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => { fetchCourse() }, [pid])

    const addSection = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            section: [
                ...prevFormData.section,
                {
                    title: '',
                    description: '',
                    topics: [{ topic: '' }]
                }
            ]
        }));
    };

    const addTopic = (sectionIndex) => {
        setFormData((prevFormData) => {
            const updatedSections = [...prevFormData.section];
            updatedSections[sectionIndex].topics.push({ topic: '' });
            return {
                ...prevFormData,
                section: updatedSections
            };
        });
    };

    const handleTopicChange = (sectionIndex, topicIndex, value) => {
        setFormData((prevFormData) => {
            const updatedSections = [...prevFormData.section];
            updatedSections[sectionIndex].topics[topicIndex].topic = value;
            return {
                ...prevFormData,
                section: updatedSections
            };
        });
    };

    const handleSelectionChange = (index, field, value) => {
        const updatedSelection = [...formData.section]; // Fix typo here
        updatedSelection[index][field] = value;
        setFormData((prevFormData) => ({
            ...prevFormData,
            section: updatedSelection
        }));
    };

    const deleteTopic = (sectionIndex, topicIndex) => {
        setFormData((prevFormData) => {
            const updatedSections = [...prevFormData.section];
            updatedSections[sectionIndex].topics.splice(topicIndex, 1);
            return {
                ...prevFormData,
                section: updatedSections
            };
        });
    };

    const fetchCategory = async () => {
        try {
            const res = await axios.get("/api/siteSettings/megaMenu/coursePage/getRecords");
            if (res.status === 200) {
                setCategory(res.data);
            };
        }
        catch (err) {
            console.log(err)
        }
    };

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/siteSettings/papcourseSection/getRecord");
            if (res.status === 200) {
                setAlldata(res.data);
            };
        }
        catch (err) {
            console.log(err)
        }
    };

    const deleteSection = (sectionIndex) => {
        if (sectionIndex === 0) {
            toast.warning("Cant delete last!")
        }
        else {
            setFormData((prevFormData) => {
                const updatedSections = [...prevFormData.section];
                updatedSections.splice(sectionIndex, 1);
                return {
                    ...prevFormData,
                    section: updatedSections
                };
            });
        }
    };

    useEffect(() => {
        fetchCategory();
        fetchData();
    }, []);

    const submitData = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`/api/siteSettings/thirdPage/curriculumSection/updateRecord`, formData);
            if (res.status === 201) {
                toast.success("Add Success fully");
            } else {
                toast.info("Already Exist");
            };
        }
        catch (err) {
            console.log(err)
            toast.error(err.response)
        }
    };

    return (
        <Fragment>
            <ToastContainer />
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                        <div className="mb-3 mb-md-0">
                            <h1 className="mb-1 h2 fw-bold">Update Curriculum</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href="/dashboard/siteSettings/ThirdPage/curriculumSection">Third</Breadcrumb.Item>
                                <Breadcrumb.Item active>Update Curriculum</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center border-bottom card-header-height mb-4" >
                            <h4 className="mb-0">Update Curriculum</h4>
                        </Card.Header>
                        <Card.Body className="p-0 mx-10">
                            <Form onSubmit={submitData}>
                                <Row>
                                    <Col sm={12} lg={6}>
                                        <Form.Group id="feature1" className='mb-3'>
                                            <Form.Label>Feature 1</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter feature"
                                                id="feature1"
                                                value={formData.feature1}
                                                onChange={(e) => setFormData({ ...formData, feature1: e.target.value })}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={12} lg={6}>
                                        <Form.Group id="feature2" className='mb-3'>
                                            <Form.Label>Feature 2</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter feature"
                                                id="feature2"
                                                value={formData.feature2}
                                                onChange={(e) => setFormData({ ...formData, feature2: e.target.value })}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={12} lg={6}>
                                        <Form.Group id="feature3" className='mb-3'>
                                            <Form.Label>Feature 3</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter feature"
                                                id="feature3"
                                                value={formData.feature3}
                                                onChange={(e) => setFormData({ ...formData, feature3: e.target.value })}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={12} lg={6}>
                                        <Form.Group id="feature4" className='mb-3'>
                                            <Form.Label>Feature 4</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter feature"
                                                id="feature4"
                                                value={formData.feature4}
                                                onChange={(e) => setFormData({ ...formData, feature4: e.target.value })}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group id="feature4" className='mb-5'>
                                    <Form.Label>Video Link</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter feature"
                                        id="feature4"
                                        value={formData.videolink}
                                        onChange={(e) => setFormData({ ...formData, videolink: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <div className='d-flex justify-content-between align-items-center mt-3 border bg-gray-200 py-2 px-3 rounded mb-3' onClick={addSection}>
                                    <Form.Label className=''>Curriculum</Form.Label>
                                    <GKTippy
                                        content={
                                            <span className="fs-5 fw-light" >
                                                Add new section
                                            </span>
                                        }
                                    >
                                        <i className="fas fa-plus text-primary"></i>
                                    </GKTippy>
                                </div>
                                {formData.section.map((section, sectionIndex) => (
                                    <div key={sectionIndex} className='bg-gray-200 mb-3 p-2 rounded'>
                                        <Row>
                                            <Col lg={6} xs={12}>
                                                <Form.Group id="title" className='mb-2'>
                                                    <Form.Label>Lecture Title</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="List Title"
                                                        id={`title${sectionIndex}`}
                                                        value={section.title}
                                                        onChange={(e) => handleSelectionChange(sectionIndex, 'title', e.target.value)}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6} xs={12}>
                                                <Form.Group id="question" className='mb-3'>
                                                    <Form.Label>Lecture Description</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="List description"
                                                        id={`description_${sectionIndex}`}
                                                        value={section.description}
                                                        onChange={(e) => handleSelectionChange(sectionIndex, 'description', e.target.value)}
                                                        className='w-100 '
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className='mb-3'>
                                            {section.topics.map((topic, topicIndex) => (
                                                <Col key={topicIndex} sm={10} lg={6}>
                                                    <Form.Group id={`topic${sectionIndex}-${topicIndex}`} className='mb-0 mb-2'>
                                                        <div className='d-flex justify-content-between'>
                                                            <Form.Label>Topic {topicIndex + 1}</Form.Label>
                                                            <i className='fe fe-trash text-danger fs-4 ms-3' onClick={() => deleteTopic(sectionIndex, topicIndex)}></i>
                                                        </div>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Link Title"
                                                            id={`topic${sectionIndex}-${topicIndex}`}
                                                            value={topic.topic}
                                                            onChange={(e) => handleTopicChange(sectionIndex, topicIndex, e.target.value)}
                                                            className='w-100'
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            ))}
                                        </Row>
                                        <div className='d-flex justify-content-between'>
                                            <Button variant="primary" className='p-1' onClick={() => addTopic(sectionIndex)}>Add Topic</Button>
                                            <Button variant="danger" className='p-1' onClick={() => deleteSection(sectionIndex)}>Delete Section</Button>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="primary" type="submit" className='text-center mb-5'>
                                    Save
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

export default AddCurriculum;