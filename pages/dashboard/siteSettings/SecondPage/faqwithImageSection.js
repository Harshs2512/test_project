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

const FAQwithimage = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [allposts, setAllposts] = useState([])
    const [actiontype, setActiontype] = useState('')
    const [postid, setPostid] = useState('')
    const [formData, setFormData] = useState({
        _id: "",
        question: "",
        answer: "",
        imageone: "",
        imagesecond: ""
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
            const res = await axios.get("/api/siteSettings/secondPage/faqSection/getRecord");
            if (res.status === 200) {
                setAllposts(res.data);
            }
        } catch (error) {
            console.log("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    const columns = useMemo(
        () => [
            { accessor: 'id', Header: "id", show: false },
            {
                accessor: 'question',
                Header: 'Questions',
                Cell: ({ value, row }) => {
                    return (
                        <h5 className="mb-0">
                            <div className='d-flex'>
                                <Link href="#" className="text-inherit text-center ms-4 h5">
                                    {value}
                                </Link>
                            </div>
                        </h5>
                    );
                }
            },
            {
                accessor: 'answer',
                Header: 'Answers',
                Cell: ({ value, row }) => {
                    return (
                        <div className='d-flex text-wrap text-start' style={{ width: "460px" }}>
                            <Link href="#" className="text-inherit h5">
                                {value}
                            </Link>
                        </div>
                    );
                }
            },
            {
                accessor: 'imageone',
                Header: 'First Image',
                Cell: ({ value, row }) => {
                    return (
                        row && row?.original?._id &&
                        <div style={{ maxWidth: "100px" }}>
                            <Image
                                src={`/api/siteSettings/secondPage/faqSection/getFirstlogo/${row.original._id}`}
                                alt=""
                                className="img-fluid"
                            />
                        </div>
                    );
                }
            },
            {
                accessor: 'imagesecond',
                Header: 'Second Image',
                Cell: ({ value, row }) => {
                    return (
                        row && row?.original?._id &&
                        <div style={{ maxWidth: "100px" }}>
                            <Image
                                src={`/api/siteSettings/secondPage/faqSection/getSecondlogo/${row.original._id}`}
                                alt=""
                                className="img-fluid"
                            />
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
                const res = await axios.delete(`/api/siteSettings/secondPage/faqSection/${id}`);
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
                const res = await axios.put(`/api/siteSettings/secondPage/faqSection/updateRecord`, data);
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
                data.append("question", formData.question);
                data.append("answer", formData.answer);
                if (formData.imageone) {
                    data.append("imageone", formData.imageone);
                    if (formData.imagesecond) {
                        data.append("imagesecond", formData.imagesecond);
                    }
                    else {
                        toast.warning("Please select image")
                    }
                }
                else {
                    toast.warning("Please select image")
                }

                const res = await axios.post("/api/siteSettings/secondPage/faqSection/addRecord", data);
                if (res.status === 201) {
                    toast.success("Created Success fully");
                    setFormData({
                        question: "",
                        answer: "",
                        imageone: "",
                        imagesecond: ""
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

    return (
        <Fragment>
            <ToastContainer />
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                        <div className="mb-3 mb-md-0">
                            <h1 className="mb-1 h2 fw-bold">Faq Section</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href="#">Landing</Breadcrumb.Item>
                                <Breadcrumb.Item active>Faq</Breadcrumb.Item>
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
                            <h4 className="mb-0">Faq</h4>
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
                    <Modal.Title>Add faq</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group id="question" className='mb-3'>
                            <Form.Label>Question</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter question"
                                id="question"
                                value={formData.question}
                                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                className=''
                            />
                        </Form.Group>
                        <Form.Group id="answer" className='mb-3'>
                            <Form.Label>Answer</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter answer"
                                id="answer"
                                value={formData.answer}
                                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>First Image</Form.Label>
                            <Form.Control
                                type="file"
                                name={`logo_one`}
                                accept="image/*"
                                onChange={(e) => setFormData({
                                    ...formData,
                                    imageone: e.target.files[0]
                                })}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Second Image</Form.Label>
                            <Form.Control
                                type="file"
                                name={`logo_second`}
                                accept="image/*"
                                onChange={(e) => setFormData({
                                    ...formData,
                                    imagesecond: e.target.files[0]
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


export default FAQwithimage;