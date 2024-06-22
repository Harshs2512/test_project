

import React, { useEffect, useRef, useState } from 'react';
import { Container, Image, Row, Col, Button } from 'react-bootstrap';
import styled, { keyframes, css } from "styled-components";

const MultiSlide = (props) => {
    const alldatas = props?.alldata;
    const uniqueIds = new Set();
    const uniqueData = alldatas.filter(item => {
        if (uniqueIds.has(item._id)) {
            return false;
        } else {
            uniqueIds.add(item._id);
            return true;
        }
    });
    const alldataWithDuplicate = [...uniqueData, ...uniqueData];

    return (
        <section className=" mt-lg-4 mt-md-10 mt-20">
            <Container>
                <Wrapper>
                    <Text>200+ Companies </Text>
                    <Note>Our Students have gotten offers from awesome companies.</Note>
                    <Marquee>
                        <MarqueeGroup>
                            {alldataWithDuplicate?.map((item, index) => (
                                <div key={index} className="rounded bg-white shadow-lg border border-1 ms-3 text-center align-items-center">
                                    <div className='px-1 d-flex py-2 text-center justify-content-center' style={{ width: '7rem', height: '5rem' }}>
                                        <Image
                                            src={`/api/siteSettings/landingPage/circularCarousel/getCompanylogo/${item._id}`}
                                            alt='course Logo' className='img-fluid w-100 h-100' />
                                    </div>
                                </div>
                            ))}
                        </MarqueeGroup>
                    </Marquee>
                    <Marquee>
                        <MarqueeGroup2>
                            {alldataWithDuplicate?.map((item, index) => (
                                <div key={index} className="rounded bg-white shadow-lg border border-1 ms-3 text-center align-items-center">
                                    <div className='px-1 d-flex py-2 text-center justify-content-center' style={{ width: '7rem', height: '5rem' }}>
                                    <Image
                                            src={`/api/siteSettings/landingPage/circularCarousel/getCompanylogo/${item._id}`}
                                            alt='course Logo' className='img-fluid w-100 h-100' />
                                    </div>
                                </div>
                            ))}
                        </MarqueeGroup2>
                    </Marquee>
                    <Marquee>
                        <MarqueeGroup>
                            {alldataWithDuplicate?.map((item, index) => (
                                <div key={index} className="rounded bg-white shadow-lg border border-1 ms-3 text-center align-items-center">
                                    <div className='px-1 d-flex py-2 text-center justify-content-center' style={{ width: '7rem', height: '5rem' }}>
                                    <Image
                                            src={`/api/siteSettings/landingPage/circularCarousel/getCompanylogo/${item._id}`}
                                            alt='course Logo' className='img-fluid w-100 h-100' />
                                    </div>
                                </div>
                            ))}
                        </MarqueeGroup>
                    </Marquee>
                    <Marquee>
                        <MarqueeGroup2>
                            {alldataWithDuplicate.reverse()?.map((item, index) => (
                                <div key={index} className="rounded bg-white shadow-lg border border-1 ms-3 text-center align-items-center">
                                    <div className='px-1 d-flex py-2 text-center justify-content-center' style={{ width: '7rem', height: '5rem' }}>
                                    <Image
                                            src={`/api/siteSettings/landingPage/circularCarousel/getCompanylogo/${item._id}`}
                                            alt='course Logo' className='img-fluid w-100 h-100' />
                                    </div>
                                </div>
                            ))}
                        </MarqueeGroup2>
                    </Marquee>
                </Wrapper>
                <Row className="my-8 w-75 mx-auto justify-content-between align-content-between  ">
                    <Col lg={3} md={6} className="border-end-md bg-white rounded-2 border-hover-warning mt-2">
                        <div className="text-center   ">
                            <div className="">
                                <h1 className="text-warning fw-bolder">200+</h1>
                                <h6 className="text-info text-uppercase">Partner Companies</h6>
                            </div>
                        </div>
                    </Col>
                    <Col lg={3} md={6} className="border-end-lg bg-white rounded-2 mt-2">
                        <div className="text-center">
                            <div className="">
                                <h1 className="text-warning  fw-bolder">50+</h1>
                                <h6 className="text-info text-uppercase">International Placements</h6>
                            </div>
                        </div>
                    </Col>
                    <Col lg={3} md={6} className="border-end-md bg-white rounded-2 mt-2">
                        <div className="text-center">
                            <div className="">
                                <h1 className="text-warning fw-bolder ">12 LPA</h1>
                                <h6 className="text-info text-uppercase">Highest Package</h6>
                            </div>
                        </div>
                    </Col>
                    <Col lg={2} md={6} className=" bg-white rounded-2 mt-2">
                        <div className="text-center">
                            <div className="">
                                <h1 className="text-warning fw-bolder">5000+</h1>
                                <h6 className="text-info text-uppercase">Placements</h6>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-center align-content-center">
                    <Col md={12} lg={3}>
                        <Button variant="outline-info" className="me-3 w-100 mb-2">View All Companies</Button>
                    </Col>
                    <Col md={12} lg={3}>
                        <Button variant="outline-white bg-success" className="w-100 text-white ">Request a Callback</Button>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default MultiSlide;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Text = styled.div`
  font-weight: 800;
  margin-bottom: 5px;
  color: #02203c;
  font-size: 45px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    font-size: 30px;
  }

  @media screen and (max-width: 480px) {

    font-size: 20px;
  }
`;

const Note = styled.div`
  font-size: 25px;
  font-weight: 200;
  margin-bottom: 40px;
  color: #7c8e9a;
`;

const Marquee = styled.div`
  display: flex;
  max-width: 1000px;
  overflow: hidden;
  user-select: none;
  margin-top: 5px;
  mask-image: linear-gradient(
    to right,
    hsl(0 0% 0% / 0),
    hsl(0 0% 0% / 1) 10%,
    hsl(0 0% 0% / 1) 90%,
    hsl(0 0% 0% / 0)
  );

  @media screen and (max-width: 1200px) {
    /* Adjust styles for screens smaller than 1200px (large screens) */
    max-width: 90%;
    margin: 10px auto; /* Center the marquee */
  }

  @media screen and (max-width: 992px) {
    /* Adjust styles for screens smaller than 992px (medium screens) */
    max-width: 85%;
    margin: 10px auto; /* Center the marquee */
  }

  @media screen and (max-width: 768px) {
    /* Adjust styles for screens smaller than 768px (small screens) */
    max-width: 80%;
    margin: 10px auto; /* Center the marquee */
  }
`;


const scrollX = keyframes`
  from {
    left: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const common = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  white-space: nowrap;
  width: 100%;
  animation: ${scrollX} 30s linear infinite;
`;

const MarqueeGroup = styled.div`
  ${common}
`;
const MarqueeGroup2 = styled.div`
  ${common}
  animation-direction: reverse;
  animation-delay: -3s;
`;