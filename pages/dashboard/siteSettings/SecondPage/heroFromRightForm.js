// import node module libraries
import React, { Fragment, useEffect, useState } from 'react';
import {
    Card, Row, Col, Button, Breadcrumb, Form
} from 'react-bootstrap';
// import custom components
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GKTippy } from 'widgets';

const HeroFromRightForm = (e) => {
    const [alldata, setAlldata] = useState([])

    const [formData, setFormData] = useState({
        _id: "",
        title: "",
        description: "",
        bulletpoint: [{ bulletpoint: "" }],
    });

    const [bullet, setBullets] = useState([{ bulletpoint: "" }]);

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/siteSettings/secondPage/enquriySection/getRecord");
            if (res.status === 200) {
                setAlldata(res.data[0]);
                const existingBullets = res.data[0]?.bulletpoints || [{ bulletpoint: "" }];
                setBullets(existingBullets);
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
                title: alldata.title || '',
                description: alldata.description || '',
            });
        }
    }, [alldata]);

    const submitData = async () => {
        try {
            const res = await axios.put(
                `/api/siteSettings/secondPage/enquriySection/updateRecord`,
                {
                    ...formData,
                    bulletpoint: bullet,
                }
            );
            if (res.status === 201) {
                toast.success("Add Success fully");
                getPosts();
            } else {
                toast.info("Already Exist");
            }
        } catch (err) {
            toast.error(err.response);
        }
    };

    const addSection = () => {
        window.scrollTo(0, 1000);
        setBullets((prevSection) => [
            ...prevSection,
            { bulletpoint: "" },
        ]);
    };

    const deleteSection = (index) => {
        const updatedBullets = [...bullet];
        updatedBullets.splice(index, 1);
        setBullets(updatedBullets);
    };

    return (
        <Fragment>
            <ToastContainer />
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                        <div className="mb-3 mb-md-0">
                            <h1 className="mb-1 h2 fw-bold">Enquiry Form Section</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href="#">Landing</Breadcrumb.Item>
                                <Breadcrumb.Item active>Enquiry</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center border-bottom card-header-height mb-4" >
                            <h4 className="mb-0">Enquiry form section</h4>
                        </Card.Header>
                        <Card.Body className="p-0 mx-10">
                            <div className='d-flex justify-content-between align-items-center mt-3 border bg-gray-200 py-2 px-3 rounded mb-3'>
                                <Form.Label className=''>Content</Form.Label>
                            </div>
                            <Form>
                                <Form.Group id="heading" className='mb-3'>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter title"
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className=''
                                    />
                                </Form.Group>
                                <Form.Group id="prefix" className='mb-3'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter description"
                                        id="prefix"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </Form.Group>
                                <div className='d-flex justify-content-between align-items-center mt-3 border bg-gray-200 py-2 px-3 rounded mb-3' onClick={addSection}>
                                    <Form.Label className=''>Bulletpoints</Form.Label>
                                    <GKTippy
                                        content={
                                            <span className="fs-5 fw-light" >
                                                Add new
                                            </span>
                                        }
                                    >
                                        <i className="fas fa-plus text-primary"></i>
                                    </GKTippy>
                                </div>
                                {bullet.map((bulletItem, index) => (
                                    <div className='d-flex justify-content-between align-items-center' key={index}>
                                        <Form.Group  id={`suffix${index}`} className='mb-3 w-100'>
                                            <Form.Label>Point {index + 1}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder={`Enter point ${index + 1}`}
                                                value={bulletItem.bulletpoint}
                                                onChange={(e) => {
                                                    const updatedBullets = [...bullet];
                                                    updatedBullets[index].bulletpoint = e.target.value;
                                                    setBullets(updatedBullets);
                                                }}
                                            />

                                        </Form.Group>
                                        {index > 0 && <i className="fas fa-minus text-danger ms-2 " onClick={deleteSection} ></i>}
                                    </div>
                                ))}
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


export default HeroFromRightForm;