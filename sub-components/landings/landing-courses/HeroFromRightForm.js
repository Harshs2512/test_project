// import node module libraries
import Link from 'next/link';
import { Clock, Video, Users } from 'react-feather';
import { Container, Image, Button, Row, Col, Card, Form } from 'react-bootstrap';
import Icon from '@mdi/react';
import { mdiFacebook, mdiTwitter, mdiGoogle } from '@mdi/js';
import { useEffect, useState } from 'react';
import axios from 'axios';

const HeroFormRightForm = () => {


    const [showcontent, setShowcontent] = useState(false)
    const [alldata, setAlldata] = useState([])

    const showContent = () => {
        setShowcontent(!showcontent);
    };

    const [formData, setFormData] = useState({
        name: "",
        contactno: "",
        cities: "",
        institute: "",
        message: ""
    });

    const cities = { cities: ["Bhopal", "Indore"] };
    const institute = { institute: ["MP Nagar", "Indrapuri"] };
    const fetchData = async () => {
        try {
            const res = await axios.get("/api/siteSettings/secondPage/enquriySection/getRecord")
            setAlldata(res?.data[0])
        }
        catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const sectionContent = alldata?.description;

    return (
        <section className="py-md-12 py-5 bg-white ">
            <Container>
                <Row>
                    <Col xl={6} lg={6} md={12}>
                        <div className="mb-4 mb-xl-0 text-center text-md-start">
                            {/*  Caption  */}
                            <h1 className="display-4 fw-bold mb-3 ls-sm ">
                                {alldata?.title}{' '}
                            </h1>
                            <p className="mb-4 lead fs-4">
                                {showcontent ? sectionContent : sectionContent?.slice(0, 730)}
                                {!showcontent ? (
                                    <span className='text-primary' onClick={() => showContent(true)}>.....Read more</span>
                                ) : (
                                    <span className='text-primary' onClick={() => showContent(false)}>Read less</span>
                                )}
                            </p>
                        </div>
                    </Col>
                    <Col xl={{ span: 5, offset: 1 }} lg={6} md={12}>
                        {/*  Card  */}
                        <Card style={{ zIndex: 1 }} className="smooth-shadow-md">
                            {/*  Card body  */}
                            <Card.Body className="p-5">
                                <div className="mb-4">
                                    <h1 className="mb-4 lh-1 fw-bold h2">Get in touch now</h1>
                                </div>
                                {/* <div className="mb-4">
                                    <div className="border-bottom"></div>
                                    <div className="text-center mt-n2  lh-1">
                                        <span className="bg-white px-2 fs-6">OR</span>
                                    </div>
                                </div> */}
                                {/*  Form  */}
                                <Form>
                                    {/*  Username  */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Your Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Your full name"
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                            className=''
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Your Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Your email"
                                            id="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            className=''
                                        />
                                    </Form.Group>
                                    {/*  contact  */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Contact No</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Contact/WhatsApp No."
                                            id="contact"
                                            value={formData.contactno}
                                            onChange={(e) => setFormData({ ...formData, contactno: e.target.value })}
                                            required
                                            className=''
                                        />
                                    </Form.Group>
                                    {/*  contact  */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Select City</Form.Label>
                                        <Form.Select id="city"
                                            value={formData.cities}
                                            onChange={(e) => setFormData({ ...formData, cities: e.target.value })}
                                        >
                                            <option> --Select-- </option>
                                            {cities.cities.map((item, index) => {
                                                return (
                                                    <option value={item._id}>
                                                        {item}
                                                    </option>
                                                )
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Select Institute</Form.Label>
                                        <Form.Select id="institute"
                                            value={formData.institute}
                                            onChange={(e) => setFormData({ ...formData, institute: e.target.value })}
                                        >
                                            <option> --Select-- </option>
                                            {institute.institute.map((item, index) => {
                                                return (
                                                    <option value={item._id}>
                                                        {item}
                                                    </option>
                                                )
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Enter Your Message</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Type your message here"
                                            id="message"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            required
                                            className=''
                                        />
                                    </Form.Group>
                                    {/*  Button  */}
                                    <div className="d-grid">
                                        <Button variant="primary" type="submit">
                                            Submit To Get Best Career Guidance
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                            {/*  Card Footer  */}
                        </Card>
                        {/*  Pattern  */}
                        <div className="position-relative">
                            <div className="position-absolute bottom-0 end-0 me-md-n3 mb-md-n6 me-lg-n4 mb-lg-n4 me-xl-n6 mb-xl-n8 d-none d-md-block ">
                                <Image src='/images/pattern/dots-pattern.svg' alt="" className='opacity-25' />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default HeroFormRightForm;