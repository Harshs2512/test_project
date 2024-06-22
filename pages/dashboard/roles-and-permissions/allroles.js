import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import {
    Card, Row, Col, Dropdown, Table, Button, Breadcrumb, Modal, Form
} from 'react-bootstrap';
import Link from 'next/link';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MoreVertical, Edit, Trash } from 'react-feather';
import ReactTagInput from '@pathofdev/react-tag-input';
import { RoleCountCard } from 'widgets';
import formatDate from 'helper/formatDate';
import { useRouter } from 'next/router';


const Roles = () => {
    const [allposts, setAllposts] = useState([]);

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

    const router = useRouter();

    CustomToggle.displayName = 'CustomToggle';

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/rolesandpermission/getroles");
            if (res.status === 200) {
                setAllposts(res.data.roles);
            }
        } catch (error) {
            console.log("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = useMemo(
        () => [
            {
                accessor: 'rolename',
                Header: 'ROLE',
                Cell: ({ value }) => {
                    return (
                        <h4 className="mb-0">
                            {value}
                        </h4>
                    );
                }
            },
            {
                accessor: 'selectedpermission',
                Header: 'PERMISSIONS',
                Cell: ({ value }) => {
                    return (
                        <Fragment>
                            {value.length}
                        </Fragment>
                    );
                }
            },
            {
                accessor: 'createdAt',
                Header: 'CREATED AT',
                Cell: ({ value }) => {
                    return (
                        <Fragment>
                            {formatDate(value)}
                        </Fragment>
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

    const deleteHandler = async (id) => {
        try {
            const res = await axios.delete(`/api/rolesandpermission/${id}`);
            if (res.status === 200) {
                toast.success("Deleted")
                fetchData();
            }
        } catch (error) {
            console.log("Error while deleting:", error);
        }
    };

    return (
        <Fragment>
            <ToastContainer />
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                        <div className="mb-3 mb-md-0">
                            <h1 className="mb-1 h2 fw-bold">Roles</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href="#">Landing</Breadcrumb.Item>
                                <Breadcrumb.Item active>Roles</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div>
                            <Link href={"/dashboard/roles-and-permissions/addrole"}>
                                <Button className="btn btn-primary">
                                    Add new
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                {allposts.map((item, index) => (
                    <Col key={index} lg={4} md={6} xs={12}>
                        <RoleCountCard item={item} />
                    </Col>
                ))}
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
                                                            <Dropdown.Item eventKey="1" onClick={() => {
                                                                router.push(`/dashboard/roles-and-permissions/editrole?id=${rowData._id}`);
                                                            }}>
                                                                <Edit size="15px" className="dropdown-item-icon" /> Edit
                                                            </Dropdown.Item>

                                                            <Dropdown.Item eventKey="6" onClick={() => deleteHandler(rowData._id)}>
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
        </Fragment >
    );
};


export default Roles;