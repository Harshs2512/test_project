// import sub components 
import { HeroAcademy, AcademyStats, MostPopularCourses, BecomeAnInstructor, WhatCustomersSay, MostPopularQuizes, MostPopularBlogs } from 'sub-components';
import { Fragment, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Row, Col, Image, Container, Button } from 'react-bootstrap';
import { TestimonialsSlider4, TestimonialsSlider5 } from 'widgets';
import Link from 'next/link';
import ProcesstoSuccess from 'sub-components/landings/home-academy/ProcesstoSuccess';
import FAQsection from 'sub-components/landings/home-academy/FAQsection';
import StudentStory1 from 'sub-components/landings/home-academy/StudentStory1';
import CircularCarousel from 'sub-components/landings/home-academy/CircularCarousel';
import EnquiryForm from 'sub-components/landings/home-academy/EnquiryForm'

const Home = () => {
    useEffect(() => {
        document.body.className = 'bg-light';
    });

    const session = useSession()
    return (
        <Fragment>

            {/* Hero Academy banner section */}
            <HeroAcademy />

            <EnquiryForm />

            {/*  Testimonial slider */}
            <section className="py-lg-10 pb-10">
                <Container>
                    <Row>
                        <Col xl={{ span: 12, }} md={12} xs={12}>
                            <Row className="text-center">
                                <Col md={12} className="px-lg-10 mb-7 mt-6">
                                    {/* text */}
                                    <span className="text-uppercase text-primary_cyb1 fw-semi-bold ls-md">Placement Records</span>
                                    {/* heading */}
                                    <h2 className="h1 fw-bold mt-3 text-capitalize">Cybrom students successfully working at</h2>
                                    {/* text */}
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <div className="text-center">
                                        {/*  Testimonial slider */}
                                        <TestimonialsSlider4 />
                                        <Link href="#" className="btn btn-dark"> EXPLORE OUR PROGRAMS
                                            <i className="fe fe-chevron-right fe-2xl ms-5 text-xl"></i>
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Most Popular Courses */}
            <ProcesstoSuccess />

            {/* Most Popular Courses */}
            <FAQsection />

            {/* Most Popular Courses */}
            <section className="py-lg-10 pb-7 bg-white">
                <Container>
                    <Row>
                        <Col xl={{ span: 12, }} md={12} xs={12}>
                            <Row className="text-center">
                                <Col md={12} className="px-lg-10 mb-7">
                                    <span className="text-uppercase text-primary_cyb1 fw-semi-bold ls-md">Our Collabrates</span>
                                    <h2 className="h1 fw-bold mt-3 text-capitalize">MOU with Colleges</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <div className="text-center">
                                        <TestimonialsSlider5 />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Circular Carousel Animation */}
            <CircularCarousel/>

            {/* Most Popular Courses */}
            <MostPopularCourses />

            {/* Most Popular Mock test */}
            <MostPopularQuizes />

            {/* Most Popular Blogs*/}
            <MostPopularBlogs />

            {/* Become an instructor */}
            <BecomeAnInstructor />

            {/* What our customers say */}
            <WhatCustomersSay />

            {/* Various acedamy statistics  */}
            <AcademyStats />
        </Fragment>
    );
};

export default Home;
