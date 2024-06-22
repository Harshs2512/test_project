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
} from "react-bootstrap";
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MoreVertical, Edit, Trash } from "react-feather";
import { useRouter } from "next/router";


const Alldata = () => {
    const router = useRouter()
    const [allposts, setAllposts] = useState([]);
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
            const res = await axios.get("/api/siteSettings/thirdPage/heroSection/getRecord");
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
            { accessor: "id", Header: "ID", show: false },
            {
                accessor: "title",
                Header: "TITLE",
                Cell: ({ value, row }) => {
                    return (
                        <div className="">
                            <Link href="#" className="text-inherit text-center h5">
                                {value}
                            </Link>
                        </div>
                    );
                },
            },
            {
                accessor: "type",
                Header: "TYPE",
                Cell: ({ value }) => {
                    return (
                        <div>
                            <p>{value}</p>
                        </div>
                    );
                },
            },
            {
                accessor: "duration",
                Header: "DURATION",
                Cell: ({ value }) => {
                    return (
                        <div>
                            <p>{value}</p>
                        </div>
                    );
                },
            },
            {
                accessor: "startdate",
                Header: "START ON",
                Cell: ({ value }) => {
                    return (
                        <div>
                            <p>{value}</p>
                        </div>
                    );
                },
            },
            {
                accessor: "enquirynumber",
                Header: "ENQUIRY ON",
                Cell: ({ value }) => {
                    return (
                        <div>
                            <p>{value}</p>
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
            {
                accessor: "updatedAt",
                Header: "Last Update",
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
                            <h1 className="mb-1 h2 fw-bold">Our Team</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href="#">Landing</Breadcrumb.Item>
                                <Breadcrumb.Item active>Our Team</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div>
                            <Button
                                className="btn btn-primary"
                            >
                                <Link href={'/dashboard/siteSettings/ThirdPage/add-hero-section'} className="text-white">Add new Member</Link>
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center border-bottom-0 card-header-height">
                            <h4 className="mb-0">All Records ({allposts.length})</h4>
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
                                                            {cell.render("Cell")}
                                                        </td>
                                                    );
                                                })}
                                                <td>
                                                    {/* {loading ? <Loder /> : ''} */}
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
                                                                onClick={() => router.push(`/dashboard/siteSettings/ThirdPage/update-hero-section?pid=${rowData._id}`)}
                                                            >
                                                                <Edit
                                                                    size="15px"
                                                                    className="dropdown-item-icon"
                                                                />{" "}
                                                                Edit
                                                            </Dropdown.Item>
                                                            <Dropdown.Item
                                                                eventKey="6"
                                                            // onClick={() =>
                                                            //     actionHandler(rowData._id, "delete")
                                                            // }
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
        </Fragment>
    );
};

export default Alldata;
