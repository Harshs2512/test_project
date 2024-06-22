import React, { Fragment, useEffect, useState } from 'react';
import { Col, Row, Container, Tab, Nav } from 'react-bootstrap';
import axios from 'axios';
import { GetEnrolledBlogCard } from 'widgets';
import useMounted from 'hooks/useMounted';

const MostPopularBlogs = ({ alldata }) => {
    const [tabs, setCategories] = useState([]);
    const [allblogs, setBlogs] = useState([]);
    const [activeKey, setActiveKey] = useState("ALL");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const hasMounted = useMounted();

    const handleToggle = (tab, category) => {
        setSelectedCategory(category._id);
        setActiveKey(tab);
        console.log(tab, category)
        if (tab == 'all') {
            setActiveKey("all");
        } else {
            setActiveKey(category._id);
        }
    };

    const fetchData = async () => {
        try {
            let blogsRes = [];

            if (selectedCategory) {
                blogsRes = alldata?.blogs.filter((item) => item.postcategory === selectedCategory);
            } else {
                blogsRes = alldata?.blogs;
            }

            const blogs = blogsRes || [];
            const liveCourse = blogs.filter(item => item.status === 'live');
            setBlogs(liveCourse);
            const categoriesRes = await axios.get(`/api/blogs/category/getcategory`);
            setCategories(categoriesRes.data?.categories || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedCategory]);

    return (
        <Fragment>
            <section className="pb-lg-14 pb-8">
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
                            <Tab.Container defaultActiveKey={null} activeKey={activeKey}>
                                <Nav className="nav-lb-tab  mb-6 bg-gray-200 px-5 rounded-3 ">
                                    <Nav.Item className="ms-0">
                                        <Nav.Link
                                            className={`mb-sm-3 mb-md-0 ${activeKey == null ? "active" : ""}`}
                                            onClick={() => handleToggle(null, 'all')}
                                        >
                                            All
                                        </Nav.Link>
                                    </Nav.Item>
                                    {tabs && tabs.map((category, index) => (
                                        <Nav.Item key={index} className={index === 0 ? 'ms-0' : ''}>
                                            <Nav.Link
                                                onClick={() => handleToggle(category._id, category)}
                                                className={`mb-sm-3 mb-md-0 ${activeKey === category._id ? "active" : ""}`}
                                            >
                                                {category.title}
                                            </Nav.Link>
                                        </Nav.Item>
                                    ))}
                                </Nav>
                                <Tab.Content>
                                    <Row>
                                        {allblogs?.slice(0, 8).map((item, index) => (
                                            <Col lg={3} md={6} sm={12} key={index}>
                                                {hasMounted && <GetEnrolledBlogCard item={item} />}
                                            </Col>
                                        ))}
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