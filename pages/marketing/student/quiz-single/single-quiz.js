// import node module libraries
import React, { Fragment, useEffect, useState, useCallback } from 'react';
import {
    Col,
    Row,
    Container,
    Nav,
    Card,
    Tab,
    ListGroup,
    Image,
    Button
} from 'react-bootstrap';
import Link from 'next/link';

// import widget/custom components
import { Ratings, CourseCard, GeeksSEO, GKTippy } from 'widgets';

// import sub components
import { QuizReviewsTab, QuizDescriptionTab, QuizTranscriptTab, QuizFAQTab } from 'sub-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import useLocalStorage from 'hooks/useLocalStorage';
import { useSelector } from 'react-redux';
import { addtocart } from 'store/cartSlice';
import Loder from 'widgets/Loder';
import { useSession } from 'next-auth/react';
const QuizSingle = () => {
    const [quizData, setQuizData] = useState();
    const [Reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState();
    const router = useRouter()
    const session = useSession();
    const userID = session?.data?.user?._id;
    const getCurrentUser = async () => {
        try {
            if (!userID) {
                throw new Error("User ID not found in session data");
            }
            const response = await axios.get(`/api/auth/usersingle/${userID}`);
            const userData = response?.data;
            if (!userData || !userData._id) {
                throw new Error("User data not found in response");
            }
            setData(userData._id);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    
    useEffect(() => {
        getCurrentUser(session);
    }, [session])
    const fetchData = useCallback(async () => {
        try {
            const res = await axios.get(`/api/quiz/${router.query.quizId}`);
            setQuizData(res && res.data && res.data.quiz);
        } catch (error) {
            console.error('Error fetching quiz:', error);
        }
    }, [router.query.quizId]);
    useEffect(() => {
        if (router.query.quizId) {
            fetchData();
        }
    }, [router.query.quizId, fetchData]);
    const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) {
            return 0;
        }
        const totalRatings = reviews.reduce((sum, review) => sum + parseInt(review.ratings), 0);
        const averageRating = totalRatings / reviews.length;
        const ratingOutOf5 = (averageRating / 5) * 5;
        return ratingOutOf5;
    };
    const averageRating = calculateAverageRating(Reviews);

    const dispatch = useDispatch();
    const defaultCart = useSelector((state) => state.cart);

    const {
        storageValue,
        setStorageValue,
        getStorageValue
    } = useLocalStorage("cart", defaultCart);
    useEffect(() => {
        const existingCart = getStorageValue('cart');

        const cart = existingCart ? JSON.parse(existingCart) : [];
        dispatch(addtocart(cart));
    }, [getStorageValue, dispatch]);

    const handleaddtocart = async (quizData) => {
        console.log(quizData, "quizData")
        setLoading(true);
        const existingCart = getStorageValue('cart');
        const cart = existingCart ? JSON.parse(existingCart) : [];
        const cartData = cart && cart.filter(item => item.user === userID);
        
        const existingIndex = cartData.findIndex((item) => item._id === quizData._id);
        if (existingIndex !== -1) {
            toast.error("Item is already in the cart");
        } else {
            toast.success("Item is added to cart");
            const cartItem = {
                ...quizData,
                user: data
            };
            console.log(cartItem,"cartItem");
            cart.push(cartItem);
            setStorageValue(JSON.stringify(cart));
            dispatch(addtocart(cartItem));
            setLoading(false);
            router.push('/marketing/courses/checkout');
        }
        setLoading(false);
    };
    return (

        <Fragment>
            <ToastContainer />
            {/* Geeks SEO settings  */}
            < GeeksSEO title="Mock Single | Cybrom Technology Pvt. Ltd." />

            {/* Page header */}
            < section className="pt-lg-8 pb-lg-16 pt-8 pb-12 bg-primary" >
                <Container>
                    <Row className="align-items-center">
                        <Col xl={7} lg={7} md={12} sm={12}>
                            <div>
                                <Fragment>
                                    <h1 className="text-white display-4 fw-semi-bold">
                                        Getting Started with {quizData && quizData.title}
                                    </h1>
                                    <p className="text-white mb-6 lead">
                                        A Mock Test refers to a short test of knowledge, typically around 10 questions in length,
                                        with question formats often including multiple choice, fill in the blanks, true or false and short answer.
                                        A mock test is much shorter than a traditional test or exam and is rarely impactful on a final course grade.
                                    </p>
                                </Fragment>
                                <div className="d-flex align-items-center">
                                    <GKTippy content="Add to Bookmarks" >
                                        <Link href="#" className="bookmark text-white text-decoration-none">
                                            <i className="fe fe-bookmark text-white-50 me-2">
                                            </i> Bookmark</Link>
                                    </GKTippy>
                                    <span className="text-white ms-3">
                                        <i className="fe fe-user text-white-50"></i> 1200 Enrolled{' '}
                                    </span>
                                    <span className="ms-4">
                                        <span className="text-warning">
                                            {/* <Ratings rating={averageRating} /> */}
                                            <span className="text-white ms-1"></span>
                                        </span>
                                    </span>
                                    <span className="text-white ms-4 d-none d-md-block">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                x="3"
                                                y="8"
                                                width="2"
                                                height="6"
                                                rx="1"
                                                fill="#DBD8E9"
                                            ></rect>
                                            <rect
                                                x="7"
                                                y="5"
                                                width="2"
                                                height="9"
                                                rx="1"
                                                fill="#DBD8E9"
                                            ></rect>
                                            <rect
                                                x="11"
                                                y="2"
                                                width="2"
                                                height="12"
                                                rx="1"
                                                fill="#DBD8E9"
                                            ></rect>
                                        </svg>{' '}
                                        <span className="align-middle">level</span>
                                    </span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Page content */}
            <section className="pb-10">
                <Container>
                    <Row>
                        <Col lg={8} md={12} sm={12} className="mt-n8 mb-4 mb-lg-0">
                            <Tab.Container defaultActiveKey="content">
                                <Card>
                                    <Nav className="nav-lb-tab">
                                        {[
                                            'Content',
                                            'Description',
                                            'Reviews',
                                            'FAQ'
                                        ].map((item, index) => (
                                            <Nav.Item key={index}>
                                                <Nav.Link
                                                    href={`#₹{item.toLowerCase()}`}
                                                    eventKey={item.toLowerCase()}
                                                    className="mb-sm-3 mb-md-0"
                                                >
                                                    {item}
                                                </Nav.Link>
                                            </Nav.Item>
                                        ))}
                                    </Nav>
                                    <Card.Body className="p-0">
                                        <Tab.Content>
                                            <Tab.Pane eventKey="content" className="pb-4 pt-3 px-4">
                                                <QuizTranscriptTab item={quizData} />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="description" className="pb-4 p-4">
                                                <QuizDescriptionTab />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="reviews" className="pb-4 p-4">
                                                {/* Reviews */}
                                                <QuizReviewsTab />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="faq" className="pb-4 p-4">
                                                {/* FAQ */}
                                                <QuizFAQTab />
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Card.Body>
                                </Card>
                            </Tab.Container>
                        </Col>
                        <Col lg={4} md={12} sm={12} className="mt-lg-n22">
                            {/* Card */}
                            <Card className="mb-3 mb-4">
                                <div
                                    className="d-flex justify-content-center position-relative rounded border-white border rounded-3 bg-cover"
                                >{quizData && quizData.image && (<Image
                                    src={`/api/quiz/quizthumbnail/${quizData._id}`}
                                    alt={`Quiz ${quizData && quizData._id}`} className="rounded img-fluid" />)}
                                </div>
                                {/* Card body */}
                                <Card.Body>
                                    {/* Price single page */}
                                    <div className="mb-3">
                                        <span className="text-dark fw-bold h2 me-2">₹{quizData && quizData.currentprice}</span>
                                        <del className="fs-4 text-muted">₹{quizData && quizData.actualprice}</del>
                                    </div>
                                    <div className="d-grid">
                                        <Button className="btn btn-primary mb-2" onClick={() => handleaddtocart(quizData)}>
                                            {loading === false ? "Add to Cart" : <Loder />}
                                        </Button>
                                        <Link href={`/marketing/quizes/buypage?id=${quizData && quizData._id}`} className="btn btn-outline-primary">
                                            Buy Now
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                            {/* Card */}
                            <Card className="mb-4">
                                {/* Card header */}
                                <Card.Header>
                                    <h4 className="mb-0">What’s included</h4>
                                </Card.Header>
                                {/* Card Body */}
                                <Card.Body className="p-0">
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <i className="fe fe-play-circle align-middle me-2 text-primary"></i>
                                            12 hours video
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <i className="fe fe-award me-2 align-middle text-success"></i>
                                            Certificate
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <i className="fe fe-calendar align-middle me-2 text-info"></i>
                                            12 Article
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <i className="fe fe-video align-middle me-2 text-secondary"></i>
                                            Watch Offline
                                        </ListGroup.Item>
                                        <ListGroup.Item className="bg-transparent">
                                            <i className="fe fe-clock align-middle me-2 text-warning"></i>
                                            Lifetime access
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                            {/* Card */}
                            <Card>
                                {/* Card body */}
                                <Card.Body>
                                    <div className="d-flex align-items-center">
                                        <div className="position-relative">
                                            <Image
                                                src='/images/avatar/suresh.jpeg'
                                                alt=""
                                                className="rounded-circle avatar-xl"
                                            />
                                            <Link
                                                href="#"
                                                className="position-absolute mt-2 ms-n3"
                                                data-bs-toggle="tooltip"
                                                data-placement="top"
                                                title="Verifed">
                                                <Image
                                                    src='/images/svg/checked-mark.svg'
                                                    alt=""
                                                    height="30"
                                                    width="30"
                                                />
                                            </Link>
                                        </div>
                                        <div className="ms-4">
                                            <h4 className="mb-0">Suresh ku. Singh</h4>
                                            <p className="mb-1 fs-6">Full Stack Developer, Engineer</p>
                                            <span className="fs-6">
                                                <span className="text-warning">4.5</span>
                                                <span className="mdi mdi-star text-warning me-2"></span>
                                                Instructor Rating
                                            </span>
                                        </div>
                                    </div>
                                    <Row className="border-top mt-3 border-bottom mb-3 g-0">
                                        <Col>
                                            <div className="pe-1 ps-2 py-3">
                                                <h5 className="mb-0">11,604</h5>
                                                <span>Students</span>
                                            </div>
                                        </Col>
                                        <Col className="border-start">
                                            <div className="pe-1 ps-3 py-3">
                                                <h5 className="mb-0">32</h5>
                                                <span>Courses</span>
                                            </div>
                                        </Col>
                                        <Col className="border-start">
                                            <div className="pe-1 ps-3 py-3">
                                                <h5 className="mb-0">12,230</h5>
                                                <span>Reviews</span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <p>
                                        I am an Innovation designer focussing on UX/UI based in
                                        Berlin. As a creative resident at Figma explored the city of
                                        the future and how new technologies.
                                    </p>
                                    <Link
                                        href="/marketing/instructor/instructor-edit-profile/"
                                        className="btn btn-outline-secondary btn-sm">
                                        View Details
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    {/* Card */}
                    <div className="pt-12 pb-3">
                        <Row className="d-md-flex align-items-center mb-4">
                            {/* <Col lg={12} md={12} sm={12}>
                                <h2 className="mb-0">Related Courses</h2>
                            </Col> */}
                        </Row>
                        {/* <Row>
                            {AllCoursesData.filter(function (datasource) {
                                return datasource.category === 'javascript';
                            })
                                .slice(0, 4)
                                .map((item, index) => (
                                    <Col lg={3} md={6} sm={12} key={index}>
                                        <CourseCard item={item} free />
                                    </Col>
                                ))}
                        </Row> */}
                    </div>
                </Container>
            </section>
        </Fragment >
    );
};

export default QuizSingle;