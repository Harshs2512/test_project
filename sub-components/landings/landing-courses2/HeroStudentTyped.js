import { Col, Row, Container, Image, Button } from 'react-bootstrap';
import { Typewriter } from 'react-simple-typewriter';

const HeroStudentTyped = ({ alldata }) => {
    console.log(alldata,"allData")
    const typedValues = [alldata?.typedtitle_first, alldata?.typedtitle_second, alldata?.typedtitle_third].filter(Boolean);
    const bg = {
        backgroundImage: `url("/images/background/Circuit-Blue-Low.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        position: "relative",
        border:"radius"
    };

    const overlayStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(248, 249, 250, 0.90)"
    };
    return (
        <section className="position-relative pt-8 pb-8  bg-white shadow-lg rounded rounded-bottom-5  " style={bg}>
            <div style={overlayStyle}></div>
            <Container className="position-relative">
                <Row className="align-items-center mb-10 pb-10">
                    <Col lg={6} className="mb-6 mb-lg-0">
                        <div className='position-relative'>
                            <h1 className="display-4 fw-bold mb-3">{alldata?.sectiontitle}</h1>
                            <h4 className="display-4 fw-bold mb-3" style={{ color: "rgb(255, 140, 0)" }}>
                                <span className="">
                                    <Typewriter
                                        words={typedValues.length > 0 ? typedValues : ['Become Job Ready Now']}
                                        loop
                                        cursor
                                        cursorStyle="|"
                                        typeSpeed={60}
                                        deleteSpeed={50}
                                        delaySpeed={1000}
                                        style={{ fontSize: '50px' }}
                                    />
                                </span>
                            </h4>
                            <p className="display-6 mb-5 fw-bold">
                                With 100% Job Placement Assistance
                            </p>
                            <Button>
                                Apply Now <i className="fe fe-chevron-right fe-2xl ms-3 text-xl"></i>
                            </Button>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="text-center">
                            {alldata?._id && <Image src={`/api/siteSettings/megaMenu/coursePage/getstudent/${alldata?._id}`} alt="" className="img-fluid" />}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default HeroStudentTyped;
