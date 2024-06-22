// import node module libraries
import React, { Fragment, useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { Col, Row, Tab, Card, Nav, Breadcrumb, Table, Dropdown, Image } from 'react-bootstrap';
import {
    useTable,
    useFilters,
    useGlobalFilter,
    usePagination
} from 'react-table';
import { GlobalFilter, Pagination, Ratings } from 'widgets';
import { MoreVertical, Send, Inbox } from 'react-feather';
import DotBadge from 'components/bootstrap/DotBadge';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import formatDate from 'helper/formatDate';
import { Can } from 'utils/accessControl';

const ReviewandRating = () => {
    const [allData, setAllData] = useState([])
    const [alluser, setUsers] = useState([])
    const [allcourse, setCourse] = useState([])
    const [allpendingreviews, setAllpendingreviews] = useState([])
    const getallReivews = async () => {
        try {
            const review = await axios.get('/api/reviewandrating/allreviewandrating');
            setAllData(review.data)
            const reviews = review.data.map((post) => {
                return {
                    ...post,
                    is_published: post.is_published === 'accept' ? 'accept' : 'pending',
                };
            });
            const disabledPosts = reviews.filter((post) => post.is_published === 'pending');
            setAllpendingreviews(disabledPosts);
        }
        catch (error) {
            console.log(error)
        }

    };

    const getUsers = async () => {
        try {
            const res = await axios.get('/api/auth/userdata');
            setUsers(res.data)
        }
        catch (error) {
            console.log(error)
        }

    };

    const getCourses = async () => {
        try {
            const res = await axios.get('/api/courses/getdashboarddata');
            if (res.data.success) {
                setCourse(res.data.courses)
            }
        }
        catch (error) {
            console.log(error)
        }

    };

    useEffect(() => {
        getallReivews();
        getUsers();
        getCourses();
    }, []);

    const CoursesTable = ({ courses_data }) => {
        const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
            (<Link
                href="#"
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
        const columns = useMemo(
            () => [
                { accessor: '_id', Header: 'ID', show: false },
                {
                    accessor: 'courseId',
                    Header: 'Course',
                    Cell: ({ value, row }) => {
                        const course = allcourse?.find((item) => item._id == value)
                        return (
                            (<Link href="#" className="text-inherit">
                                <div className="d-lg-flex align-items-center">
                                    <div className="ms-lg-3 mt-2 mt-lg-0">
                                        <h4 className="mb-1 text-primary-hover">{course?.course_title}...</h4>
                                        <span className="text-inherit">
                                            {formatDate(row.original.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            </Link>)
                        );
                    }
                },
                {
                    accessor: 'username',
                    Header: 'User',
                    Cell: ({ value }) => {
                        const user = alluser.find(item => item._id == value)
                        return (
                            <div className="d-flex align-items-center">
                                {user && user._id ? (
                                    <Image
                                        src={`/api/auth/profileimgadmin/${user?._id}`}
                                        alt=""
                                        className="rounded-circle avatar-xs me-2"
                                    />
                                ) : ""}
                                <h5 className="mb-0">{user?.fname} {user?.lname}</h5>
                            </div>
                        );
                    }
                },
                {
                    accessor: 'is_published',
                    Header: 'Status',
                    Cell: ({ value }) => {
                        return (
                            <DotBadge
                                bg={
                                    value === 'pending'
                                        ? 'warning'
                                        : 'success'
                                }
                            >{value === 'pending'
                                ? 'Pending' : 'Acceped'}
                            </DotBadge>
                        );
                    }
                },
                {
                    accessor: 'ratings',
                    Header: 'Rating',
                    Cell: ({ value }) => {
                        return (
                            <h1 className="text-warning">
                                <Ratings rating={value} />
                            </h1>
                        )
                    }
                },
                {
                    accessor: 'reviews',
                    Header: 'Rating',
                    Cell: ({ value }) => {
                        return (
                            <div>
                                <span className="">
                                    {value}
                                </span>
                            </div>
                        )
                    }
                },
            ], []);

        const data = useMemo(() => courses_data, [courses_data]);

        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            page,
            nextPage,
            previousPage,
            state,
            gotoPage,
            pageCount,
            prepareRow,
            setGlobalFilter
        } = useTable(
            {
                columns,
                data,
                initialState: {
                    pageSize: 10,
                    hiddenColumns: columns.map((column) => {
                        if (column.show === false) return column.accessor || column.id;
                        else return false;
                    })
                }
            },
            useFilters,
            useGlobalFilter,
            usePagination
        );
        const { pageIndex, globalFilter } = state;

        const handleUpdate = async (id, status) => {
            try {
                const res = await axios.put(`/api/reviewandrating/${id}`, { id: id, is_published: status })
                if (res) {
                    toast.success(`Review Updated successfully`);
                    getallReivews();
                }
                else {
                    toast.error("something went wrong")
                }
            } catch (error) {
                toast.error("Somtihing went wrong");
                console.log(error)
            }
        };

        const handleDelete = async (id) => {
            try {
                const res = await axios.delete(`/api/reviewandrating/${id}`)
                if (res) {
                    toast.success(`Review Deleted successfully`);
                    getallReivews();
                }
                else {
                    toast.error("something went wrong")
                }
            } catch (error) {
                toast.error("Somtihing went wrong");
                console.log(error)
            }
        };

        return (
            <Fragment>
                <div className=" overflow-hidden">
                    <Row>
                        <Col lg={12} md={12} sm={12} className="mb-lg-0 mb-2 py-4 px-5 ">
                            <GlobalFilter
                                filter={globalFilter}
                                setFilter={setGlobalFilter}
                                placeholder="Search Course"
                            />
                        </Col>
                    </Row>
                </div>
                <div className="border-0 overflow-y-hidden">
                    <Table hover responsive {...getTableProps()} className="text-nowrap table-centered">
                        <thead className="table-light">
                            {headerGroups.map((headerGroup, index) => (
                                <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column, index) => (
                                        <th key={index} {...column.getHeaderProps()}>
                                            {column.render('Header')}
                                        </th>
                                    ))}
                                    <th>Action</th>
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row, index) => {
                                prepareRow(row);
                                const rowData = row.original;
                                return (
                                    <tr key={index} {...row.getRowProps()}>
                                        {row.cells.map((cell, index) => {
                                            return (
                                                <td key={index} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            );
                                        })}
                                        <td>
                                            <Dropdown>
                                                <Dropdown.Toggle as={CustomToggle}>
                                                    <MoreVertical size="15px" className="text-secondary" />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu align="end">
                                                    <Dropdown.Header>SETTINGS</Dropdown.Header>
                                                    <Can I="deleteReviews">
                                                        <Dropdown.Item eventKey="2" onClick={() => handleDelete(rowData._id)}>
                                                            <Inbox size="15px" className="me-1" />  Delete Review
                                                        </Dropdown.Item>
                                                    </Can>
                                                    <Can I="editReviews">
                                                        {rowData.is_published === 'pending' ? (
                                                            <Dropdown.Item eventKey="1" onClick={() => handleUpdate(rowData._id, 'accept')}>
                                                                <Send size="15px" className="me-1" /> Approved
                                                            </Dropdown.Item>
                                                        ) : (
                                                            <Dropdown.Item eventKey="2" onClick={() => handleUpdate(rowData._id, 'pending')}>
                                                                <Inbox size="15px" className="me-1" />  Pending
                                                            </Dropdown.Item>
                                                        )}
                                                    </Can>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>

                {/* Pagination @ Footer */}
                <Pagination
                    previousPage={previousPage}
                    pageCount={pageCount}
                    pageIndex={pageIndex}
                    gotoPage={gotoPage}
                    nextPage={nextPage}
                />
            </Fragment>
        );
    };
    return (
        <Fragment>
            <ToastContainer />
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                        <div className="mb-3 mb-md-0">
                            <h1 className="mb-1 h2 fw-bold">Review and Ratings</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                                <Breadcrumb.Item href="#">Reviews</Breadcrumb.Item>
                                <Breadcrumb.Item active>Review and Ratings</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        {/* <div>
							<Link href="/marketing/instructor/add-new-course" className="btn btn-primary">
								Add New Courses
							</Link>
						</div> */}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <Tab.Container defaultActiveKey="all">
                        <Card>
                            <Card.Header className="border-bottom-0 p-0 bg-white">
                                <Nav className="nav-lb-tab">
                                    <Nav.Item>
                                        <Nav.Link eventKey="all" className="mb-sm-3 mb-md-0">
                                            All
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="pending" className="mb-sm-3 mb-md-0">
                                            Pending
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body className="p-0">
                                <Tab.Content>
                                    <Tab.Pane eventKey="all" className="pb-4">
                                        <CoursesTable courses_data={allData} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="pending" className="pb-4">
                                        <CoursesTable courses_data={allpendingreviews} />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Card.Body>
                        </Card>
                    </Tab.Container>
                </Col>
            </Row>
        </Fragment>
    );
};

export default ReviewandRating;
