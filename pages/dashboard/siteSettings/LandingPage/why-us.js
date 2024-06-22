// import node module libraries
import React, { Fragment, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  Col,
  Row,
  Tab,
  Card,
  Nav,
  Breadcrumb,
  Table,
  Dropdown,
  Image,
  Button,
  Modal,
  Form,
  Badge,
} from "react-bootstrap";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { GlobalFilter, Pagination } from "widgets";
import { XCircle, MoreVertical, Send, Inbox } from "react-feather";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Can } from "utils/accessControl";

const Quizes = () => {
  const [action, setAction] = useState("");
  const [quizData, setQuizData] = useState([]);
  const [id, setId] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const allapprovedcourses = quizData.filter(
    (post) => post.is_published === "active"
  );
  const allpendingcourses = quizData.filter(
    (post) => post.is_published === "inactive"
  );
  const [editModalOpen, setEditModalOpen] = useState(false);

  const getData = async () => {
    try {
      const data = await axios.get(
        `/api/siteSettings/landingPage/whySection/addData`
      );
      const dataWhy = data.data.whyData;
      setQuizData(dataWhy);
    } catch (error) {
      console.log(error, "error");
    }
  };
    useEffect(() => {
      getData();
  }, []);
  const modelClose = () => {
    setEditModalOpen(false);
  };
  const CoursesTable = ({ courses_data }) => {
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <Link
        href="#"
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
    const columns = useMemo(
      () => [
        {
          accessor: "title",
          Header: "Why us Title",
          Cell: ({ value, row }) => {
            return (
              <Link
                href={`/dashboard/quizes/admin-single-quiz?quizId=${row.original._id}`}
                className="text-inherit"
              >
                <div className="d-lg-flex align-items-center">
                  <div className="ms-lg-3 mt-2 mt-lg-0">
                    <h4 className="mb-1 text-primary-hover">
                      {value.split(" ").slice(0, 3).join(" ")}
                    </h4>
                    <span className="text-inherit">
                      {formatDate(row.original.createdAt)}
                    </span>
                  </div>
                </div>
              </Link>
            );
          },
        },
        {
          accessor: "Description",
          Header: "Descriptions",
          Cell: ({ value, row }) => {
            return (
                <div className="d-lg-flex align-items-center">
                  <div className="ms-lg-3 mt-2 mt-lg-0">
                    <h4 className="mb-1 text-primary-hover">
                      {value.split(" ").slice(0, 3).join(" ")}
                    </h4>
                    <span className="text-inherit">
                      {formatDate(row.original.createdAt)}
                    </span>
                  </div>
                </div>
            );
          },
        },
        {
          accessor: "is_published",
          Header: "Change Status",
          Cell: ({ value, row }) => {
            if (value === "inactive") {
              return (
                <Fragment>
                  <Button
                    href="#"
                    variant="warning"
                    className="btn-sm"
                    onClick={() => handleUpdate(row.original._id, "active")}
                  >
                    Inactive
                  </Button>
                </Fragment>
              );
            } else {
              return (
                <Button
                  href="#"
                  variant="success"
                  className="btn-sm"
                  onClick={() => handleUpdate(row.original._id, "inactive")}
                >
                  Active
                </Button>
              );
            }
          },
        },
      ],
      []
    );

    const data = useMemo(() => courses_data, [courses_data]);

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
      usePagination
    );
    const { pageIndex, globalFilter } = state;

    const handleUpdate = async (id, status) => {
      try {
        const res = await axios.put(
          `/api/siteSettings/landingPage/whySection/updatestatus`,
          {
            id: id,
            is_published: status,
          }
        );
        if (res.data.success === true) {
          getData();
          toast.success(`Status Updated successfully`);
        } else {
          toast.error("something went wrong");
        }
      } catch (error) {
        toast.error("Somtihing went wrong");
        console.log(error);
      }
    };

    const handleDelete = async (id) => {
      try {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success ms-2",
            cancelButton: "btn btn-danger",
          },
          buttonsStyling: false,
        });

        swalWithBootstrapButtons
          .fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              const res = axios.delete(
                `/api/siteSettings/landingPage/whySection/addData?id=${id}`
              );
              if (res) {
                swalWithBootstrapButtons.fire(
                  "Deleted!",
                  "Your file has been deleted.",
                  "success"
                );
                getData();
              } else {
                toast.error("something went wrong");
              }
            }
          });
      } catch (error) {
        toast.error("Somtihing went wrong");
        console.log(error);
      }
    };

    return (
      <Fragment>
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
        <div className="border-0 overflow-y-hidden">
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
                          <Can I="deleteMocks">
                            <Dropdown.Item
                              eventKey="1"
                              onClick={() => handleDelete(rowData._id)}
                            >
                              <XCircle size="15px" className="me-1" />
                              Delete
                            </Dropdown.Item>
                          </Can>
                          <Can I="editMocks">
                            <Dropdown.Item
                              eventKey="2"
                              onClick={() => handleAddQuiz(rowData, "update")}
                            >
                              <Inbox size="15px" className="me-1" /> Update
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
        </div>

        {/* Pagination @ Footer */}
        <Pagination
          previousPage={previousPage}
          pageCount={pageCount}
          pageIndex={pageIndex}
          gotoPage={gotoPage}
          nextPage={nextPage}
        />
      </Fragment>
    );
  };
  const handleAddQuiz = async (rowData, action) => {
    if (action) {
      setTitle(rowData.title);
      setAction(action);
      setDescription(rowData.Description)
      setVideoUrl(rowData.videoUrl)
      setId(rowData._id);
    }
    setEditModalOpen(true);
  };
  const handleFormSubmit = async () => {
    try {
      const data = {
        id:id,
        title: title,
        Description: description,
        videoUrl: videoUrl,
      };

      let response;

      if (action === "update") {
        response = await axios.put(
          "/api/siteSettings/landingPage/whySection/addData",
          data
        );
      } else {
        response = await axios.post(
          "/api/siteSettings/landingPage/whySection/addData",
          data
        );
      }

      if (response.status === 201) {
        if (action === "update") {
          toast.success("data Updated");
        } else {
          toast.success("Quiz Added Successfully");
        }
        setId("");
        setEditModalOpen(false);
        getData();
      } else {
        toast.error("Failed to add/update quiz. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("This quiz already exists!");
      } else {
        toast.error("An error occurred while processing your request.");
        console.error(error);
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
              <h1 className="mb-1 h2 fw-bold">Why Us</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#">why us</Breadcrumb.Item>
                <Breadcrumb.Item active>All</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <Can I="createMocks">
                <Link
                  href="#"
                  className="btn btn-primary"
                  onClick={() => handleAddQuiz()}
                >
                  Add why us
                </Link>
              </Can>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <Tab.Container defaultActiveKey="all">
            <Card>
              <Card.Header className="border-bottom-0 p-0 bg-white">
                <Nav className="nav-lb-tab">
                  <Nav.Item>
                    <Nav.Link eventKey="all" className="mb-sm-3 mb-md-0">
                      All
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="approved" className="mb-sm-3 mb-md-0">
                      Active
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="pending" className="mb-sm-3 mb-md-0">
                      Inactive
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body className="p-0">
                <Tab.Content>
                  <Tab.Pane eventKey="all" className="pb-4">
                    <CoursesTable courses_data={quizData} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="approved" className="pb-4">
                    <CoursesTable courses_data={allapprovedcourses} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="pending" className="pb-4">
                    <CoursesTable courses_data={allpendingcourses} />
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      </Row>
      <Modal
        show={editModalOpen}
        onHide={() => setEditModalOpen(false)}
        className="size-lg"
      >
        <Modal.Header closeButton onClick={modelClose}>
          <Modal.Title>Enter Why us Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="py-2">
              <Form.Label htmlFor="title">Why Us Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter here"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="description">Why Us Description</Form.Label>
              <Form.Control
                type="text-area"
                placeholder="enter here"
                name="Description"
                id="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                Write a 30 word why us Description.
              </Form.Text>
            </Form.Group>
            <Form.Group className="py-2">
              <Form.Label htmlFor="vedeoUrl">Why Us Video Url</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter here"
                name="videoUrl"
                id="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" onClick={handleFormSubmit}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default Quizes;
