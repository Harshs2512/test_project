import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import {
    Card, Row, Col, Dropdown, Image, Table, Button, Breadcrumb, Modal, Form
} from 'react-bootstrap';

import Link from 'next/link';

// import custom components
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MoreVertical, Edit, Trash } from 'react-feather';
import DotBadge from 'components/bootstrap/DotBadge';

const OurPrograms = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [allposts, setAllposts] = useState([]);
    const [courses, setCourses] = useState([]);
    const [actiontype, setActiontype] = useState('');
    const [postid, setPostid] = useState('');
    const [formData, setFormData] = useState({
        _id: "",
        course: "",
        image: "",
    });

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
            const res = await axios.get("/api/siteSettings/secondPage/ourofflineprograms/getRecord");
            if (res.status === 200) {
                setAllposts(res.data);
            }
        } catch (error) {
            console.log("Error fetching posts:", error);
        }
    };

    const getCourses = async () => {
        try {
            const res = await axios.get("/api/siteSettings/megaMenu/coursePage/getRecords");
            if (res.status === 200) {
                setCourses(res.data);
            }
        } catch (error) {
            console.log("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        getCourses();
        getPosts();
    }, []);

    const columns = useMemo(
        () => [
            {
                accessor: 'course',
                Header: 'Category',
                Cell: ({ value, row }) => {
                    const categoryname = courses?.find((item) => item?._id === value);
                    return (
                        <div className="mb-0 d-flex w-10">
                            <Image src={`/api/siteSettings/secondPage/ourofflineprograms/getlogo/${row.original._id}`} className='img-fluid' alt='programs'/>
                            <Link href="#" className='ms-4'>
                                {categoryname?.course_name}
                            </Link>

                        </div>
                    );
                }
            },
            {
                accessor: 'status',
                Header: 'Status',
                Cell: ({ value }) => {
                    return (
                        <Fragment>
                            <DotBadge
                                bg={
                                    value === 'pending' ? 'danger' : value === 'live' ? 'success' : ''
                                }
                            ></DotBadge>
                            {value === 'live' ? 'Live' : value === 'pending' ? 'Disabled' : ''}
                            {/* {loading ? <Loder /> : ''} */}
                        </Fragment>
                    );
                }
            },
        ],
        [courses]
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

    const handleCloseModal = () => {
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
                await axios.get(`/api/siteSettings/secondPage/faqSection/${id}`)
                    .then((response) => {
                        setFormData({
                            question: response.data.question,
                            answer: response.data.answer,
                        })
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
                const res = await axios.delete(`/api/siteSettings/secondPage/ourofflineprograms/${id}`);
                getPosts()
                toast.success("Deleted")
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
                data.append("question", formData.question);
                data.append("answer", formData.answer);
                data.append("imageone", formData.imageone);
                data.append("imagesecond", formData.imagesecond);
                const res = await axios.put(`/api/siteSettings/secondPage/ourofflineprograms/updateRecord`, data);
                if (res.status === 201) {
                    toast.success("Created Success fully");
                    getPosts();
                } else {
                    toast.info("Blog Already Exist");
                };
                setModalOpen(false);
            }
            catch (err) {
                toast.error(err)
                console.log(err)
            }
        }
        else {
            try {
                const data = new FormData();
                data.append("course", formData.course);
                if (formData.image) {
                    data.append("image", formData.image);
                }
                else {
                    toast.warning("Please select image")
                }
                const res = await axios.post("/api/siteSettings/secondPage/ourofflineprograms/addRecord", data);
                if (res.status === 201) {
                    toast.success("Created Success fully");
                    setFormData({
                        category: "",
                        image: "",
                    })
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

    const updateStatus = async (id, action) => {
        try {
            const res = await axios.put(`/api/siteSettings/secondPage/ourofflineprograms/${id}`, { action })
            if (res.status === 201) {
                toast.success("Updated")
                getPosts()
            }
        }
        catch (err) {
            console.log(err)
        }

    }

    return (
        <Fragment>
            <ToastContainer />
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                        <div className="mb-3 mb-md-0">
                            <h1 className="mb-1 h2 fw-bold">Offline Programms</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href="#">Landing</Breadcrumb.Item>
                                <Breadcrumb.Item active>Offline programms</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div>
                            <Button className="btn btn-primary" onClick={() => handleOpenModal('post')}>
                                Add new
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center border-bottom-0 card-header-height">
                            <h4 className="mb-0">Offline Programms</h4>
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
                                                            {rowData?.status === 'live' ? <Dropdown.Item eventKey="1" onClick={() => updateStatus(rowData._id, 'pending')} >
                                                                <Edit size="15px" className="dropdown-item-icon" /> Pending
                                                            </Dropdown.Item> :
                                                                <Dropdown.Item eventKey="1" onClick={() => updateStatus(rowData._id, 'live')} >
                                                                    <Edit size="15px" className="dropdown-item-icon" /> Live
                                                                </Dropdown.Item>
                                                            }
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
                    <Modal.Title>Add Program</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group id="question" className='mb-3'>
                            <Form.Label>Select category</Form.Label>
                            <Form.Select
                                id={'course'}
                                value={formData.course}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        course: e.target.value,
                                    });
                                }}
                            >
                                <option value="">--Select--</option>
                                {courses.filter((item) => !allposts.some((post) => post.course === item._id)).map((value, index) => (
                                    <option key={index} value={value._id}>
                                        {value.course_name}
                                    </option>
                                ))
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>First Image</Form.Label>
                            <Form.Control
                                type="file"
                                name={`logo_one`}
                                accept="image/*"
                                onChange={(e) => setFormData({
                                    ...formData,
                                    image: e.target.files[0]
                                })}
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


export default OurPrograms;