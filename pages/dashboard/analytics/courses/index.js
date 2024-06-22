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

const theme = {
    primary: "var(--geeks-primary)",
    secondary: "var(--geeks-secondary)",
    success: "var(--geeks-success)",
    info: "var(--geeks-info)",
    warning: "var(--geeks-warning)",
    danger: "var(--geeks-danger)",
    dark: "var(--geeks-dark)",
    light: "var(--geeks-light)",
    white: "var(--geeks-white)",
    gray100: "var(--geeks-gray-100)",
    gray200: "var(--geeks-gray-200)",
    gray300: "var(--geeks-gray-300)",
    gray400: "var(--geeks-gray-400)",
    gray500: "var(--geeks-gray-500)",
    gray600: "var(--geeks-gray-600)",
    gray700: "var(--geeks-gray-700)",
    gray800: "var(--geeks-gray-800)",
    gray900: "var(--geeks-gray-900)",
    black: "var(--geeks-black)",
    lightPrimary: "var(--geeks-light-primary)",
    lightSecondary: "var(--geeks-light-secondary)",
    lightSuccess: "var(--geeks-light-success)",
    lightDanger: "var(--geeks-light-danger)",
    lightWarning: "var(--geeks-light-warning)",
    lightInfo: "var(--geeks-light-info)",
    darkPrimary: "var(--geeks-dark-primary)",
    darkSecondary: "var(--geeks-dark-secondary)",
    darkSuccess: "var(--geeks-dark-success)",
    darkDanger: "var(--geeks-dark-danger)",
    darkWarning: "var(--geeks-dark-warning)",
    darkInfo: "var(--geeks-dark-info)",
    transparent: "transparent",
    borderColor: "var(--geeks-border-color)",
};

const Analytics = (props) => {
    const { totalCourse, totalInstructor } = props
    const [formdata, setFormdata] = useState({
        totalRevenue: [] || 0,
        totalStudents: [] || 0,
        totalInstructor: [] || 0,
        previousRevenue: 0,
        previousStudents: 0,
    });
    const [courseRevenueSeries, setCourseRevenueSeries] = useState([]);
    const [singleRevenueCourse, setSingleRevenueCourse] = useState('');
    const [revenueSeriesByCourse, setRevenueSeriesByCourse] = useState([]);
    const [dateByCourse, setDateByCourse] = useState([]);
    const [courseStudentsSeries, setCourseStudentsSeries] = useState([]);
    const [studentSeriesByCourse, setStudentsSeriesByCourse] = useState([]);
    const [dateByCourseForStudent, setDateByCourseForStudent] = useState([]);
    const [chartSeries, setChartSeries] = useState([{ name: 'Revenue', data: [] }]);
    const [categories, setChartCategories] = useState([]);
    const [topcourses, setTopCourse] = useState([]);
    const [topCourseName, setTopCourseName] = useState([]);
    const [year, setYear] = useState('');
    const [topfiveCourseByRevenue, setTopfiveCourseByRevenue] = useState([]);
    const [topfiveCourseByStudent, setTopfiveCourseByStudent] = useState([]);

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        (<Link
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className="btn-icon btn btn-ghost btn-sm rounded-circle">
            {children}
        </Link>)
    ));

    CustomToggle.displayName = 'CustomToggle';

    const ChartActionMenu = () => {
        return (
            <div>
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle}>
                        <i className="fe fe-more-vertical text-muted"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                        <Dropdown.Header>SETTINGS</Dropdown.Header>
                        <Dropdown.Item eventKey="2" onClick={() => handleAllRevenueChange('Weekly')}>
                            <i className="fe fe-clock dropdown-item-icon "></i> Weekly
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="1" onClick={() => handleAllRevenueChange('Monthly')}>
                            <i className="fe fe-clock dropdown-item-icon "></i> Monthly
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="2" onClick={() => handleAllRevenueChange('Yearly')}>
                            <i className="fe fe-clock dropdown-item-icon "></i> Yearly
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    };

    const handleAllRevenueChange = (type) => {
        fetchRevenueByType(type);
    };

    const SessionChartOptions = {
        chart: {
            toolbar: { show: !1 },
            height: 200,
            type: 'line',
            zoom: { enabled: !0 }
        },
        dataLabels: { enabled: !1 },
        stroke: { width: [4, 3, 3], curve: 'smooth', dashArray: [0, 5, 4] },
        legend: { show: !1 },
        colors: [theme.primary, theme.warning],
        markers: { size: 0, hover: { sizeOffset: 6 } },
        xaxis: {
            categories,
            labels: {
                style: {
                    colors: [theme.gray500],
                    fontSize: '12px',
                    fontFamily: 'Inter',
                    cssClass: 'apexcharts-xaxis-label'
                }
            },
            axisBorder: { show: !0, color: theme.borderColor, height: 0, width: "100%", offsetX: 0, offsetY: 0 },
            axisTicks: { show: !0, borderType: "solid", color: theme.borderColor, height: 6, offsetX: 0, offsetY: 0 },
        },
        yaxis: {
            labels: {
                style: {
                    colors: [theme.gray500],
                    fontSize: '12px',
                    fontFamily: 'Inter',
                    cssClass: 'apexcharts-xaxis-label'
                },
                offsetX: -12,
                offsetY: 0
            }
        },
        tooltip: {
            y: [
                {
                    title: {
                        formatter: function (e) {
                            return e + ' (in ₹)';
                        }
                    }
                },
                {
                    title: {
                        formatter: function (e) {
                            return e + ' (in ₹)';
                        }
                    }
                }
            ]
        },
        grid: { borderColor: theme.borderColor },
        responsive: [
            { breakpoint: 480, options: { chart: { height: 300 } } },
            { breakpoint: 1441, options: { chart: { height: 360 } } },
            { breakpoint: 1980, options: { chart: { height: 400 } } },
            { breakpoint: 2500, options: { chart: { height: 470 } } },
            { breakpoint: 3000, options: { chart: { height: 450 } } }
        ]
    };

    const TopCourseChartOptions = {
        chart: {
            toolbar: { show: !1 },
            height: 200,
            type: 'line',
            zoom: { enabled: 1 }
        },
        dataLabels: { enabled: !1 },
        stroke: { width: [4, 3, 3], curve: 'smooth', dashArray: [0, 5, 4] },
        legend: { show: !1 },
        colors: [theme.primary, theme.success, theme.warning],
        markers: { size: 0, hover: { sizeOffset: 6 } },
        xaxis: {
            categories: dateByCourse,
            labels: {
                style: {
                    colors: [theme.gray500],
                    fontSize: '12px',
                    fontFamily: 'Inter',
                    cssClass: 'apexcharts-xaxis-label'
                }
            },
            axisBorder: { show: !0, color: theme.borderColor, height: 0, width: "100%", offsetX: 0, offsetY: 0 },
            axisTicks: { show: !0, borderType: "solid", color: theme.borderColor, height: 6, offsetX: 0, offsetY: 0 },
        },
        yaxis: {
            labels: {
                style: {
                    colors: [theme.gray500],
                    fontSize: '12px',
                    fontFamily: 'Inter',
                    cssClass: 'apexcharts-xaxis-label'
                },
                offsetX: -12,
                offsetY: 0
            }
        },
        tooltip: {
            y: [
                {
                    title: {
                        formatter: function (e) {
                            return e + ' (₹)';
                        }
                    }
                },
                {
                    title: {
                        formatter: function (e) {
                            return e + ' per session';
                        }
                    }
                },
                {
                    title: {
                        formatter: function (e) {
                            return e;
                        }
                    }
                }
            ]
        },
        grid: { borderColor: theme.borderColor },
        responsive: [
            { breakpoint: 480, options: { chart: { height: 300 } } },
            { breakpoint: 1441, options: { chart: { height: 360 } } },
            { breakpoint: 1980, options: { chart: { height: 400 } } },
            { breakpoint: 2500, options: { chart: { height: 470 } } },
            { breakpoint: 3000, options: { chart: { height: 450 } } }
        ]
    };

    const TopCourseChartOptionsByStudent = {
        chart: {
            toolbar: { show: !1 },
            height: 200,
            type: 'line',
            zoom: { enabled: !1 }
        },
        dataLabels: { enabled: !1 },
        stroke: { width: [4, 3, 3], curve: 'smooth', dashArray: [0, 5, 4] },
        legend: { show: !1 },
        colors: [theme.primary, theme.success, theme.warning],
        markers: { size: 0, hover: { sizeOffset: 6 } },
        xaxis: {
            categories: dateByCourseForStudent,
            labels: {
                style: {
                    colors: [theme.gray500],
                    fontSize: '12px',
                    fontFamily: 'Inter',
                    cssClass: 'apexcharts-xaxis-label'
                }
            },
            axisBorder: { show: !0, color: theme.borderColor, height: 0, width: "100%", offsetX: 0, offsetY: 0 },
            axisTicks: { show: !0, borderType: "solid", color: theme.borderColor, height: 6, offsetX: 0, offsetY: 0 },
        },
        yaxis: {
            labels: {
                style: {
                    colors: [theme.gray500],
                    fontSize: '12px',
                    fontFamily: 'Inter',
                    cssClass: 'apexcharts-xaxis-label'
                },
                offsetX: -12,
                offsetY: 0
            }
        },
        tooltip: {
            y: [
                {
                    title: {
                        formatter: function (e) {
                            return e + ' (students)';
                        }
                    }
                },
                {
                    title: {
                        formatter: function (e) {
                            return e + ' per session';
                        }
                    }
                },
                {
                    title: {
                        formatter: function (e) {
                            return e;
                        }
                    }
                }
            ]
        },
        grid: { borderColor: theme.borderColor },
        responsive: [
            { breakpoint: 480, options: { chart: { height: 300 } } },
            { breakpoint: 1441, options: { chart: { height: 360 } } },
            { breakpoint: 1980, options: { chart: { height: 400 } } },
            { breakpoint: 2500, options: { chart: { height: 470 } } },
            { breakpoint: 3000, options: { chart: { height: 450 } } }
        ]
    };

    const fetchTopFiveCourse = async () => {
        try {
            const { data } = await axios.get('/api/analytics/course/topRevenueCourse');

            // Sort revenueByDate for each course
            const chartData = data.map(course => {
                const sortedRevenueByDate = course.revenueByDate
                    .slice() // Create a shallow copy of the array
                    .sort((a, b) => new Date(a.date) - new Date(b.date));
                return {
                    name: course.courseTitle,
                    data: sortedRevenueByDate.map(entry => entry.revenue)
                };
            });

            // Extract and sort dates for the first course (assuming all courses have the same date structure)
            const sortedDates = data[0].revenueByDate
                .slice()
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map(entry => entry.date);

            setCourseRevenueSeries(data);
            setRevenueSeriesByCourse(chartData);
            setDateByCourse(sortedDates);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchTopFiveCourseByRevenue = async () => {
        try {
            const { data } = await axios.get('/api/analytics/course/topRevenueCourse');
            const chartData = [{
                data: data.map(course => course.totalRevenue),
                name: data.map(course => course.courseTitle)
            }];
            setTopfiveCourseByRevenue(chartData)
        } catch (error) {
            console.log(error);
        }
    };

    const fetchTopFiveCourseByStudent = async () => {
        try {
            const { data } = await axios.get('/api/analytics/course/topRevenueCourse');
            const chartData = [{
                data: data.map(course => course.totalSales),
                name: data.map(course => course.courseTitle)
            }];
            setTopfiveCourseByStudent(chartData)
        } catch (error) {
            console.log(error);
        }
    };

    const handleCourseSelect = (selectedCourseName) => {
        setSingleRevenueCourse(selectedCourseName._id)
        const selectedCourse = courseRevenueSeries.find(course => course._id === selectedCourseName._id);

        if (!selectedCourse) {
            return;
        }
        const dateRevenuePairs = selectedCourse.revenueByDate.map(entry => ({
            date: new Date(entry.date),
            revenue: entry.revenue
        }));
        console.log(dateRevenuePairs)
        dateRevenuePairs.sort((a, b) => a.date - b.date);
        const sortedDates = dateRevenuePairs.map(pair => pair.date.toISOString().split('T')[0]);
        const sortedRevenues = dateRevenuePairs.map(pair => pair.revenue);
        setRevenueSeriesByCourse([{ name: selectedCourseName.courseTitle, data: sortedRevenues }]);
        setDateByCourse(sortedDates);
    };

    const fetchRevenueByType = async (type = 'Monthly') => {
        try {
            const res = await axios.get(`/api/analytics/course/ordersforrevenuebytype?type=${type}`);
            const data = res.data;
            const categories = data.map(item => item.period); // Assuming 'period' is the field for month/year
            const seriesData = data.map(item => item.revenue);
            setChartCategories(categories);
            setChartSeries([{ name: 'Revenue', data: seriesData }]);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAllRevenueByYear = async (year, month) => {
        setYear(year);
        try {
            const { data } = await axios.get(`/api/analytics/course/ordersforrevenuebyyear?&year=${year}&month=${month ? month : 'all'}`);
            const totalRevenue = data.reduce((acc, order) => acc + parseFloat(order.total_price), 0).toFixed(2);
            const revenueByDate = data.reduce((acc, order) => {
                const date = new Date(order.createdAt).toLocaleDateString();
                acc[date] = (acc[date] || 0) + parseFloat(order.total_price);
                return acc;
            }, {});

            const categories = Object?.keys(revenueByDate);
            const seriesData = Object?.values(revenueByDate);

            setFormdata(prevData => ({
                ...prevData,
                totalRevenue
            }));

            setChartCategories(categories);
            setChartSeries([{ name: 'Revenue', data: seriesData }]);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSingleRevenueByYear = async (year, month) => {
        setYear(year);
        try {
            const { data } = await axios.get(`/api/analytics/course/single-course/${singleRevenueCourse}?&year=${year}&month=${month ? month : 'all'}`);
            const totalRevenue = data.reduce((acc, order) => acc + parseFloat(order.total_price), 0).toFixed(2);
            const revenueByDate = data.reduce((acc, order) => {
                const date = new Date(order.createdAt).toLocaleDateString();
                acc[date] = (acc[date] || 0) + parseFloat(order.total_price);
                return acc;
            }, {});

            const categories = Object?.keys(revenueByDate);
            const seriesData = Object?.values(revenueByDate);

            setFormdata(prevData => ({
                ...prevData,
                totalRevenue
            }));

            setRevenueSeriesByCourse([{ name: 'Java', data: seriesData }]);
            setDateByCourse(categories);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSingleStudentByYear = async (year, month) => {
        setYear(year);
        try {
            const { data } = await axios.get(`/api/analytics/course/single-course/${singleRevenueCourse}?&year=${year}&month=${month ? month : 'all'}`);
            const totalRevenue = data.reduce((acc, order) => acc + parseFloat(order.total_price), 0).toFixed(2);
            const revenueByDate = data.reduce((acc, order) => {
                const date = new Date(order.createdAt).toLocaleDateString();
                acc[date] = (acc[date] || 0) + parseFloat(order.total_price);
                return acc;
            }, {});

            const categories = Object?.keys(revenueByDate);
            const seriesData = Object?.values(revenueByDate);

            setFormdata(prevData => ({
                ...prevData,
                totalRevenue
            }));

            setRevenueSeriesByCourse([{ name: 'Java', data: seriesData }]);
            setDateByCourse(categories);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchRevenue = async () => {
        try {
            const { data } = await axios.get('/api/analytics/course/ordersforrevenue');
            const totalRevenue = data.reduce((acc, order) => acc + parseFloat(order.total_price), 0).toFixed(2);
            const revenueByDate = data.reduce((acc, order) => {
                const date = new Date(order.createdAt).toLocaleDateString();
                acc[date] = (acc[date] || 0) + parseFloat(order.total_price);
                return acc;
            }, {});

            const sortedRevenueByDate = Object.entries(revenueByDate).sort((a, b) => new Date(a[0]) - new Date(b[0]));
            const sortedRevenueByDateObject = sortedRevenueByDate.reduce((acc, [date, revenue]) => {
                acc[date] = revenue;
                return acc;
            }, {});

            const categories = Object?.keys(sortedRevenueByDateObject);
            const seriesData = Object?.values(sortedRevenueByDateObject);

            setFormdata(prevData => ({
                ...prevData,
                totalRevenue
            }));

            setChartCategories(categories);
            setChartSeries([{ name: 'Revenue', data: seriesData }]);
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

            setTopCourseName(data);
            setTopCourse([{ data: totalSalesArray }]);
            const chartData = data.map(course => {
                const sortedRevenueByDate = course.revenueByDate
                    .slice() // Create a shallow copy of the array
                    .sort((a, b) => new Date(a.date) - new Date(b.date));
                return {
                    name: course._id,
                    data: sortedRevenueByDate.map(entry => entry.sales)
                };
            });
            const sortedDates = data[0].revenueByDate
                .slice()
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map(entry => entry.date);

            setCourseStudentsSeries(chartData);
            setStudentsSeriesByCourse(chartData);
            setDateByCourseForStudent(sortedDates);
        } catch (error) {
            console.log(error);
        }
    };

    const demodata = [{
        data: [3, 7, 9, 4, 2]
    }];
    useEffect(() => {
        fetchRevenue();
        fetchTopcourse();
        fetchTopFiveCourse();
        fetchTopFiveCourseByRevenue();
        fetchTopFiveCourseByStudent();
    }, []);

    return (
        <Fragment>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-md-flex justify-content-between align-items-center">
                        <div className="mb-3 mb-md-0">
                            <h1 className="mb-0 h2 fw-bold">Course Analytics</h1>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col xl={3} lg={6} md={12} sm={12}>
                    <Card border="light">
                        <Card.Body>
                            <Row>
                                <Col md={12} lg={12} xl={12} sm={12}>
                                    <span className="fw-semi-bold text-uppercase fs-6">COURSES</span>
                                </Col>
                                <Col md={6} lg={6} xl={6} sm={6}>
                                    <h1 className="fw-bold mt-2 mb-0 h1">{totalCourse}</h1>
                                </Col>
                                <Col md={6} lg={6} xl={6} sm={6} className='text-center'>
                                    <Image className="img-fluid w-50 mt-n3" src={'/images/cybrommain/online-learning.png'} alt='course_lerning' />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3} lg={6} md={12} sm={12}>
                    <Card border="light">
                        <Card.Body>
                            <Row>
                                <Col md={12} lg={12} xl={12} sm={12}>
                                    <span className="fw-semi-bold text-uppercase fs-6">COURSE REVENUE (₹)</span>
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
                <Col xl={3} lg={6} md={12} sm={12}>
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
                <Col xl={3} lg={6} md={12} sm={12}>
                    <Card border="light">
                        <Card.Body>
                            <Row>
                                <Col md={12} lg={12} xl={12} sm={12}>
                                    <span className="fw-semi-bold text-uppercase fs-6">TOTAL INSTRUCTOR</span>
                                </Col>
                                <Col md={6} lg={6} xl={6} sm={6}>
                                    <h1 className="fw-bold mt-2 mb-0 h1">{totalInstructor}</h1>
                                </Col>
                                <Col md={6} lg={6} xl={6} sm={6} className='text-center'>
                                    <Image className="img-fluid w-50 mt-n2" src={'/images/cybrommain/instructors-dashboard.png'} alt='course_lerning' />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* Sessions + Active User Row */}
            <Row>
                <Col xl={12} lg={12} md={12} className="mb-4">
                    <Card className="h-100">
                        <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
                            <div>
                                <h4 className="mb-0">All Revenue</h4>
                            </div>
                            <div className='d-flex gap-3'>
                                <Button variant="secondary" className="me-1" onClick={() => fetchRevenue()}>All</Button>
                                <Dropdown>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                        Year
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {['2023', '2024'].map((item, index) => (
                                            <Dropdown.Item href="#" key={index} onClick={() => handleAllRevenueByYear(item)}>{item}</Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                                {year &&
                                    <Dropdown>
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                            Month
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',].map((item, index) => (
                                                <Dropdown.Item href="#" key={index} onClick={() => handleAllRevenueByYear(year, item)}>{item}</Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                }
                                <ChartActionMenu />
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <ApexCharts
                                options={SessionChartOptions}
                                series={chartSeries}
                                type="line"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xl={8} lg={8} md={12} className="mb-4">
                    <Card className="h-100">
                        <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
                            <div>
                                <h4 className="mb-0">Top Courses (Revenue)</h4>
                            </div>
                            <div className='d-flex gap-2'>
                                <Button variant="secondary" className="me-1" onClick={() => fetchTopFiveCourse()}>All</Button>
                                {singleRevenueCourse &&
                                    <Dropdown>
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                            Year
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {['2023', '2024'].map((item, index) => (
                                                <Dropdown.Item href="#" key={index} onClick={() => handleSingleRevenueByYear(item)}>{item}</Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                }
                                {year && singleRevenueCourse &&
                                    <Dropdown>
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                            Month
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',].map((item, index) => (
                                                <Dropdown.Item href="#" key={index} onClick={() => handleSingleRevenueByYear(year, item)}>{item}</Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                }
                                <Dropdown>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                        Select Course
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {courseRevenueSeries.map((item, index) => (
                                            <Dropdown.Item href="#" key={index} onClick={() => handleCourseSelect(item)}>{item.courseTitle}</Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <ApexCharts
                                options={TopCourseChartOptions}
                                series={revenueSeriesByCourse}
                                type="line"
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={4} lg={4} md={12} className="mb-4">
                    <Card className="h-100">
                        <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
                            <h4 className="mb-0">Top 5 Courses (Revenue)</h4>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                {/* <Col>
                                    <span className="fw-semi-bold">365 days</span>
                                    <h1 className="fw-bold mt-2 mb-0 h2">12,698</h1>
                                    <p className="text-success fw-semi-bold mb-0">
                                        <i className="fe fe-trending-up me-1"></i>4.6%
                                    </p>
                                </Col>
                                <Col>
                                    <span className="fw-semi-bold">90 days</span>
                                    <h1 className="fw-bold mt-2 mb-0 h2">2.65K</h1>
                                    <p className="text-danger fw-semi-bold mb-0">
                                        <i className="fe fe-trending-down me-1"></i>4.6%
                                    </p>
                                </Col>
                                <Col>
                                    <span className="fw-semi-bold">30 days</span>
                                    <h1 className="fw-bold mt-2 mb-0 h2">1.34K</h1>
                                    <p className="text-success fw-semi-bold mb-0">
                                        <i className="fe fe-trending-up me-1"></i>4.6%
                                    </p>
                                </Col> */}
                            </Row>
                            <ApexCharts
                                options={ActiveUserChartOptions}
                                series={topfiveCourseByRevenue}
                                type="bar"
                            />
                            <div className='d-flex gap-3 px-3 mt-3'>
                                {topfiveCourseByRevenue[0]?.name.map((item, index) =>
                                    <OverlayTrigger
                                        key={index}
                                        placement='bottom'
                                        overlay={
                                            <Tooltip id={`tooltip-bottom`}>
                                                {item}
                                            </Tooltip>
                                        }
                                    >
                                        {<p>
                                            {item.slice(0, 8)}...
                                        </p>}
                                    </OverlayTrigger>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xl={8} lg={8} md={12} className="mb-4">
                    <Card className="h-100">
                        <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
                            <div>
                                <h4 className="mb-0">Top Courses (Students)</h4>
                            </div>
                            <div className='d-flex gap-2'>
                                {/* <Button variant="secondary" className="me-1" onClick={() => fetchTopFiveCourse()}>All</Button>
                                {singleRevenueCourse &&
                                    <Dropdown>
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                            Year
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {['2023', '2024'].map((item, index) => (
                                                <Dropdown.Item href="#" key={index} onClick={() => handleSingleStudentByYear(item)}>{item}</Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                }
                                {year && singleRevenueCourse &&
                                    <Dropdown>
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                            Month
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',].map((item, index) => (
                                                <Dropdown.Item href="#" key={index} onClick={() => handleSingleStudentByYear(year, item)}>{item}</Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                } */}
                                <Dropdown>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                        Select Course
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {courseStudentsSeries.map((item, index) => (
                                            <Dropdown.Item href="#" key={index} onClick={() => setStudentsSeriesByCourse([item])}>{item.name}</Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <ApexCharts
                                options={TopCourseChartOptionsByStudent}
                                series={studentSeriesByCourse}
                                type="line"
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={4} lg={4} md={12} className="mb-4">
                    <Card className="h-100">
                        <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
                            <h4 className="mb-0">Top 5 Courses (Student)</h4>
                        </Card.Header>
                        <Card.Body>
                            <ApexCharts
                                options={ActiveUserChartOptions}
                                series={topfiveCourseByStudent}
                                type="bar"
                            />
                            <div className='d-flex gap-3 px-3 mt-3'>
                                {topfiveCourseByStudent[0]?.name.map((item, index) =>
                                    <OverlayTrigger
                                        key={index}
                                        placement='bottom'
                                        overlay={
                                            <Tooltip id={`tooltip-bottom`}>
                                                {item}
                                            </Tooltip>
                                        }
                                    >
                                        {<p>
                                            {item.slice(0, 8)}...
                                        </p>}
                                    </OverlayTrigger>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xl={4} lg={6} md={12} className="mb-4">
                    <RecentCourses title="Recent Cuorses" />
                </Col>
                <Col xl={4} lg={6} md={12} className="mb-4">
                    <RecentContenst title="Recent Contests" />
                </Col>
                <Col xl={4} lg={6} md={12} className="mb-4">
                    <RecentMocks title="Recent Mocks" />
                </Col>
            </Row>
        </Fragment>
    );
};

export const getServerSideProps = async () => {
    try {
        const { data } = await axios.get(`${process.env.NEXTAUTH_URL}/api/courses/getdashboarddata`);
        const data1 = await axios.get(`${process.env.NEXTAUTH_URL}/api/auth/getinstructors`);
        // const data2 = await axios.get(`${process.env.NEXTAUTH_URL}/api/analytics/recentCourses`);
        // const data3 = await axios.get(`${process.env.NEXTAUTH_URL}/api/analytics/recentMocks`);
        // const data4 = await axios.get(`${process.env.NEXTAUTH_URL}/api/analytics/recentContest`);
        // const allcourses = data2?.data;
        // const allmocks = data3?.data;
        // const allcontest = data4?.data;
        const totalCourse = data?.courses?.length;
        const totalInstructor = data1?.data.length;
        return {
            props: {
                // allcourses,
                // allcontest,
                // allmocks,
                totalCourse,
                totalInstructor,
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                // allmocks: [],
                // allcourses: [],
                // allcontest: [],
                totalCourse: [],
                totalInstructor: [],
            },
        };
    }
}

export default Analytics;