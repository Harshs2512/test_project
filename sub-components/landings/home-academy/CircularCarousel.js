import React, { Fragment, useEffect, useRef, useState } from "react";
import { TweenLite, TimelineMax, Linear, CSSPlugin } from "gsap";
import { Col, Row, Card, Container } from "react-bootstrap";
import gsap from "gsap";
import Image from "next/image";
import axios from "axios";

const CircularCarousel = ({ alldata }) => {
  const plugins = [CSSPlugin];
  gsap.registerPlugin(...plugins);
  const ferrisRef = useRef(null);
  const centerRef = useRef(null);
  const tlRef = useRef(null);
  const videoSectionRef = useRef(null);
  const [whyUsData, setWhyUsData] = useState([]);
  const allActive = whyUsData.filter((data) => data.is_published === "active");

  const videoRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const fetchId = () => {
    try {
      return alldata?.map((item) => item._id) || [];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const addArms = (numArms, ids) => {
    const space = 360 / numArms;
    const center = document.querySelector("#center");
    for (let i = 0; i < numArms; i++) {
      const newBasket = document.createElement("div");
      newBasket.classList.add("basket");
      newBasket.style.backgroundImage = `url(${ids.length > 0
        ? `/api/siteSettings/landingPage/circularCarousel/getCompanylogo/${ids[i % ids.length]
        }`
        : "/default-image.jpg"
      })`;

      const newPivot = document.createElement("div");
      newPivot.classList.add("pivot", "outer");
      newPivot.appendChild(newBasket);

      const newArm = document.createElement("div");
      newArm.classList.add("arm");
      TweenLite.set(newArm, {
        rotation: i * space - 90,
        transformOrigin: "100px 100px",
      });

      newPivot.appendChild(newArm);
      center.appendChild(newPivot);
      TweenLite.set(newPivot, {
        rotation: i * space,
        transformOrigin: "50% 409px",
      });

      TweenLite.set(newBasket, {
        rotation: -i * space,
        transformOrigin: "50px",
      });
    }
  };

  useEffect(() => {
    const ferris = document.querySelector(".ferris");
    const center = document.querySelector("#center");
    const tl = new TimelineMax({ repeat: -1, onUpdate: updateSlider });

    if (!ferris || !center || alldata.length === 0) return;

    TweenLite.set(center, { x: 400, y: 360 });
    addArms(15, fetchId());
    TweenLite.from(ferris, 1, { autoAlpha: 0 });

    tl.to(center, 20, { rotation: 360, ease: Linear.easeNone });
    tl.to(document.querySelectorAll(".basket"), 20, { rotation: "-=360", ease: Linear.easeNone }, 0);

    return () => {
      tl.kill();
    };
  }, [alldata]);

  const updateSlider = () => {};

  const handleHover = (index) => {
    if (activeIndex !== index) {
      videoRefs.current[activeIndex]?.pause();
      videoRefs.current[index]?.play();
      setActiveIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (activeIndex !== 0) {
      videoRefs.current[activeIndex]?.pause();
      videoRefs.current[0]?.play();
      setActiveIndex(0);
    }
  };

  useEffect(() => {
    if (videoRefs.current[0]) {
      videoRefs.current[0].play();
    }
  }, []);

  const getData = async () => {
    try {
      const data = await axios.get(
        `/api/siteSettings/landingPage/whySection/addData`
      );
      const dataWhy = data?.data?.whyData;
      setWhyUsData(dataWhy);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRefs.current.forEach((video) => video.play());
          } else {
            videoRefs.current.forEach((video) => video.pause());
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
      }
    );
    if (videoSectionRef.current) {
      observer.observe(videoSectionRef.current);
    }
    return () => {
      if (videoSectionRef.current) {
        observer.unobserve(videoSectionRef.current);
      }
    };
  }, []);

  const bg = {
    backgroundImage: `url("/images/svg/Gridwhyus.svg"), linear-gradient(0deg, rgba(23, 82, 126, 1) 16%, rgba(1, 9, 15, 1) 100%)`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };
  const bgs = {
    backgroundImage: `url("/images/svg/Gridwhyus2.svg"), linear-gradient(180deg, rgba(23, 82, 126, 1) 16%, rgba(1, 9, 15, 1) 100%)`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };

  return (
    <Fragment>
      <section style={bg} ref={videoSectionRef}>
        <Row className="w-75 mx-auto py-12">
          <div className="text-center mb-10 mt-2 ">
            <div>
              <Image
                src="/images/svg/WHY-US.svg"
                className="img-fluid"
                width={400}
                height={400}
                alt="whyusImage"
              />
            </div>
          </div>
          {allActive?.map((data, index) => {
            return (
              <Col
                key={index}
                md={4}
                sm={12}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={handleMouseLeave}
              >
                <Card
                  className={activeIndex === index ? 'card-flip rounded-3 mt-4' : "simple-card rounded-3 mt-4"}
                  style={{ height: "470px" }}
                >
                  <div className={activeIndex === index ? 'card-front text-white bg-dark rounded-3' : "card-back bg-dark rounded-3 d-flex justify-content-center align-items-center p-0 text-white"}>
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      loop
                      muted={activeIndex !== index}
                      preload="auto"
                      src={data.videoUrl}
                      type="video/mp4"
                      className="rounded-3"
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className={activeIndex !== index ? 'card-front text-black' : "card-back bg-white rounded-3 d-flex justify-content-center align-items-center p-0 text-white my-auto"}>
                    <Card.Body className="text-center justify-content-center align-items-center h-100">
                      <i className="fa fa-search fa-5x float-right"></i>
                      <h3 className={`${activeIndex === index ? 'text-white' : 'text-info'} py-4`}>{data.title}</h3>
                      <p className="fs-3">{data.Description}</p>
                    </Card.Body>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </section>
      <section style={bgs}>
        <Container className="d-none d-lg-block">
          <div id="circular">
            <Row className="text-center py-8 mt-8 ">
              <Col md={12} className="px-lg-10">
                <h2 className="h1 fw-bold text-capitalize text-warning">
                  MOU with Colleges
                </h2>
              </Col>
            </Row>
            <Row className="mb-n20">
              <Col>
                <div className="ferris" id="ferris" ref={ferrisRef}>
                  <div className="pivot" id="center" ref={centerRef}></div>
                  <div className="circle circle1">
                    <div className="text-center" style={{ marginTop: "-20px" }}>
                      {/* <i className="fe fe-briefcase fs-2 text-primary bg-gray-100" /> */}
                      <Image
                        src={"/images/cybrommain/money.svg"}
                        width={40}
                        height={40}
                        alt="money image"
                      />
                      <h3 className="mb-0" style={{ color: 'white' }}>12+</h3>
                      <p className="text-warning fs-3" style={{ color: '#f72dd6' }}>LPA Highest Package</p>
                    </div>
                    <div className="circle circle2">
                      <div className="text-center" style={{ marginTop: "-20px" }}>
                        <Image
                          src={"/images/cybrommain/international-relations.svg"}
                          width={45}
                          height={45}
                          alt="relation image"
                        />
                        <h3 className="mb-0" style={{ color: 'white' }}>50+</h3>
                        <p style={{ color: '#30f72d' }} className="fs-3">International Placement</p>
                      </div>
                      <div className="circle circle3">
                        <div className="text-center" style={{ marginTop: "-20px" }}>
                          <Image
                            src={"/images/cybrommain/hiring.svg"}
                            width={50}
                            height={50}
                            alt="hiring image"
                          />
                          <h3 className="mb-0" style={{ color: 'white' }}>200+</h3>
                          <p style={{ color: 'yellow' }} className="fs-3">Hiring Partners</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </Fragment>
  );
};

export default CircularCarousel;


























