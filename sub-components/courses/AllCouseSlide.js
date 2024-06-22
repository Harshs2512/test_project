import React, { useEffect, useRef } from 'react';
import { Image, Row, Col, Container } from 'react-bootstrap';

const AllCourseSlide = (props) => {
    const alldatas = props?.alldata;

    const alldataWithDuplicate = [...alldatas, ...alldatas];

    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        container.classList.add('smooth-scroll');

        const slideInterval = setInterval(() => {
            container.scrollTo({
                left: container.scrollLeft + 1,
                behavior: 'smooth'
            });
            if (container.scrollLeft >= container.scrollWidth / 2) {
                container.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            }
        }, 10);

        return () => {
            clearInterval(slideInterval);
            container.classList.remove('smooth-scroll');
        };
    }, []);
    return (
        <section className="pb-10 bg-gray-100">
            <div className="mx-lg-8">
                <Col md={12} className="px-lg-2 mb-7 mt-6 ">
                    <h2 className="h1 fw-bold mt-3 text-capitalize"><u>Programming Tools and Technology</u> </h2>
                </Col>
            </div>
            <div className="logos mx-lg-8" ref={containerRef} style={{ overflow: 'hidden' }}>
                <div className="logos-slide d-flex">
                    {alldataWithDuplicate?.map((item, index) => (
                        <div key={index} className="rounded bg-white shadow-lg border border-1 ms-3 text-center align-items-center">
                            <div className='img-fluid px-1 d-flex py-5' style={{ width: '13rem', height: '7rem' }}>
                                <Image
                                    src={`/api/siteSettings/landingPage/courseLogo/Courselogo/${item._id}`}
                                    alt='course Logo' className='img-fluid w-100 h-auto' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AllCourseSlide;
