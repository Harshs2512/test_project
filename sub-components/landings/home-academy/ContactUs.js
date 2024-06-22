import { Col, Row, Button, Container } from 'react-bootstrap';
import Image from 'next/image';

const FindRightCourse = () => {
    return (
        <section className="pb-lg-10">
            <Container>
                <Row>
                    <Col xl={{ offset: 1, span: 10 }} md={12} xs={12}>
                        <div className=" p-md-3 p-3 px-xl-0 rounded-4" style={{background: 'linear-gradient(0deg, rgba(23, 82, 126, 1) 16%, rgba(1, 9, 15, 1) 100%)'}} >
                            <Row className="align-items-center">
                                <Col xl={{ offset: 1, span: 7 }} md={6} xs={12}>
                                    <div>
                                        <h2 className="h1 text-white mb-3">Let’s find the right course for you!</h2>
                                        <p className="text-white fs-4">…and achieve their learning goals. With our expert tutors, your goals are  closer  than ever!</p>
                                        <Button variant='dark'>Contact Us</Button>
                                    </div>
                                </Col>
                                <Col xl={4} md={6} xs={12}>
                                    <div className="">
                                        <Image src='/images/cybrommain/Emergency.gif'
                                            alt="learning"
                                            className="img-fluid"
                                            width={230}
                                            height={280}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default FindRightCourse