import React, { Fragment, useEffect, useState } from 'react';
import { Col, Row, Container, Tab, Nav } from 'react-bootstrap';
import axios, { all } from 'axios';
import { GetEnrolledBlogCard } from 'widgets';
import useMounted from 'hooks/useMounted';

const MostPopularBlogs = () => {
    const [tabs, setCategories] = useState([]);
    const [allcourse, setAllcourse] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [coursesWithRatings, setCoursesWithRatings] = useState([]);
    const hasMounted = useMounted();
    const fetchData = async () => {
        try {
            const categoriesRes = await axios.get(`/api/blogs/category/getcategory`);
            setCategories(categoriesRes.data.categories);
            const res = await axios.get(`/api/blogs/getpostfordashboard`);
            setAllcourse(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    const filteredCourses = allcourse.filter(
        post => selectedCategory === null || post.postcategory._id === selectedCategory && post.status === "live"
    );
    const displayedCourses = selectedCategory === null ? allcourse : filteredCourses;
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Fragment>
            <section className="pb-lg-14 pb-8 bg-white">
                <Container>
                    <Row>
                        <Col xs={12}>
                            <div className="mb-6">
                                <h2 className="mb-1 h1">Most Popular Blogs</h2>
                                <p>These are the most popular courses among Cybrom Courses learners worldwide in year 2023</p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Tab.Container>
                                <Nav className="nav-lb-tab  mb-6 bg-gray-200 px-5 rounded-3 ">
                                    <Nav.Item className="ms-0">
                                        <Nav.Link className="mb-sm-3 mb-md-0" onClick={() => setSelectedCategory(null)}>
                                            All
                                        </Nav.Link>
                                    </Nav.Item>
                                    {tabs && tabs.map((category, index) => (
                                        <Nav.Item key={index} className={index === 0 ? 'ms-0' : ''}>
                                            <Nav.Link onClick={() => setSelectedCategory(category._id)} className="mb-sm-3 mb-md-0">
                                                {category.title}
                                            </Nav.Link>
                                        </Nav.Item>
                                    ))}
                                </Nav>
                                <Tab.Content>
                                    <Row>
                                        {displayedCourses && displayedCourses.slice(0, 4).map((item, index) => {
                                            return (
                                                <Col lg={3} md={6} sm={12} key={index}>
                                                    {hasMounted && <GetEnrolledBlogCard item={item} />}
                                                </Col>
                                            );
                                        })}
                                    </Row>
                                </Tab.Content>
                            </Tab.Container>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Fragment>
    );
};

export default MostPopularBlogs;
