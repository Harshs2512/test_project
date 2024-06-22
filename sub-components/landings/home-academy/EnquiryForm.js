import React, { useEffect, useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

const EnquiryForm = ({upper}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCourseandMock, setSelectedCourseandMock] = useState(null);
    const handleOptionCategory = (event) => {
        const value = event.target.value;
        if (selectedOption === value) {
            setSelectedCategory(null);
        } else {
            setSelectedCategory(value);
        }
    };
    const handleSelectionChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
    };
    const handleSelectionCourseandMock = (event) => {
        const value = event.target.value;
        setSelectedCourseandMock(value);
    };
    return (
        <section className=" pb-1 align-items-center position-relative justify-content-center ">
            {/* <Container> */}
            <Row className={` ${upper}  mt-n4 mb-4 w-lg-75 mx-md-auto mx-2 rounded rounded-4  shadow-lg `} style={{ background: "white" }}>
                <h1 className="text-center mt-1 " >Get In Touch with Us</h1>
                <div>
                    <Row className="py-1  ">
                        <Col className="d-flex ">
                            <Form className="d-md-flex w-100 justify-content-around ">
                                <Form.Group className="w-20">
                                    <Form.Label  varient="danger" >
                                         Name
                                        <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Group className="mb-3 ">
                                        <Form.Control className="p-1"
                                            type="text"
                                            placeholder="Saurabh"
                                            required
                                        />
                                    </Form.Group>
                                </Form.Group>
                                <Form.Group className="w-20">
                                    <Form.Label  >
                                         Email
                                        <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Group className="mb-3 ">
                                        <Form.Control className="p-1"
                                            type="email"
                                            id="email"
                                            placeholder="abc@gmail.com"
                                            required
                                        />
                                    </Form.Group>
                                </Form.Group>
                                <Form.Group className="w-20">
                                    <Form.Label >
                                        <span>
                                             Phone
                                        </span>
                                        <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Group className="mb-3 ">
                                        <Form.Control className="p-1"
                                            type="text"
                                            id="phone"
                                            placeholder="+91-9999999999"
                                            required
                                        />
                                    </Form.Group>
                                </Form.Group>
                                {/* <Form.Group className=" mb-md-3 mb-2 w-lg-15 ">
                                    <Form.Label >
                                        Select City
                                        <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Select className='p-1  ' id="selection" value={selectedOption} onChange={handleSelectionChange}>
                                        <option>
                                            --Select--
                                        </option>
                                        <option value="course">
                                            Bhopal
                                        </option>
                                    </Form.Select>
                                </Form.Group> */}
                                <Form.Group className=" mb-md-3 mb-2 w-lg-20">
                                    <Form.Label >
                                        Select Branch
                                        <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Select className="p-1" id="categoryselection" value={selectedCategory} onChange={handleOptionCategory}>
                                        <option>
                                            --Select--
                                        </option>
                                        <option>
                                            MP Nagar
                                        </option>
                                        <option>
                                            Indrpuri
                                        </option>
                                    </Form.Select>
                                </Form.Group>
                                {/* <Form.Group className=" mb-md-3 mb-1 w-lg-15">
                                    <Form.Label >
                                        Select Course
                                        <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Select className="p-1" id="selectcourseandmock" value={selectedCourseandMock} onChange={handleSelectionCourseandMock}>
                                        <option>
                                            --Select--
                                        </option>
                                        <option>
                                            FullStack Developer
                                        </option>
                                        <option>
                                            Java Developer
                                        </option>
                                        <option>
                                            Python Developer
                                        </option>
                                        <option>
                                            Django Development
                                        </option>
                                        
                                    </Form.Select>
                                </Form.Group> */}
                                {/* {courses.map((item, index) => {
                                            return (
                                                <option >
                                                    {item.course_title}
                                                </option>
                                            )
                                        })} */}
                            </Form>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col className="text-center">
                            <Button
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                className={`btn px-3 text-white ${isHovered ? 'bg-gradient-buttons-reverse border-0' : 'bg-gradient-buttons border-0'}`}
                            >
                                SEND INFO
                                <i className="fe fe-chevron-right fe-2xl ms-2 text-xl"></i>
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Row>
        </section>
    )
};

export default EnquiryForm;