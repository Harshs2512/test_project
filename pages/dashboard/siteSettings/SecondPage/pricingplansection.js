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

const Pricingplansection = (e) => {
    const [alldata, setAlldata] = useState([])

    const [formData, setFormData] = useState({
        _id: "",
        title: "",
        description: "",
        card_one: {
            cardtitle: "",
            carddescription: "",
            duration: "",
            enrolled: "",
            lecture: "",
            bulletpointheading: "",
            bulletpoints: [{ bulletpoint: "" }],
        },
        card_second: {
            cardtitle: "",
            carddescription: "",
            duration: "",
            enrolled: "",
            lecture: "",
            bulletpointheading: "",
            bulletpoints: [{ bulletpoint: "" }],
        }
    });

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/siteSettings/secondPage/pricingplanSection/getRecord");
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
                title: alldata.title || '',
                description: alldata.description || '',
                card_one: {
                    cardtitle: alldata?.card_one?.cardtitle || '',
                    carddescription: alldata?.card_one?.carddescription || '',
                    duration: alldata?.card_one?.duration || '',
                    enrolled: alldata?.card_one?.enrolled || '',
                    lecture: alldata?.card_one?.lecture || '',
                    bulletpointheading: alldata?.card_one?.bulletpointheading || '',
                    bulletpoints: alldata?.card_one?.bulletpoints.map((item) => (
                        { bulletpoint: item.bulletpoint })
                    ),
                },
                card_second: {
                    cardtitle: alldata?.card_second?.cardtitle || '',
                    carddescription: alldata?.card_second?.carddescription || '',
                    duration: alldata?.card_second?.duration || '',
                    enrolled: alldata?.card_second?.enrolled || '',
                    lecture: alldata?.card_second?.lecture || '',
                    bulletpointheading: alldata?.card_second?.cardtitle || '',
                    bulletpoints: alldata?.card_second?.bulletpoints.map((item) => (
                        { bulletpoint: item.bulletpoint })
                    ),
                },
            });
        }
    }, [alldata]);

    const submitData = async () => {
        try {
            const res = await axios.put("/api/siteSettings/secondPage/pricingplanSection/updataRecord", formData);
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

    const addCard_oneSection = () => {
        const existingData = { ...formData };
        existingData.card_one.bulletpoints.push({ bulletpoint: "" });
        setFormData(existingData);
    };

    const deleteCard_oneSection = (index) => {
        setFormData((prevFormData) => {
            const updatedCardOne = { ...prevFormData.card_one };
            const updatedBulletpoints = [...updatedCardOne.bulletpoints];
            updatedBulletpoints.splice(index, 1);

            return {
                ...prevFormData,
                card_one: {
                    ...updatedCardOne,
                    bulletpoints: updatedBulletpoints,
                },
            };
        });
    };

    const addCard_secondSection = () => {
        const existingData = { ...formData };
        existingData.card_second.bulletpoints.push({ bulletpoint: "" });
        setFormData(existingData);
    };

    const deleteCard_secondSection = (index) => {
        setFormData((prevFormData) => {
            const updatedCardOne = { ...prevFormData.card_second };
            const updatedBulletpoints = [...updatedCardOne.bulletpoints];
            updatedBulletpoints.splice(index, 1);

            return {
                ...prevFormData,
                card_second: {
                    ...updatedCardOne,
                    bulletpoints: updatedBulletpoints,
                },
            };
        });
    };

    return (
        <Fragment>
            <ToastContainer />
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                        <div className="mb-3 mb-md-0">
                            <h1 className="mb-1 h2 fw-bold">Placement Programs</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href="#">Landing</Breadcrumb.Item>
                                <Breadcrumb.Item active>Placement</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center border-bottom card-header-height mb-4" >
                            <h4 className="mb-0">Placement Programs</h4>
                        </Card.Header>
                        <Card.Body className="p-0 mx-10">
                            <div className='d-flex justify-content-between align-items-center mt-3 border bg-gray-200 py-2 px-3 rounded mb-3'>
                                <Form.Label className=''>Page Content</Form.Label>
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

                                {/* Card one section */}
                                <div className='d-flex justify-content-between align-items-center mt-3 border bg-gray-200 py-2 px-3 rounded mb-3 ' onClick={addCard_oneSection} style={{ "cursor": "pointer" }}>
                                    <Form.Label className=''>1. Card</Form.Label>
                                </div>
                                <Form.Group id="title1" className='mb-3'>
                                    <Form.Label>Card title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter title"
                                        id="title1"
                                        value={formData?.card_one?.cardtitle}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            card_one: {
                                                ...formData.card_one,
                                                cardtitle: e.target.value,
                                            }
                                        })} />
                                </Form.Group>
                                <Form.Group id="cardonedescription" className='mb-3'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter description"
                                        id="cardonedescription"
                                        value={formData?.card_one?.carddescription}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            card_one: {
                                                ...formData.card_one,
                                                carddescription: e.target.value,
                                            }
                                        })} />
                                </Form.Group>
                                <div className='d-flex justify-content-between align-items-center mt-3 py-2 rounded'>
                                    <Form.Group id="cardonedescription" className='mb-3'>
                                        <Form.Label>Duration</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter description"
                                            id="cardonedescription"
                                            value={formData?.card_one?.duration}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                card_one: {
                                                    ...formData.card_one,
                                                    duration: e.target.value,
                                                }
                                            })}
                                        />
                                    </Form.Group>
                                    <Form.Group id="cardonedescription" className='mb-3'>
                                        <Form.Label>Lectures</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter description"
                                            id="cardonedescription"
                                            value={formData?.card_one?.lecture}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                card_one: {
                                                    ...formData.card_one,
                                                    lecture: e.target.value,
                                                }
                                            })}
                                        />
                                    </Form.Group>
                                    <Form.Group id="cardonedescription" className='mb-3'>
                                        <Form.Label>Enrolled</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter description"
                                            id="cardonedescription"
                                            value={formData?.card_one?.enrolled}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                card_one: {
                                                    ...formData.card_one,
                                                    enrolled: e.target.value,
                                                }
                                            })}
                                        />
                                    </Form.Group>
                                </div>
                                <Form.Group id="cardonedescription" className='mb-3'>
                                    <Form.Label>Bullet points heading</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter description"
                                        id="cardonedescription"
                                        value={formData?.card_one?.bulletpointheading}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            card_one: {
                                                ...formData.card_one,
                                                bulletpointheading: e.target.value,
                                            }
                                        })}
                                    />
                                </Form.Group>
                                {formData?.card_one?.bulletpoints?.map((bulletItem, index) => (
                                    <div className='d-flex justify-content-between align-items-center' key={index}>
                                        <Form.Group id={`suffix${index}`} className='mb-3 w-100'>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <Form.Label>Point {index + 1}</Form.Label>
                                                {index <= 0 && <i className="fas fa-plus text-primary" onClick={addCard_oneSection}></i>}
                                            </div>
                                            <Form.Control
                                                type="text"
                                                placeholder={`Enter point ${index + 1}`}
                                                value={bulletItem.bulletpoint}
                                                onChange={(e) => {
                                                    const updatedBullets = { ...formData };
                                                    updatedBullets.card_one.bulletpoints[index].bulletpoint = e.target.value;
                                                    setFormData(updatedBullets);
                                                }}
                                            />
                                        </Form.Group>
                                        {index > 0 && <i className="fas fa-minus text-danger ms-2 " onClick={() => deleteCard_oneSection(index)} ></i>}
                                    </div>
                                ))}


                                {/* Card second section */}
                                <div className='d-flex justify-content-between align-items-center mt-3 border bg-gray-200 py-2 px-3 rounded mb-3 ' onClick={addCard_secondSection} style={{ "cursor": "pointer" }}>
                                    <Form.Label className=''>2. Card</Form.Label>
                                </div>
                                <Form.Group id="title1" className='mb-3'>
                                    <Form.Label>Card title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter title"
                                        id="title1"
                                        value={formData?.card_second?.cardtitle}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            card_second: {
                                                ...formData.card_second,
                                                cardtitle: e.target.value,
                                            }
                                        })}
                                    />
                                </Form.Group>
                                <Form.Group id="cardonedescription" className='mb-3'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter description"
                                        id="cardonedescription"
                                        value={formData?.card_second?.carddescription}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            card_second: {
                                                ...formData.card_second,
                                                carddescription: e.target.value,
                                            }
                                        })}
                                    />
                                </Form.Group>
                                <div className='d-flex justify-content-between align-items-center mt-3 py-2 rounded'>
                                    <Form.Group id="cardonedescription" className='mb-3'>
                                        <Form.Label>Duration</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter description"
                                            id="cardonedescription"
                                            value={formData?.card_second?.duration}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                card_second: {
                                                    ...formData.card_second,
                                                    duration: e.target.value,
                                                }
                                            })}
                                        />
                                    </Form.Group>
                                    <Form.Group id="cardonedescription" className='mb-3'>
                                        <Form.Label>Lectures</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter description"
                                            id="cardonedescription"
                                            value={formData?.card_second?.lecture}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                card_second: {
                                                    ...formData.card_second,
                                                    lecture: e.target.value,
                                                }
                                            })}
                                        />
                                    </Form.Group>
                                    <Form.Group id="cardonedescription" className='mb-3'>
                                        <Form.Label>Enrolled</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter description"
                                            id="cardonedescription"
                                            value={formData?.card_second?.enrolled}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                card_second: {
                                                    ...formData.card_second,
                                                    enrolled: e.target.value,
                                                }
                                            })}
                                        />
                                    </Form.Group>
                                </div>
                                <Form.Group id="cardonedescription" className='mb-3'>
                                    <Form.Label>Bullet points heading</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter description"
                                        id="cardonedescription"
                                        value={formData?.card_second?.bulletpointheading}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            card_second: {
                                                ...formData.card_second,
                                                bulletpointheading: e.target.value,
                                            }
                                        })}
                                    />
                                </Form.Group>
                                {formData?.card_second?.bulletpoints?.map((bulletItem, index) => (
                                    <div className='d-flex justify-content-between align-items-center' key={index}>
                                        <Form.Group id={`suffix${index}`} className='mb-3 w-100'>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <Form.Label>Point {index + 1}</Form.Label>
                                                {index <= 0 && <i className="fas fa-plus text-primary" onClick={addCard_secondSection}></i>}
                                            </div>
                                            <Form.Control
                                                type="text"
                                                placeholder={`Enter point ${index + 1}`}
                                                value={bulletItem.bulletpoint}
                                                onChange={(e) => {
                                                    const updatedBullets = { ...formData };
                                                    updatedBullets.card_second.bulletpoints[index].bulletpoint = e.target.value;
                                                    setFormData(updatedBullets);
                                                }}
                                            />
                                        </Form.Group>
                                        {index > 0 && <i className="fas fa-minus text-danger ms-2 " onClick={()=>deleteCard_secondSection(index)} ></i>}
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


export default Pricingplansection;