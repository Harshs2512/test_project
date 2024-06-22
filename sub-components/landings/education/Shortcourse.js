import { useState, useEffect } from "react";
import { Container, Image, Row, Col } from "react-bootstrap";
import Slider from 'react-slick';
import { useMediaQuery } from 'react-responsive';
import { ShortCourseCard } from "widgets";
import ShortCoursesData from "data/slider/ShortCoursesData ";
import axios from 'axios';
const ShortCourse = () => {
    const [selectedButton, setSelectedButton] = useState(0);
    const [allData, setAllData] = useState([])
    const isMobile = useMediaQuery({ query: '(max-width: 462px)' });
    const getallcourse = async () => {
        // setLoading(true);
        try {
            const course = await axios.get('/api/courses/short-course/crudCourse');
            setAllData(course.data.courses);
        }
        catch (error) {
            console.log(error)
        }
        // setLoading(false);
    }
    useEffect(() => {
        getallcourse();
    }, []);
    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
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
        <section className="py-6 py-lg-8 bg-light-gradient-bottom bg-white">
            <Row className="w-75 mx-auto">
                <div className="text-center ">
                    <h2 className="h1 fw-bold">Our <u className="text-warning "><span className="text-warning"> Short Term
                    </span></u> Courses</h2>
                </div>
            </Row>
            <Row className="w-75 mx-auto py-2 mt-lg-6">
                    <div className='col-12 col-md-4 d-flex align-items-center gap-2 my-2'>
                        <span className="p-2 bg-light-danger rounded-circle">
                            <i className={`fas fa-chalkboard-teacher text-primary fs-3 m-1`}></i>
                        </span>
                        <h3>Instructor LED Classes</h3>
                    </div>
                    <div className='col-12 col-md-4 d-flex align-items-center gap-2 my-2'>
                        <span className="p-2 bg-light-primary rounded-circle">
                            <i className={`fas fa-file-code text-secondary fs-3 m-1`}></i>
                        </span>
                        <h3>Assignments</h3>
                    </div>
                    <div className='col-12 col-md-4 d-flex align-items-center gap-2 my-2'>
                        <span className="p-2 bg-light-success rounded-circle">
                            <i className={`fas fa-laptop-code text-danger fs-3 m-1`}></i>
                        </span>
                        <h3>Hands-on-lab Learning</h3>
                    </div>
            </Row>

            <Container>
                <Slider {...settings} className="pb-sm-5 mb-5 slick-slider-wrapper">
                    {allData?.slice(0, 10).map((item, index) => (
                        <div className="item px-md-1" key={item.id}>
                            <ShortCourseCard key={index} item={item} extraclass="mx-2 my-6" />
                        </div>
                    ))}
                </Slider>
            </Container>
        </section>
    );
};

export default ShortCourse;