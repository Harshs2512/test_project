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
import { MoreVertical, Edit, Trash } from 'react-feather';
import { GKTippy } from 'widgets';
import useToggle from 'hooks/useToggle';

const ComparePlanSection = () => {
    const [alldata, setAlldata] = useState([])
    const [formData, setFormData] = useState({
        pagetitle: "",
        pagedescription: "",
        plan: [{
            plantype: "",
            coursename: "",
        }],
        planfeature: [ // Initialize planfeature as an array
            {
                featuretitle: "",
                featurelist: [{
                    subtitle: "",
                    basic: false,
                    advance: false,
                }]
            }
        ]
    });

    const addFeatures = () => {
        setFormData((prevData) => ({
            ...prevData,
            planfeature: [
                ...prevData.planfeature,
                {
                    featuretitle: "",
                    featurelist: [{
                        subtitle: "",
                        basic: false,
                        advance: false,
                    }]
                }
            ]
        }));
    };

    const addSection = (index) => {
        setFormData((prevData) => {
            const updatedPlanfeature = [...prevData.planfeature];
            updatedPlanfeature[index].featurelist.push({
                subtitle: "",
                basic: false,
                advance: false,
            });
            return {
                ...prevData,
                planfeature: updatedPlanfeature,
            };
        });
    };

    const deleteFeatures = (index) => {
        if (index > 0) {
            const updatedData = { ...formData };
            updatedData.planfeature.splice(index, 1);
            setFormData(updatedData);
        }
        else {
            toast.warning("Can't delete last index")
        }
    };

    const deleteSection = (featureindex, index) => {
        if (index > 0) {
            setFormData((prevData) => {
                const updatedPlanfeature = [...prevData.planfeature];
                const updatedFeaturelist = updatedPlanfeature[featureindex].featurelist.slice();
                updatedFeaturelist.splice(index, 1);
                updatedPlanfeature[featureindex].featurelist = updatedFeaturelist;
                return {
                    ...prevData,
                    planfeature: updatedPlanfeature,
                };
            });
        }
        else {
            toast.warning("Can't delete last index")
        }
    };

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/siteSettings/secondPage/compareplanSection/getRecord");
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
                pagetitle: alldata.pagetitle || '',
                pagedescription: alldata.pagedescription || '',
                plan: alldata?.plan?.map((item) => ({
                    plantype: item.plantype || '',
                    coursename: item.coursename || '',
                })),
                planfeature: alldata?.planfeature?.map((item) => ({
                    featuretitle: item.featuretitle || '',
                    featurelist: item?.featurelist.map((featureitem) => ({
                        subtitle: featureitem.subtitle || '',
                        basic: featureitem.basic,
                        advance: featureitem.advance,
                    })
                    )
                }))
            });
        }
    }, [alldata]);

    const submitData = async () => {
        try {
            const res = await axios.put(`/api/siteSettings/secondPage/compareplanSection/updateRecord`, formData);
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
                            <h1 className="mb-1 h2 fw-bold">Compare Plans</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href="#">Landing</Breadcrumb.Item>
                                <Breadcrumb.Item active>Compare Plans</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        {/* <div>
                            <Button className="btn btn-primary" onClick={() => handleOpenModal('post')}>
                                New Question
                            </Button>
                        </div> */}
                    </div>
                </Col>
            </Row>
            <Row>
                {/* <Col lg={4} md={12} sm={12}>
                    <Button>asfasdf</Button>
                     <Button>asfasdf</Button>
                </Col> */}
                <Col lg={12} md={12} sm={12}>
                    <Card>
                        <Card.Header className="border-bottom card-header-height mb-4" >
                            <h4 className="mb-0">Compare Plans</h4>
                        </Card.Header>
                        <Card.Body className="p-0 mx-10">
                            <Form>
                                <Form.Group id="pagetitle" className='mb-3'>
                                    <Form.Label>Page title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Title"
                                        id="pagetitle"
                                        value={formData.pagetitle}
                                        onChange={(e) => setFormData({ ...formData, pagetitle: e.target.value })}
                                        className='w-100 '
                                    />
                                </Form.Group>
                                <Form.Group id="pagedescription" className='mb-3'>
                                    <Form.Label>page description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter description"
                                        id="pagedescription"
                                        value={formData.pagedescription}
                                        onChange={(e) => setFormData({ ...formData, pagedescription: e.target.value })}
                                    />
                                </Form.Group>
                                <div className='d-flex justify-content-between align-items-center mt-3 border bg-gray-200 py-2 px-3 rounded mb-3'>
                                    Programs
                                </div>
                                {formData?.plan?.map((item, index) => (
                                    <div key={index}>
                                        <Form.Group id="programtype" className='mb-3'>
                                            <Form.Label>Program type</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="eg:- Basic"
                                                id="programtype"
                                                value={item.plantype}
                                                onChange={(e) => {
                                                    const updatedPlans = [...formData.plan];
                                                    updatedPlans[0].plantype = e.target.value;
                                                    setFormData({
                                                        ...formData,
                                                        plan: updatedPlans
                                                    })
                                                }}
                                                className='w-100 '
                                            />
                                        </Form.Group>
                                        <Form.Group id="pagetitle" className='mb-3'>
                                            <Form.Label>Program Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter here"
                                                id="pagetitle"
                                                value={item.coursename}
                                                onChange={(e) => {
                                                    const updatedPlans = [...formData.plan];
                                                    updatedPlans[0].coursename = e.target.value;
                                                    setFormData({
                                                        ...formData,
                                                        plan: updatedPlans
                                                    })
                                                }}
                                            />
                                        </Form.Group>
                                    </div>
                                ))}

                                <hr />
                                <div className='d-flex justify-content-between align-items-center mt-3 border bg-gray-200 py-2 px-3 rounded mb-3' onClick={addFeatures}>
                                    <Form.Label className=''>Features</Form.Label>
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
                                {formData?.planfeature?.map((item, featureindex) => (
                                    <div key={featureindex} className='bg-gray-100 p-3 rounded mb-4'>

                                        <Form.Group id="heading" className='mb-3'>
                                            <div className='d-flex justify-content-between align-item-center'>
                                                <Form.Label>Feature heading</Form.Label>
                                                <i className='fas fa-trash text-danger' style={{ "opacity": "0.7", "cursor": "pointer" }} onClick={() => deleteFeatures(featureindex)}></i>
                                            </div>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter heading"
                                                id="heading"
                                                value={item.featuretitle}
                                                onChange={(e) => {
                                                    const updatedPlanfeature = [...formData.planfeature];
                                                    updatedPlanfeature[featureindex].featuretitle = e.target.value;
                                                    setFormData({
                                                        ...formData,
                                                        planfeature: updatedPlanfeature,
                                                    });
                                                }}
                                                className='w-100 '
                                            />
                                        </Form.Group>

                                        {item?.featurelist.map((item, index) => (
                                            <div key={index} className='d-flex justify-content-between align-items-center'>

                                                <Form.Group id="title" className='mb-3 w-30'>
                                                    <Form.Label>Title</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter title"
                                                        id="title"
                                                        value={item.subtitle}
                                                        onChange={(e) => {
                                                            const updatedfeaturelist = [...formData.planfeature];
                                                            updatedfeaturelist[featureindex].featurelist[index].subtitle = e.target.value
                                                            setFormData({
                                                                ...formData,
                                                                planfeature: updatedfeaturelist
                                                            })
                                                        }}
                                                        className='w-100 '
                                                    />
                                                </Form.Group>

                                                <Form.Group id="approval1" className='mb-3 w-30 me-3'>
                                                    <Form.Label>Approval for Basic</Form.Label>
                                                    <Form.Select
                                                        id={`basic_${index}`}
                                                        value={item.basic ? 'Yes' : 'No'}
                                                        onChange={(e) => {
                                                            const updatedPlanfeature = [...formData.planfeature];
                                                            updatedPlanfeature[featureindex].featurelist[index].basic = e.target.value === 'Yes';
                                                            setFormData({
                                                                ...formData,
                                                                planfeature: updatedPlanfeature,
                                                            });
                                                        }}
                                                    >
                                                        <option value="">--Select--</option>
                                                        {['Yes', 'No'].map((value, index) => (
                                                            <option key={index} value={value}>
                                                                {value}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>

                                                <Form.Group id="approval2" className='mb-3 w-30 me-3'>
                                                    <Form.Label>Approval for Advance</Form.Label>
                                                    <Form.Select
                                                        id={`advance${index}`}
                                                        value={item.advance ? 'Yes' : 'No'}
                                                        onChange={(e) => {
                                                            const updatedPlanfeature = [...formData.planfeature];
                                                            updatedPlanfeature[featureindex].featurelist[index].advance = e.target.value === 'Yes';
                                                            setFormData({
                                                                ...formData,
                                                                planfeature: updatedPlanfeature,
                                                            });
                                                        }}
                                                    >
                                                        <option value="">--Select--</option>
                                                        {['Yes', 'No'].map((value, index) => (
                                                            <option key={index} value={value}>
                                                                {value}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>

                                                {index === 0 && <GKTippy
                                                    content={
                                                        <span className="fs-5 fw-light" >
                                                            Add new section
                                                        </span>
                                                    }
                                                >
                                                    <i className="fas fa-plus text-primary" onClick={() => addSection(featureindex)}></i>
                                                </GKTippy>}
                                                {index > 0 && <i className="fas fa-minus text-danger ms-1 " onClick={() => deleteSection(featureindex, index)} ></i>}

                                            </div>
                                        ))}

                                    </div>
                                ))}
                            </Form>
                            <Button variant="primary" onClick={() => submitData()}>
                                Save
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};
export default ComparePlanSection;
