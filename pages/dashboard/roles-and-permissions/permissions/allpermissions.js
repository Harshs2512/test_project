import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useTable, useFilters, useGlobalFilter, } from 'react-table';
import {
    Card, Row, Col, Dropdown, Table, Button, Breadcrumb, Modal, Form
} from 'react-bootstrap';

import Link from 'next/link';

// import custom components
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MoreVertical, Trash } from 'react-feather';
import formatDate from 'helper/formatDate';
import { GlobalFilter } from 'widgets';

const AllPemission = (props) => {
    const allposts = props?.data
    const roles = props?.role
    const [modalOpen, setModalOpen] = useState(false);
    const [actiontype, setActiontype] = useState('');
    const [postid, setPostid] = useState('');
    const [permission, setPermission] = useState('');
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

    const columns = useMemo(
        () => [
            {
                accessor: 'updatedAt',
                Header: 'NAME',
                Cell: ({ value, row }) => {
                    const permission_name = row.original.permissionname;
                    return (
                        <div className="mb-0 fs-4">
                            {permission_name}
                        </div>
                    );
                }
            },
            {
                accessor: 'permissionname',
                Header: 'ASSIGNED TO',
                Cell: ({ value, row }) => {
                    const userRoles = roles.filter((item) => item.selectedpermission.includes(value))
                    return (
                        <Fragment>
                            {userRoles.map((item, index) => {
                                return (
                                    <div className={`btn btn-dark p-1 me-3`} style={{ opacity: "0.7" }} key={index}>
                                        {item.rolename}
                                    </div>
                                )
                            })}
                        </Fragment>
                    );
                }
            },
            {
                accessor: 'createdAt',
                Header: 'CREATED DATE',
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

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        state,
        prepareRow,
        setGlobalFilter,
        rows
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

    );

    const { globalFilter } = state;

    const handleCloseModal = () => {
        setPermission("")
        setModalOpen(false);
    };

    const actionHandler = async (id, action) => {
        setActiontype(action)
        setPostid(id)
        if (action === 'update') {
            setModalOpen(true)
            try {
                const res = await axios.get(`/api/rolesandpermission/permissions/${id}`)
                    .then((response) => {
                        setPermission(response.data.permissionname)
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
                const res = await axios.delete(`/api/rolesandpermission/permissions/${id}`);
                if (res.status === 200) {
                    fetchData();
                    fetchRoles();
                    toast.success("Deleted");
                }
            } catch (error) {
                console.log("Error while deleting:", error);
            }
        }
    };
    
    const submitData = async () => {
        if (actiontype === 'update') {
            try {
                const res = await axios.put(`/api/rolesandpermission/permissions/${postid}`, permission);
                if (res.status === 201) {
                    toast.success("Created Success fully");
                    fetchData();
                    fetchRoles();
                }
                setModalOpen(false);
            }
            catch (err) {
                toast.error(err)
                console.log(err)
            }
        }
        else {
            try {
                const res = await axios.post("/api/rolesandpermission/permissions/addpermission", { permission });
                if (res.status === 201) {
                    toast.success("Created Success fully");
                    setPermission("");
                    fetchData();
                    setModalOpen(false);
                    setActiontype("")
                }
            }
            catch (err) {
                console.log(err)
                toast.error(err.response)
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
                            <h1 className="mb-1 h2 fw-bold">Permissions</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href="#">Landing</Breadcrumb.Item>
                                <Breadcrumb.Item active>permission</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div>
                            <Button className="btn btn-primary" onClick={() => setModalOpen(true)}>
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
                        <hr className='mb-0' />
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
                                                            {/* <Dropdown.Item eventKey="1" onClick={() => actionHandler(rowData._id, 'update')} >
                                                                <Edit size="15px" className="dropdown-item-icon" /> Edit
                                                            </Dropdown.Item> */}
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
                    <Modal.Title>Add New Permission</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitData}>
                        <Form.Group>
                            <Form.Label>Enter Permission</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Add new Permission"
                                value={permission}
                                onChange={(e) => setPermission(e.target.value)}
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
        </Fragment >
    );
};

export const getServerSideProps = async () => {
    try {
        const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/rolesandpermission/permissions/getpermissions/`);
        const res1 = await axios.get(`${process.env.NEXTAUTH_URL}/api/rolesandpermission/getroles/`);
        const data = res?.data?.permissions;
        const role = res1?.data?.roles;
        return {
            props: {
                data: data,
                role: role,
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                data: [],
                role: [],
            },
        };
    }
};

export default AllPemission;