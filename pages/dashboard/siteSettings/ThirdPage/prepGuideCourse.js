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

const PrepGuideCourse = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [allposts, setAllposts] = useState([]);
    const [sectionId, setSectionId] = useState([]);
    const [actiontype, setActiontype] = useState('');
    const [postid, setPostid] = useState('');

    const [formData, setFormData] = useState({
        sectionTitle: '',
        sectionDescription: '',
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
    const [questionsList, setQuestionsList] = useState([
        {
            title: '',
            description: "",

        },
    ]);
    const handleAddQuestion = () => {
        if (questionsList.length >= 7) {
            alert("You cannot add more than 7 questions.");
        } else {
            setQuestionsList((prevList) => [
                ...prevList,
                {
                    title: "",
                    description: "",
                },
            ]);
        }
    };
    
    const handleRemoveQuestion = (index) => {
        setQuestionsList((prevList) => prevList.filter((q, i) => i !== index));
    };
    const PrepsectionData = async () => {
        try {
            const res = await axios.get("/api/siteSettings/thirdPage/jopPrepration/addData");
            const mainId = res.data[0]
            const CardData = res.data[0].course;
            if (res.status === 200) {
                setAllposts(CardData);
                setSectionId(mainId)
            }
        } catch (error) {
            console.log("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        PrepsectionData();
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
                Header: 'Description',
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
        setFormData({
            sectionTitle: "",
            sectionDescription: "",
        });
        setQuestionsList((prevList) => [
            ...prevList,
            {
                title: "",
                description: "",
            },
        ]);
        
    };

    const handleOpenModal = (action) => {
        setActiontype(action);
        setModalOpen(true);
    };
    const handleUpdate =async (action) => {
        setActiontype(action);
        setModalOpen(true);
        if (actiontype === 'update') {
            setModalOpen(true)
            try {
                const response = await axios.get(`/api/siteSettings/thirdPage/jopPrepration/addData?sectionId=${sectionId._id}`);
                const responseData = response.data[0];
                const { sectionTitle, sectionDescription, course } = responseData;
                setFormData({
                    sectionTitle,
                    sectionDescription,
                });
                setQuestionsList(prevList => [
                    ...prevList,
                    ...course.map(item => ({
                        title: item.title,
                        description: item.description,
                    })),
                ]);
            } catch (error) {
                console.error('Error fetching post content:', error);
            }
        }
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (questionsList.length < 7) {
            alert("You need at least 7 cards to save data.");
            return;
        }
        if (actiontype === 'update') {
            try {
                const formDataToSend = new FormData();
                formDataToSend.append("sectionTitle", formData.sectionTitle);
                formDataToSend.append("sectionDescription", formData.sectionDescription);
                formDataToSend.append("course", JSON.stringify(questionsList));

                const response = await axios.put(`/api/siteSettings/thirdPage/jopPrepration/addData?sectionId=${sectionId._id}`, formDataToSend, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.status === 200) { 
                    toast.success("Data Updated Successfully");
                    setModalOpen(false);
                    PrepsectionData();
                    setFormData({
                        sectionTitle: "",
                        sectionDescription: "",
                    })
                    setQuestionsList((prevList) => [
                        ...prevList,
                        {
                            title: "",
                            description: "",
                        },
                    ]);
                } else {
                    toast.error("Data Not Updated. Please try again.");
                    console.error("Error updating data:", response.data.error);
                }
            } catch (error) {
                toast.error("Data Not Updated. Please try again.");
                console.error("Error updating data:", error);
            }
        }
        if (actiontype === 'post') {
            try {
                const formDataToSend = new FormData();
                formDataToSend.append("sectionTitle", formData.sectionTitle);
                formDataToSend.append("sectionDescription", formData.sectionDescription);
                formDataToSend.append("course", JSON.stringify(questionsList));

                const response = await axios.post("/api/siteSettings/thirdPage/jopPrepration/addData", formDataToSend, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                if (response.status === 201) {

                    toast.success("data Added Successfully");
                    setModalOpen(false);
                    PrepsectionData();
                    setQuestionsList((prevList) => [
                        ...prevList,
                        {
                            title: "",
                            description: "",
                        },
                    ]);
                    setFormData({
                        sectionTitle: "",
                        sectionDescription: "",
                    })
                } else {
                    toast.error("data Not Added. Please try again.");
                    console.error("Error creating data:", response.data.error);
                }
            } catch (error) {
                toast.error("data Not Added. Please try again.");
                console.error("Error creating data:", error);
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
                            <h1 className="mb-1 h2 fw-bold">Prepration Guide Course section</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href="#">Third Page</Breadcrumb.Item>
                                <Breadcrumb.Item active>Prep Guide Course</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div>
                            {/* <Button className="btn btn-primary" onClick={() => handleOpenModal('post')}>
                                Add New data
                            </Button>{' '} */}
                            <Button className="btn btn-primary" onClick={() => handleUpdate('update')}>
                                Upadte
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
                    <Modal.Title>Add Prepration Course Guide Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group id="sectionTitle" className='mb-3'>
                            <Form.Label>Section Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter section Title"
                                id="sectionTitle"
                                value={formData.sectionTitle}
                                onChange={(e) => setFormData({ ...formData, sectionTitle: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group id="sectionDescription" className='mb-3'>
                            <Form.Label>Section Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Section Description"
                                id="sectionDescription"
                                value={formData.sectionDescription}
                                onChange={(e) => setFormData({ ...formData, sectionDescription: e.target.value })}
                            />
                        </Form.Group>

                        {questionsList.slice(0, 7).map((question, index) => (
                            <div key={index}>
                                <Row>
                                    <Col>
                                        <Form.Label className="mt-3">Card Title</Form.Label>
                                        <Form.Control
                                            type="title"
                                            placeholder='Enter Card Title'
                                            className=""
                                            value={question.title}
                                            onChange={(e) =>
                                                setQuestionsList((prevList) =>
                                                    prevList.map((q, i) =>
                                                        i === index
                                                            ? {
                                                                ...q,
                                                                title: e.target.value,
                                                            }
                                                            : q
                                                    )
                                                )
                                            }
                                        />
                                    </Col>
                                </Row>
                                <Col>
                                    <Form.Label className="mt-3">Description</Form.Label>
                                    <Form.Control
                                        placeholder="Write Description"
                                        type="textarea"
                                        value={question.description}
                                        onChange={(e) =>
                                            setQuestionsList((prevList) =>
                                                prevList.map((q, i) =>
                                                    i === index ? { ...q, description: e.target.value } : q
                                                )
                                            )
                                        }
                                    />
                                </Col>
                                <Col>
                                    <Form.Label></Form.Label>
                                    <Button
                                        type="button"
                                        className="p-0 my-2 rounded-1 "
                                        variant='danger'
                                        onClick={() => handleRemoveQuestion(index)}
                                    >
                                        Remove
                                    </Button>
                                </Col>
                            </div>
                        ))}
                        <Row className="mt-5">
                            <Col>
                                <Button
                                    className="p-1"
                                    variant="success"
                                    type="button"
                                    onClick={handleAddQuestion}
                                >
                                    Add Card
                                </Button>
                            </Col>
                            <Form.Label></Form.Label>
                        </Row>
                        <hr />
                        <Row className=' justify-content-around '>
                            <Col>
                                <Button variant="primary" type="submit">
                                    Save
                                </Button>
                            </Col>
                            <Col className='d-flex justify-content-end  align-content-end '>
                                <div >
                                    <Button
                                        variant="secondary"
                                        onClick={handleCloseModal}
                                    >
                                        Close
                                    </Button>
                                </div>

                            </Col>

                        </Row>

                    </Form>
                </Modal.Body>
            </Modal>
        </Fragment>
    );
};
export default PrepGuideCourse;
