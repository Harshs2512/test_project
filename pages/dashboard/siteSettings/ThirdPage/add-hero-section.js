// import node module libraries
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import {
    Card, Row, Col, Button, Breadcrumb, Modal, Form
} from 'react-bootstrap';
import Link from 'next/link';
// import custom components
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GKTippy } from 'widgets';
import useToggle from 'hooks/useToggle';
import ReactTagInput from '@pathofdev/react-tag-input';

const HeroSection = (e) => {
    const [alldata, setAlldata] = useState([])
    const [category, setCategory] = useState([])
    const [selectedId, setSelectedId] = useState([])
    const defaulttags = ['Best Course', 'New Course']
    const [tags, setTags] = useState(defaulttags);
    const [formData, setFormData] = useState({
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

    useEffect(() => {
        fetchCategory();
        fetchData();
    }, []);
    
    const submitData = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/siteSettings/thirdPage/heroSection/addRecord`, formData, tags);
            if (res.status === 201) {
                toast.success("Add Success fully");
            } else {
                toast.info("Already Exist");
            };
        }
        catch (err) {
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
                                <Row>
                                    <Col lg={6} xs={12}>
                                        <Form.Group id="pagetitle" className='mb-3'>
                                            <Form.Label className=''>Select Category</Form.Label>
                                            <Form.Select onChange={(e) => setSelectedId(e.target.value)} required>
                                                <option>--Select course--</option>
                                                {category.map((item, index) => (
                                                    <option key={index} value={item._id}>{item.course_name}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} xs={12}>
                                        <Form.Group id="pagetitle" className='mb-3'>
                                            <Form.Label className=''>Select Course</Form.Label>
                                            <Form.Select onChange={(e) => setFormData({ ...formData, sectionid: e.target.value })} required>
                                                <option>--Select course--</option>
                                                {alldata.find((course) => course.course === selectedId)?.courses?.map((item, index) => (
                                                    <option key={index} value={item._id}>{item.coursetitle}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
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
                                {console.log(formData)}
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
                                    Save
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