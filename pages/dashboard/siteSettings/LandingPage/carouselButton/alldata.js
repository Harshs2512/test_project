// import node module libraries
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import {
    useTable,
    useFilters,
    useGlobalFilter,
    usePagination,
    useRowSelect
} from 'react-table';
import Link from 'next/link';
import { Col, Row, Dropdown, Table, Breadcrumb, Card } from 'react-bootstrap';
import { Trash, MoreVertical, Edit } from 'react-feather';
// import widget/custom components
import { GlobalFilter, Pagination, Checkbox } from 'widgets';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import formatDate from 'helper/formatDate';
import { Can } from 'utils/accessControl';
import { useRouter } from 'next/router';


const CarouselButton = () => {
    const router = useRouter();
    const [alldata, setAlldata] = useState([]);
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
    const data = useMemo(() => alldata || [], [alldata]);
    const columns = useMemo(
        () => [
            { accessor: 'id', Header: 'ID', show: false },
            {
                accessor: 'title',
                Header: 'TITLE',
                Cell: ({ value }) => {
                    return (
                        <Link href="#" className="text-inherit position-relative">
                            <h5 className="mb-0 text-primary-hover">
                                {value}
                            </h5>
                        </Link>
                    );
                },
            },
            {
                accessor: 'cards',
                Header: 'CARDS',
                Cell: ({ value }) => {
                    return (
                        <h5 className="mb-0">
                            {value.length}
                        </h5>
                    );
                },
            },
            {
                accessor: 'createdAt',
                Header: 'CREATED',
                Cell: ({ value }) => {
                    return (
                        <p className="mb-0">
                            {formatDate(value)}
                        </p>
                    )
                }
            },
            {
                accessor: 'updatedAt',
                Header: 'UPDATED',
                Cell: ({ value }) => {
                    return (
                        <p className="mb-0">
                            {formatDate(value)}
                        </p>
                    )
                }
            },
        ],
        []
    );

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
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <Checkbox {...getToggleAllRowsSelectedProps()} />
                    ),
                    Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />
                },
                ...columns
            ]);
        }
    );

    const { pageIndex, globalFilter } = state;
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const fetchData = async () => {
        try {
            const { data } = await axios.get("/api/siteSettings/landingPage/carouselButton/getRecords");
            setAlldata(data);
        } catch (error) {
            console.log("Error fetching categories:", error);
            toast.error("Error fetching categories");
        }
    };

    const hadleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`/api/blogs/category/${id}/`);
            if (data) {
                toast.success(`Category Deleted successfully`);
                fetchData();
            } else {
                toast.error(data.msg);
            }
        } catch (error) {
            toast.error("Somtihing went wrong");
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <Fragment>
            <ToastContainer />
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                        <div className="mb-3 mb-md-0">
                            <h1 className="mb-1 h2 fw-bold">Carousel Buttons</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href="#">CMS</Breadcrumb.Item>
                                <Breadcrumb.Item active>Carousel Buttons</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div>
                            <Can I="createBlogCategory">
                                <Link href="/dashboard/siteSettings/LandingPage/carouselButton/add-data" className="btn btn-outline-primary">
                                    Add new
                                </Link>
                            </Can>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <Card>
                        <Card.Body className="p-0">
                            <div className=" overflow-hidden">
                                <Row>
                                    <Col
                                        lg={12}
                                        md={12}
                                        sm={12}
                                        className="mb-lg-0 mb-2 px-5 py-4"
                                    >
                                        <GlobalFilter
                                            filter={globalFilter}
                                            setFilter={setGlobalFilter}
                                            placeholder="Search Instructor"
                                        />
                                    </Col>
                                </Row>
                            </div>

                            <Table hover responsive {...getTableProps()} className="text-nowrap table-centered">
                                <thead className="table-light">
                                    {headerGroups.map((headerGroup, index) => (
                                        <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map((column, index) => (
                                                <th key={index} {...column.getHeaderProps()}>
                                                    {column.render('Header')}
                                                </th>
                                            ))}
                                            <th>ACTION</th>
                                        </tr>
                                    ))}
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                    {page.map((row, index) => {
                                        prepareRow(row);
                                        const rowData = row.original; // Get the data for the current row
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
                                                    <Dropdown>
                                                        <Dropdown.Toggle as={CustomToggle}>
                                                            <MoreVertical size="15px" className="text-secondary" />
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu align={'end'}>
                                                            <Dropdown.Header>ACTION</Dropdown.Header>
                                                            <Can I="editBlogCategory">
                                                                <Dropdown.Item eventKey="3" onClick={() => router.push(`/dashboard/siteSettings/LandingPage/carouselButton/edit-data?id=${rowData._id}`)}>
                                                                    <Edit size="15px" className="dropdown-item-icon" /> Edit
                                                                </Dropdown.Item>
                                                            </Can>
                                                            <Can I="deleteBlogCategory">
                                                                <Dropdown.Item eventKey="3" onClick={() => hadleDelete(rowData._id)}>
                                                                    <Trash size="15px" className="dropdown-item-icon" /> Delete
                                                                </Dropdown.Item>
                                                            </Can>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>

                            </Table>

                            {/* Pagination @ Footer */}
                            <Pagination
                                previousPage={previousPage}
                                pageCount={pageCount}
                                pageIndex={pageIndex}
                                gotoPage={gotoPage}
                                nextPage={nextPage}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment >
    );
};


export default CarouselButton;