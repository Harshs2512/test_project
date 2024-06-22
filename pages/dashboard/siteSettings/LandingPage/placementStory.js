// import node module libraries
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import {
    Card, Row, Col, Image, Dropdown, Table, Button, Breadcrumb, Modal, Form
} from 'react-bootstrap';

import Link from 'next/link';

// import widget/custom components
import { StatRightBGIcon, GKTippy } from 'widgets';

// import custom components
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MoreVertical, Edit, Trash } from 'react-feather';

const PlacementStory = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [allposts, setAllposts] = useState([]);
    const [companyImage, setCompanyImage] = useState([]);
    const [studentImage, setStudentImage] = useState([]);
    const [actiontype, setActiontype] = useState('');
    const [postid, setPostid] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        student_name: '',
    });

    const [thumbnailError, setThumbnailError] = useState('');
    const [vidourlError, setVideourlError] = useState('');

    const validateThumbnail = (thumb) => {
        return thumb ? '' : 'Course Thumbnail is required';
    };

    const validatevideourl = (url) => {
        return url.trim().length > 0 ? '' : 'Url is required';
    };

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

    const getPosts = async () => {
        try {
            const res = await axios.get("/api/siteSettings/landingPage/placementStory/getRecords");
            if (res.status === 200) {
                setAllposts(res?.data);
            }
        } catch (error) {
            console.log("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        getPosts();
    }, [])

    const columns = useMemo(
        () => [
            { accessor: 'id', Header: 'ID', show: false },
            {
                accessor: 'student_name',
                Header: 'Student Name',
                Cell: ({ value, row }) => {
                    return (
                        <div className=''>
                            <Image
                                src={`/api/siteSettings/landingPage/placementStory/getStudenticon/${row.original._id}`}
                                alt=""
                                className="img-fluid avatar rounded "
                            />
                            <Link href="#" className="text-inherit text-center ms-2 h5">
                                {value}
                            </Link>
                        </div>

                    );
                }
            },
            {
                accessor: 'company_name',
                Header: 'Company',
                Cell: ({ value, row }) => {
                    return (
                        <h5 className="mb-0">
                            <div className='d-flex'>
                                <Image
                                    src={`/api/siteSettings/landingPage/placementStory/getCompanylogo/${row.original._id}`}
                                    alt=""
                                    className="avatar rounded ms-2"
                                />
                                <Link href="#" className="text-inherit text-center ms-4 h5">
                                    {value}
                                </Link>
                            </div>
                        </h5>
                    );
                }
            },
            {
                accessor: 'title',
                Header: 'Card Title',
                Cell: ({ value, row }) => {
                    return (
                        <div className='text-wrap' style={{ width: "200px" }}>
                            <p className="mb-0">
                                {value}
                            </p>
                        </div>
                    );
                }
            },
            {
                accessor: 'description',
                Header: 'Card Description',
                Cell: ({ value, row }) => {
                    return (
                        <div className='text-wrap' style={{ width: "400px" }}>
                            <p className="mb-0">
                                {value}
                            </p>
                        </div>
                    );
                }
            },
        ],
        []
    );

    const data = useMemo(() => allposts, [allposts]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({
            columns,
            data,
            initialState: {
                hiddenColumns: columns.map((column) => {
                    if (column.show === false) return column.accessor || column.id;
                    else return false;
                })
            }
        });

    const handleChangeComimg = (e) => {
        setCompanyImage(e.target.files[0]);
        // setThumbnailError(e.target.files[0] ? '' : 'Thumbnail is required');
    };

    const handleChangeStuimg = (e) => {
        setStudentImage(e.target.files[0]);
        // setThumbnailError(e.target.files[0] ? '' : 'Thumbnail is required');
    };

    const handleCloseModal = () => {
        setStudentImage('');
        setCompanyImage('');
        setFormData({
            title: "",
            description: "",
            student_name: "",
        });
        setModalOpen(false);
    };

    const handleOpenModal = (action) => {
        setActiontype(action);
        setModalOpen(true);
    };

    const actionHandler = async (id, action) => {
        setActiontype(action)
        setPostid(id)

        if (action === 'update') {
            setModalOpen(true)
            try {
                await axios.get(`/api/siteSettings/landingPage/placementStory/${id}`)
                    .then((response) => {
                        setFormData({
                            title: response.data.title,
                            description: response.data.description,
                            student_name: response.data.student_name,
                        });
                    })
                    .catch((error) => {
                        console.error('Error fetching post content:', error);
                    });
            } catch (error) {
                console.log("Error while deleting:", error);
            }
        }
        if (action === 'delete') {
            try {
                const res = await axios.delete(`/api/siteSettings/landingPage/placementStory/${id}`);
                getPosts()
                toast.success("Post Deleted")
            } catch (error) {
                console.log("Error while deleting:", error);
            }
        }
    };

    const submitData = async () => {
        if (actiontype === 'update') {
            try {
                const data = new FormData();
                data.append("id", postid);
                data.append("title", formData.title);
                data.append("description", formData.description);
                data.append("student_name", formData.student_name);
                data.append("company_logo", companyImage);
                data.append("student_icon", studentImage);
                const res = await axios.put("/api/siteSettings/landingPage/placementStory/updateRecord", data);
                if (res.status === 201) {
                    toast.success("Created Success fully");
                    getPosts();
                } else {
                    toast.info("Blog Already Exist");
                };
                setModalOpen(false);
            }
            catch (err) {
                toast.error(err.response)
                console.log(err)
            }
        }
        else {
            try {
                const data = new FormData();
                data.append("title", formData.title);
                data.append("description", formData.description);
                data.append("student_name", formData.student_name);
                data.append("company_logo", companyImage);
                data.append("student_icon", studentImage);
                const res = await axios.post("/api/siteSettings/landingPage/placementStory/addRecord", data);
                if (res) {
                    toast.success("Created Success fully");
                    getPosts();
                } else {
                    toast.info("Blog Already Exist");
                };
                setModalOpen(false);
            }
            catch (err) {
                toast.error(err.response.data.error)
            }

        }
    };

    return (
        <Fragment>
            <ToastContainer />
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                        <div className="mb-3 mb-md-0">
                            <h1 className="mb-1 h2 fw-bold">Placement Stories</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href="#">Landing</Breadcrumb.Item>
                                <Breadcrumb.Item active>Placement Stories</Breadcrumb.Item>
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
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center border-bottom-0 card-header-height">
                            <h4 className="mb-0">All Cards</h4>
                            {allposts.length > 4 ? "" : <h4 className="mb-0 fs-6 text-danger">*Minimum 5 cards required there is only({allposts.length})</h4>}
                        </Card.Header>
                        <Card.Body className="p-0">
                            <Table hover responsive {...getTableProps()} className="text-nowrap table-centered">
                                <thead className="table-light">
                                    {headerGroups.map((headerGroup, index) => (
                                        <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map((column, index) => (
                                                <th key={index} {...column.getHeaderProps()}>
                                                    {column.render('Header')}
                                                </th>
                                            ))}
                                            <th>
                                                <p>{"Action"} </p>
                                            </th>
                                        </tr>
                                    ))}
                                </thead>
                                {/* Apply the table body props */}
                                <tbody {...getTableBodyProps()}>
                                    {rows.map((row, index) => {
                                        prepareRow(row);
                                        const rowData = row.original;
                                        return (
                                            <tr key={index} {...row.getRowProps()}>
                                                {row.cells.map((cell, index) => {
                                                    return (
                                                        <td key={index} {...cell.getCellProps()}>
                                                            {cell.render('Cell')}
                                                        </td>
                                                    );
                                                })}
                                                <td>
                                                    {/* {loading ? <Loder /> : ''} */}
                                                    <Dropdown>
                                                        <Dropdown.Toggle as={CustomToggle}>
                                                            <MoreVertical size="15px" className="text-secondary" />
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu align="end">
                                                            <Dropdown.Header>SETTINGS</Dropdown.Header>
                                                            <Dropdown.Item eventKey="1" onClick={() => actionHandler(rowData._id, 'update')} >
                                                                <Edit size="15px" className="dropdown-item-icon" /> Edit
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="6" onClick={() => actionHandler(rowData._id, 'delete')}>
                                                                <Trash size="15px" className="dropdown-item-icon" /> Delete
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal show={modalOpen} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group id="difficultyLevel" className='mb-3'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Title"
                                name="name"
                                id="name"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group id="difficultyLevel" className='mb-3'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter descriotion"
                                id="comname"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group id="difficultyLevel" className='mb-3'>
                            <Form.Label>Student Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Student Name"
                                id="comname"
                                value={formData.student_name}
                                onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group id="difficultyLevel" className='mb-3'>
                            <Form.Label>Company Logo</Form.Label>
                            <span className='ms-2 fs-6'>dementions should be 150 X 153</span>
                            <Form.Control
                                id="comimage"
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChangeComimg}
                            />
                        </Form.Group>
                        <Form.Group id="difficultyLevel" className='mb-3'>
                            <Form.Label>Student Image</Form.Label>
                            <Form.Control
                                id="stuimage"
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChangeStuimg}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => submitData()}>
                        Save
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={handleCloseModal}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};
export default PlacementStory;
