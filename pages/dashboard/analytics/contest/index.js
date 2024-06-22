// import node module libraries
import React, { Fragment, useEffect, useState } from 'react';
import { Col, Row, Card, Table, Image, Dropdown, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
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

const Analytics = () => {
    const [formdata, setFormdata] = useState({
        totalcontest: [] || 0,
        contestMonth: [] || 0,
        totalRevenue: [] || 0,
        totalStudents: [] || 0,
        previousRevenue: 0,
        previousStudents: 0,
    });
    const [contestRevenueSeries, setcontestRevenueSeries] = useState([]);
    const [revenueSeriesBycontest, setRevenueSeriesBycontest] = useState([]);
    const [dateBycontest, setDateBycontest] = useState([]);
    const [contestStudentsSeries, setcontestStudentsSeries] = useState([]);
    const [studentSeriesBycontest, setStudentsSeriesBycontest] = useState([]);
    const [dateBycontestForStudent, setDateBycontestForStudent] = useState([]);
    const [chartSeries, setChartSeries] = useState([{ name: 'Revenue', data: [] }]);
    const [studentsChartSeries, setStudentsChartSeries] = useState([{ name: 'Student', data: [] }]);
    const [categories, setChartCategories] = useState([]);
    const [topcontests, setTopcontest] = useState([]);
    const [topcontestName, setTopcontestName] = useState([]);
    const [singleRevenueContest, setSingleRevenueContest] = useState('');
    const [year, setYear] = useState('');

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

    const TopcontestChartOptions = {
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
            categories: dateBycontest,
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
                            return e + ' (₹)';
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

    const TopcontestChartOptionsByStudent = {
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
            categories: dateBycontestForStudent,
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
                            return e + ' (students)';
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

    const fetchData = async () => {
        const { data } = await axios.get('/api/analytics/contest/getdashboarddata');
        setFormdata(prevData => ({
            ...prevData,
            totalcontest: data.contests.length,
            contestMonth: data.contests
        }));
    };

    const fetchInstructor = async () => {
        try {
            const { data } = await axios.get('/api/auth/getinstructors');
            setFormdata(prevData => ({
                ...prevData,
                totalInstructor: data.length,
            }));
        }
        catch (error) {
            console.log(error)
        }
    };

    const fetchTopFivecontest = async () => {
        const { data } = await axios.get('/api/analytics/contest/topRevenueContests');
        const chartData = data.map(contest => {
            return {
                name: contest.contestTitle,
                data: contest.revenueByDate.map(entry => entry.revenue)
            };
        });
        const chartDate = data.map(contest => {
            return (
                contest.revenueByDate.map(entry => entry.date)
            );
        });
        setcontestRevenueSeries(data);
        setRevenueSeriesBycontest(chartData);
        setDateBycontest(chartDate[0]);
    };

    const handlecontestSelect = (selectedcontestName) => {
        const selectedcontest = contestRevenueSeries.find(contest => contest._id === selectedcontestName._id);

        if (!selectedcontest) {
            return;
        }
        const dateRevenuePairs = selectedcontest.revenueByDate.map(entry => ({
            date: new Date(entry.date),
            revenue: entry.revenue
        }));
        dateRevenuePairs.sort((a, b) => a.date - b.date);
        const sortedDates = dateRevenuePairs.map(pair => pair.date.toISOString().split('T')[0]);
        const sortedRevenues = dateRevenuePairs.map(pair => pair.revenue);
        setRevenueSeriesBycontest([{ name: selectedcontestName._id, data: sortedRevenues }]);
        setDateBycontest(sortedDates);
    };

    const fetchRevenue = async () => {
        try {
            const { data } = await axios.get('/api/analytics/contest/ordersforrevenue');
            const totalRevenue = data.reduce((acc, order) => acc + parseFloat(order.total_price), 0).toFixed(2);
            const revenueByDate = data.reduce((acc, order) => {
                const date = new Date(order.createdAt).toLocaleDateString();
                acc[date] = (acc[date] || 0) + parseFloat(order.total_price);
                return acc;
            }, {});

            // Convert revenueByDate to array, sort by date, then convert back to object
            const sortedRevenueByDate = Object.entries(revenueByDate).sort((a, b) => new Date(a[0]) - new Date(b[0]));
            const sortedRevenueByDateObject = sortedRevenueByDate.reduce((acc, [date, revenue]) => {
                acc[date] = revenue;
                return acc;
            }, {});

            const categories = Object.keys(sortedRevenueByDateObject);
            const seriesData = Object.values(sortedRevenueByDateObject);

            setFormdata(prevData => ({
                ...prevData,
                totalRevenue
            }));

            setChartCategories(categories);
            setChartSeries([{ name: 'Revenue', data: seriesData }]);
        } catch (error) {
            console.log("Error in get orders in analytics", error);
        }
    };


    const fetchTopcontest = async () => {
        try {
            const { data } = await axios.get('/api/analytics/contest/topcontests')
            const totalSalesArray = data.map(contest => contest.totalSales);
            const totalStudentsSum = totalSalesArray.reduce((sum, sales) => sum + sales, 0);
            setFormdata(prevData => ({
                ...prevData,
                totalStudents: totalStudentsSum
            }));
            setTopcontestName(data)
            setTopcontest([{ data: totalSalesArray }]);
            const chartData = data.map(contest => {
                return {
                    name: contest._id,
                    data: contest.revenueByDate.map(entry => entry.sales)
                };
            });
            const chartDate = data.map(contest => {
                return (
                    contest.revenueByDate.map(entry => entry.date)
                );
            });
            setcontestStudentsSeries(chartData);
            setStudentsSeriesBycontest(chartData);
            setStudentsChartSeries([{ name: 'Student', data: totalSalesArray }]);
            setDateBycontestForStudent(chartDate[0]);
        } catch (error) {
            console.log(error)
        }
    };

    const demodata = [{
        data: [3, 7, 9, 4, 2]
    }];

    const handleAllRevenueByYear = async (year, month) => {
        setYear(year);
        try {
            const { data } = await axios.get(`/api/analytics/contest/ordersforrevenuebyyear?&year=${year}&month=${month ? month : 'all'}`);
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

    useEffect(() => {
        fetchData();
        fetchRevenue();
        fetchTopcontest();
        fetchInstructor();
        fetchTopFivecontest();
    }, []);

    const handleContestSelect = (selectedContestName) => {
        setSingleRevenueContest(selectedContestName._id)
        const selectedContest = contestRevenueSeries.find(contest => contest._id === selectedContestName._id);
        if (!selectedContest) {
            return;
        }
        const dateRevenuePairs = selectedContest.revenueByDate.map(entry => ({
            date: new Date(entry.date),
            revenue: entry.revenue
        }));
        dateRevenuePairs.sort((a, b) => a.date - b.date);

        const sortedDates = dateRevenuePairs.map(pair => pair.date.toISOString().split('T')[0]);
        const sortedRevenues = dateRevenuePairs.map(pair => pair.revenue);
        setRevenueSeriesBycontest([{ name: selectedContestName.constestTitle, data: sortedRevenues }]);
        setDateBycontest(sortedDates);
    };

    const handleSingleRevenueByYear = async (year, month) => {
        setYear(year);
        try {
            const { data } = await axios.get(`/api/analytics/contest/single-course/${singleRevenueContest}?&year=${year}&month=${month ? month : 'all'}`);
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

            setRevenueSeriesBycontest([{ name: 'Java', data: seriesData }]);
            setDateBycontest(categories);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchRevenueByType = async (type = 'Monthly') => {
        try {
            const res = await axios.get(`/api/analytics/contest/ordersforrevenuebytype?type=${type}`);
            const data = res.data;
            const categories = data.map(item => item.period); // Assuming 'period' is the field for month/year
            const seriesData = data.map(item => item.revenue);
            setChartCategories(categories);
            setChartSeries([{ name: 'Revenue', data: seriesData }]);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAllRevenueChange = (type) => {
        fetchRevenueByType(type);
    };

    const handleAllRevenue = () => {
        setSingleRevenueContest('')
        setYear('')
        fetchTopFivecontest();
    };
    return (
        <Fragment>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-md-flex justify-content-between align-items-center">
                        <div className="mb-3 mb-md-0">
                            <h1 className="mb-0 h2 fw-bold">contest Analytics</h1>
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
                                    <span className="fw-semi-bold text-uppercase fs-6">CONTESTS</span>
                                </Col>
                                <Col md={6} lg={6} xl={6} sm={6}>
                                    <h1 className="fw-bold mt-2 mb-0 h1">{formdata.totalcontest}</h1>
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
                                    <span className="fw-semi-bold text-uppercase fs-6">Contest (₹)</span>
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
            {/* Sessions + Active User Row */}
            <Row>
                <Col xl={8} lg={12} md={12} className="mb-4">
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
                <Col xl={4} lg={12} md={12} className="mb-4">
                    <Card className="h-100">
                        <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
                            <h4 className="mb-0">Top 5 contests</h4>
                        </Card.Header>
                        <Card.Body>
                            {/* <Row>
                                <Col>
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
                                </Col>
                            </Row> */}
                            <ApexCharts
                                options={ActiveUserChartOptions}
                                series={demodata}
                                type="bar"
                            />
                            <div className='d-flex gap-3 px-3 mt-3'>
                                {topcontestName.map((item, index) =>
                                    <OverlayTrigger
                                        key={index}
                                        placement='bottom'
                                        overlay={
                                            <Tooltip id={`tooltip-bottom`}>
                                                {item._id}
                                            </Tooltip>
                                        }
                                    >
                                        {<p>
                                            {item._id.slice(0, 8)}...
                                        </p>}
                                    </OverlayTrigger>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xl={12} lg={12} md={12} className="mb-4">
                    <Card className="h-100">
                        <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
                            <div>
                                <h4 className="mb-0">Top Contest (Revenue)</h4>
                            </div>
                            <div className='d-flex gap-2'>
                                <Button variant="secondary" className="me-1" onClick={() => handleAllRevenue()}>All</Button>
                                {singleRevenueContest &&
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
                                {year && singleRevenueContest &&
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
                                        Select Contest
                                    </Dropdown.Toggle>
                                    {console.log(contestRevenueSeries)}
                                    <Dropdown.Menu>
                                        {contestRevenueSeries.map((item, index) => (
                                            <Dropdown.Item href="#" key={index} onClick={() => handleContestSelect(item)}>{item.contestTitle}</Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <ApexCharts
                                options={TopcontestChartOptions}
                                series={revenueSeriesBycontest}
                                type="line"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col xl={12} lg={12} md={12} className="mb-4">
                    <Card className="h-100">
                        <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
                            <div>
                                <h4 className="mb-0">Top contests (Students)</h4>
                            </div>
                            <div className='d-flex gap-2'>
                                {/* <Button variant="outline-secondary" className="me-1" onClick={() => handlePeriodChange(30)}>30</Button>
                                <Button variant="outline-secondary" className="me-1">60</Button>
                                <Button variant="outline-secondary" className="me-1">90</Button>
                                <Button variant="outline-secondary" className="me-1">Life Time</Button> */}
                                <Dropdown>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                        Select contest
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {contestStudentsSeries.map((item, index) => (
                                            <Dropdown.Item href="#" key={index} onClick={() => setStudentsSeriesBycontest([item])}>{item.name}</Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <ApexCharts
                                options={TopcontestChartOptionsByStudent}
                                series={studentSeriesBycontest}
                                type="line"
                            />
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

export default Analytics;