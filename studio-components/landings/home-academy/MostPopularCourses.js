import React, { Fragment, useEffect, useState } from 'react';
import { Col, Row, Container, Tab, Card, Button, Image } from 'react-bootstrap';
import Link from 'next/link';

const MostPopularCourses = () => {
  const jobData = [
    { title: '.Net Developer - ASP/C#/MVC', company: 'Hash Studioz', experience: '1 - 2 Years', datePosted: '13 days ago' },
    { title: 'MERN Stack Developer - Node.js/React.js', company: 'Hash Studioz', experience: '1 - 2 Years', datePosted: '13 days ago' },
    { title: '.Net Tech Lead - Azure/Javascript', company: 'Mobile Programming Pvt LTd', experience: '0 - 2 Years', datePosted: '5 days ago' },
    { title: '.Net Developer - ASP/C#/MVC', company: 'Hash Studioz', experience: '1 - 2 Years', datePosted: '13 days ago' },
    { title: 'MERN Stack Developer - Node.js/React.js', company: 'Hash Studioz', experience: '1 - 2 Years', datePosted: '13 days ago' },
    { title: '.Net Tech Lead - Azure/Javascript', company: 'Mobile Programming Pvt LTd', experience: '0 - 2 Years', datePosted: '5 days ago' },
  ];
  return (
    <Fragment>
      <section className="pb-4 bg-white">
        <Container>
          <Row>
            <Col xl={8} lg={12} md={12} sm={12} className="mb-4 mb-xl-0">
              {/*  Card  */}
              <Tab.Container >
                <Card className="mb-5">
                  {/*  Card body  */}
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <h2 className="fw-semi-bold mb-2">
                        COMPANY-WISE INTERVIEW EXPERIENCES
                      </h2>
                    </div>
                    <div className="d-flex mb-5 justify-content-between">
                      <span>
                        <span className="fw-medium " style={{color:'#98a1a3'}}>Read curated interview experiences of top bigwigs to crack your next interview</span>
                      </span>
                      <span>
                        <Link href="#" className="btn btn-outline-secondary btn-sm">
                          View More
                        </Link>
                      </span>
                    </div>
                    <Row className="justify-content-center text-white g-3">
                      <Col sm={4} md={2} lg={2} className="p-3 border rounded m-2 py-6">
                        <Link href='#'>
                          <Image src='https://files.codingninjas.in/amazon-ps-4659.svg' className='img-fluid' />
                        </Link>
                      </Col>
                      <Col sm={4} md={2} lg={2} className="p-3 border rounded m-2 py-6">
                        <Link href='#'>
                          <Image src='https://files.codingninjas.in/cred-strech-29054.svg' className='img-fluid' />
                        </Link>
                      </Col>
                      <Col sm={4} md={2} lg={2} className='p-3 border rounded m-2 py-6'>
                        <Link href='#'>
                          <Image src='https://files.codingninjas.in/disney-_hotstar_logo-29053.svg' className='img-fluid' />
                        </Link>
                      </Col>
                      <Col sm={4} md={2} lg={2} className='p-3 border rounded m-2 py-6'>
                        <Link href='#'>
                          <Image src='https://files.codingninjas.in/googlest2-29059.svg' className='img-fluid' />
                        </Link>
                      </Col>
                    </Row>
                    <Row className="justify-content-center text-white g-3 mt-2">
                      <Col sm={4} md={2} lg={2} className="p-3 border rounded m-2 py-6">
                        <Link href='#'>
                          <Image src='https://files.codingninjas.in/accenture-new-28897.svg' className='img-fluid' />
                        </Link>
                      </Col>
                      <Col sm={4} md={2} lg={2} className="p-3 border rounded m-2 py-6">
                        <Link href='#'>
                          <Image src='https://files.codingninjas.in/adobe-st2-29058.svg' className='img-fluid' />
                        </Link>
                      </Col>
                      <Col sm={4} md={2} lg={2} className="p-3 border rounded m-2 py-6">
                        <Link href='#'>
                          <Image src='https://files.codingninjas.in/jpmlogostrc-29270.svg' className='img-fluid' />
                        </Link>
                      </Col>
                      <Col sm={4} md={2} lg={2} className="p-3 border rounded m-2 py-6">
                        <Link href='#'>
                          <Image src='https://files.codingninjas.in/flipkart-1-28899.svg' className='img-fluid' />
                        </Link>
                      </Col>
                    </Row>
                    <Row className="justify-content-center text-white g-3 mt-2">
                      <Col sm={4} md={2} lg={2} className="p-3 border rounded m-2 py-6">
                        <Link href='#'>
                          <Image src='https://files.codingninjas.in/goldman-ps-4656.svg' className='img-fluid' />
                        </Link>
                      </Col>
                      <Col sm={4} md={2} lg={2} className="p-3 border rounded m-2 py-6">
                        <Link href='#'>
                          <Image src='https://files.codingninjas.in/adobe-st2-29058.svg' className='img-fluid' />
                        </Link>
                      </Col>
                      <Col sm={4} md={2} lg={2} className="p-3 border rounded m-2 py-6">
                        <Link href='#'>
                          <Image src='https://files.codingninjas.in/jpmlogostrc-29270.svg' className='img-fluid' />
                        </Link>
                      </Col>
                      <Col sm={4} md={2} lg={2} className="p-3 border rounded m-2 py-6">
                        <Link href='#'>
                          <Image src='https://files.codingninjas.in/samsung-ps-4658.svg' className='img-fluid' />
                        </Link>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Tab.Container>
            </Col>
            <Col xl={4} lg={12} md={12} sm={12}>
              <Card>
                <Card.Body>
                  <div className='border-bottom my-4 d-flex'>
                    <div className="position-relative">
                      <Image
                        src='https://s3-ap-southeast-1.amazonaws.com/codestudio.codingninjas.com/studio/assets/icons/puzzle.svg'
                        alt=""
                        className=""
                      />
                    </div>
                    <h4 className='mx-2'>
                      Popular Interview Experiences
                    </h4>
                  </div>
                  <div className="job-container" style={{ height: '410px', overflowY: 'auto' }}>
                    {jobData.map((job, index) => (
                      <Card key={index} className="mb-4 card-hover border mt-2 bg-gray-100">
                        <p className='mx-1'>Amazon | Fresher</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex">
                            <Link href="/marketing/courses/course-path-single/" className="bg-white rounded-circle my-3 mx-2"
                              style={{ width: '50px', height: '50px' }}>
                              <Image
                                src="https://staticlogo.hirist.com/5366-100X100.png"
                                alt="NK"
                                className="avatar-md img-fluied"

                              />
                            </Link>

                            <div className="">
                              <h5 className="mb-1">
                                <Link href="/marketing/courses/course-path-single/" className="text-inherit">
                                  Nikita Gautam
                                </Link>
                              </h5>
                              <p className="mb-0 fs-6">
                                <span className="me-2">
                                  <span className="text-dark fw-medium">
                                    <i className="fas fa-briefcase"></i>
                                  </span>
                                </span>
                                <span>
                                  <span className="text-dark fw-medium">{job.company}</span>
                                </span>
                              </p>
                              <p className="mb-0 fs-6">
                                <span className="fs-6">
                                  <span className="mdi mdi-star text-warning me-2"></span>
                                  {job.datePosted}
                                </span>
                              </p>
                              <p className="mb-0 fs-6 border-top p-2">
                                <span className="fs-6">
                                  <span className="">745 Upvotes </span>
                                  <span className="mdi mdi-star me-2"></span>
                                  64 views
                                  <span className=""> 8 comment</span>
                                </span>

                              </p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section >
    </Fragment>
  );
};

export default MostPopularCourses;
