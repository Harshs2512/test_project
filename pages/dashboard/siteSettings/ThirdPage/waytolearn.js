// import node module libraries
import React, { Fragment, useEffect, useState } from 'react';
import {
    Card, Row, Col, Button, Breadcrumb, Form
} from 'react-bootstrap';
// import custom components
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WayToLearn = (e) => {
    const [alldata, setAlldata] = useState([])
    const [formData, setFormData] = useState({
        _id: "",
        title: "",
        description: "",
        card_one: {
            cardtitle: "",
            bulletpoints: [{ bulletpoint: "sdfghj" }],
        },
        card_second: {
            cardtitle: "",
            bulletpoints: [{ bulletpoint: "" }],
        },
        card_third: {
            cardtitle: "",
            bulletpoints: [{ bulletpoint: "" }],
        },
        card_forth: {
            cardtitle: "",
            bulletpoints: [{ bulletpoint: "" }],
        }
    });

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/siteSettings/thirdPage/waytolearnSection/getRecord");
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
                    bulletpoints: alldata?.card_one?.bulletpoints.map((item) => (
                        { bulletpoint: item.bulletpoint })
                    ),
                },
                card_second: {
                    cardtitle: alldata?.card_second?.cardtitle || '',
                    bulletpoints: alldata?.card_second?.bulletpoints.map((item) => (
                        { bulletpoint: item.bulletpoint })
                    ),
                },
                card_forth: {
                    cardtitle: alldata?.card_forth?.cardtitle || '',
                    bulletpoints: alldata?.card_forth?.bulletpoints.map((item) => (
                        { bulletpoint: item.bulletpoint })
                    ),
                },
                card_third: {
                    cardtitle: alldata?.card_third?.cardtitle || '',
                    bulletpoints: alldata?.card_third?.bulletpoints.map((item) => (
                        { bulletpoint: item.bulletpoint })
                    ),
                },
            });
        }
        else {
            setFormData({
                _id: '',
                title: '',
                description: '',
                card_one: {
                    cardtitle: '',
                    bulletpoints: [{ bulletpoint: "" }]
                },
                card_second: {
                    cardtitle: '',
                    bulletpoints: [{ bulletpoint: "" }]
                },
                card_third: {
                    cardtitle: '',
                    bulletpoints: [{ bulletpoint: "" }]
                },
                card_forth: {
                    cardtitle: '',
                    bulletpoints: [{ bulletpoint: "" }]
                },
            });
        }
    }, [alldata]);

    const submitData = async () => {
        if (alldata) {
            try {
                const res = await axios.put("/api/siteSettings/thirdPage/waytolearnSection/updataRecord", formData);
                if (res.status === 201) {
                    toast.success("Add Success fully");

                } else {
                    toast.info("Already Exist");
                }
            } catch (err) {
                console.log(err)
                toast.error(err.response);
            }
        }
        else {
            try {
                const res = await axios.post("/api/siteSettings/thirdPage/waytolearnSection/addRecord", formData);
                if (res.status === 201) {
                    toast.success("Add Success fully");
                } else {
                    toast.info("Already Exist");
                }
            } catch (err) {
                console.log(err)
                toast.error(err.response);
            }
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

    const addCard_thirdSection = () => {
        const existingData = { ...formData };
        existingData.card_third.bulletpoints.push({ bulletpoint: "" });
        setFormData(existingData);
    };

    const deleteCard_thirdSection = (index) => {
        setFormData((prevFormData) => {
            const updatedCardOne = { ...prevFormData.card_third };
            const updatedBulletpoints = [...updatedCardOne.bulletpoints];
            updatedBulletpoints.splice(index, 1);

            return {
                ...prevFormData,
                card_third: {
                    ...updatedCardOne,
                    bulletpoints: updatedBulletpoints,
                },
            };
        });
    };

    const addCard_forthSection = () => {
        const existingData = { ...formData };
        existingData.card_forth.bulletpoints.push({ bulletpoint: "" });
        setFormData(existingData);
    };

    const deleteCard_forthSection = (index) => {
        setFormData((prevFormData) => {
            const updatedCardOne = { ...prevFormData.card_forth };
            const updatedBulletpoints = [...updatedCardOne.bulletpoints];
            updatedBulletpoints.splice(index, 1);

            return {
                ...prevFormData,
                card_forth: {
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
                                <Row>
                                    <Row>
                                        <Col lg={6} md={6} xs={12}>
                                            <div>
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
                                            </div>
                                        </Col>
                                        <Col lg={6} md={6} xs={12}>
                                            <div>
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
                                                        {index > 0 && <i className="fas fa-minus text-danger ms-2 " onClick={() => deleteCard_secondSection(index)} ></i>}
                                                    </div>
                                                ))}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={6} md={6} xs={12}>
                                            <div>
                                                {/* Card third section */}
                                                <div className='d-flex justify-content-between align-items-center mt-3 border bg-gray-200 py-2 px-3 rounded mb-3 ' onClick={addCard_thirdSection} style={{ "cursor": "pointer" }}>
                                                    <Form.Label className=''>3. Card</Form.Label>
                                                </div>
                                                <Form.Group id="title1" className='mb-3'>
                                                    <Form.Label>Card title</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter title"
                                                        id="title1"
                                                        value={formData?.card_third?.cardtitle}
                                                        onChange={(e) => setFormData({
                                                            ...formData,
                                                            card_third: {
                                                                ...formData.card_third,
                                                                cardtitle: e.target.value,
                                                            }
                                                        })} />
                                                </Form.Group>
                                                {formData?.card_third?.bulletpoints?.map((bulletItem, index) => (
                                                    <div className='d-flex justify-content-between align-items-center' key={index}>
                                                        <Form.Group id={`suffix${index}`} className='mb-3 w-100'>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <Form.Label>Point {index + 1}</Form.Label>
                                                                {index <= 0 && <i className="fas fa-plus text-primary" onClick={addCard_thirdSection}></i>}
                                                            </div>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder={`Enter point ${index + 1}`}
                                                                value={bulletItem.bulletpoint}
                                                                onChange={(e) => {
                                                                    const updatedBullets = { ...formData };
                                                                    updatedBullets.card_third.bulletpoints[index].bulletpoint = e.target.value;
                                                                    setFormData(updatedBullets);
                                                                }}
                                                            />
                                                        </Form.Group>
                                                        {index > 0 && <i className="fas fa-minus text-danger ms-2 " onClick={() => deleteCard_thirdSection(index)} ></i>}
                                                    </div>
                                                ))}
                                            </div>
                                        </Col>
                                        <Col lg={6} md={6} xs={12}>
                                            <div>
                                                {/* Card second section */}
                                                <div className='d-flex justify-content-between align-items-center mt-3 border bg-gray-200 py-2 px-3 rounded mb-3 ' onClick={addCard_forthSection} style={{ "cursor": "pointer" }}>
                                                    <Form.Label className=''>4. Card</Form.Label>
                                                </div>
                                                <Form.Group id="title1" className='mb-3'>
                                                    <Form.Label>Card title</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter title"
                                                        id="title1"
                                                        value={formData?.card_forth?.cardtitle}
                                                        onChange={(e) => setFormData({
                                                            ...formData,
                                                            card_forth: {
                                                                ...formData.card_forth,
                                                                cardtitle: e.target.value,
                                                            }
                                                        })}
                                                    />
                                                </Form.Group>
                                                {formData?.card_forth?.bulletpoints?.map((bulletItem, index) => (
                                                    <div className='d-flex justify-content-between align-items-center' key={index}>
                                                        <Form.Group id={`suffix${index}`} className='mb-3 w-100'>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <Form.Label>Point {index + 1}</Form.Label>
                                                                {index <= 0 && <i className="fas fa-plus text-primary" onClick={addCard_forthSection}></i>}
                                                            </div>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder={`Enter point ${index + 1}`}
                                                                value={bulletItem.bulletpoint}
                                                                onChange={(e) => {
                                                                    const updatedBullets = { ...formData };
                                                                    updatedBullets.card_forth.bulletpoints[index].bulletpoint = e.target.value;
                                                                    setFormData(updatedBullets);
                                                                }}
                                                            />
                                                        </Form.Group>
                                                        {index > 0 && <i className="fas fa-minus text-danger ms-2 " onClick={() => deleteCard_forthSection(index)} ></i>}
                                                    </div>
                                                ))}
                                            </div>
                                        </Col>
                                    </Row>
                                </Row>
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


export default WayToLearn;