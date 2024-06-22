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
  Image,
} from "react-bootstrap";
import { Ratings, CourseCard, GeeksSEO, GKAccordionTutorials } from "widgets";
import axios from "axios";
const TutorialSingle = () => {
  const router = useRouter();
  const { id } = router.query;
  const [clickedItem, setClickedItem] = useState(null);
  const [AllCoursesData, setAllCoursesData] = useState();
  const handleChildClick = (subitem) => {
    setClickedItem(subitem);
  };
  const [parsedItem, setParsedItem] = useState([]);
  const dataFetch = async () => {
    const data = await axios.get(`/api/tutorial/${id}`);
    setParsedItem(data?.data?.guide);
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
    <>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="Tutorial | Cybrom Technology Pvt.Ltd." />
      <section className="pb-10 mt-4 overflow-hidden mx-4">
        <Row>
          <Col lg={3} md={12} sm={12}>
            <Card
              className="rounded-0"
              style={{
                maxHeight: "700px",
                overflowY: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <h2 className="mb-sm-3 mb-md-0 p-2">Tutorials</h2>
              <hr />
              <Card.Body className="p-0">
                <GKAccordionTutorials
                  itemClass="px-0"
                  parsedItem={parsedItem}
                  onItemClick={handleChildClick}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={7} md={12} sm={12}>
            <Card
              className="rounded-0 "
              style={{
                height: "700px",
                overflowY: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <Card.Body>
                {clickedItem && clickedItem ? (
                  <>
                    <div className="mb-3">
                      <span className="text-dark fw-bold h2 me-2">
                        {clickedItem.TopicName}
                      </span>
                    </div>
                    <div className="content-container justify-content-start ">
                      <h4
                        className="mb-0"
                        dangerouslySetInnerHTML={{
                          __html: clickedItem.explanation,
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-3">
                      <span className="text-dark fw-bold h2 me-2">
                        Topic Name
                      </span>
                    </div>
                    <div>
                      <h4 className="mb-0">What’s included Content</h4>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col xl={2} lg={2} md={12} sm={12} className="ms-n3">
            <Card className="rounded-0 ">
              <Card.Header>
                <h4 className="mb-0">{parsedItem?.title}</h4>
              </Card.Header>
              <Card.Header>
                <h4 className="mb-0">What’s included</h4>
              </Card.Header>
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
        {/* Card */}
        <Container className="mx-auto">
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
    </>
  );
};
export default TutorialSingle;
