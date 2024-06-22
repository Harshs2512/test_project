import React, { Fragment, useState } from 'react';
import {
    Card, Row, Col, Button, Breadcrumb, Form
} from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GKTippy } from 'widgets';
import Link from 'next/link';

const AddData = () => {
    const [formData, setFormData] = useState(
        {
            image: null,
            buttontitle: '',
            steps: [
                {
                    title: '',
                    description: '',
                },
                {
                    title: '',
                    description: '',
                },
                {
                    title: '',
                    description: '',
                },
            ]
        }
    );

    const handleStepChange = (innerIndex, key, value) => {
        const updatedFormData = { ...formData };
        updatedFormData.steps[innerIndex][key] = value;
        setFormData(updatedFormData);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const updatedFormData = { ...formData };
        updatedFormData.image = file;
        setFormData(updatedFormData);
    };

    const submitData = async () => {
        const data = new FormData();
        data.append('image', formData.image);
        data.append('buttontitle', formData.buttontitle);
        data.append('steps', JSON.stringify(formData.steps));
        try {
            const res = await axios.post(`/api/siteSettings/secondPage/careerGoals/addRecord`, data);
            if (res.status === 201) {
                toast.success("Added Successfully");
                // setFormData([
                //     {
                //         image: null,
                //         buttontitle: '',
                //         steps: [
                //             {
                //                 title: '',
                //                 description: '',
                //             }
                //         ]
                //     }
                // ]);
            } else {
                toast.info("Already Exists");
            }
        }
        catch (error) {
            console.log(error)
            toast.error(error.response.data.error);
        }
    };
    return (
        <Fragment>
            <ToastContainer />
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                        <div className="mb-3 mb-md-0">
                            <h1 className="mb-1 h2 fw-bold">Our Programs</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href="#">Landing</Breadcrumb.Item>
                                <Breadcrumb.Item active>Our Programs</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div>
                            <Link href="/dashboard/siteSettings/SecondPage/careerGoals/alldata" className="btn btn-outline-primary">
                                Back
                            </Link>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center border-bottom card-header-height mb-4">
                            <h4 className="mb-0">Our Program</h4>
                        </Card.Header>
                        <Card.Body className="p-0 mx-10">
                            <Form>
                                <Fragment>
                                    <Row className="mb-3">
                                        <Col xl={6} md={6}>
                                            <Form.Group id={`image`} className='mb-4'>
                                                <Form.Label>Image</Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    onChange={(e) => handleFileChange(e)}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col xl={6} md={6}>
                                            <Form.Group id={`buttontitle`} className='mb-4'>
                                                <Form.Label>Button Title</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter button title"
                                                    value={formData.buttontitle}
                                                    onChange={(e) => setFormData({ ...formData, buttontitle: e.target.value })}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    {formData.steps.map((step, stepIndex) => (
                                        <Row key={stepIndex} className="mb-1">
                                            <Col xl={6} md={6}>
                                                <Form.Group id={`title_${stepIndex}`} className='mb-4'>
                                                    <Form.Label>Title</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter title"
                                                        value={formData.steps.title}
                                                        onChange={(e) => handleStepChange(stepIndex, 'title', e.target.value)}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xl={6} md={6}>
                                                <Form.Group id={`description_${stepIndex}`} className='mb-4'>
                                                    <Form.Label>Description</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter description"
                                                        value={formData.steps.description}
                                                        onChange={(e) => handleStepChange(stepIndex, 'description', e.target.value)}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    ))}
                                    <hr />
                                </Fragment>
                            </Form>
                            <Button variant="primary" onClick={submitData} className='mb-3 px-3'>
                                Save
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

export default AddData;