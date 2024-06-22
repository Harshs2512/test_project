import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Col, Container, Row } from "react-bootstrap";

const HeroCourses = ({ alldata }) => {
    const pid = useRouter().query
    const filterData = alldata.find((item) => item.sectionid === pid?.pid)
    const bg = {
        backgroundImage: `url("/images/svg/Gridwhyus.svg"), linear-gradient(0deg, rgba(23, 82, 126, 1) 16%, rgba(1, 9, 15, 1) 100%)`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
    };
    function formatDate(dateString) {
        const date = new Date(dateString);
        const monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        const formattedDate = `${month} ${day}, ${year}`;
        return formattedDate;
    }

    return (
        <section className="pb-lg-9 py-5 bg-second-background">
            <Container>
                <div className="d-flex">
                    {/* Main content */}
                    <div className="position-absolute bg-white p-lg-5 p-3 rounded-5 w-lg-55">
                        <div className="d-flex gap-lg-5 align-items-center mb-4">
                            {/* NEW COURSE */}
                            <Button variant="outline-primary" className="me-1 p-1 px-lg-3 px-2 fs-6 rounded-4">NEW COURSE</Button>
                            <Button variant="outline-info" className="me-2 p-1 fs-6 px-1 px-lg-3 rounded-4">FEATURES GEN AI MODULES</Button>
                            <span><i className="fas fa-share-alt fs-3"></i></span>
                        </div>
                        <div className="mb-4">
                            <p className="display-5 mb-0 text-warning">Graduate Certificate Programme</p>
                            <p className="display-5 lh-1 text-dark">In {filterData && filterData?.title || ''}</p>
                            <p className="">{filterData && filterData?.description || ''}</p>
                        </div>
                        <div className="row mb-5 w-lg-75">
                            <div className="col-4">
                                <p className="mb-0">Type</p>
                                <p className="h4">{filterData && filterData?.type || ''}</p>
                            </div>
                            <div className="col-4">
                                <p className="mb-0">Start Date</p>
                                <p className="h4">{formatDate(filterData?.startdate)}</p>
                            </div>
                            <div className="col-4">
                                <p className="mb-0">Duration</p>
                                <p className="h4">{filterData?.duration}</p>
                            </div>
                        </div>
                        <Row>
                            <Col md={12} lg={6}>
                                <Button variant="outline-info" className="me-3 w-100">
                                    {filterData ? <Link href={filterData?.link} target="_blank"
                                        download>
                                        Download Syllabus
                                    </Link> : 'Download Syllabus'}

                                </Button>
                            </Col>
                            <Col md={12} lg={6}>
                                <Button variant="outline-danger" className="w-100">Apply Now</Button>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <p className=""><span><i className="fas fa-home me-3"></i></span>Hurry! 364 people have already applied in the last 1 month</p>
                            <p className="mb-0"><span><i className="fas fa-home me-3"></i></span>For enquiries call: {filterData?.enquirynumber}</p>
                        </Row>
                    </div>
                    {/* Overlapping div */}
                    <div className="w-100 bg-danger rounded-5 mt-1 py-lg-10 p-5" style={bg}>
                        <div className="d-flex justify-content-end align-items-top mt-20">
                            <div className="bg-white p-2 d-flex rounded-5 mt-20">
                                <p className="mb-0 text-dark me-1 fs-4">70% Live Sessions</p>
                                <p className="mb-0"><span className="text-warning me-1 fs-4">Exclusive</span>Job Portal Access</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section >
    )
}

export default HeroCourses;
