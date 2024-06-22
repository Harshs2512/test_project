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
  const allapprovedcourses = quizData.filter(
    (post) => post.is_published === "active"
  );
  const allpendingcourses = quizData.filter(
    (post) => post.is_published === "inactive"
  );
  const [editModalOpen, setEditModalOpen] = useState(false);
  const fetchData = async () => {
    try {
      const quiz = await axios.get(
        `/api/siteSettings/landingPage/quiz/addQuiz`
      );
      const data = quiz?.data?.quizLive;
      setQuizData(data);
    } catch (error) {
      console.error("Error fetching data from quizLive:", error);
    }
  };
  useEffect(() => {
    fetchData();
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
          Header: "Quizes",
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
          accessor: "is_published",
          Header: "Current Status",
          Cell: ({ value }) => {
            return (
              <Badge
                bg={
                  value === "inactive"
                    ? "warning"
                    : value === "active"
                    ? "success"
                    : ""
                }
              >
                {value === "inactive"
                  ? "Inactive"
                  : value === "active"
                  ? "Active"
                  : ""}
              </Badge>
            );
          },
        },
        {
          accessor: "_id",
          Header: "Change Status",
          Cell: ({ value, row }) => {
            if (row.original.is_published === "inactive") {
              return (
                <Fragment>
                  <Button
                    href="#"
                    variant="success"
                    className="btn-sm"
                    onClick={() => handleUpdate(row.original._id, "active")}
                  >
                    Active
                  </Button>
                </Fragment>
              );
            } else {
              return (
                <Button
                  href="#"
                  variant="outline"
                  className="btn-outline-secondary btn-sm"
                  onClick={() => handleUpdate(row.original._id, "inactive")}
                >
                  Inactive
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
          `/api/siteSettings/landingPage/quiz/updatestatus`,
          {
            id: id,
            is_published: status,
          }
        );
        if (res.data.success === true) {
          fetchData();
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
                `/api/siteSettings/landingPage/quiz/addQuiz?id=${id}`
              );
              if (res) {
                swalWithBootstrapButtons.fire(
                  "Deleted!",
                  "Your file has been deleted.",
                  "success"
                );
                fetchData();
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
  const [questionsList, setQuestionsList] = useState([
    {
      question: "",
      options: [],
    },
  ]);
  const handleAddQuiz = async (rowData, action) => {
    if (action || (rowData && rowData.questions_list)) {
      setQuestionsList(rowData.questions_list);
      setTitle(rowData.title);
      setAction(action);
      setId(rowData._id);
    }
    setEditModalOpen(true);
  };

  const handleFormSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("id", id);
    formDataToSend.append("title", title);
    formDataToSend.append("questions_list", JSON.stringify(questionsList));
    try {
      if (action === "update") {
        const response = await axios.put(
          "/api/siteSettings/landingPage/quiz/addQuiz",
          formDataToSend
        );
        if (response.status === 201) {
          toast.success("Quiz data Updated");
          setId("");
          setEditModalOpen(false);
          fetchData();
          // setQuestionsList({
          //   question: "",
          //   options: [],
          // });
        }
        if (response.error) {
          toast.error(response.error);
        }
      } else {
        const response = await axios.post(
          "/api/siteSettings/landingPage/quiz/addQuiz",
          formDataToSend
        );
        if (response.status === 201) {
          toast.success("Quiz Added Successfully");
          setId("");
          setEditModalOpen(false);
          fetchData();
          // setQuestionsList({
          //   question: "",
          //   options: [],
          // });
        } else {
          toast.error("Quiz Not Added. Please try again.");
          console.error("Error creating quiz:");
        }
      }
    } catch (error) {
      toast.error("This quiz is exist!");
      console.log(error);
    }
  };
  const handleAddOption = (index) => {
    setQuestionsList((prevList) =>
      prevList.map((q, i) =>
        i === index
          ? {
              ...q,
              options: [...q.options, { text: "" }],
            }
          : q
      )
    );
  };
  const handleRemoveOption = (questionIndex, optionIndex) => {
    setQuestionsList((prevList) =>
      prevList.map((q, i) =>
        i === questionIndex
          ? {
              ...q,
              options: q.options.filter((opt, oi) => oi !== optionIndex),
            }
          : q
      )
    );
  };
  const handleAddQuestion = () => {
    setQuestionsList((prevList) => [
      ...prevList,
      {
        question_number: prevList.length + 1,
        question: "",
        options: [],
      },
    ]);
  };
  const handleRemoveQuestion = (index) => {
    setQuestionsList((prevList) => prevList.filter((q, i) => i !== index));
  };
  return (
    <Fragment>
      <ToastContainer />
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">All Quizzes</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#">Quizes</Breadcrumb.Item>
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
                  Add Quiz
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
          <Modal.Title>Enter Mock Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label htmlFor="title">Mock Test Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mock Test Name"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                Write a 60 character Mock Test title.
              </Form.Text>
            </Form.Group>
            {questionsList?.map((question, index) => (
              <div key={index}>
                <Col>
                  <Form.Label className="mt-3">
                    Question {index + 1}.{" "}
                  </Form.Label>
                  <Form.Control
                    placeholder="Write Question"
                    type="text"
                    value={question.question}
                    onChange={(e) =>
                      setQuestionsList((prevList) =>
                        prevList.map((q, i) =>
                          i === index ? { ...q, question: e.target.value } : q
                        )
                      )
                    }
                  />
                </Col>
                <div>
                  <Form.Label>Options</Form.Label>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <Row className="mt-2 justify-content-between">
                        <Col>
                          <Form.Control
                            placeholder="Option"
                            type="text"
                            value={option.text}
                            onChange={(e) =>
                              setQuestionsList((prevList) =>
                                prevList.map((q, i) =>
                                  i === index
                                    ? {
                                        ...q,
                                        options: q.options.map((opt, oi) =>
                                          oi === optionIndex
                                            ? {
                                                ...opt,
                                                text: e.target.value,
                                              }
                                            : opt
                                        ),
                                      }
                                    : q
                                )
                              )
                            }
                          />
                        </Col>
                        <Col className="d-flex justify-content-end align-items-center">
                          <div>
                            <Button
                              className="btn-sm bg-danger"
                              type="button"
                              onClick={() =>
                                handleRemoveOption(index, optionIndex)
                              }
                            >
                              Remove Option
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </div>
                <Form.Group>
                  <Row className="mt-3 ">
                    <Col>
                      <Button
                        type="button"
                        className="btn-sm"
                        onClick={() => handleAddOption(index)}
                      >
                        Add Option
                      </Button>
                    </Col>
                    <Col className="d-flex justify-content-end ">
                      <Button
                        type="button"
                        className="btn-sm bg-danger p-1"
                        onClick={() => handleRemoveQuestion(index)}
                      >
                        Remove Question
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </div>
            ))}
            <Form.Group>
              <Row className="mt-5">
                <Col>
                  <Button
                    className="p-1 btn-sm"
                    variant="success"
                    type="button"
                    onClick={handleAddQuestion}
                  >
                    Add Question
                  </Button>
                </Col>
                <Form.Label></Form.Label>
              </Row>
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
