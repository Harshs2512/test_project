// import node module libraries
import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Col,
  Row,
  Container,
  Nav,
  Card,
  Tab,
  ListGroup,
  Button,
  Image,
} from "react-bootstrap";
import Link from "next/link";
// import widget/custom components
import {
  GKAccordionCode,
  Ratings,
  CourseCard,
  GeeksSEO,
  GKTippy,
} from "widgets";
import LayoutwithFooter from "layouts/studio/LayoutwithFooter";
import axios from "axios";
// import data files
import { CourseIndex } from "data/courses/CourseIndexData";

const CodeSingle = () => {
  const router = useRouter();
  const { id } = router.query;

  const [clickedItem, setClickedItem] = useState(null);
  const [AllCoursesData, setAllCoursesData] = useState();
  const handleChildClick = (subitem) => {
    setClickedItem(subitem);
  };
  const [parsedItem, setParsedItem] = useState([]);
  const dataFetch = async () => {
    const data = await axios.get(`/api/Course-guide/${id}`);
    setParsedItem(data?.data?.contest);
  };
  useEffect(() => {
    dataFetch();
  }, [id]);
  const dataFetchCourse = async () => {
    const data = await axios.get(`/api/courses/getallcourse`);
    setAllCoursesData(data?.data?.courses);
  };
  useEffect(() => {
    dataFetchCourse();
  }, []);
  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="Guided-path Single | Cybrom Technology Pvt.Ltd." />

      {/* Page header */}
      <section className="pt-lg-8 pb-lg-16 pt-8 pb-12 bg-primary">
        <Container>
          <Row className="align-items-center">
            <Col xl={7} lg={7} md={12} sm={12}>
              <div>
                <h1 className="text-white display-4 fw-semi-bold">
                  Getting Started with {parsedItem?.contest_title}
                </h1>
                <p
                  className="text-white mb-6 lead"
                  dangerouslySetInnerHTML={{
                    __html: parsedItem?.contest_description,
                  }}
                ></p>
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
                      <Ratings rating={4.5} />
                      <span className="text-white ms-1">(140)</span>
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
                      {parsedItem && parsedItem.contest_level}
                    </span>
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
              <Card>
                <Card.Body className="p-0">
                  <GKAccordionCode
                    accordionItems={CourseIndex}
                    itemClass="px-0"
                    parsedItem={parsedItem}
                    onItemClick={handleChildClick}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={12} sm={12} className="mt-lg-n8">
              <Card className="mb-3 mb-4">
                <div className="p-1">
                  <Image
					src={`/api/Course-guide/getthumbnail/${parsedItem && parsedItem._id}`}
					alt={`Course-guide ${parsedItem && parsedItem._id}`} className="card-img-top rounded-top-md"
				/>
                </div>
                <Card.Body>
                  {/* Price single page */}
                  <div className="mb-3">
                    <span className="text-dark fw-bold h2 me-2">
                      ₹{parsedItem && parsedItem.currentprice}
                    </span>
                    <del className="fs-4 text-muted">
                      ₹{parsedItem && parsedItem.actualprice}
                    </del>
                  </div>
                  <div className="d-grid">
                    <Button
                      className="btn btn-primary mb-2"
                      onClick={() => handleaddtocart(parsedItem && parsedItem)}
                    >
                      Add to cart
                    </Button>
                    <Link
                      href={`/marketing/guided-path/buypage?id=${
                        parsedItem && parsedItem._id
                      }`}
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
            </Col>
          </Row>
        </Container>

        {/* Card */}
        <Container>
           <div className="pt-12 pb-3">
          <Row className="d-md-flex align-items-center mb-4">
            <Col lg={12} md={12} sm={12}>
              <h2 className="mb-0">Related Courses</h2>
            </Col>
          </Row>
          <Row>
            {AllCoursesData?.filter(function (datasource) {
              return datasource.course_category === parsedItem?.category;
            })
              .slice(0, 4)
              .map((item, index) => (
                <Col lg={3} md={6} sm={12} key={index}>
                  <CourseCard item={item} free />
                </Col>
              ))}
          </Row>
        </div>
        </Container>
       
      </section>
    </Fragment>
  );
};
CodeSingle.Layout = LayoutwithFooter;
export default CodeSingle;
