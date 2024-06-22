import { useState, useRef, useEffect, Suspense } from "react";
import { Col, Row, Container, Image } from "react-bootstrap";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";
import ModalVideo from "react-modal-video";


const HeroAcademy = () => {
  const videoRef = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const [YouTubeURL] = useState("Cp-LovbTM8k");

  return (
    <section className="py-lg-22 bg-dark position-relative">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        src="/images/cybrommain/A-tour-to-Cybrom-Pvt-Ltd-Bhopal.mp4"
        type="video/mp4"
        className="w-100 h-100 d-lg-block d-none"
        style={{
          opacity: "60%",
          overflow: "hidden",
          position: "absolute",
          top: "0",
          objectFit: "cover",
        }}
      />
      <Container className="position-relative">
        <Row className="align-items-center">
          <Col lg={6} className="mb-6 mb-lg-0">
            <div
              className="position-relative"
              style={{ zIndex: "2" }}
            >
              <Suspense>
                <h4 className="display-3 fw-bold mb-3 mt-n4 pb-6" style={{ color: 'white' }}>
                  Accelerate Your Career! And Become JOB READY
                </h4>
              </Suspense>
              <div style={{height:"100px"}}>
                <h4 className="display-4 fw-bold mb-3">
                <span className="text-info ">
                  <Typewriter
                    words={[
                      "FullStack Web Development",
                      "Data Science and Machine Learning",
                      "Cyber Security and Ethical Hacking",
                    ]}
                    loop
                    cursor
                    cursorStyle="|"
                    typeSpeed={60}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </span>
              </h4>
              </div>
              
              <p className="pe-lg-10 mb-5 text-gray-300 fs-3">
                Start, switch, or advance your career with more than 5,000
                courses, Professional Certificates, and degrees from world-class
                universities and companies.
              </p>
              <Link href="#" className="btn btn-white">
                EXPLORE OUR PROGRAMS
                <i className="fe fe-chevron-right fe-2xl ms-5 text-xl"></i>
              </Link>
              <ModalVideo
                channel="youtube"
                autoplay
                isOpen={isOpen}
                videoId={YouTubeURL}
                onClose={() => setOpen(false)}
              />
            </div>
          </Col>
          <Col
            lg={6}
            className="d-flex justify-content-center d-lg-none d-block"
          >
            {/* <div className="position-relative">
              <Image
                src="/images/background/acedamy-img/bg-thumb.svg"
                alt=""
                className=""
              />
              <Image
                src="/images/background/acedamy-img/girl-image.webp"
                alt=""
                className="position-absolute end-0 bottom-0"
              />
              <Image
                src="/images/background/acedamy-img/frame-1.svg"
                alt=""
                className="position-absolute top-0 ms-lg-n10 ms-n19"
              />
              <Image
                src="/images/background/acedamy-img/frame-2.svg"
                alt=""
                className="position-absolute bottom-0 start-0 ms-lg-n14 ms-n6 mb-n7"
              />
              <Image
                src="/images/background/acedamy-img/target.svg"
                alt=""
                className="position-absolute bottom-0 mb-10 ms-n10 ms-lg-n1 "
              />
              <Image
                src="/images/background/acedamy-img/sound.svg"
                alt=""
                className="position-absolute top-0  start-0 mt-18 ms-lg-n19 ms-n8"
              />
              <Image
                src="/images/background/acedamy-img/trophy.svg"
                alt=""
                className="position-absolute top-0  start-0 ms-lg-n14 ms-n5"
              />
            </div> */}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroAcademy;
