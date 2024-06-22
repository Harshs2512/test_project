// import node module libraries
import { Col, Row, Container, Image, Card } from "react-bootstrap";
import { useRef, useState, useEffect } from "react";
import { Avatar, AvatarGroup } from "components/bootstrap/Avatar";
import axios from 'axios';
const GuidedCourse = () => {
    const bg = {
        backgroundImage: `url("/images/svg/Gridwhyus.svg"), linear-gradient(0deg, rgba(23, 82, 126, 1) 16%, rgba(1, 9, 15, 1) 100%)`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
    };
    const [allposts, setAllposts] = useState([]);
    const [details, setDetails] = useState([])
    const [companies, setCompanies] = useState([]);
    const PrepsectionData = async () => {
        try {
            const res = await axios.get("/api/siteSettings/thirdPage/jopPrepration/addData");
            const response = await axios.get("/api/siteSettings/landingPage/circularCarousel/getRecords")
            const company = response?.data;
            const sectionDetail = res?.data[0]
            const CardData = res?.data[0].course;
            setDetails(sectionDetail)
            setCompanies(company);
            if (res.status === 200) {
                setAllposts(CardData);
            }
        } catch (error) {
            console.log("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        PrepsectionData();
    }, []);
    return (
        <section className="pb-lg-14 pb-6 " style={bg}>
            <Container>
                <div>
                    <Row>
                        <Col xs={12}>
                            <div className="mb-6 mt-10 text-center">
                                <h2 className="mb-2 display-3" style={{ color: 'white' }}> {details.sectionTitle}</h2>
                                <p className="fs-2 " style={{ color: 'white' }}>
                                    {details.sectionDescription} 🧑🏻‍💻
                                </p>
                            </div>
                        </Col>
                    </Row>
                    <Row className="d-lg-block d-none ">
                        <Col xs={12} md={12} lg={12} >
                            <div className="d-flex  justify-content-center w-100 ">
                                {allposts.slice(0, 4).map((item, index) => (
                                    <div key={index} className="d-flex ">
                                        <Card className="p-0" style={{ width: index === 3 ? "16rem" : "18rem", height: "15rem" }}>
                                            <Card.Body>
                                                <div className="">
                                                    <p className="text-warning mb-1">Sprint {index + 1}</p>
                                                    <Card.Title className="text-dark mb-0">{item.title}</Card.Title>
                                                    <p className="fs-4">{item.description}</p>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                        {index !== 3 && <span className="d-md-block border border-2 border-white border-end-0 border-start-0 border-bottom-0 my-auto text-white w-15"></span>}
                                    </div>
                                ))}
                            </div>

                        </Col>
                    </Row>

                    <Row className="d-lg-flex justify-content-end align-items-end px-auto d-none w-75 mx-auto">
                        <div className="d-lg-flex justify-content-end d-none ">
                            <span className="d-md-block border border-2 border-white border-top-0 border-start-0 border-bottom-0 my-auto text-white" style={{ width: '10px', height: '25px' }}></span>
                        </div>
                    </Row>
                    <Row className="d-lg-block d-none ">
                        <Col xs={12} md={12} lg={12} className="d-flex justify-content-center ">
                            <div className=" py-5 d-flex justify-content-center  ps-lg-1">
                                <div>
                                    <h2 style={{ color: 'white' }}>Your Dream Job</h2>
                                    <div className="d-flex">
                                        <AvatarGroup>
                                            {companies.slice(1, 5).map((item, index) => (
                                                <Avatar
                                                    key={index}
                                                    size="lg"
                                                    src={`/api/siteSettings/landingPage/circularCarousel/getCompanylogo/${item._id}`}
                                                    type="image"
                                                    name={item?.company_name}
                                                    className="rounded-circle rounded"
                                                    imgtooltip
                                                />
                                            ))}
                                        </AvatarGroup>
                                        <span className="d-md-block mt-4 border border-2 border-white border-end-0 border-start-0 border-bottom-0 my-auto text-white" style={{ width: '40px', height: '20px' }}></span>
                                    </div>
                                </div>
                            </div>
                            <span className="d-md-block border border-white my-3 text-white w-5"></span>
                            {allposts.slice(4, 7).reverse().map((item, index) => (
                                <div key={index} className="d-flex">
                                    <Card className="p-0 " style={{ width: index === 2 ? "16rem" : "18rem", height: "15rem" }}>
                                        <Card.Body>
                                            <div className="">
                                                <p className="text-warning mb-1">Sprint {allposts.slice(4, 7).length - index + 4} </p>
                                                <Card.Title className="text-dark"> {item.title} </Card.Title>
                                                <p className="fs-4">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                    {index !== 2 && <span className="d-md-block border border-2  border-white border-end-0 border-start-0 border-bottom-0 my-auto text-white w-15"></span>}
                                </div>
                            ))}
                        </Col>

                    </Row>
                    <Row className="d-block d-lg-none">
                        <Col sm={12}>
                            {allposts?.slice(0, 7).map((item, index) => (
                                <div key={index}>
                                    <div className="d-flex align-items-center">
                                        <div className="bg-white d-flex justify-content-center align-items-center rounded-5 me-3 border border-3 border-dark mb-0 h2" style={{ width: '60px', height: '60px' }}>
                                            {index + 1}
                                        </div>{' '}
                                        <p className="fs-3" style={{ color: 'white' }}>
                                            {item.title}
                                        </p>
                                    </div>
                                    <div className="w-5 ms-2">
                                        <span className="d-block border border-2 border-white border-top-0 border-start-0 border-bottom-0 mx-auto text-white" style={{ width: '10px', height: '50px' }}></span>
                                    </div>
                                </div>
                            ))}
                            <div className="d-flex align-items-center">
                                <AvatarGroup>
                                    {companies?.slice(1, 5).map((item, index) => (
                                        <Avatar
                                            key={index}
                                            size="lg"
                                            src={`/api/siteSettings/landingPage/circularCarousel/getCompanylogo/${item._id}`}
                                            type="image"
                                            name={item?.company_name}
                                            className="rounded-circle rounded"
                                            imgtooltip
                                        />
                                    ))}
                                </AvatarGroup>
                                <p className="fs-3 ms-3" style={{ color: 'white' }}>Your Dream Job</p>
                            </div>

                        </Col>
                    </Row>
                </div >
            </Container >
        </section >
    );
};

export default GuidedCourse;