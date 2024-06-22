import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Slider from 'react-slick';
import { CarouselButtonCard } from 'widgets';
import { useMediaQuery } from 'react-responsive';

const CarouselButtons = ({ alldata,bg }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 462px)' });

    const [divindex, setDivindex] = useState(0)

    const [selectedDiv, setSelectedDiv] = useState(0);

    const handleDivClick = (index) => {
        setDivindex(index)
        setSelectedDiv(index === selectedDiv ? null : index);
    };

    const getBorderColor = (index) => {
        return selectedDiv === index ? 'warning' : 'white';
    };

    const getBoxColor = (index) => {
        return selectedDiv === index ? 'white' : 'warning';
    };

    // const bg = {
    //     backgroundImage: `url("/images/svg/Gridwhyus.svg"), linear-gradient(0deg, rgba(23, 82, 126, 1) 16%, rgba(1, 9, 15, 1) 100%)`,
    //     backgroundSize: "cover",
    //     backgroundPosition: "center center",
    //   };
    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <section className='pb-lg-7 pb-4' style={bg}>
            <Container>
                <Row>
                    <div className="mb-lg-10 mb-3 text-center my-8">
                        <h2 className="h1 fw-bold text-white">Discover in-demand <u className="text-warning "><span className="text-warning">Courses
                        </span></u> across industries</h2>
                        <p className=" mb-0 text-white">Online webinars are amazing opportunities to have fun and learn.</p>
                    </div>
                </Row>
                <Row>
                    <Col md={3} className="p-2" style={{ maxHeight: '690px', overflowY: 'auto' }}>
                        <div className='p-2 d-md-block d-flex'>
                            {alldata.map((item, arrayIndex) => (
                                <div key={arrayIndex}>
                                    <div
                                        className={`rounded d-flex p-lg-2 p-2 border border-1 border-${getBorderColor(divindex)} mb-3 card-hover-with-icon shadow-lg me-2`}
                                        onClick={() => handleDivClick(arrayIndex)}
                                    >
                                        <div className={`fs-3 bg-${getBoxColor(arrayIndex)} p-2 rounded w-20 justify-content-center align-items-center d-flex text-black me-3`}>
                                            {arrayIndex + 1}
                                        </div>
                                        <h3 className={`text-${getBorderColor(arrayIndex)} mb-0 my-2`} style={{ fontSize: '1.1rem' }}>
                                            {item.title}
                                        </h3>
                                    </div>
                                    {arrayIndex !== 4 && !isMobile && (
                                        <span className="border-end-0 border-top-0 border-bottom-0 mx-5 pt-3 dashed-border border-white"></span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Col>
                    <Col md={9}>
                        <div className='mx-lg-1 px-lg-5 pt-lg-3 rounded-3'>
                            <Container>
                                <div className="table-responsive-xl ">
                                    <Row>
                                        <div className="position-relative ">
                                            <Slider {...settings} className="pb-sm-5 slick-slider-wrapper">
                                                {alldata[divindex]?.cards.map((item, index) => (
                                                    <Col lg={3} md={6} sm={12} index={index}>
                                                        <CarouselButtonCard item={item} index={index} dataid={alldata[divindex]._id} />
                                                    </Col>
                                                ))}
                                            </Slider>
                                        </div>
                                    </Row>
                                </div>
                            </Container>

                        </div>
                    </Col>
                </Row>
            </Container>
        </section >
    );
}

export default CarouselButtons;
