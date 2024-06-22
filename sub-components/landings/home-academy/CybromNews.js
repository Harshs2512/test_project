import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Slider from 'react-slick';
import { useMediaQuery } from 'react-responsive';
import NewsCard from 'widgets/cards/NewsCard'
// import { DiplomaCoursesData, DegreeCoursesData } from 'data/slider/AllCoursesData';
import AllCoursesData from 'data/slider/AllCoursesData'

const CybromNews = ({ alldata }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 462px)' });
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
        <section className="pb-8 pt-2 ">
            <Container>
                <Row>
                    <div className="text-center my-2 py-8">
                        <h2 className="h1 fw-bold">Cybrom <u className="text-warning"><span className="text-primary">in The News
                        </span></u> </h2>
                    </div>
                </Row>
            </Container>
            <Container>
                <Slider {...settings} className="pb-sm-5 mb-5 slick-slider-wrapper">
                   
                        {AllCoursesData.slice(0,10).map((item, index) => (
                            <div className="item px-md-1" key={item.id}>
                                <NewsCard key={index} item={item} extraclass="mx-2 my-6" />
                            </div>
                        ))}
                </Slider>
            </Container>
        </section>
    );
}

export default CybromNews;
