// import node module libraries
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

const Faq = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [allposts, setAllposts] = useState([]);
    const [actiontype, setActiontype] = useState('');
    const [postid, setPostid] = useState('');

    const [formData, setFormData] = useState({
        question: '',
        answer: '',
    });

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
            const res = await axios.get("/api/siteSettings/landingPage/faq/getAll");
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
            { accessor: 'id', Header: 'ID', show: false },
            {
                Header: 'No',
                Cell: ({ row }) => {
                    return (
                        <div>{row.index + 1}</div>
                    );
                }
            },
            {
                accessor: 'question',
                Header: 'Question',
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
                accessor: 'answer',
                Header: 'Answer',
                Cell: ({ value, row }) => {
                    return (
                        <div className='text-wrap' style={{ width: "300px" }}>
                            <p className="mb-0">
                                {value}
                            </p>
                        </div>
                    );
                }
            },
            {
                accessor: 'createdAt',
                Header: 'Created At',
                Cell: ({ value }) => {
                    return <span>{formatDate(value)}</span>
                }
            },
            {
                accessor: 'updatedAt',
                Header: 'Last Update',
                Cell: ({ value }) => {
                    return <span>{formatDate(value)}</span>
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
        setFormData({
            question: "",
            answer: "",
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
                await axios.get(`/api/siteSettings/landingPage/faq/${id}`)
                    .then((response) => {
                        setFormData({
                            question: response.data.question,
                            answer: response.data.answer,
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
                const res = await axios.delete(`/api/siteSettings/landingPage/faq/${id}`);
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
                const res = await axios.put(`/api/siteSettings/landingPage/faq/${postid}`, formData);
                if (res.status === 201) {
                    toast.success("Add Success fully");
                    getPosts();
                } else {
                    toast.info("Already Exist");
                };
                setModalOpen(false);
            }
            catch (err) {
                toast.error(err.response.data.message)
                console.log(err)
            }
        }
        else {
            try {
                const res = await axios.post("/api/siteSettings/landingPage/faq/addRecord", formData);
                if (res) {
                    toast.success("Add Success fully");
                    getPosts();
                } else {
                    toast.info("Already Exist");
                };
                setModalOpen(false);
            }
            catch (err) {
                console.log(err)
                toast.error(err.response.data.message)
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
                            <h1 className="mb-1 h2 fw-bold">FAQ section</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href="#">Landing</Breadcrumb.Item>
                                <Breadcrumb.Item active>FAQ</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div>
                            <Button className="btn btn-primary" onClick={() => handleOpenModal('post')}>
                                New Question
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
                            {/* {allposts.length > 4 ? "" : <h4 className="mb-0 fs-6 text-danger">*Minimum 5 cards required there is only({allposts.length})</h4>} */}
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
                                                <p>{"Action"}</p>
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
                    <Modal.Title>Add Question</Modal.Title>
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
                            />
                        </Form.Group>
                        <Form.Group id="answer" className='mb-3'>
                            <Form.Label>Answer</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Answer"
                                id="answer"
                                value={formData.answer}
                                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
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
export default Faq;
