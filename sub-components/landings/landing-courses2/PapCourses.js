import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { Col, Row, Card, Image, Container } from "react-bootstrap";

const PapCourse = ({ data }) => {
    const id = useRouter()
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [indexNum, setIndex] = useState(0)
    const bg = {
        backgroundImage: `url("/images/svg/Gridwhyus.svg"), linear-gradient(0deg, rgba(23, 82, 126, 1) 16%, rgba(1, 9, 15, 1) 100%)`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
    };

    const fetchData = async () => {
        try {
            const filterData = data.find(item => item.course === id.query.cid)
            console.log(filterData)
            setFilteredCourses(filterData)
        }
        catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    return (
        <Fragment>
            <section className="py-lg-10 py-6" style={bg}>
                <Container>
                    <div className="">
                        <Row className="mb-7">
                            <Col sm={12} lg={9}>
                                <p className={`mb-2 fw-normal h1`} style={{ color: 'white' }}>Pay</p>
                                <p className={`mb-2 fw-bolder h1`} style={{ color: 'white' }}>50% Fees After</p>
                                <p className={`mb-2 fw-bold text-warning h1`} >PLACEMENT</p>
                                <p className={`mb-2 fw-normal h1`} style={{ color: 'white' }}>{filteredCourses?.sectiontitle}</p>
                                <hr className="border border-3 border-white rounded mt-2" />
                            </Col>
                            <Col sm={12} lg={3} className="img-fluid text-center" >
                                <Image
                                    sizes="100vw"
                                    style={{
                                        width: '90%',
                                        height: 'auto',
                                    }}
                                    src={"/images/cybrommain/PAP-CODER.png"}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <div className="text-center mb-5">
                                <p className={`h1`} style={{ color: 'white' }}>JOIN CYBROM'S
                                    <u className="text-warning ms-3">
                                        <span className="text-warning">PLACEMENT PROGRAM</span>
                                    </u>
                                </p>
                                <p style={{ color: 'white' }}>Enhance Your Career with Cybrom Technology’s Python Course , Learn the skills need to grab a fullstack web development job at a top companies.</p>
                            </div>
                        </Row>
                        <Row className="bg-white rounded-5 p-5 mx-10">
                            <Row className="mb-3 text-center">
                                {filteredCourses?.courses?.map((item, index) => (
                                    <Col lg={3} sm={12} key={index}>
                                        <button type="button" className={`btn ${index === indexNum ? 'btn-secondary':'btn-outline-secondary'} fs-4 mb-2`} data-mdb-ripple-init data-mdb-ripple-color="dark" onClick={() => setIndex(index)}>{item.coursetitle}</button>
                                    </Col>
                                ))}
                            </Row>
                            <Row className="mt-3">
                                <Col sm={12} lg={7}>
                                    <div>
                                        <div>
                                            <h3 className="mb-0 text-warning">Duration</h3>
                                            <p className="fs-4">{filteredCourses?.courses && filteredCourses?.courses[indexNum]?.duration || ''}</p>
                                        </div>
                                        <div>
                                            <h3 className="mb-0 text-warning">Topic</h3>
                                            <p>{filteredCourses?.courses && filteredCourses?.courses[indexNum]?.topics || ''}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="mb-0 text-warning">Internship</h3>
                                            <p>{filteredCourses?.courses && filteredCourses?.courses[indexNum].internship || ''}</p>
                                        </div>
                                        <div>
                                            <h3 className="mb-0 text-warning">Placement Support</h3>
                                            <p>{filteredCourses?.courses && filteredCourses?.courses[indexNum].placement ? 'Yes' : 'No'}</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col sm={12} lg={5}>
                                    <div>
                                        <Image src={`/api/siteSettings/papcourseSection/thumnail/${filteredCourses?._id}?index=${indexNum}`} alt='imgae' className="img-fluid" />
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mt-3 h5">
                                <Link href={`/marketing/courses/${filteredCourses?.courses && filteredCourses.courses[indexNum].slug}?pid=${filteredCourses?.courses && filteredCourses.courses[indexNum]._id}`}>Know More....</Link>
                            </Row>
                        </Row>
                    </div>
                </Container>
            </section>
        </Fragment >
    );
};

export default PapCourse;