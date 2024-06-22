import React, { Fragment, useEffect, useState } from 'react';
import {
    Card, Row, Col, Button, Breadcrumb, Form
} from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GKTippy } from 'widgets';
import Link from 'next/link';
import { useRouter } from 'next/router';

const EditData = () => {
    const router = useRouter()
    const id = router.query.id
    const [formData, setFormData] = useState({
        image: '',
        buttontitle: '',
        title: '',
        description: '',
        bulletpoints: [{
            points: ''
        }]
    });

    const addBulletPoint = () => {
        setFormData({
            ...formData,
            bulletpoints: [...formData.bulletpoints, { points: '' }]
        });
    };

    const handleBulletPointChange = (index, value) => {
        const updatedBulletPoints = formData.bulletpoints.map((point, i) =>
            i === index ? { ...point, points: value } : point
        );
        setFormData({ ...formData, bulletpoints: updatedBulletPoints });
    };
    const fetchData = async () => {
        try {
            if (id) {
                const { data } = await axios.get(`/api/siteSettings/landingPage/ourPrograms/${id}`);
                setFormData({
                    buttontitle: data.buttontitle,
                    title: data.title,
                    description: data.description,
                    bulletpoints: data.bulletpoints.map((item) => ({
                        points: item.title
                    }))
                });
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => { fetchData() }, [id])
    const submitData = async () => {
        const data = new FormData();
        data.append("id", id);
        data.append("title", formData.title);
        data.append("buttontitle", formData.buttontitle);
        data.append("description", formData.description);
        data.append("image", formData.image);
        data.append("bulletpoints", JSON.stringify(formData.bulletpoints));
        try {
            const res = await axios.put(`/api/siteSettings/landingPage/ourPrograms/updateRecord`, data);
            if (res.status === 201) {
                toast.success("Added Successfully");
                setFormData({
                    image: '',
                    buttontitle: '',
                    title: '',
                    description: '',
                    bulletpoints: [{ points: '' }]
                });
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
                            <Link href="/dashboard/siteSettings/LandingPage/ourPrograms/alldata" className="btn btn-outline-primary">
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
                                <Row>
                                    <Col lg={6} sm={12}>
                                        <Form.Group id='image' className='mb-3'>
                                            <Form.Label>Section Image</Form.Label>
                                            <Form.Control
                                                type="file"
                                                name={`image`}
                                                accept="image/*"
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    image: e.target.files[0]
                                                })}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} sm={12}>
                                        <Form.Group id="buttontitle" className='mb-4'>
                                            <Form.Label>Button Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter button title"
                                                value={formData.buttontitle}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    buttontitle: e.target.value
                                                })}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} sm={12}>
                                        <Form.Group id="title" className='mb-4'>
                                            <Form.Label>Section Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter section title"
                                                value={formData.title}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    title: e.target.value
                                                })}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} sm={12}>
                                        <Form.Group id="description" className='mb-4'>
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter description"
                                                value={formData.description}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    description: e.target.value
                                                })}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div className='d-flex justify-content-between align-items-center mt-3 border bg-gray-200 py-2 px-3 rounded mb-3' onClick={addBulletPoint}>
                                    <Form.Label className=''>Bullet Points</Form.Label>
                                    <GKTippy
                                        content={
                                            <span className="fs-5 fw-light">
                                                Add new point
                                            </span>
                                        }
                                    >
                                        <i className="fas fa-plus text-primary"></i>
                                    </GKTippy>
                                </div>
                                <Row>
                                    {formData.bulletpoints.map((item, index) => (
                                        <Col xl={4} md={6} key={index}>
                                            <Form.Group id={`points_${index}`} className='mb-4'>
                                                <Form.Label>Point {index + 1}</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter bullet point"
                                                    value={item.points}
                                                    onChange={(e) => handleBulletPointChange(index, e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                    ))}
                                </Row>
                            </Form>
                            <Button variant="primary" onClick={() => submitData()} className='mb-3 px-3'>
                                Save
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

export default EditData;