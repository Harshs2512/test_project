// import node module libraries
import React, { Fragment, useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { Col, Row, Tab, Card, Nav, Breadcrumb, Table, Dropdown, Image, Button, Modal, Form } from 'react-bootstrap';
import {
    useTable,
    useFilters,
    useGlobalFilter,
    usePagination
} from 'react-table';
import { GlobalFilter, Pagination, Ratings, GKTippy } from 'widgets';
import { MoreVertical, Send, Inbox } from 'react-feather';
import DotBadge from 'components/bootstrap/DotBadge';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlacementReview = () => {
    const [allData, setAllData] = useState([])
    const [allpendingreviews, setAllpendingreviews] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [actiontype, setActiontype] = useState('')
    const [studentImage, setStudentImage] = useState([])
    const [Rating, setRating] = useState(1)
    const [formData, setFormData] = useState({
        review: '',
        student_name: '',
    });


    const getallReivews = async () => {
        try {
            const review = await axios.get('/api/siteSettings/landingPage/reviewAndrating/getRecords');
            if (review.status === 200) {
                setAllData(review.data);
            }
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

    useEffect(() => {
        getallReivews();
    }, []);

    const handleCloseModal = () => {
        setStudentImage('');
        setFormData({
            review: '',
            student_name: '',
        });
        setModalOpen(false);
    };

    const handleOpenModal = (action) => {
        setActiontype(action);
        setModalOpen(true);
    };

    const handleChangeStuimg = (e) => {
        setStudentImage(e.target.files[0]);
    };
    const handleReviewSubmit = async () => {
        try {
            const data = new FormData();
            // data.append("id", postid);
            data.append("ratings", Rating);
            data.append("reviews", formData.review);
            data.append("student_name", formData.student_name);
            data.append("studentImage", studentImage);
            const res = await axios.post(`/api/siteSettings/landingPage/reviewAndrating/addreview`, data);
            if (res.data.success) {
                handleCloseModal();
                getallReivews()
            }
        } catch (error) {
            console.log(error,);
        }
    };

    const handleRatingClick = (selectedRating) => {
        setRating(selectedRating);
    };

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
        const formatDate = (dateString) => {
            const months = [
                'January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'
            ];

            const date = new Date(dateString);
            const year = date.getFullYear().toString(); // Get the last two digits of the year
            const month = months[date.getMonth()]; // Get the month name from the array
            const day = String(date.getDate()).padStart(2, '0');
            return `${month} ${day}, ${year}`;
        };
        const columns = useMemo(
            () => [
                { accessor: '_id', Header: 'ID', show: false },
                {
                    accessor: 'student_name',
                    Header: 'Student Name',
                    Cell: ({ value, row }) => {
                        return (
                            <div className='d-flex'>
                                <Image
                                    src={`/api/siteSettings/landingPage/reviewAndrating/getStudentImg/${row.original._id}`}
                                    alt=""
                                    className="avatar rounded"
                                />
                                <Link href="#" className="text-inherit text-center ms-4 h5">
                                    {value}
                                </Link>
                            </div>

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
                            <div className='text-wrap' style={{ width: "300px" }}>
                                <p className="mb-0">
                                    {value}
                                </p>
                            </div>
                        )
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
                    accessor: "createdAt",
                    Header: "Created At",
                    Cell: ({ value }) => {
                        return (
                            <div>
                                <span className="">
                                    {formatDate(value)}
                                </span>
                            </div>
                        );
                    }
                },
                {
                    accessor: "updatedAt",
                    Header: "Updated At",
                    Cell: ({ value }) => {
                        return (
                            <div>
                                <span className="">
                                    {formatDate(value)}
                                </span>
                            </div>
                        );
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

        const handleStatusUpdate = async (id, status) => {
            try {
                const res = await axios.put(`/api/siteSettings/landingPage/reviewAndrating/${id}`, { id: id, is_published: status })
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

        const handleUpdate = async (id) => {
            try {
                setModalOpen(true)
                const res = await axios.put(`/api/siteSettings/landingPage/reviewAndrating/updateRecord`, id)
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
                const res = await axios.delete(`/api/siteSettings/landingPage/reviewAndrating/${id}`)
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
                                                    <Dropdown.Item eventKey="2" onClick={() => handleDelete(rowData._id)}>
                                                        <Inbox size="15px" className="me-1" />  Delete Review
                                                    </Dropdown.Item>
                                                    {rowData.is_published === 'pending' ? (
                                                        <Dropdown.Item eventKey="1" onClick={() => handleStatusUpdate(rowData._id, 'accept')}>
                                                            <Send size="15px" className="me-1" /> Approved
                                                        </Dropdown.Item>
                                                    ) : (
                                                        <Dropdown.Item eventKey="2" onClick={() => handleStatusUpdate(rowData._id, 'pending')}>
                                                            <Inbox size="15px" className="me-1" />  Pending
                                                        </Dropdown.Item>
                                                    )}
                                                    <Dropdown.Item eventKey="2" onClick={() => handleUpdate(rowData._id)}>
                                                        <Inbox size="15px" className="me-1" />  Edit
                                                    </Dropdown.Item>
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
                            <h1 className="mb-1 h2 fw-bold">Placed Student Review</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                                <Breadcrumb.Item href="#">Placed Student</Breadcrumb.Item>
                                <Breadcrumb.Item active>Review and Ratings</Breadcrumb.Item>
                            </Breadcrumb>
                        </div> 
                        <div>
                            <Button className="btn btn-primary" onClick={() => handleOpenModal('post')}>
                                New Post
                            </Button>
                        </div>
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
            <Modal
                show={modalOpen}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Give Review</Modal.Title>
                </Modal.Header>
                <Modal.Body className="pb-0">
                    <Form.Group id="difficultyLevel" className='mb-3'>
                        <Form.Label>Student Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Title"
                            name="name"
                            id="name"
                            value={formData.student_name}
                            onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group id="difficultyLevel" className='mb-3'>
                        <Form.Label>Student Image</Form.Label>
                        <span className='ms-2 fs-6'>dementions should be 150 X 153</span>
                        <Form.Control
                            id="comimage"
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChangeStuimg}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2 text-warning">
                        <Form.Label>Raing</Form.Label>
                        <br />
                        {[1, 2, 3, 4, 5].map((value) => (
                            <span
                                key={value}>
                                <GKTippy
                                    content={value === 1 ? 'Bad' : value === 2 ? 'Average' : value === 3 ? 'Good' : value === 4 ? 'Very Good' : 'Exelent'}>
                                    <span
                                        onClick={() => handleRatingClick(value)}
                                        style={{
                                            fontSize: '1.7em',
                                            cursor: 'pointer',
                                            color: value <= Rating ? '#f0ad4e' : '#ccc',
                                        }}
                                    >
                                        &#9733;
                                    </span>
                                </GKTippy>
                            </span>
                        ))}
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formaddnewsection">
                        <Form.Label>Review</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Add new section"
                            value={formData.review}
                            onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className="pt-0 border-0 d-inline ">
                    <Button onClick={handleReviewSubmit}>Submit Review</Button>
                    <Button variant="outline-secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};

export default PlacementReview;
