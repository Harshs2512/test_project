import React, { Fragment } from 'react';
import { Col, Row, Container, Tab, Nav } from 'react-bootstrap';
import { GetEnrolledQuizCard } from 'widgets';
import useMounted from 'hooks/useMounted';

const MostPopularCourses = ({ alldata }) => {
  const hasMounted = useMounted();
  return (
    <Fragment>
      <section className="pb-lg-14 pb-8">
        <Container>
          <Row>
            <Col xs={12}>
              <div className="mb-6">
                <h2 className="mb-1 h1">Most Popular Mock Test</h2>
                <p>These are the most popular mock test among Cybrom Courses learners worldwide in year 2023</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Tab.Container>
                <Tab.Content>
                  <Row>
                    {alldata?.quizes?.slice(0, 8).map((item, index) => {
                      return (
                        <Col lg={3} md={6} sm={12} key={index}>
                          {hasMounted && <GetEnrolledQuizCard item={item} />}
                        </Col>
                      );
                    })}
                  </Row>
                  {/* </Tab.Pane> */}
                </Tab.Content>
              </Tab.Container>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};



export default MostPopularCourses;
