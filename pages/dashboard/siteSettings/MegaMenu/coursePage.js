import React, { Fragment, useEffect, useMemo, useState } from 'react';
import {
    useTable,
    useFilters,
    useGlobalFilter,
    usePagination,
    useRowSelect
} from 'react-table';
import Link from 'next/link';
import { Col, Row, Dropdown, Table, Breadcrumb, Card, Modal, Form, Button } from 'react-bootstrap';
import { Trash, Send, Inbox, MoreVertical, Edit2 } from 'react-feather';
import { GlobalFilter, Pagination, Checkbox } from 'widgets';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const CoursePage = () => {
    const [action, setAction] = useState('')
    const [modelopen, setModelopen] = useState(false)
    const [category, setCategories] = useState([])
    const [titleError, setTitleError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [alldata, setAlldata] = useState('');
    const [formData, setFormData] = useState({
        id: '',
        thumbnail: '',
        course_name: '',
        category: '',
        section_title: '',
        typedtitle_one: '',
        typedtitle_second: '',
        typedtitle_third: '',
        student_image: '',
    });
    const validateCategory = (category) => {
        return category.trim().length > 0 ? '' : 'Category is required';
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
    const data = useMemo(() => alldata || [], [alldata]);

    const columns = useMemo(
        () => [
            { accessor: 'id', Header: 'ID', show: false },
            {
                accessor: 'course_name',
                Header: 'Course name',
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
                accessor: 'category',
                Header: 'Category',
                Cell: ({ value }) => {
                    const categoryId = category && category.find((cat) => cat._id === value);
                    return (
                        <h5 className="mb-0 text-primary-hover">
                            {categoryId?.title}
                        </h5>
                    );
                },
            },
            {
                accessor: 'sectiontitle',
                Header: 'Section Title',
                Cell: ({ value }) => {
                    return (
                        <h5 className="mb-0 text-primary-hover">
                            {value}
                        </h5>
                    );
                },
            },
            {
                accessor: 'typedtitle_first',
                Header: 'Typed Title',
                Cell: ({ value }) => {
                    return (
                        <h5 className="mb-0 text-primary-hover">
                            {value}
                        </h5>
                    );
                },
            },
            {
                accessor: 'typedtitle_second',
                Header: 'Typed Title',
                Cell: ({ value }) => {
                    return (
                        <h5 className="mb-0 text-primary-hover">
                            {value}
                        </h5>
                    );
                },
            },
            {
                accessor: 'typedtitle_third',
                Header: 'Typed Title',
                Cell: ({ value }) => {
                    return (
                        <h5 className="mb-0 text-primary-hover">
                            {value}
                        </h5>
                    );
                },
            },
        ],
        [category]
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

    const handleSubmit = async () => {
        const data = new FormData();
        data.append("id", formData.id);
        data.append("course_name", formData.course_name);
        data.append("category", formData.category);
        data.append("section_title", formData.section_title);
        data.append("typedtitle_one", formData.typedtitle_one);
        data.append("typedtitle_second", formData.typedtitle_second);
        data.append("typedtitle_third", formData.typedtitle_third);
        data.append("student_image", formData.student_image);
        data.append("thumbnail", formData.thumbnail);
        try {
            if (action === 'update') {
                const result = await axios.put(`/api/siteSettings/megaMenu/coursePage/updateRecord`, data);
                if (result.status === 200) {
                    toast.success("Updated");
                    setModelopen(false);
                    fetchData();
                }
                if (result.error) {
                    toast.error(result.error);
                }
            }
            else {
                const result = await axios.post(`/api/siteSettings/megaMenu/coursePage/addRecord`, data);
                if (result.status === 201) {
                    toast.success("page is created");
                    setModelopen(false);
                    fetchData();
                }
                if (result.error) {
                    toast.error(result.error);
                }
            }
        } catch (error) {
            toast.error("This category is exist!");
            console.log(error)
        }
    }

    const handleUpdateStatus = async (id, title, status) => {
        try {
            const res = await axios.put(`/api/siteSettings/megaMenu/category/${id}`, { title: title, status: status })
            if (res) {
                toast.success(`Category Updated successfully`);
                getcategory();
            }
            else {
                toast.error("something went wrong")
            }
        } catch (error) {
            toast.error("Somtihing went wrong");
        }
    }

    const getcategory = async () => {
        try {
            const { data } = await axios.get("/api/siteSettings/megaMenu/category/getcategory");
            setCategories(data.categories);
        } catch (error) {
            console.log("Error fetching categories:", error);
            toast.error("Error fetching categories");
        }
    };

    const fetchData = async () => {
        try {
            const data = await axios.get("/api/siteSettings/megaMenu/coursePage/getRecords");
            setAlldata(data.data);
        } catch (error) {
            console.log("Error fetching categories:", error);
            toast.error("Error fetching categories");
        }
    };

    const hadleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`/api/siteSettings/megaMenu/coursePage/${id}/`);
            if (data) {
                toast.success(`Category Deleted successfully`);
                fetchData();
            } else {
                toast.error(data.msg);
            }
        } catch (error) {
            toast.error("Somtihing went wrong");
        }
    };

    const actionHandler = async (id, action) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success ms-2",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });
        if (action === 'delete') {
            try {
                swalWithBootstrapButtons
                    .fire({
                        title: "Are you sure? Delete this Contest",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Yes, delete it!",
                        cancelButtonText: "No, cancel!",
                        reverseButtons: true,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            const { data } = axios.delete(`/api/siteSettings/megaMenu/coursePage/${id}/`);
                            if (data) {
                                toast.success(`Category Deleted successfully`);
                                fetchData();
                            } else {
                                toast.error(data.msg);
                            }
                            swalWithBootstrapButtons.fire(
                                "Deleted!",
                                "Your file has been deleted.",
                                "success"
                            );
                        }
                    })
            } catch (error) {
                toast.error("Somtihing went wrong");
            }
        }
        if (action === 'update') {
            try {
                setModelopen(true)
                const res = await axios.get(`/api/siteSettings/megaMenu/coursePage/${id}`)
                console.log(res.data)
                setFormData({
                    ...formData,
                    id: res.data.data._id,
                    course_name: res.data.data.course_name,
                    section_title: res.data.data.sectiontitle,
                    typedtitle_one: res.data.data.typedtitle_first,
                    typedtitle_second: res.data.data.typedtitle_second,
                    typedtitle_third: res.data.data.typedtitle_third,
                    category: res.data.data.category,
                })
                setAction(action);
            } catch (error) {
                console.log("Error while deleting:", error);
            }
        }
    };

    useEffect(() => {
        getcategory();
        fetchData();
    }, []);

    const handleModelOpen = () => {
        setAction("")
        setFormData({
            course_name: "",
            id: "",
            category: "",
            section_title: "",
            typedtitle_one: "",
            typedtitle_second: "",
            typedtitle_third: "",
        })
        setModelopen(true)
    }

    const handleChangeCategory = (e) => {
        setCategoryError(validateCategory(e.target.value));
        setFormData({
            ...formData,
            category: e.target.value,
        });
    };
    return (
        <Fragment>
            <ToastContainer />
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                        <div className="mb-3 mb-md-0">
                            <h1 className="mb-1 h2 fw-bold">Course Page</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href="#">Landings</Breadcrumb.Item>
                                <Breadcrumb.Item active>Course Page</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div>
                            <Link href="/dashboard/cms/all-posts" className="btn btn-outline-secondary">
                                Back to All Post
                            </Link>
                        </div>
                    </div>
                </Col>
                <div className='mb-5'>
                    <button className="btn btn-outline-secondary" onClick={handleModelOpen}>
                        Create Course page
                    </button>
                </div>
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
                                            <th>Action</th>
                                        </tr>
                                    ))}
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                    {page.map((row, index) => {
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
                                                    <Dropdown>
                                                        <Dropdown.Toggle as={CustomToggle}>
                                                            <MoreVertical size="15px" className="text-secondary" />
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu align={'end'}>
                                                            <Dropdown.Header>ACTION</Dropdown.Header>
                                                            {rowData.status !== 'live' ? (
                                                                <Dropdown.Item eventKey="1" onClick={() => handleUpdateStatus(rowData._id, rowData.title, 'live')}>
                                                                    <Send size="15px" className="dropdown-item-icon" /> Publish
                                                                </Dropdown.Item>
                                                            ) : (
                                                                <Dropdown.Item eventKey="2" onClick={() => handleUpdateStatus(rowData._id, rowData.title, 'pending')}>
                                                                    <Inbox size="15px" className="dropdown-item-icon" /> Disabled
                                                                </Dropdown.Item>
                                                            )}
                                                            <Dropdown.Item eventKey="3" onClick={() => hadleDelete(rowData._id)}>
                                                                <Trash size="15px" className="dropdown-item-icon" /> Delete
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3" onClick={() => actionHandler(rowData._id, 'update')}>
                                                                <Edit2 size="15px" className="dropdown-item-icon" /> Edit
                                                            </Dropdown.Item>
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
            <Modal show={modelopen} size='lg'>
                <Modal.Header closeButton onClick={() => setModelopen(false)}>
                    <Modal.Title>Create Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* Category */}
                        <Form.Group className='mb-3'>
                            <Form.Label>Category</Form.Label>
                            {console.log(formData)}
                            <Form.Select
                                onChange={handleChangeCategory}
                                value={formData.category}
                            >
                                {category &&
                                    category.map((c) => (
                                        <option key={c?._id} value={c?._id}>
                                            {c?.title}
                                        </option>
                                    ))
                                }
                            </Form.Select>
                            <Form.Text className="text-danger">
                                {categoryError}
                            </Form.Text>
                        </Form.Group>
                        {/* Title  */}
                        <Row>
                            <Col sm={12} lg={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="courseTitle">Course name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Course Title"
                                        id="course_title"
                                        name="course_title"
                                        value={formData.course_name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, course_name: e.target.value })
                                        }
                                        required
                                    />
                                    <Form.Text className="text-muted">
                                        Write a 60 character course title.
                                    </Form.Text><br />
                                    <Form.Text className="text-danger">
                                        {titleError}
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col sm={12} lg={6}>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Course Thumnail</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name='thumnail'
                                        accept="image/*"
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            thumbnail: e.target.files[0]
                                        })}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className='mt-3 border bg-gray-200 px-3 rounded mb-3'>
                            <Form.Label className='mt-1'>Content</Form.Label>
                        </div>
                        <Row>
                            <Col sm={12} lg={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="courseTitle">Section Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Course Title"
                                        id="course_title"
                                        name="course_title"
                                        value={formData.section_title}
                                        onChange={(e) =>
                                            setFormData({ ...formData, section_title: e.target.value })
                                        }
                                        required
                                    />
                                    <Form.Text className="text-danger">
                                        {titleError}
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col sm={12} lg={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="courseTitle">Typed Title 1</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Course Title"
                                        id="course_title"
                                        name="course_title"
                                        value={formData.typedtitle_one}
                                        onChange={(e) =>
                                            setFormData({ ...formData, typedtitle_one: e.target.value })
                                        }
                                        required
                                    />
                                    <Form.Text className="text-danger">
                                        {titleError}
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col sm={12} lg={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="courseTitle">Typed Title 2</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Course Title"
                                        id="course_title"
                                        name="course_title"
                                        value={formData.typedtitle_second}
                                        onChange={(e) =>
                                            setFormData({ ...formData, typedtitle_second: e.target.value })
                                        }
                                        required
                                    />
                                    <Form.Text className="text-danger">
                                        {titleError}
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col sm={12} lg={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="courseTitle">Typed Title 3</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Course Title"
                                        id="course_title"
                                        name="course_title"
                                        value={formData.typedtitle_third}
                                        onChange={(e) =>
                                            setFormData({ ...formData, typedtitle_third: e.target.value })
                                        }
                                        required
                                    />
                                    <Form.Text className="text-danger">
                                        {titleError}
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className='mb-3'>
                            <Form.Label>Student Image</Form.Label>
                            <Form.Control
                                type="file"
                                name={`logo_`}
                                accept="image/*"
                                onChange={(e) => setFormData({
                                    ...formData,
                                    student_image: e.target.files[0]
                                })}
                            />
                        </Form.Group>
                        <Button onClick={() => handleSubmit()}>
                            Create
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Fragment>
    );
};

export default CoursePage;
