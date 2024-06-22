import React, { Fragment, useEffect, useState } from 'react';
import {
    Card, Row, Col, Button, Breadcrumb, Modal, Form
} from 'react-bootstrap';
// import custom components
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GKTippy } from 'widgets';
import { useRouter } from 'next/router';

const AddData = () => {
    const [title, setTitle] = useState("");
    const [cards, setCards] = useState([]);
    const router = useRouter();
    const { id } = router.query

    const addCard = () => {
        setCards([...cards, { img: '', cardtitle: '', description: '' }]);
    };

    const fetchData = async () => {
        try {
            const res = await axios.get(`/api/siteSettings/landingPage/carouselButton/${id}`)
            if (res.status == 200) {
                setTitle(res.data?.title)
                setCards(res.data?.cards)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, [id])

    const deleteCard = (index) => {
        const updatedCards = [...cards];
        updatedCards.splice(index, 1);
        setCards(updatedCards);
    };

    const handleCardsChange = (index, field, value) => {
        const updatedCards = [...cards];
        updatedCards[index][field] = value;
        setCards(updatedCards);
    };

    const submitData = async () => {
        const data = new FormData();
        data.append("id", id);
        data.append("title", title);
        data.append("cards", JSON.stringify(cards));
        cards.forEach((item, index) => {
            data.append(`img_${index}`, item.img);
            data.append(`cardtitle_${index}`, item.cardtitle);
            data.append(`description_${index}`, item.description);
        });
        try {
            const res = await axios.post(`/api/siteSettings/landingPage/carouselButton/updateRecord`, data);
            if (res.status === 201) {
                toast.success("Add Success fully");
                router.push('/dashboard/siteSettings/LandingPage/carouselButton/alldata')
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
                            <h1 className="mb-1 h2 fw-bold">Carousel Buttons</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href="#">Landing</Breadcrumb.Item>
                                <Breadcrumb.Item active>Carousel Buttons</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center border-bottom card-header-height mb-4" >
                            <h4 className="mb-0">Section</h4>
                        </Card.Header>
                        <Card.Body className="p-0 mx-10">
                            <Form>
                                <div className='d-flex justify-content-between align-items-center border bg-gray-200 py-2 px-3 rounded mb-3'>
                                    <Form.Label className=''>App</Form.Label>
                                </div>
                                <Form.Group id="question" className='mb-4'>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter button title"
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Form.Group>
                                <div className='d-flex justify-content-between align-items-center mt-3 border bg-gray-200 py-2 px-3 rounded mb-3' onClick={addCard}>
                                    <Form.Label className=''>Cards</Form.Label>
                                    <GKTippy
                                        content={
                                            <span className="fs-5 fw-light" >
                                                Add new card
                                            </span>
                                        }
                                    >
                                        <i className="fas fa-plus text-primary"></i>
                                    </GKTippy>
                                </div>
                                <Row>
                                    {cards.map((item, index) => (
                                        <Col xl={4} md={6} key={index}>
                                            <Card className='bg-gray-200 p-3 mb-2'>
                                                <Form.Group id={`logo_${index}`} className='mb-3'>
                                                    <Form.Label>Card Image </Form.Label>
                                                    <Form.Control
                                                        type="file"
                                                        name={`logo_${index}`}
                                                        accept="image/*"
                                                        onChange={(e) => handleCardsChange(index, 'img', e.target.files[0])}
                                                    />
                                                </Form.Group>
                                                <Form.Group id={`link_${index}`} className='mb-3'>
                                                    <Form.Label>Card title</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Paste link here"
                                                        value={item.cardtitle}
                                                        onChange={(e) => handleCardsChange(index, 'cardtitle', e.target.value)}
                                                    />
                                                </Form.Group>
                                                <Form.Group id={`link_${index}`} className='mb-3'>
                                                    <Form.Label>Card description</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Paste link here"
                                                        value={item.description}
                                                        onChange={(e) => handleCardsChange(index, 'description', e.target.value)}
                                                    />
                                                </Form.Group>
                                            </Card>
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

export default AddData;