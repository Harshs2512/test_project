import { Container, Row, Col, Accordion, useAccordionButton, AccordionContext, ListGroup, Image } from 'react-bootstrap';
import { GKAccordionPlus, SectionHeadingCenter } from 'widgets';
import { useState, Fragment, useContext, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const FAQsection = () => {
    const [alldata, setAlldata] = useState([])
    const [keyId, setKeyId] = useState(null);
    const [indexNum, setIndexNum] = useState(false);
    const title = 'Frequently Asked Questions.';
    const subtitle = 'Need to Know';
    const description = 'Your Top Questions? Cyber Security and Ethical Hacking Training Course FAQs.';

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/siteSettings/secondPage/faqSection/getRecord");
            if (res.status === 200) {
                setAlldata(res.data);
            }
        } catch (error) {
            console.log("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [id, setId] = useState(alldata.data && alldata?.data[0]?._id);

    const backgoundImage1 = {
        backgroundImage: `url('/api/siteSettings/secondPage/faqSection/${indexNum ? 'getFirstlogo' : 'getSecondlogo'}/${id}')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        transition: 'linear, 0.6s'
    };

    const backgoundImage2 = {
        backgroundImage: `url('/api/siteSettings/secondPage/faqSection/${indexNum ? 'getSecondlogo' : 'getFirstlogo'}/${id}')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        transition: 'linear, 0.6s'
    };

    const ContextAwareToggle = ({ children, eventKey, callback, index }) => {
        const currentEventKey = useContext(AccordionContext);
        const decoratedOnClick = useAccordionButton(
            eventKey,
            () => setIndexNum(!indexNum),
            () => callback && callback(eventKey));
        const isCurrentEventKey = currentEventKey === eventKey;
        setKeyId(currentEventKey.activeEventKey)
        return (
            <Link
                href="#!"
                onClick={decoratedOnClick}
                aria-expanded={true}
                className="d-flex align-items-center text-inherit text-decoration-none shadow-none justify-content-between py-3 px-2 rounded">
                <span className={`me-auto ${isCurrentEventKey ? 'text-primary' : ''}`}>
                    {children}
                </span>
                <span className="collapse-toggle">
                    <i className="fe fe-plus text-primary"></i>
                </span>
            </Link>
        );
    };

    return (
        <section className="py-8">
            <Container>
                <SectionHeadingCenter
                    title={title}
                    subtitle={subtitle}
                    description={description}
                />
                <Row className="justify-content-center">
                    <Col lg={6} md={8} sm={12} className=''>
                        <Accordion defaultActiveKey={alldata[0]?._id}>
                            <ListGroup variant="flush">
                                {alldata.map((item, index) => (
                                    <Fragment key={index}>
                                        <ListGroup.Item className="px-0 py-2">
                                            <h3 className="mb-n3 fw-bold"
                                                onClick={() => setId(item._id)}>
                                                <ContextAwareToggle eventKey={item._id} index={index} >
                                                    {item.question}
                                                </ContextAwareToggle>
                                            </h3>
                                        </ListGroup.Item>
                                        <Accordion.Collapse eventKey={item._id}>
                                            <div className={"py-3 mt-0 fs-4 px-2 rounded text-gray-600 px-0 py-2"}>
                                                {item.answer}
                                            </div>
                                        </Accordion.Collapse>
                                    </Fragment>
                                ))}
                            </ListGroup>
                        </Accordion>
                    </Col>
                    <Col lg={6} md={4} sm={12}>
                        <div className="container d-none d-lg-flex ">
                            <div className='ms-12 w-100'>
                                <div className="square1 rounded-lg"></div>
                                <div className="square2 rounded-lg" style={backgoundImage1}></div>
                                <div className="square3 rounded-lg" style={backgoundImage2}></div>
                                <div className="square4 rounded"></div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default FAQsection;