// import node module libraries
import React, { Fragment, useCallback, useEffect, useState } from "react";
import {
  Col,
  Row,
  Container,
  Nav,
  Card,
  Tab,
  ListGroup,
  Image,
  Button,
} from "react-bootstrap";
import Link from "next/link";

import {
  GKAccordionDefault,
  Ratings,
  CourseCard,
  GeeksSEO,
  GKTippy,
} from "widgets";
import {
  ReviewsTab,
  DescriptionTab,
  TranscriptTab,
  FAQTab,
} from "sub-components";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import useLocalStorage from "hooks/useLocalStorage";
import { useSelector } from "react-redux";
import { addtocart } from "store/cartSlice";
import Loder from "widgets/Loder";
import { useSession } from "next-auth/react";
const CourseSingle = () => {
  const session = useSession();
  const [isOpen, setOpen] = useState(false);
  const [courseData, setCourseData] = useState();
  const [Reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const router = useRouter();
  const userID = session?.data?.user?._id;
  const [problem, setProblem] = useState(null);
  useEffect(() => {
    if (router.query.problem) {
      try {
        const decodedProblem = decodeURIComponent(router.query.problem);
        const parsedProblem = JSON.parse(decodedProblem);
        setProblem(parsedProblem);
      } catch (error) {
        console.error("Error parsing problem data from URL", error);
      }
    }
  }, [router.query.problem]);

  const getratings = async () => {
    try {
      if (courseData?._id) {
        const ress = await axios.get(`/api/reviewandrating/${courseData._id}`);
        setReviews(ress.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (router?.query?.slug) fetchData();
    getratings();
  }, [router.query?.slug]);
  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) {
      return 0;
    }
    const totalRatings = reviews.reduce(
      (sum, review) => sum + parseInt(review.ratings),
      0
    );
    const averageRating = totalRatings / reviews.length;
    const ratingOutOf5 = (averageRating / 5) * 5;
    return ratingOutOf5;
  };
  const averageRating = calculateAverageRating(Reviews);
  const dispatch = useDispatch();
  const defaultCart = useSelector((state) => state.cart);
  const { storageValue, setStorageValue, getStorageValue } = useLocalStorage(
    "cart",
    defaultCart
  );
  useEffect(() => {
    const existingCart = getStorageValue("cart");
    const cart = existingCart ? JSON.parse(existingCart) : [];
    dispatch(addtocart(cart));
  }, [getStorageValue, dispatch]);
  const handleaddtocart = async (courseData) => {
    setLoading(true);
    const existingCart = getStorageValue("cart");
    const cart = existingCart ? JSON.parse(existingCart) : [];
    const cartData = cart && cart.filter((item) => item.user === userID);
    const existingIndex = cartData.findIndex(
      (item) => item._id === courseData._id
    );
    if (existingIndex !== -1) {
      toast.error("Item is already in the cart");
    } else {
      toast.success("Item is added to cart");
      const cartItem = {
        ...courseData,
        user: data,
      };
      cart.push(cartItem);
      setStorageValue(JSON.stringify(cart));
      dispatch(addtocart(cartItem));
      setLoading(false);
      router.push("/marketing/courses/checkout");
    }

    setLoading(false);
  };
  return (
    <Fragment key={problem && problem._id}>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="Course Single | Cybrom Technology Pvt. Ltd." />
      {/* Page header */}
      <section className="pt-lg-8 pb-lg-16 pt-8 pb-12 bg-primary">
        <Container>
          <Row className="align-items-center">
            <Col xl={10} lg={10} md={12} sm={12}>
              <div>
                <Fragment>
                  <h1 className="text-white display-4 fw-semi-bold">
                    Getting Started with {problem && problem.contest_title}
                  </h1>
                  <p className="text-white mb-6 lead">
                    {problem && problem.contest_title} is the popular
                    programming language which powers web pages and web
                    applications. This course will get you started coding in{" "}
                    {problem && problem.contest_title}.
                  </p>
                </Fragment>
                <div className="d-flex align-items-center">
                  <GKTippy content="Add to Bookmarks">
                    <Link
                      href="#"
                      className="bookmark text-white text-decoration-none"
                    >
                      <i className="fe fe-bookmark text-white-50 me-2"></i>{" "}
                      Bookmark
                    </Link>
                  </GKTippy>
                  <span className="text-white ms-3">
                    <i className="fe fe-user text-white-50"></i> 1200 Enrolled{" "}
                  </span>
                  <span className="ms-4">
                    <span className="text-warning">
                      <Ratings rating={averageRating} />
                      <span className="text-white ms-1">
                        ({Reviews.length})
                      </span>
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
                    </svg>{" "}
                    <span className="align-middle">
                      {problem?.contest_level}
                    </span>
                  </span>
                </div>
              </div>
              <div className="d-flex mt-4 ">
                <h3 className="text-white ms-4 d-none d-md-block">
                  <span className="align-middle">
                    Started On : {problem?.contest_startDate}
                  </span>
                </h3>
                <h3 className="text-white ms-4 d-none d-md-block">
                  <span className="align-middle">
                    Ends On : {problem?.contest_endDate}
                  </span>
                </h3>
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
              <Tab.Container defaultActiveKey="contents">
                <Card>
                  <Nav className="nav-lb-tab">
                    {["Contents", "Description", "Reviews", "FAQ"].map(
                      (item, index) => (
                        <Nav.Item key={index}>
                          <Nav.Link
                            href={`#${item.toLowerCase()}`}
                            eventKey={item.toLowerCase()}
                            className="mb-sm-3 mb-md-0"
                          >
                            {item}
                          </Nav.Link>
                        </Nav.Item>
                      )
                    )}
                  </Nav>
                  <Card.Body className="p-0">
                    <Tab.Content>
                      <Tab.Pane eventKey="contents" className="pb-4 pt-3 px-4">
                        <Fragment>
                          <div className="mb-4">
                            <h3 className="mb-2">
                              Challenges Questions Details
                            </h3>
                            {problem?.questionsList.map((question, index) => (
                              <div key={index} className="mb-2">
                                <ListGroup>
                                  <ListGroup.Item className="d-flex gap-2 cursor-pointer">
                                    <span>
                                      <i className="fe fe-lock fs-4"></i>
                                    </span>
                                    <h4>
                                      <span>Q.{index + 1}:</span>
                                    </h4>
                                    <h4
                                      className="mb-0"
                                      dangerouslySetInnerHTML={{
                                        __html: question?.problem_Statement,
                                      }}
                                    />
                                  </ListGroup.Item>
                                </ListGroup>
                              </div>
                            ))}
                          </div>
                        </Fragment>
                      </Tab.Pane>
                      <Tab.Pane eventKey="description" className="pb-4 p-4">
                        {/* contest_description */}
                        <div className="mb-2">
                          <ListGroup>
                            <ListGroup.Item className="d-flex">
                              <h4
                                className="mb-0"
                                dangerouslySetInnerHTML={{
                                  __html: problem?.contest_description,
                                }}
                              />
                            </ListGroup.Item>
                          </ListGroup>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="reviews" className="pb-4 p-4">
                        {/* Reviews */}
                        <ReviewsTab courseID={courseData?._id} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="faq" className="pb-4 p-4">
                        {/* FAQ */}
                        <FAQTab />
                      </Tab.Pane>
                    </Tab.Content>
                  </Card.Body>
                </Card>
              </Tab.Container>
            </Col>
            <Col lg={4} md={12} sm={12} className="mt-lg-n22">
              {/* Card */}
              <Card className="mb-3 mb-4">
                <div className="p-1">
                  <Image
                    src={`/api/Contest/getthumbnail/${problem?._id}`}
                    alt={`Contest ${problem?._id}`}
                    className="card-img-top rounded-top-md"
                  />
                </div>
                <Card.Body>
                  {/* Price single page */}
                  <div className="mb-3">
                    <span className="text-dark fw-bold h2 me-2">
                      ₹{problem?.currentprice}
                    </span>
                    <del className="fs-4 text-muted">
                      ₹{problem?.actualprice}
                    </del>
                  </div>
                  <div className="d-grid">
                    <Button
                      className="btn btn-primary mb-2"
                      onClick={() => handleaddtocart(problem)}
                    >
                      {loading === false ? "Add to Cart" : <Loder />}
                    </Button>
                    <Link
                      href={`/studio/contest-single/buypage?id=${problem?._id}`}
                      className="btn btn-outline-primary"
                    >
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
                      {problem?.questionsList.length} Total Questions
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="fe fe-award me-2 align-middle text-success"></i>
                      Certificate
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="fe fe-calendar align-middle me-2 text-info"></i>
                      12 Article
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-transparent">
                      <i className="fe fe-clock align-middle me-2 text-warning"></i>
                      Lifetime access
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default CourseSingle;
