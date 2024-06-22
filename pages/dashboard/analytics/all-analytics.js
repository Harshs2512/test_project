// import node module libraries
import React, { Fragment, useEffect, useState } from 'react';
import { Col, Row, Card, Table, Image, Dropdown, Button, Popover, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Link from 'next/link';
import { FlatPickr, ApexCharts, StatRightChart } from 'widgets';
import axios from 'axios';
import {
    ActiveUserChartOptions,

} from 'data/charts/ChartData';
import Icon from '@mdi/react';
import { mdiArrowUp, mdiArrowDown } from '@mdi/js';
import { RecentContenst, RecentCourses, RecentMocks } from 'sub-components';


const Analytics = (props) => {
    const { totalCourse, totalInstructor } = props
    const [formdata, setFormdata] = useState({
        totalRevenue: [] || 0,
        totalStudents: [] || 0,
        totalInstructor: [] || 0,
        previousRevenue: 0,
        previousStudents: 0,
        totalBlogs: 0,
        totalCourse: 0,
        totalInstructor: 0,
        totalMocks: 0,
        totalContest: 0,
    });

    const fetchRevenue = async () => {
        try {
            const { data } = await axios.get('/api/analytics/course/ordersforrevenue');
            const mock = await axios.get('/api/analytics/mocks/ordersforrevenue');
            const contest = await axios.get('/api/analytics/contest/ordersforrevenue');
            const totalRevenueCourse = data.reduce((acc, order) => acc + parseFloat(order.total_price), 0).toFixed(2);
            const totalRevenueMock = mock.data.reduce((acc, order) => acc + parseFloat(order.total_price), 0).toFixed(2);
            const totalRevenueContest = contest.data.reduce((acc, order) => acc + parseFloat(order.total_price), 0).toFixed(2);
            const totalRevenue = parseInt(totalRevenueCourse) + parseInt(totalRevenueMock) + parseInt(totalRevenueContest);
            setFormdata(prevData => ({
                ...prevData,
                totalRevenue
            }));

        } catch (error) {
            console.log("Error in get orders in analytics", error)
        }
    };

    const fetchTopcourse = async () => {
        try {
            const { data } = await axios.get('/api/analytics/course/topcourses');

            const totalSalesArray = data.map(course => course.totalSales);
            const totalStudentsSum = totalSalesArray.reduce((sum, sales) => sum + sales, 0);

            setFormdata(prevData => ({
                ...prevData,
                totalStudents: totalStudentsSum
            }));
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCount = async () => {
        try {
            const { data } = await axios.get('/api/counterdata/counts');
            const totalBlogs = data.counterData?.Blogs;
            const totalCourse = data.counterData?.Course;
            const totalInstructor = data.counterData?.Instructor_count;
            const totalMocks = data.counterData?.Mocks;
            const totalContest = data.counterData?.Contest;
            setFormdata(prevData => ({
                ...prevData,
                totalBlogs: totalBlogs,
                totalCourse: totalCourse,
                totalInstructor: totalInstructor,
                totalMocks: totalMocks,
                totalContest: totalContest,
            }));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCount();
        fetchRevenue();
    }, []);

    useEffect(() => {
        fetchTopcourse();
    }, []);

    return (
        <Fragment>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-md-flex justify-content-between align-items-center">
                        <div className="mb-3 mb-md-0">
                            <h1 className="mb-0 h2 fw-bold">Analytics</h1>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col xl={3} lg={6} md={12} sm={12} className='mb-3'>
                    <Card border="light">
                        <Card.Body>
                            <Row>
                                <Col md={12} lg={12} xl={12} sm={12}>
                                    <span className="fw-semi-bold text-uppercase fs-6">COURSES</span>
                                </Col>
                                <Col md={6} lg={6} xl={6} sm={6}>
                                    <h1 className="fw-bold mt-2 mb-0 h1">{formdata?.totalCourse}</h1>
                                </Col>
                                <Col md={6} lg={6} xl={6} sm={6} className='text-center'>
                                    <Image className="img-fluid w-50 mt-n3" src={'/images/cybrommain/online-learning.png'} alt='course_lerning' />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3} lg={6} md={12} sm={12} className='mb-3'>
                    <Card border="light">
                        <Card.Body>
                            <Row>
                                <Col md={12} lg={12} xl={12} sm={12}>
                                    <span className="fw-semi-bold text-uppercase fs-6">MOCKS</span>
                                </Col>
                                <Col md={6} lg={6} xl={6} sm={6}>
                                    <h1 className="fw-bold mt-2 mb-0 h1">{formdata?.totalMocks}</h1>
                                </Col>
                                <Col md={6} lg={6} xl={6} sm={6} className='text-center'>
                                    <Image className="img-fluid w-50 mt-n3" src={'/images/cybrommain/test-dashboard.png'} alt='course_lerning' />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3} lg={6} md={12} sm={12} className='mb-3'>
                    <Card border="light">
                        <Card.Body>
                            <Row>
                                <Col md={12} lg={12} xl={12} sm={6}>
                                    <span className="fw-semi-bold text-uppercase fs-6">CONTEST</span>
                                </Col>
                                <Col md={6} lg={6} xl={6} sm={6}>
                                    <h1 className="fw-bold mt-2 mb-0 h1">{formdata?.totalContest}</h1>
                                </Col>
                                <Col md={6} lg={6} xl={6} sm={6} className='text-center'>
                                    <Image className="img-fluid w-lg-50 w-sm-20 mt-n3" src={'/images/cybrommain/cup.png'} alt='course_lerning' />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3} lg={6} md={12} sm={12} className='mb-3'>
                    <Card border="light">
                        <Card.Body>
                            <Row>
                                <Col md={12} lg={12} xl={12} sm={12}>
                                    <span className="fw-semi-bold text-uppercase fs-6">BLOGS</span>
                                </Col>
                                <Col md={6} lg={6} xl={6} sm={6}>
                                    <h1 className="fw-bold mt-2 mb-0 h1">{formdata?.totalBlogs}</h1>
                                </Col>
                                <Col md={6} lg={6} xl={6} sm={6} className='text-center'>
                                    <Image className="img-fluid w-50 mt-n3" src={'/images/cybrommain/blogging.png'} alt='course_lerning' />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3} lg={6} md={12} sm={12} className='mb-3'>
                    <Card border="light">
                        <Card.Body>
                            <Row>
                                <Col md={12} lg={12} xl={12} sm={12}>
                                    <span className="fw-semi-bold text-uppercase fs-6">TOTAL REVENUE (₹)</span>
                                </Col>
                                <Col md={6} lg={6} xl={6} sm={6}>
                                    <h1 className="fw-bold mt-2 mb-0 h1">{formdata.totalRevenue}</h1>
                                </Col>
                                <Col md={6} lg={6} xl={6} sm={6} className='text-center'>
                                    <Image className="img-fluid w-50 mt-n3" src={'/images/cybrommain/revenue.png'} alt='course_lerning' />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3} lg={6} md={12} sm={12} className='mb-3'>
                    <Card border="light">
                        <Card.Body>
                            <Row>
                                <Col md={12} lg={12} xl={12} sm={12}>
                                    <span className="fw-semi-bold text-uppercase fs-6">TOTAL STUDENTS</span>
                                </Col>
                                <Col md={6} lg={6} xl={6} sm={6}>
                                    <h1 className="fw-bold mt-2 mb-0 h1">{formdata?.totalStudents}</h1>
                                </Col>
                                <Col md={6} lg={6} xl={6} sm={6} className='text-center'>
                                    <Image className="img-fluid w-50 mt-n2" src={'/images/cybrommain/graduates.png'} alt='course_lerning' />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3} lg={6} md={12} sm={12} className='mb-3'>
                    <Card border="light">
                        <Card.Body>
                            <Row>
                                <Col md={12} lg={12} xl={12} sm={12}>
                                    <span className="fw-semi-bold text-uppercase fs-6">TOTAL INSTRUCTOR</span>
                                </Col>
                                <Col md={6} lg={6} xl={6} sm={6}>
                                    <h1 className="fw-bold mt-2 mb-0 h1">{formdata?.totalInstructor}</h1>
                                </Col>
                                <Col md={6} lg={6} xl={6} sm={6} className='text-center'>
                                    <Image className="img-fluid w-50 mt-n2" src={'/images/cybrommain/instructors-dashboard.png'} alt='course_lerning' />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

export default Analytics;