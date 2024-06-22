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

const HeroSection = (e) => {
    const [alldata, setAlldata] = useState([])

    const [formData, setFormData] = useState({
        heading: '',
        prefix: '',
        suffix: '',
        typed_one: '',
        typed_two: '',
        description: '',
        highlight1: '',
        highlight2: '',
        highlight3: '',
    });

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/siteSettings/secondPage/heroSection/getRecord");
            if (res.status === 200) {
                setAlldata(res.data[0]);
            };
        }
        catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (alldata) {
            setFormData({
                _id: alldata._id || '',
                heading: alldata.heading || '',
                prefix: alldata.prefix || '',
                suffix: alldata.suffix || '',
                typed_one: alldata.typed_one || '',
                typed_two: alldata.typed_two || '',
                description: alldata.description || '',
                highlight1: alldata.highlight1 || '',
                highlight2: alldata.highlight2 || '',
                highlight3: alldata.highlight3 || '',
            });
        }
    }, [alldata]);

    const submitData = async () => {
        try {
            const res = await axios.put(`/api/siteSettings/secondPage/heroSection/updataRecord` , formData);
            if (res.status === 201) {
                toast.success("Add Success fully");
                getPosts();
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
                            <Form>
                                <Form.Group id="heading" className='mb-3'>
                                    <Form.Label>Heading</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter heading"
                                        id="heading"
                                        value={formData.heading}
                                        onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                                        className=''
                                    />
                                </Form.Group>
                                <div className='d-flex justify-content-between align-items-center '>
                                    <Form.Group id="prefix" className='mb-3 w-50 me-3'>
                                        <Form.Label>Heading prefix</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter heading prefix"
                                            id="prefix"
                                            value={formData.prefix}
                                            onChange={(e) => setFormData({ ...formData, prefix: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group id="suffix" className='mb-3 w-50'>
                                        <Form.Label>Heading suffix</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter heading suffix"
                                            id="heading"
                                            value={formData.suffix}
                                            onChange={(e) => setFormData({ ...formData, suffix: e.target.value })}
                                        />
                                    </Form.Group>
                                </div>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <Form.Group id="value_one" className='mb-3 w-50 me-3'>
                                        <Form.Label>Typed Heading one</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter 1st value"
                                            id="value_one"
                                            value={formData.typed_one}
                                            onChange={(e) => setFormData({ ...formData, typed_one: e.target.value })}
                                            className='w-100'
                                        />
                                    </Form.Group>
                                    <Form.Group id="value_two" className='mb-3 w-50'>
                                        <Form.Label>Typed Heading two</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter 1st value"
                                            id="value_one"
                                            value={formData.typed_two}
                                            onChange={(e) => setFormData({ ...formData, typed_two: e.target.value })}
                                        />
                                    </Form.Group>
                                </div>
                                <Form.Group id="heading" className='mb-3'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter description"
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className=''
                                    />
                                </Form.Group>
                                <Form.Group id="heading" className='mb-3'>
                                    <Form.Label>1st Highlights</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Highlight"
                                        id="description"
                                        value={formData.highlight1}
                                        onChange={(e) => setFormData({ ...formData, highlight1: e.target.value })}
                                        className=''
                                    />
                                </Form.Group>
                                <Form.Group id="heading" className='mb-3'>
                                    <Form.Label>2nd Highlights</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Highlight"
                                        id="description"
                                        value={formData.highlight2}
                                        onChange={(e) => setFormData({ ...formData, highlight2: e.target.value })}
                                        className=''
                                    />
                                </Form.Group>
                                <Form.Group id="heading" className='mb-3'>
                                    <Form.Label>3rd Highlights</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Highlight"
                                        id="description"
                                        value={formData.highlight3}
                                        onChange={(e) => setFormData({ ...formData, highlight3: e.target.value })}
                                        className=''
                                    />
                                </Form.Group>
                            </Form>
                            <Button variant="primary" onClick={() => submitData()} className='text-center mb-5'>
                                Save
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};
export default HeroSection;
