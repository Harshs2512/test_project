import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import Slider from 'react-slick';
import { useMediaQuery } from 'react-responsive';
import { Description, OfflineCourseCard } from 'widgets'; // Assuming CourseCard is imported elsewhere
import AllCoursesData from 'data/slider/AllCoursesData';
import { EducationHeroRightImage } from 'sub-components';
import axios from 'axios';

const RunCourses = ({ alldata }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 462px)' });

    const [selectedTab, setSelectedTab] = useState('diploma');
    const [programs, setPrograms] = useState([]);
    const [indexNum, setIndexNum] = useState(0);

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    const fetchData = async () => {
        try {
            const { data } = await axios.get('/api/siteSettings/landingPage/ourPrograms/getRecords');
            setPrograms(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const settings = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <section className="pb-8 pt-10">
            <Container>
                <Row>
                    <div className="text-center my-2">
                        <h2 className="h1 fw-bold">Program Course</h2>
                    </div>
                </Row>
                <Row>
                    <div className='lg-px-12'>
                        <div className='d-lg-flex justify-content-between p-3 bg-white rounded shadow'>
                            <div className='d-lg-flex gap-3 text-center'>
                                <div className='d-block'>
                                    <div className='d-flex'>
                                        <h3 className='me-2'>Job Bootcamp</h3>
                                        <h4 className='p-1 bg-gray-200 rounded'>Job Bootcamp</h4>
                                    </div>
                                    <p>Placement assistance, live+ & blended learning</p>
                                </div>
                                <div>
                                    <button className='p-1 btn btn-dark-primary mt-3' onClick={() => handleTabClick('diploma')}>
                                        <h4 className='text-white'>Explore Courses</h4>
                                    </button>
                                </div>
                            </div>
                            <div className='bg-dark text-dark rounded my-3'>
                                .
                            </div>
                            <div className='d-lg-flex gap-2 text-center'>
                                <div className='d-block'>
                                    <div className='d-flex'>
                                        <h3 className='me-2'>Job Bootcamp</h3>
                                        <h4 className='p-1 bg-gray-200 rounded'>Job Bootcamp</h4>
                                    </div>
                                    <p>Placement assistance, live+ & blended learning</p>
                                </div>
                                <div>
                                    <Button variant='warning' className='mt-3 p-1' onClick={() => handleTabClick('degree')}>
                                        <h4 className='text-white'>Explore Courses</h4>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
            <Container>
                {selectedTab === 'diploma' ? (
                    <Slider {...settings} className="pb-sm-5 mb-5 slick-slider-wrapper">
                        {alldata.slice(0, 10).map((item, index) => (
                            <div className="item px-md-1" key={item.id}>
                                <OfflineCourseCard key={index} item={item} extraclass="mx-2 my-6" />
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <div className='px-lg-10 py-lg-5 pt-2'>
                        <Row className='mb-3 px-lg-12'>
                            {programs?.map((item, index) => (
                                <Col className='text-center' key={index}>
                                    <Button variant={`${indexNum === index ? 'warning' : ''}`} className='border border-2 border-warning p-1' onClick={() => setIndexNum(index)}>
                                        <h4 className='text-dark'>{item?.buttontitle}</h4>
                                    </Button>
                                </Col>
                            ))}
                        </Row>
                        <EducationHeroRightImage alldata={programs && programs[indexNum]} />
                    </div>
                )}
            </Container>
        </section>
    );
};

export default RunCourses;