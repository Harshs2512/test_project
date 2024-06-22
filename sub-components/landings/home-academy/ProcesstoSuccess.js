import React, { useState } from 'react';
import { Col, Container, Row, Button, Card, Image } from 'react-bootstrap';

const ProcesstoSuccess = () => {
    return (
        <section className="py-lg-14 py-8">
            {/* container */}
            <Container>
                <Row className="text-center">
                    {/* col */}
                    <Col md={12} className="px-lg-10 mb-8 mt-6">
                        <span className="text-uppercase text-primary fw-semi-bold ls-md">Process</span>
                        {/* heading */}
                        <h2 className="h1 fw-bold mt-3">Our Approach to Get you Placed
                        </h2>
                    </Col>
                </Row>
                <Row className="">
                    {/* col */}
                    <Col md={4} sm={12} >
                        <div className="mb-5 text-center">
                            {/* icon */}
                            <div className="icon-shape icon-lg border border-primary border-2 fs-3 rounded-circle mb-4 process-line text-primary smooth-shadow-md"> 1</div>
                            {/* heading */}
                            <h3>Click on 'Post a job'</h3>
                            {/* text */}
                            <p className="mb-0 px-1">Fill in the details of the job be sure to include your location restrictions if you have em!</p>
                        </div>
                    </Col>
                    {/* col */}
                    <Col md={4} sm={12} >
                        <div className=" text-center">
                            {/* icon */}
                            <div className="icon-shape icon-lg border border-primary border-2 fs-3 rounded-circle mb-4 process-line text-primary smooth-shadow-md bg-white">2</div>
                            {/* heading */}
                            <h3>Select an upgrade if required </h3>
                            {/* text */}
                            <p className="mb-0 px-2">The base price for a job listing on Geeks is  $29 per month. Choose one of our optional upgrades to gain more visibility to your listing.</p>
                        </div>
                    </Col>
                    {/* col */}
                    <Col md={4} sm={12} >
                        <div className=" text-center">
                            {/* icon */}
                            <div className="icon-shape icon-lg border border-primary border-2 fs-3 rounded-circle mb-4 text-primary smooth-shadow-md bg-white">3</div>
                            {/* heading */}
                            <h3>Click on 'Post a job' </h3>
                            {/* text */}
                            <p className="mb-0 px-4">Fill in the details of the job be sure to include your location restrictions if you have em!</p>
                        </div>
                    </Col>
                    {/* button */}
                    <Col className="mt-8 text-center">
                        <Button as="a" href="#">Apply Now</Button>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ProcesstoSuccess;
