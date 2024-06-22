// import node module libraries
import { Col, Row, Container } from 'react-bootstrap';
import Link from 'next/link';
import {useState} from 'react';
// import widget/custom components
import { Ratings, TestimonialsSlider3 } from 'widgets';

const WhatCustomersSay = ({ alldata }) => {
  const [isHovered, setIsHovered] = useState(false);
  const bgs = {
    backgroundImage: `url("/images/svg/Gridwhyus2.svg"), linear-gradient(180deg, rgba(23, 82, 126, 1) 16%, rgba(1, 9, 15, 1) 100%)`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };
  return (
    <section className=" pt-14 pb-16" style={bgs}>
      <Container className="container">
        <Row className="mb-10">
          <Col lg={{ span: 10, offset: 1 }} xs={12}>
            <Row className="align-items-center">
              <Col md={6}>
                <div className="">
                  <div className="mb-3"><span className="text-white fw-semi-bold">4.5/5.0</span>{' '}
                    <span className="text-warning">
                      <Ratings rating={4.5} />
                    </span>{' '}
                    <span className="text-warning">5</span><span className="ms-2 text-white">(Based on 3265 ratings)</span></div>
                  <h2 className="h1 text-warning">What our customers say</h2>
                  <p className="mb-0 text-white"> Hear from <span className="text-warning">teachers</span>, <span
                    className="text-warning">trainers</span>, and <span className="text-warning">leaders</span> in the learning space about how Cybrom empowers them to provide quality online learning experiences.</p>
                </div>
              </Col>
              <Col md={6} className="text-md-end mt-4 mt-md-0">
                <Link href="#"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`btn px-3 fs-3 text-white ${isHovered ? 'bg-gradient-buttons-reverse border-0' : 'bg-gradient-buttons border-0'}`}
                >View Reviews <span style={{ marginLeft: '10px' }}>→</span></Link>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className="position-relative">
              {/*  Testimonial slider */}
              <TestimonialsSlider3 alldata={alldata} />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default WhatCustomersSay