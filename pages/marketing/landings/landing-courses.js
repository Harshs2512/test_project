// import node module libraries
import { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Link from 'next/link';
// import sub components
import { CoursesFeatures4Columns, HeroTyped, CoursesTestimonialSection, HeroFormRightForm, SimilarPrograms, FeaturesWithBullets, PricingPlans, ComparePlansTable, TestimonialSection } from 'sub-components';
// import widget/custom components
import { GeeksSEO, CTA2Buttons, CourseSlider, GetEnrolledBlogCard, SectionHeadingCenter } from 'widgets';
import FAQwithImage from './FAQwithImage'
import { TestimonialsSlider4 } from 'widgets';
import axios from 'axios';
import Slider from 'react-slick';


const LandingCourses = (props) => {
    const testimonialData = props?.testimonialData;
    const herotyped = props?.herotyped;

    const settings = {
        infinite: true,
        slidesToShow: 4,
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

    const [blogs, setBlogs] = useState([]);

    const fetchData = async () => {
        try {
            const res = await axios.get(`/api/blogs/getpostfordashboard`);
            setBlogs(res.data.blogs);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const title = 'Check our Latest News and Update';
    const subtitle = 'Our Blogs';
    const description = `Explore new skills, deepen existing passions, and get lost in creativity. What you find just might surprise and inspire you.`;

    return (
        <Fragment>

            {/* Geeks SEO settings  */}
            <GeeksSEO title="Landing Course Cybrom pvt.ltd." />

            {/* Page Content */}
            <HeroTyped alldata={herotyped} />

            {/*  Testimonial slider */}
            <TestimonialSection alldata={testimonialData} />

            {/* Why learn with geeks */}
            <CoursesFeatures4Columns />

            {/* Similar Programs */}
            <SimilarPrograms />

            {/* Hero From Right */}
            <HeroFormRightForm />

            {/* Features with Bullets */}
            <FeaturesWithBullets />

            {/* pricing plans  */}
            <PricingPlans />

            <hr className='container fs-1' />

            {/* compare plan & additional features */}
            <ComparePlansTable />

            {/* Our Blogs Section  */}
            <section className="pt-lg-12 py-3">
                <Container>
                    <SectionHeadingCenter
                        title={title}
                        description={description}
                        subtitle={subtitle}
                    />
                    {/* {blogs} */}
                    <Row>
                        <div className="position-relative">
                            <Slider {...settings} className="pb-sm-5 mb-3 slick-slider-wrapper">
                                {blogs.map((item, index) => {
                                    return (
                                        <Col lg={3} md={6} sm={12} key={index}>
                                            <GetEnrolledBlogCard item={item} />
                                        </Col>
                                    );
                                })}
                            </Slider>
                        </div>
                    </Row>
                    <Row className="mb-4 text-center">
                        <Col>
                            <Link href={"/blog"}>
                                <Button>Brows more</Button>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/*  Testimonials start */}
            <section className="py-8 py-lg-16 bg-white">
                <Container>
                    <CoursesTestimonialSection />
                </Container>
            </section>

            {/*  CTA section */}
            <CTA2Buttons
                title="Join more than 1 million learners worldwide"
                description="Effective learning starts with assessment. Learning a new skill is hard work—Signal makes it easier."
                btntext1="Start Learning for Free"
                btnlink1="/authentication/sign-up"
                btntext2="Geeks for Business"
                btnlink2="/authentication/sign-up"
            />

            {/* FAQ Section With Image */}
            <FAQwithImage />

        </Fragment>
    );
};

export const getServerSideProps = async () => {
    try {
        const data1 = await axios.get(`${process.env.NEXTAUTH_URL}/api/siteSettings/landingPage/placementRecords/getRecords`);
        const data2 = await axios.get(`${process.env.NEXTAUTH_URL}/api/siteSettings/secondPage/heroSection/getRecord`);
        const testimonialData = data1?.data;
        const herotyped = data2?.data;
        return { props: { testimonialData, herotyped } };

    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                testimonialData: [],
                herotyped: [],
            },
        };
    }
}

export default LandingCourses;