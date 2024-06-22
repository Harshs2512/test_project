// import node module libraries
import React, { Fragment, useEffect, useState } from 'react';
import {
    Col,
    Row,
    Tab,
    Container,
    Image,
} from 'react-bootstrap';
import Link from 'next/link';

// import widget/custom components
import { GeeksSEO } from 'widgets';

// import sub components
import { CoursesTab } from 'sub-components';
import { useRouter } from 'next/router';
import axios from 'axios';

const CoursePathSingle = () => {
    const [category, setCategory] = useState();

    const slug = useRouter()?.query?.slug;
    const cid = useRouter()?.query?.cid;
    const categoryData = async () => {
        try {
            const res = await axios.get('/api/category/getcategories');
            if (res.status === 200) {
                setCategory(res.data?.categories?.find((item) => item?._id === slug));
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        categoryData();
    }, []);

    return (
        <Fragment>
            {/* Geeks SEO settings  */}
            <GeeksSEO title="Course Single | Cybrom Technology Pvt.Ltd." />

            {/* Bg cover */}
            <section
                className="py-6"
                style={{
                    background: `linear-gradient(270deg, #9D4EFF 0%, #782AF4 100%)`
                }}
            ></section>
            {/* Page header */}
            <Tab.Container defaultActiveKey="courses">
                <section className="bg-white shadow-sm">
                    <Container>
                        <Row className="align-items-center">
                            <Col xl={12} lg={12} md={12} sm={12}>
                                <div className="d-md-flex align-items-center justify-content-between bg-white  pt-3 pb-3 pb-lg-5">
                                    <div className="d-md-flex align-items-center text-lg-start text-center ">
                                        <div className="me-3  mt-n8">
                                            <Image
                                                src={`/api/siteSettings/secondPage/ouronlineprograms/getlogo/${cid}`}
                                                className="avatar-xxl rounded border p-4 bg-white "
                                                alt=""
                                            />
                                        </div>
                                        <div className="mt-3 mt-md-0">
                                            <h1 className="mb-0 fw-bold me-3">{category?.catName}</h1>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                {/* Content  */}
                <section className="py-6">
                    <Container>
                        <Row>
                            <Col md={12}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="courses" className="pb-4 px-0">
                                        {/* Beginner Courses */}
                                        <CoursesTab items={slug} />
                                        {/* End of Courses */}
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Tab.Container>
        </Fragment>
    );
};

export default CoursePathSingle;
