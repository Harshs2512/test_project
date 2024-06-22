import React, { useEffect, useState } from 'react';
import { TestimonialsSlider4 } from 'widgets';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';

const TestimonialSection = (props) => {
    const bg = {
        backgroundImage: 'url("/images/svg/Grid2.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };
    const [isHovered, setIsHovered] = useState(false);
    return (
        <section className="py-lg-6 pb-10" style={bg}>
            <Container>
                <Row>
                    <Col xl={{ span: 12, }} md={12} xs={12}>
                        <Row className="text-center">
                            <Col md={12} className="px-lg-10 mb-7 mt-3">
                                <h2 className="h1 fw-bold mt-3 text-capitalize">Cybrom students successfully working at</h2>
                                {/* text */}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="text-center">
                                    {/*  Testimonial slider */}
                                    <TestimonialsSlider4 alldata={props?.alldata} />
                                    <Link href="#"
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        className={`btn mt-8 p-3 text-white fs-4 ${isHovered ? 'bg-gradient-buttons-reverse' : 'bg-gradient-buttons'}`}>EXPLORE OUR PROGRAMS
                                        <i className="fe fe-chevron-right fe-2xl ms-5 text-xl"></i>
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    )
};

export default TestimonialSection;