// import node module libraries
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import {
    Card,
    Row,
    Col,
    Dropdown,
    Table,
    Button,
    Breadcrumb,
    Modal,
    Form,
    Image
} from "react-bootstrap";
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MoreVertical, Edit, Trash } from "react-feather";
import { useRouter } from "next/router";


const Alldata = () => {
    const router = useRouter()
    const [modalOpen, setModalOpen] = useState(false);
    const [allposts, setAllposts] = useState([]);
    const [videoLink, setVideoLink] = useState('');

    const openVideo = (link) => {
        setVideoLink(link);
        setModalOpen(true);
    };

    const formatDate = (dateString) => {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        const date = new Date(dateString);
        const year = date.getFullYear().toString();
        const month = months[date.getMonth()];
        const day = String(date.getDate()).padStart(2, "0");
        return `${month} ${day}, ${year}`;
    };

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <Link
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className="btn-icon btn btn-ghost btn-sm rounded-circle"
        >
            {children}
        </Link>
    ));

    CustomToggle.displayName = "CustomToggle";

    const getPosts = async () => {
        try {
            const res = await axios.get("/api/siteSettings/thirdPage/curriculumSection/getRecord");
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
            {
                accessor: "feature1",
                Header: "Feature 1",
                Cell: ({ value }) => {
                    return (
                        <div>
                            <p>{value}</p>
                        </div>
                    );
                },
            },
            {
                accessor: "feature2",
                Header: "Feature 2",
                Cell: ({ value }) => {
                    return (
                        <div>
                            <p>{value}</p>
                        </div>
                    );
                },
            },
            {
                accessor: "feature3",
                Header: "Feature 3",
                Cell: ({ value }) => {
                    return (
                        <div>
                            <p>{value}</p>
                        </div>
                    );
                },
            },
            {
                accessor: "feature4",
                Header: "Feature 4",
                Cell: ({ value }) => {
                    return (
                        <div>
                            <p>{value}</p>
                        </div>
                    );
                },
            },
            {
                accessor: "videolink",
                Header: "Course Video",
                Cell: ({ value }) => {
                    return (
                        <div>
                            <p className="text-primary" style={{ cursor: 'pointer' }} onClick={() => openVideo(value)}>View</p>
                        </div>
                    );
                },
            },
            {
                accessor: "createdAt",
                Header: "Created Date",
                Cell: ({ value }) => {
                    return <span>{formatDate(value)}</span>;
                },
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
                }),
            },
        });

    return (
        <Fragment>
            <ToastContainer />
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                        <div className="mb-3 mb-md-0">
                            <h1 className="mb-1 h2 fw-bold">Course Curriculum</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href="#">Landing</Breadcrumb.Item>
                                <Breadcrumb.Item active>Course Curriculum</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div>
                            <Button
                                className="btn btn-primary"
                            >
                                <Link href={'/dashboard/siteSettings/ThirdPage/add-curriculum-section'} className="text-white">Add new</Link>
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center border-bottom-0 card-header-height">
                            <h4 className="mb-0">All Records</h4>
                        </Card.Header>
                        <Card.Body className="p-0">
                            <Table
                                hover
                                responsive
                                {...getTableProps()}
                                className="text-nowrap table-centered"
                            >
                                <thead className="table-light">
                                    {headerGroups.map((headerGroup, index) => (
                                        <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map((column, index) => (
                                                <th key={index} {...column.getHeaderProps()}>
                                                    {column.render("Header")}
                                                </th>
                                            ))}
                                            <th>
                                                <p>{"Action"} </p>
                                            </th>
                                        </tr>
                                    ))}
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                    {rows.map((row, index) => {
                                        prepareRow(row);
                                        const rowData = row.original;
                                        return (
                                            <tr key={index} {...row.getRowProps()}>
                                                {row.cells.map((cell, index) => {
                                                    return (
                                                        <td key={index} {...cell.getCellProps()}>
                                                            {cell.render("Cell")}
                                                        </td>
                                                    );
                                                })}
                                                <td>
                                                    <Dropdown>
                                                        <Dropdown.Toggle as={CustomToggle}>
                                                            <MoreVertical
                                                                size="15px"
                                                                className="text-secondary"
                                                            />
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu align="end">
                                                            <Dropdown.Header>SETTINGS</Dropdown.Header>
                                                            <Dropdown.Item
                                                                eventKey="1"
                                                                onClick={() => router.push(`/dashboard/siteSettings/ThirdPage/update-curriculum-section?pid=${rowData._id}`)}
                                                            >
                                                                <Edit
                                                                    size="15px"
                                                                    className="dropdown-item-icon"
                                                                />{" "}
                                                                Edit
                                                            </Dropdown.Item>
                                                            <Dropdown.Item
                                                                eventKey="6"
                                                            >
                                                                <Trash
                                                                    size="15px"
                                                                    className="dropdown-item-icon"
                                                                />{" "}
                                                                Delete
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
            <Modal show={modalOpen} onHide={() => setModalOpen(false)} size="lg" className="d-flex  justify-content-center">
                <Modal.Header closeButton>
                    <Modal.Title>Course Video</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {videoLink && (
                        <div dangerouslySetInnerHTML={{ __html: videoLink }} />
                    )}
                </Modal.Body>
            </Modal>
        </Fragment>
    );
};

export default Alldata;