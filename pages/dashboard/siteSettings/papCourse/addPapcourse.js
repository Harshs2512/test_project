// import node module libraries
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import {
    Card, Row, Col, Button, Breadcrumb, Modal, Form
} from 'react-bootstrap';
import Link from 'next/link';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GKTippy } from 'widgets';
import { LoadingIcon } from 'yet-another-react-lightbox';

const PapCourse = () => {
    const [course, setCourse] = useState([])
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        course: "",
        sectiontitle: "",
        courses: [{
            coursetitle: "",
            duration: "",
            internship: "",
            placement: false,
            topics: "",
            imageFile: null,
        }],
    });

    const addFeatures = () => {
        setFormData((prevData) => ({
            ...prevData,
            courses: [
                ...prevData.courses,
                {
                    coursetitle: "",
                    duration: "",
                    internship: "",
                    placementL: false,
                    topics: "",
                    imageFile: null,
                }
            ]
        }));
    };

    const deleteFeatures = (index) => {
        if (index > 0) {
            const updatedData = { ...formData };
            updatedData.courses.splice(index, 1);
            setFormData(updatedData);
        }
        else {
            toast.warning("Can't delete last index")
        }
    };

    const handleImageChange = (event, featureindex) => {
        const file = event.target.files[0];
        const updatedFeatureList = [...formData.courses];
        updatedFeatureList[featureindex].imageFile = file;
        setFormData({
            ...formData,
            courses: updatedFeatureList
        });
    };

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/siteSettings/megaMenu/coursePage/getRecords");
            if (res.status === 200) {
                setCourse(res.data);
            };
        }
        catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const submitData = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("course", formData.course);
        data.append("sectiontitle", formData.sectiontitle);
        data.append("courses", JSON.stringify(formData.courses));
        formData.courses.forEach((item, index) => {
            data.append(`img_${index}`, item.imageFile);
            data.append(`coursetitle_${index}`, item.coursetitle);
            data.append(`duration_${index}`, item.duration);
            data.append(`internship_${index}`, item.internship);
            data.append(`placement_${index}`, item.placement);
            data.append(`topics_${index}`, item.topics);
        });
        try {
            setLoading(true)
            const res = await axios.post(`/api/siteSettings/papcourseSection/addRecord`, data);
            if (res.status === 201) {
                toast.success("Add Success fully");
            } else {
                toast.info("Already Exist");
            };
        }
        catch (err) {
            toast.error(err.response)
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <Fragment>
            <ToastContainer />
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                        <div className="mb-3 mb-md-0">
                            <h1 className="mb-1 h2 fw-bold">Placement Course</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href="#">Landing</Breadcrumb.Item>
                                <Breadcrumb.Item active>Placement Course</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <Card>
                        <Card.Header className="border-bottom card-header-height mb-4" >
                            <h4 className="mb-0">Placement Course</h4>
                        </Card.Header>
                        <Card.Body className="p-0 mx-10">
                            <Form onSubmit={submitData}>
                                <Row>
                                    <Col lg={6} xs={12}>
                                        <Form.Group id="pagetitle" className='mb-3'>
                                            <Form.Label className=''>Select Course</Form.Label>
                                            <Form.Select onChange={(e) => setFormData({ ...formData, course: e.target.value })} required>
                                                <option>--Select course--</option>
                                                {course.map((item, index) => (
                                                    <option key={index} value={item._id}>{item.course_name}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} xs={12}>
                                        <Form.Group id="pagetitle" className='mb-3'>
                                            <Form.Label>Section title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Title"
                                                id="pagetitle"
                                                value={formData.sectiontitle}
                                                onChange={(e) => setFormData({ ...formData, sectiontitle: e.target.value })}
                                                className='w-100'
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div className='d-flex justify-content-between align-items-center mt-3 border bg-gray-200 py-2 px-3 rounded mb-3' onClick={addFeatures}>
                                    <Form.Label className=''>Courses</Form.Label>
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
                                {formData?.courses?.map((item, featureindex) => (
                                    <div key={featureindex} className='bg-gray-100 p-3 rounded mb-4'>
                                        <Form.Group id="heading" className='mb-3'>
                                            <div className='d-flex justify-content-between align-item-center'>
                                                <Form.Label>Course heading</Form.Label>
                                                <i className='fas fa-trash text-danger' style={{ "opacity": "0.7", "cursor": "pointer" }} onClick={() => deleteFeatures(featureindex)}></i>
                                            </div>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter heading"
                                                id="heading"
                                                value={item.coursetitle}
                                                onChange={(e) => {
                                                    const updatedPlanfeature = [...formData.courses];
                                                    updatedPlanfeature[featureindex].coursetitle = e.target.value;
                                                    setFormData({
                                                        ...formData,
                                                        courses: updatedPlanfeature,
                                                    });
                                                }}
                                                className='w-100 '
                                                required
                                            />
                                        </Form.Group>
                                        {console.log(formData)}
                                        <Row>
                                            <Col lg={5} xs={12}>
                                                <Form.Group id="duration" className='mb-3'>
                                                    <Form.Label>Duration</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter title"
                                                        id="title"
                                                        value={item.duration}
                                                        onChange={(e) => {
                                                            const updatedPlanfeature = [...formData.courses];
                                                            updatedPlanfeature[featureindex].duration = e.target.value;
                                                            setFormData({
                                                                ...formData,
                                                                courses: updatedPlanfeature,
                                                            });
                                                        }}
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col lg={4} xs={12}>
                                                <Form.Group di="approval1" className='mb-3'>
                                                    <Form.Label>Internship</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter title"
                                                        id="title"
                                                        value={item.internship}
                                                        onChange={(e) => {
                                                            const updatedPlanfeature = [...formData.courses];
                                                            updatedPlanfeature[featureindex].internship = e.target.value;
                                                            setFormData({
                                                                ...formData,
                                                                courses: updatedPlanfeature,
                                                            });
                                                        }}
                                                        className='w-100 '
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col lg={3} xs={12}>
                                                <Form.Group id="approval2" className='mb-3 me-3'>
                                                    <Form.Label>Placement Support</Form.Label>
                                                    <Form.Select
                                                        id={`basi`}
                                                        value={item.placement ? 'Yes' : 'No'}
                                                        onChange={(e) => {
                                                            const updatedPlanfeature = [...formData.courses];
                                                            updatedPlanfeature[featureindex].placement = e.target.value === 'Yes';
                                                            setFormData({
                                                                ...formData,
                                                                courses: updatedPlanfeature,
                                                            });
                                                        }}
                                                        required
                                                    >
                                                        <option value="">--Select--</option>
                                                        {['Yes', 'No'].map((value, index) => (
                                                            <option key={index} value={value}>
                                                                {value}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col lg={12}>
                                                <Form.Group di="approval1" className='mb-3'>
                                                    <Form.Label>Topic</Form.Label>
                                                    <textarea
                                                        type="textarea"
                                                        placeholder="Enter title"
                                                        id="title"
                                                        value={item.topics}
                                                        onChange={(e) => {
                                                            const updatedfeaturelist = [...formData.courses];
                                                            updatedfeaturelist[featureindex].topics = e.target.value
                                                            setFormData({
                                                                ...formData,
                                                                courses: updatedfeaturelist
                                                            })
                                                        }}
                                                        required
                                                        className='w-100'
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col lg={12}>
                                                <Form.Group di="image" className='mb-3'>
                                                    <Form.Label>Image</Form.Label>
                                                    <Form.Control
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(event) => handleImageChange(event, featureindex)}
                                                        className='w-100'
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                                <Button variant="primary" type='submit' className='mb-3' disabled={loading}>
                                    {loading ? <LoadingIcon /> : 'Save'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment >
    );
};

export default PapCourse;