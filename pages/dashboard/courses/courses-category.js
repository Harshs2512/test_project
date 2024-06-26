// import node module libraries
import React, { Fragment, useMemo, useState, useEffect } from "react";
import Link from "next/link";
import axios from 'axios'
import {
  useTable,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from "react-table";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Col,
  Row,
  Dropdown,
  Form,
  Card,
  Breadcrumb,
  Button,
  Modal,
  Table,
} from "react-bootstrap";
import { Trash, MoreVertical, Edit } from "react-feather";

// import widget/custom components
import { GlobalFilter, Pagination, Checkbox } from "widgets";
import { useForm } from "react-hook-form";
import { Can } from "utils/accessControl";
import formatDate from "helper/formatDate";

// import data files

const CoursesCategory = () => {
  const [modalopen, setModalopen] = useState(false)
  const [updatemodalopen, setUpdateModalopen] = useState(false)
  const [category, setCategories] = useState([]);
  const [coursecount, setCountcourse] = useState();

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
  const data = useMemo(() => category && category, [category]);
  const getcategory = async () => {
    try {
      const { data } = await axios.get("/api/category/getcategories");
      setCategories(data.categories);
    } catch (error) {
      toast.error("Error fetching categories");
      console.log("Error fetching categories:", error);
    }
  };
  const getCourseCountByCategory = async () => {
    try {
      const response = await axios.get(`/api/courses/getdashboarddata`);
      if (response.status == 200) {
        setCountcourse(response.data?.courses);
      }
    }
    catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {

    getcategory();
    getCourseCountByCategory();
  }, [])

  const hadleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/category/${id}/`);
      if (data) {
        toast.success(`Course Category Deleted successfully`);
        getcategory();
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  const getcategoryUpdate = async (id) => {
    try {
      setUpdateModalopen(true)
      const res = await axios.get(`/api/category/${id}`)
      setValue('catName', res.data.category.catName)
      setValue('_id', res.data.category._id)
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  }

  const handleUpdate = async ({ catName, _id }) => {
    try {
      const result = await axios.put(`/api/category/${_id}`, {
        catName,
      });
      toast.success("Course Category Updated Successfully");
      setUpdateModalopen(false);
      getcategory();
    } catch (error) {
      toast.error("This category is exist!");
      console.log(error);
    }
  };
  const columns = useMemo(
    () => [
      { accessor: "catName", Header: "Category" },
      { accessor: "slug", Header: "Slug" },
      {
        accessor: '_id',
        Header: 'Courses',
        Cell: ({ value }) => {
          const courseCount = coursecount?.find((item) => item.course_category === value);
      
          return (
            <h5 className="mb-0">
              {courseCount ? courseCount.courses?.length : 0}
            </h5>
          );
        },
      },
      
      {
        accessor: "createdAt",
        Header: "Date Created",
        Cell: ({ value }) => formatDate(value), // Apply date formatting to createdAt column
      },
      {
        accessor: "updatedAt",
        Header: "Date Updated",
        Cell: ({ value }) => formatDate(value),
      },
    ],
    [category, coursecount]
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
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 10,
        hiddenColumns: columns.map((column) => {
          if (column.show === false) return column.accessor || column.id;
          else return false;
        }),
      },
    },
    useFilters,
    useGlobalFilter,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ catName }) => {
    try {
      const result = await axios.post("/api/category/addcategories", {
        catName,
      });
      toast.success("Course Category is Created Successfully");
      setModalopen(false);
      getcategory();
    } catch (error) {
      toast.error("This category is exist!");
      console.log(error);
    }
  };

  const { pageIndex, globalFilter } = state;
  return (
    <Fragment>
      <ToastContainer />
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">Courses Category</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item href="#">Courses</Breadcrumb.Item>
                <Breadcrumb.Item active>Courses Category</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <Can I="createCourseCategory">
                <Button variant="primary" onClick={() => setModalopen(true)}>
                  Add New Category
                </Button>
              </Can>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <div className='mb-5'>
          {modalopen ? <div className="modal show" style={{ display: 'block', position: 'initial' }}>
            <Modal.Dialog>
              <Modal.Header closeButton onClick={() => setModalopen(false)}>
                <Modal.Title>Create Category</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit(submitHandler)}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Enter Category</Form.Label>
                    <Form.Control type="text" placeholder="Frontend"
                      {...register('catName', {
                        required: "Please enter category"
                      })}
                    />
                  </Form.Group>
                  <button className="btn btn-outline-primary mt-2" type='submit'>
                    Create
                  </button>
                </Form>
              </Modal.Body>
            </Modal.Dialog>
          </div> : ''}
        </div>
        <div className='mb-5'>
          {updatemodalopen ? <div className="modal show" style={{ display: 'block', position: 'initial' }}>
            <Modal.Dialog>
              <Modal.Header closeButton onClick={() => setUpdateModalopen(false)}>
                <Modal.Title>Update Category</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit(handleUpdate)}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Enter Category</Form.Label>
                    <Form.Control type="text" placeholder="Frontend"
                      {...register('catName', {
                        required: "Please enter category"
                      })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" placeholder="Frontend" hidden
                      {...register('_id', {
                        required: "Please enter category"
                      })}
                    />
                  </Form.Group>
                  <button className="btn btn-outline-primary mt-2" type='submit'>
                    Create
                  </button>
                </Form>
              </Modal.Body>
            </Modal.Dialog>
          </div> : ''}
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
                      placeholder="Search Course"
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
                  {page && page.map((row, index) => {
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
                              <Can I="editCourseCategory">
                                <Dropdown.Item eventKey="1" onClick={() => getcategoryUpdate(rowData._id)}>
                                  <Edit size="15px" className="dropdown-item-icon" /> Edit
                                </Dropdown.Item>
                              </Can>
                              <Can I="deleteCourseCategory">
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

export default CoursesCategory;
