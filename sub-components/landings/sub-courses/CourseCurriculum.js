import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Card, Col, Container, Image, ListGroup, Row } from "react-bootstrap";

const CourseCurriculum = ({ alldata }) => {
    const [indexNum, setIndexNum] = useState(0)
    const pid = useRouter().query;
    const filterData = alldata?.find((item) => item.sectionid === pid?.pid);

    return (
        <section className="pb-lg-14 pb-8">
            <Container>
                <Row>
                    <Col xs={12} md={12} lg={6}>
                        <div className="mb-md-6 mb-0 mt-10">
                            <h4>Delivering impactful outcomes through Practical Learning</h4>
                            <h2 className="mb-2 display-3">Curriculum that makes you job ready</h2>
                        </div>
                        <Row className="mb-md-6 mb-0 mt-10">
                            <Col xs={12} md={12} lg={6}>
                                <div className="d-flex align-items-center mb-3">
                                    <div className="me-2 bg-white rounded-5 p-2 shadow-lg" style={{ width: '45px', height: '45px' }}>
                                        <Image src="/images/cybrommain/thunder.gif" className="img-fluid" />
                                    </div>
                                    <div>
                                        <p className="fs-4">{filterData?.feature1}</p>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} md={12} lg={6}>
                                <div className="d-flex align-items-center mb-3">
                                    <div className="me-2 bg-white rounded-5 p-2 shadow-lg" style={{ width: '45px', height: '45px' }}>
                                        <Image src="/images/cybrommain/thunder.gif" className="img-fluid" />
                                    </div>
                                    <div>
                                        <p className="fs-4">{filterData?.feature2}</p>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} md={12} lg={6}>
                                <div className="d-flex align-items-center mb-3">
                                    <div className="me-2 bg-white rounded-5 p-2 shadow-lg" style={{ width: '45px', height: '45px' }}>
                                        <Image src="/images/cybrommain/thunder.gif" className="img-fluid" />
                                    </div>
                                    <div>
                                        <p className="fs-4">{filterData?.feature3}</p>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} md={12} lg={6}>
                                <div className="d-flex align-items-center mb-3">
                                    <div className="me-2 bg-white rounded-5 p-2 shadow-lg" style={{ width: '45px', height: '45px' }}>
                                        <Image src="/images/cybrommain/thunder.gif" className="img-fluid" />
                                    </div>
                                    <div>
                                        <p className="fs-4">{filterData?.feature4}</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} md={12} lg={6}>
                        <div className="d-flex align-items-center justify-content-center mb-15 mb-lg-0 rounded">
                            <iframe src="https://player.vimeo.com/video/864349514?h=09dc3a3113" width="640" height="564" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6} lg={5}>
                        {filterData?.section?.map((item, index) => (
                            <Card className={`p-0 card-hover border ${indexNum === index ? 'border-2 border-info' : ''} mb-2`} key={index} onClick={() => setIndexNum(index)} style={{ cursor: 'pointer' }}>
                                <Card.Body>
                                    <div>
                                        <h5 className="mb-1">
                                            {item.title}
                                        </h5>
                                        <p className="">
                                            {item.description}
                                        </p>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </Col>
                    <Col xs={12} md={6} lg={7}>
                        <Card className="p-0">
                            <Card.Header>
                                <h4>Topics are covered</h4>
                            </Card.Header>
                            <Card.Body>
                                {filterData.section && filterData.section[indexNum].topics.map((item, index) => (
                                    <div className="d-flex text-center" key={index}>
                                        <div className="bg-warning opacity-75 text-white opacity-75 rounded text-white fw-bold p-1 d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px' }}>
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" focusable="false" class="chakra-icon css-jsr5sy" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M186.301 339.893L96 249.461l-32 30.507L186.301 402 448 140.506 416 110z"></path></svg>
                                        </div>
                                        <p className="ms-2">
                                            {item.topic}
                                        </p>
                                    </div>
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section >
    )
}

export default CourseCurriculum;