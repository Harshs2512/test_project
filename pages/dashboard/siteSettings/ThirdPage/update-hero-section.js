// import node module libraries
import React, { Fragment, useEffect, useState } from 'react';
import {
    Card, Row, Col, Button, Breadcrumb, Modal, Form
} from 'react-bootstrap';
import Link from 'next/link';
// import custom components
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTagInput from '@pathofdev/react-tag-input';
import { useRouter } from 'next/router';
import { Loader } from 'react-feather';

const HeroSection = (e) => {
    const router = useRouter()
    const pid = router.query?.pid
    const defaulttags = ['Best Course', 'New Course']
    const [tags, setTags] = useState(defaulttags);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        heading: '',
        type: 'certificate',
        startdate: '',
        duration: '',
        description: '',
        enquirynumber: '',
        link: '',
        sectionid: '',
        features: tags,
    });

    const fetchCourse = async () => {
        try {
            const res = await axios.get(`/api/siteSettings/thirdPage/heroSection/${pid}`);
            if (res.status === 200) {
                const courseData = res.data[0];
                setFormData({
                    ...formData,
                    id: courseData?._id || '',
                    sectionid: courseData?.sectionid || '',
                    heading: courseData?.title || '',
                    description: courseData?.description || '',
                    type: courseData?.type || 'certificate',
                    startdate: courseData?.startdate || '',
                    duration: courseData?.duration || '',
                    enquirynumber: courseData?.enquirynumber || '',
                    link: courseData?.link || '',
                    features: courseData?.features || defaulttags,
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchCourse();
    }, [pid]);

    const submitData = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const res = await axios.put(`/api/siteSettings/thirdPage/heroSection/updateRecord`, formData, tags);
            if (res.status === 201) {
                toast.success("Updated!");
            } else {
                toast.info("Already Exist");
            };
        }
        catch (err) {
            toast.error(err)
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
                            <h1 className="mb-1 h2 fw-bold">Hero Section</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href="#">Landing</Breadcrumb.Item>
                                <Breadcrumb.Item active>Hero</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center border-bottom card-header-height mb-4" >
                            <h4 className="mb-0">Hero section</h4>
                        </Card.Header>
                        <Card.Body className="p-0 mx-10">
                            <Form onSubmit={submitData}>
                                <Form.Group id="heading" className='mb-3'>
                                    <Form.Label>Heading</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter heading"
                                        id="heading"
                                        value={formData.heading}
                                        onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                                        className=''
                                        required
                                    />
                                </Form.Group>
                                <Form.Group id="heading" className='mb-3'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter description"
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className=''
                                        required
                                    />
                                </Form.Group>
                                <Row>
                                    <Col sm={12} lg={4}>
                                        <Form.Group id="prefix" className='mb-3'>
                                            <Form.Label>Type</Form.Label>
                                            <Form.Select
                                                type="select"
                                                placeholder="Enter heading prefix"
                                                id="prefix"
                                                value={'certificate'}
                                                onChange={(e) => setFormData({ ...formData, type: 'certificate' })}
                                            >
                                                <option>--Select--</option>
                                                <option>{formData.type}</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col sm={12} lg={4}>
                                        <Form.Group id="suffix" className='mb-3'>
                                            <Form.Label>Start Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                placeholder="Enter heading suffix"
                                                id="heading"
                                                value={formData.startdate}
                                                onChange={(e) => setFormData({ ...formData, startdate: e.target.value })}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={12} lg={4}>
                                        <Form.Group id="suffix" className='mb-3'>
                                            <Form.Label>Duration</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="1 month"
                                                id="heading"
                                                value={formData.duration}
                                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} lg={6}>
                                        <Form.Group id="heading" className='mb-3'>
                                            <Form.Label>Enquiry Number</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter Number"
                                                id="number"
                                                value={formData.enquirynumber}
                                                onChange={(e) => setFormData({ ...formData, enquirynumber: e.target.value })}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={12} lg={6}>
                                        <Form.Group id="heading" className='mb-3'>
                                            <Form.Label>Syllabus Link</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Link"
                                                id="description"
                                                value={formData.link}
                                                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                                className=''
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Features</Form.Label>
                                    <ReactTagInput tags={tags} onChange={(newTags) => setTags(newTags)} />
                                </Form.Group>
                                <Button variant="primary" type="submit" className='text-center mb-5'>
                                    {loading ? <Loader /> : 'SAVE'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment >
    );
};
export default HeroSection;