import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";

const HeroCourses = ({ data }) => {
    return (
        <section className="pb-lg-4 pb-2">
            <Container>
                <Row>
                    <Col xs={12}>
                        <div className="mb-6 mt-10 text-center">
                            <h2 className="mb-2 display-3">{data?.title}</h2>
                            <p className="fs-3">
                                {data?.description}
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6} lg={3}>
                        <Card className="p-0 mb-3">
                            <Card.Header>
                                <h4>{data?.card_one?.cardtitle}</h4>
                            </Card.Header>
                            <Card.Body>
                                {data?.card_one?.bulletpoints.map((item, index) => (
                                    <div className="d-flex" key={index}>
                                        <div className="bg-warning opacity-75 text-white rounded fw-bold p-1 d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px' }}>
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" focusable="false" class="chakra-icon css-jsr5sy" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M186.301 339.893L96 249.461l-32 30.507L186.301 402 448 140.506 416 110z"></path></svg>
                                        </div>
                                        <p className="ms-2">
                                            {item.bulletpoint}
                                        </p>
                                    </div>
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <Card className="p-0 mb-3">
                            <Card.Header>
                                <h4>{data?.card_second?.cardtitle}</h4>
                            </Card.Header>
                            <Card.Body>
                                {data?.card_second?.bulletpoints.map((item, index) => (
                                    <div className="d-flex" key={index}>
                                        <div className="bg-warning opacity-75 text-white rounded fw-bold p-1 d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px' }}>
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" focusable="false" class="chakra-icon css-jsr5sy" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M186.301 339.893L96 249.461l-32 30.507L186.301 402 448 140.506 416 110z"></path></svg>
                                        </div>
                                        <p className="ms-2">
                                            {item.bulletpoint}
                                        </p>
                                    </div>
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <Card className="p-0 mb-3">
                            <Card.Header>
                                <h4>{data?.card_third?.cardtitle}</h4>
                            </Card.Header>
                            <Card.Body>
                                {data?.card_third?.bulletpoints.map((item, index) => (
                                    <div className="d-flex" key={index}>
                                        <div className="bg-warning opacity-75 text-white rounded fw-bold p-1 d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px' }}>
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" focusable="false" class="chakra-icon css-jsr5sy" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M186.301 339.893L96 249.461l-32 30.507L186.301 402 448 140.506 416 110z"></path></svg>
                                        </div>
                                        <p className="ms-2">
                                            {item.bulletpoint}
                                        </p>
                                    </div>
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <Card className="p-0 mb-3">
                            <Card.Header>
                                <h4>{data?.card_forth?.cardtitle}</h4>
                            </Card.Header>
                            <Card.Body>
                                {data?.card_forth?.bulletpoints.map((item, index) => (
                                    <div className="d-flex" key={index}>
                                        <div className="bg-warning opacity-75 text-white rounded fw-bold p-1 d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px' }}>
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" focusable="false" class="chakra-icon css-jsr5sy" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M186.301 339.893L96 249.461l-32 30.507L186.301 402 448 140.506 416 110z"></path></svg>
                                        </div>
                                        <p className="ms-2">
                                            {item.bulletpoint}
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

export default HeroCourses;
