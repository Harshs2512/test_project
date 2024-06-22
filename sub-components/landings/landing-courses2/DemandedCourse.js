// import node module libraries
import { Col, Row, Container, Card, Button, Image } from "react-bootstrap";
import Link from "next/link";
import { Fragment } from "react";
const DemandedCourse = ({ alldata }) => {
  const gridSvgStyle = {
    background: 'url("/images/svg/confussed-grid.svg")',
    backgroundColor: "#1d2f81",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  const bg = {
    backgroundImage: 'url("/images/cybrommain/bg.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    // width: '20rem',
    height: "29rem",
  };
  return (
    <Fragment>
      <div className="pb-lg-10 pb-4 mx-auto">
        <Row className="w-md-50 mx-auto">
          <Link href="/marketing/landings/quiz">
            <Col>
              <div className=" px-xl-0 rounded-4 " style={gridSvgStyle}>
                <Row className="align-items-center text-md-start text-center mx-2">
                  <Col xl={8} md={6} xs={12}>
                    <div className="text-wrap">
                      <h2 className="text-white mb-3" style={{ fontSize: '4vw' }}>
                        Still Confused?
                      </h2>
                      <p className="text-white fs-3">
                        Take The Next Step Quiz{" "}
                        <span className="">
                          {/* &rarr; */}
                          <Image
                            src="/images/gif/fast-backward_1.gif"
                            className="w-5 h-5 "
                            alt=""
                          />
                        </span>
                      </p>
                    </div>
                  </Col>
                  <Col xl={4} md={6} xs={12}>
                    <div className="text-center">
                      <Image
                        src="/images/svg/Confussed.svg"
                        className="w-50 h-50 "
                        alt=""
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Link>
        </Row>
      </div>
    </Fragment>
  );
};

export default DemandedCourse;
