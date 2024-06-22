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

const Footer = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [allposts, setAllposts] = useState([])
    const [actiontype, setActiontype] = useState('')
    const [postid, setPostid] = useState('')
    const [alldata, setAlldata] = useState([])
    const [playstore, setPlaystore] = useState(true);
    const [appstore, setAppstore] = useState(true);
    const [playstoreLink, setPlaystorelink] = useState(true);
    const [appstoreLink, setAppstorelink] = useState(true);

    const [formData, setFormData] = useState({
        email: '',
        contact: '',
        description: '',
        address: '',
    });

    const [socialLinks, setSocialLinks] = useState([]);

    const [routelinks, setRoutelinks] = useState([
        { routetitle: '', routelink: '' },
    ]);


    const [section, setSection] = useState([]);

    const addSocialLink = () => {
        setSocialLinks([...socialLinks, { logo: '', link: '' }]);
    };

    const addRouteLink = () => {
        setRoutelinks([...routelinks, { title: '', link: '' }]);
    };

    const addSection = () => {
        window.scrollTo(0, 1000);
        setSection((prevSection) => [
            ...prevSection,
            {
                mainlink: '',
                sublink: { title: '', link: '' }
            },
        ]);
    };

    const deleteRouteLink = (index) => {
        const updateRoutelinks = [...routelinks];
        updateRoutelinks.splice(index, 1);
        setRoutelinks(updateRoutelinks);
    };

    const deleteSocialLink = (index) => {
        const updatedSocialLinks = [...socialLinks];
        updatedSocialLinks.splice(index, 1);
        setSocialLinks(updatedSocialLinks);
    };

    const handleSocialLinkChange = (index, field, value) => {
        const updatedSocialLinks = [...socialLinks];
        updatedSocialLinks[index][field] = value;
        setSocialLinks(updatedSocialLinks);
    };

    const handleSelectionChange = (index, field, value) => {
        const updatedSelection = [...section];
        updatedSelection[index][field] = value;
        setSection(updatedSelection);
    };

    const handleSelectionSubLinkChange = (index, field, value) => {
        const updatedSelection = [...section];
        updatedSelection[index].sublink[field] = value;
        setSection(updatedSelection);
    };

    const handleCloseModal = () => {
        setFormData({
            question: "",
            answer: "",
        });
        setModalOpen(false);
    };

    const changePlayMode = () => {
        setPlaystore((prevPlaystore) => !prevPlaystore);
    }

    const changeAppMode = () => {
        setAppstore((prevAppstore) => !prevAppstore);
    }

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/siteSettings/landingPage/footer/getRecords");
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
                email: alldata.email || '',
                contact: alldata.phone || '',
                description: alldata.description || '',
                address: alldata.address || '',
            });

            if (alldata.sociallinks) {
                alldata.sociallinks.map((item, index) => {
                    setSocialLinks((prevSection) => [
                        ...prevSection,
                        { logo: " ", link: item.link },
                    ]);
                });
            }

            if (alldata.links) {
                alldata.links.map((item, index) => {
                    setSection((prevSection) => [
                        ...prevSection,
                        {
                            mainlink: item.mainlink,
                            sublink: { title: item.sublink.title, link: item.sublink.link }
                        },
                    ]);
                });
            }
            if (alldata.playstore?.status === 'pending') {
                setPlaystore(false);
                setPlaystorelink(alldata?.playstore.link);
            }
            if (alldata.appstore?.status === 'pending') {
                setAppstore(false);
                setPlaystorelink(alldata?.appstore.link);
            }
        }
    }, [alldata]);

    const submitData = async () => {
        const data = new FormData();
        data.append("id", formData._id);
        data.append("email", formData.email);
        data.append("phone", formData.contact);
        data.append("description", formData.description);
        data.append("address", formData.address)
        data.append("sociallinks", JSON.stringify(socialLinks));
        data.append("playstore", playstore);
        data.append("appstore", appstore);
        data.append("playstorelink", playstoreLink);
        data.append("appstorelink", appstoreLink);
        data.append("section", JSON.stringify(section));
        // data.append("mainlogo", mainlogo);
        socialLinks.forEach((socialLink, index) => {
            data.append(`logo_${index}`, socialLink.logo);
            data.append(`link_${index}`, socialLink.link);
        });
        try {
            const res = await axios.post(`/api/siteSettings/landingPage/footer/addRecord`, data);
            if (res.status === 201) {
                toast.success("Add Success fully");
                getPosts();
            } else {
                toast.info("Already Exist");
            };
            setModalOpen(false);
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
                            <h1 className="mb-1 h2 fw-bold">Footer Settings</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href="#">Landing</Breadcrumb.Item>
                                <Breadcrumb.Item active>Footer</Breadcrumb.Item>
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
                        <Card.Header className="d-flex justify-content-between align-items-center border-bottom card-header-height mb-4" >
                            <h4 className="mb-0">Footer</h4>
                            <Button className="mb-0">Add</Button>
                            {/* {allposts.length > 4 ? "" : <h4 className="mb-0 fs-6 text-danger">*Minimum 5 cards required there is only({allposts.length})</h4>} */}
                        </Card.Header>
                        <Card.Body className="p-0 mx-10">
                            <Form>
                                <div className='d-flex justify-content-between align-items-center '>
                                    <Form.Group id="question" className='mb-3 w-50 me-3'>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            id="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className='w-100 '
                                        />
                                    </Form.Group>
                                    <Form.Group id="answer" className='mb-3 w-50'>
                                        <Form.Label>Contact</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter contact no"
                                            id="contact"
                                            value={formData.contact}
                                            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                        />
                                    </Form.Group>
                                </div>
                                <div className='d-flex justify-content-between align-items-center border-bottom'>
                                    <Form.Group id="question" className='mb-3 w-50 me-3'>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Description"
                                            id="description"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className='w-100 '
                                        />
                                    </Form.Group>
                                    <Form.Group id="answer" className='mb-3 w-50'>
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter address"
                                            id="address"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        />
                                    </Form.Group>
                                </div>
                                <div className='d-flex justify-content-between align-items-center mt-3 border bg-gray-200 py-2 px-3 rounded mb-3' onClick={addSocialLink}>
                                    <Form.Label className=''>Social Links</Form.Label>
                                    <GKTippy
                                        content={
                                            <span className="fs-5 fw-light" >
                                                Add new link
                                            </span>
                                        }
                                    >
                                        <i className="fas fa-plus text-primary"></i>
                                    </GKTippy>
                                </div>
                                {socialLinks.map((socialLink, index) => (
                                    <div key={index} className='d-flex justify-content-between align-items-center'>
                                        <Form.Group id={`logo_${index}`} className='mb-3 w-50 me-3'>
                                            <Form.Label>Company Logo</Form.Label>
                                            <Form.Control
                                                type="file"
                                                name={`logo_${index}`}
                                                accept="image/*"
                                                onChange={(e) => handleSocialLinkChange(index, 'logo', e.target.files[0])}
                                            />
                                        </Form.Group>
                                        <Form.Group id={`link_${index}`} className='mb-3 w-50'>
                                            <Form.Label>Link</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Paste link here"
                                                value={socialLink.link}
                                                onChange={(e) => handleSocialLinkChange(index, 'link', e.target.value)}
                                            />
                                        </Form.Group>
                                        {index > 0 && <i className="fas fa-minus text-danger ms-1 " onClick={deleteSocialLink} ></i>}
                                    </div>
                                ))}
                                <div className='d-flex justify-content-between align-items-center mt-3 border bg-gray-200 py-2 px-3 rounded mb-3' onClick={addSection}>
                                    <Form.Label className=''>Link list</Form.Label>
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
                                {section.map((section, index) => (
                                    <div key={index}>
                                        <Form.Group id="question" className='mb-3 me-3'>
                                            <Form.Label>List Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="List Title"
                                                id={`description_${index}`}
                                                value={section.mainlink}
                                                onChange={(e) => handleSelectionChange(index, 'mainlink', e.target.value)}
                                                className='w-100 '
                                            />
                                        </Form.Group>
                                        {/* {routelinks.map((routelink, index) => ( */}
                                        <div key={index} className='d-flex justify-content-between align-items-center'>
                                            <Form.Group id={`logo_${index}`} className='mb-3 w-50 me-3'>
                                                <Form.Label>Link Title</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Link Title"
                                                    id="description"
                                                    value={section.sublink.title}
                                                    onChange={(e) => handleSelectionSubLinkChange(index, 'title', e.target.value)}
                                                    className='w-100 '
                                                />
                                            </Form.Group>
                                            <Form.Group id="answer" className='mb-3 w-50'>
                                                <Form.Label>Link</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Paste link"
                                                    id="address"
                                                    value={section.sublink.link}
                                                    onChange={(e) => handleSelectionSubLinkChange(index, 'link', e.target.value)}
                                                />
                                            </Form.Group>
                                            {index === 0 && <GKTippy
                                                content={
                                                    <span className="fs-5 fw-light" >
                                                        Add new link
                                                    </span>
                                                }
                                            >
                                                <i className="fas fa-plus text-primary ms-1 " onClick={addRouteLink} ></i>
                                            </GKTippy>}
                                            {index > 0 && <i className="fas fa-minus text-danger ms-1 " onClick={deleteRouteLink} ></i>}
                                        </div>
                                        {/* ))} */}

                                    </div>
                                ))}
                                <div className='d-flex justify-content-between align-items-center mt-3 border bg-gray-200 py-2 px-3 rounded mb-3'>
                                    <Form.Label className=''>App</Form.Label>
                                </div>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <Form.Group id='applink' className='mb-3'>
                                        <Form.Label>PlayStore</Form.Label>
                                        <Form.Check
                                            name="radios"
                                            type="checkbox"
                                            className="form-switch form-switch-price"
                                            id="playstore"
                                            checked={playstore}
                                            onClick={changePlayMode}
                                        />
                                    </Form.Group>
                                    <Form.Group id='applink' className='mb-3 w-100 ms-10'>
                                        <Form.Control
                                            type="text"
                                            placeholder="Paste link here"
                                            value={playstoreLink}
                                            onChange={(e) => setPlaystorelink(e.target.value)}
                                        />
                                    </Form.Group>
                                </div>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <Form.Group id='applink' className='mb-3'>
                                        <Form.Label>AppStore</Form.Label>
                                        <Form.Check
                                            name="radios"
                                            type="checkbox"
                                            className="form-switch form-switch-price"
                                            id="appstore"
                                            checked={appstore}
                                            onClick={changeAppMode}
                                        />
                                    </Form.Group>
                                    <Form.Group id='applink' className='mb-3 w-100 ms-10'>
                                        <Form.Control
                                            type="text"
                                            placeholder="Paste link here"
                                            value={appstoreLink}
                                            onChange={(e) => setAppstorelink(e.target.value)}
                                        />
                                    </Form.Group>
                                </div>
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
export default Footer;
