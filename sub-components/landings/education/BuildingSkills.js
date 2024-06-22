// import node module libraries
import { Col, Row, Container, Image, Card } from "react-bootstrap";
import { useRef } from "react";
const BuildingSkills = () => {
  const videoRef = useRef(null);
  const bg = {
    backgroundImage: `url("/images/svg/Gridwhyus.svg"), linear-gradient(0deg, rgba(23, 82, 126, 1) 16%, rgba(1, 9, 15, 1) 100%)`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };
  return (
    <>
      <section className="py-lg-14 py-6 " style={bg}>
        <Row className="mx-lg-16 mx-2 ">
          <Col lg={6} className="text-start text-white my-lg-5  ">
            <p className="lead mb-0 fs-2">Become a Skilled</p>
            <h1 className="display-2 fw-bold text-warning">PYTHON DEVELOPER</h1>
            <p className="lead mb-0">With Cybrom Technology's Industry-Ready Program</p>
            <div>
              <div className="d-flex justify-content-lg-start justify-content-lg-start justify-content-center   my-lg-5 mx-lg-2">
                <div className="w-lg-10 w-15 d-flex justify-content-center align-items-center">
                  <span className="bg-white text-light rounded p-2">
                    <Image
                      src="/images/gif/search-file.gif"
                      className="img-fluid rounded"
                      alt="search"
                    />
                  </span>
                </div>
                <span className="d-md-block border-end-0 border-start-0 border-bottom-0 my-7 dashed-border text-danger bg-warning w-5"></span>
                <div className="w-lg-10 w-15 d-flex justify-content-center align-items-center">
                  <span className="bg-white text-light rounded p-2">
                    <Image
                      src="/images/gif/graduation.gif"
                      className="img-fluid rounded"
                      alt="search"
                    />
                  </span>
                </div>
                <span className="d-md-block border-end-0 border-start-0 border-bottom-0 my-7 dashed-border text-danger bg-warning w-5"></span>
                <div className="w-lg-10 w-15 d-flex justify-content-center align-items-center">
                  <span className="bg-white text-light rounded p-2">
                    <Image
                      src="/images/gif/user.gif"
                      className="img-fluid rounded"
                      alt="search"
                    />
                  </span>
                </div>
                <span className="d-md-block border-end-0 border-start-0 border-bottom-0 my-7 dashed-border text-danger bg-warning w-5"></span>
                <div className="w-lg-10 w-15 d-flex justify-content-center align-items-center   ">
                  <span className="bg-white text-light rounded p-2 border-2 border-info">
                    <Image
                      src="/images/gif/discount.gif"
                      className="img-fluid rounded"
                      alt="search"
                    />
                  </span>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={6} className=" my-lg-5">
            <div className="embed-responsive embed-responsive-16by9 rounded-3" style={{ height: "350px" }}>
              <iframe
                width="100%"
                height="100%"
                className="embed-responsive-item rounded-3"
                src="https://www.youtube.com/embed/BAOoMMtomoc"
                title="Python Fullstack Development."
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </Col>
        </Row>

        <Row className="mx-lg-16 mx-2 mt-lg-1 mt-4">
          <Col xs={12}>
            <Row className="row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              <Col>
                <Card className="shadow p-0" style={{ height: "270px" }}>
                  <div className="text-gray-900">
                    <div className="text-primary d-flex">
                      <div className="p-1   w-25 h-25 justify-content-center align-items-center m-2">
                        <span className="rounded ms-1">
                          <Image
                            src="/images/gif/search-file.gif"
                            className="img-fluid rounded"
                            alt="search"
                          />
                        </span>
                      </div>
                      <div className="mt-2">
                        <h4 className="px-1 text-uppercase text-warning">Comprehensive Curriculum</h4>
                      </div>
                    </div>
                    <div>
                      <ul>
                        <li className="fs-4">Basic syntax and data types</li>
                        <li className="fs-4">Control structures and functions</li>
                        <li className="fs-4">Object-oriented programming</li>
                        <li className="fs-4">GUI programming Web scraping</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col>
                <Card className="shadow" style={{ height: "270px" }}>
                  <div className="text-gray-900">
                    <div className="d-flex">
                      <div className="p-2 mt-n1 w-25 h-25 justify-content-center align-items-center m-2">
                        <span className="rounded ">
                          <Image
                            src="/images/gif/graduation.gif"
                            className="rounded img-fluid"
                            alt="search"
                          />
                        </span>
                      </div>
                      <div className="mt-2">
                        <h4 className="px-1 text-uppercase text-warning">Hands-on learning</h4>
                      </div>
                    </div>
                    <div>
                      <ul>
                        <li className="fs-4">Interactive coding sessions</li>
                        <li className="fs-4">Real-world projects and problem-solving</li>
                        <li className="fs-4">Access to industry tools and libraries</li>
                        <li className="fs-4">Personalized feedback and support</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col>
                <Card className="shadow p-0" style={{ height: "270px" }}>
                  <div className="text-gray-900">
                    <div className="text-primary d-flex">
                      <div className="p-1  w-25 h-25 justify-content-center align-items-center m-2">
                        <span className="rounded ">
                          <Image
                            src="/images/gif/user.gif"
                            className="img-fluid rounded"
                            alt="search"
                          />
                        </span>
                      </div>
                      <div className="mt-2">
                        <h4 className="px-1 text-uppercase text-warning">Experienced Instructors</h4>
                      </div>
                    </div>
                    <div>
                      <ul>
                        <li className="fs-4">Industry experts with extensive experience in Python</li>
                        <li className="fs-4">Personalized attention and guidance</li>
                        <li className="fs-4">Latest industry insights and trends</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col>
                <Card className="shadow p-0" style={{ height: "270px" }}>
                  <div className="text-gray-900">
                    <div className="text-primary d-flex ">
                      <div className="p-1  w-25 h-25 justify-content-center align-items-center m-2">
                        <span className="rounded ms-1">
                          <Image
                            src="/images/gif/discount.gif"
                            className="rounded img-fluid"
                            alt="search"
                          />
                        </span>
                      </div>
                      <div className="mt-2">
                        <h4 className="px-1 text-uppercase text-warning">Job Placement Assistance</h4>
                      </div>
                    </div>
                    <div>
                      <ul>
                        <li className="fs-4">Job-Oriented Training Interview preparation</li>
                        <li className="fs-4">Resume building</li>
                        <li className="fs-4">Skill development for Python-based careers</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

      </section>
    </>

  );
};

export default BuildingSkills;
