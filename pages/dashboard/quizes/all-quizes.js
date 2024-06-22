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
} from "react-bootstrap";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { GlobalFilter, Pagination } from "widgets";
import { XCircle, MoreVertical, Send, Inbox } from "react-feather";
import DotBadge from "components/bootstrap/DotBadge";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//asdfghjklsdfghjkl
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Can } from "utils/accessControl";

const AllQuizes = (props) => {
  const quizData = props?.data;
  const courses = quizData?.map((post) => {
    return {
      ...post,
      is_published:
        post.is_published === "live"
          ? "live"
          : post.is_published === "reject"
            ? "reject"
            : "pending",
    };
  });
  const allapprovedcourses = courses.filter(
    (post) => post.is_published === "live"
  );
  const allpendingcourses = courses.filter(
    (post) => post.is_published === "pending"
  );
  const allrejectedcourses = courses.filter(
    (post) => post.is_published === "reject"
  );

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentprice, setcurrentprice] = useState("");
  const [actualprice, setactualprice] = useState("");
  const [currentpriceError, setcurrentpriceError] = useState("");
  const [discountedPriceError, setDiscountedPriceError] = useState("");
  const [courseId, setCourseId] = useState("");
  const handleCurrentpriceChange = (e) => {
    const price = e.target.value;
    setcurrentprice(price);
    if (!isValidPrice(price)) {
      setcurrentpriceError("Please enter a valid price.");
    } else {
      setcurrentpriceError("");
    }
  };
  const modelClose = () => {
    setEditModalOpen(false);
    setcurrentprice("");
    setcurrentpriceError("");
    setDiscountedPriceError("");
    setactualprice("");
  };
  const handleDiscountedPriceChange = (e) => {
    const price = e.target.value;
    setactualprice(price);
    if (!isValidPrice(price)) {
      setDiscountedPriceError("Please enter a valid price.");
    } else {
      setDiscountedPriceError("");
    }
  };

  const isValidPrice = (price) => {
    const isValid = /^\d+(\.\d{1,2})?$/.test(price);
    return isValid;
  };
  const handlePrice = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/quiz/updateprice`, {
        currentprice,
        actualprice,
        courseId,
      });
      if (res) {
        toast.success(`Course Updated successfully`);
        getAllQuizes();
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
      console.log(error);
    }
    setEditModalOpen(false);
    setcurrentprice("");
    setcurrentpriceError("");
    setDiscountedPriceError("");
    setactualprice("");
  };

  const CoursesTable = ({ courses_data }) => {
    const modelOpen = (isOpen, courseId) => {
      setEditModalOpen(isOpen);
      if (courseId !== null) {
        setCourseId(courseId);
      }
    };

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
          accessor: "_id",
          Header: "Image",
          Cell: ({ value }) => {
            return (
              <div className="d-flex align-items-center">
                <Image
                  src={`/api/quiz/quizthumbnail/${value}`}
                  alt=""
                  className="rounded img-4by3-lg"
                />
              </div>
            );
          },
        },
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
                    <h4 className="mb-1 text-primary-hover">{value.split(' ').slice(0, 3).join(' ')}</h4>
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
          accessor: "created_by",
          Header: "Instructor",
          Cell: ({ value, row }) => {
            const [userData, setUserData] = React.useState(null);
            const [error, setError] = React.useState(null);

            React.useEffect(() => {
              async function fetchUserData() {
                try {
                  const response = await axios.get(
                    `/api/auth/usersingle/${value}`
                  );
                  const user = response.data;
                  setUserData(user);
                } catch (error) {
                  console.error("Error fetching user data:", error);
                  setError(error);
                }
              }

              fetchUserData();
            }, [value]);

            if (error) {
              return <div>Error loading user data</div>;
            }
            if (!userData) {
              return <div>Loading...</div>;
            }
            return (
              <div className="d-flex align-items-center">
                {userData && userData._id ? (
                  <Image
                    src={`/api/auth/profileimgadmin/${userData._id}`}
                    alt=""
                    className="rounded-circle avatar-xs me-2"
                  />
                ) : (
                  ""
                )}
                <h5 className="mb-0">
                  {userData.fname} {userData.lname}
                </h5>
              </div>
            );
          },
        },
        {
          accessor: "is_published",
          Header: "Status",
          Cell: ({ value }) => {
            return (
              <DotBadge
                bg={
                  value === "pending"
                    ? "warning"
                    : value === "live"
                      ? "success"
                      : value === "reject"
                        ? "danger"
                        : ""
                }
              >
                {value === "pending"
                  ? "Pending"
                  : value === "live"
                    ? "Live"
                    : value === "reject"
                      ? "Rejected"
                      : ""}
              </DotBadge>
            );
          },
        },
        {
          accessor: "currentprice",
          // Header: 'Action',
          Header: "Status",
          Cell: ({ value, row }) => {
            if (value === "0") {
              return (
                <Button
                  href="#"
                  variant="secondary"
                  className="btn-sm"
                  onClick={() => modelOpen(true, row.original._id)}
                >
                  Set Course Price
                </Button>
              );
            }
            if (row.original.is_published === "pending") {
              return (
                <Fragment>
                  <Button
                    href="#"
                    variant="outline"
                    className="btn-outline-secondary btn-sm"
                    onClick={() => handleUpdate(row.original._id, "reject")}
                  >
                    Reject
                  </Button>{" "}
                  <Button
                    href="#"
                    variant="success"
                    className="btn-sm"
                    onClick={() => handleUpdate(row.original._id, "live")}
                  >
                    Approved
                  </Button>
                </Fragment>
              );
            } else {
              return (
                <Button
                  href="#"
                  variant="secondary"
                  className="btn-sm"
                  onClick={() => handleUpdate(row.original._id, "pending")}
                >
                  Change Status
                </Button>
              );
            }
          },
        },
        {
          accessor: "slug",
          Header: "Price",
          Cell: ({ value, row }) => {
            const rowData = row.original.currentprice;
            return <Fragment>₹{rowData}</Fragment>;
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
        const res = await axios.put(`/api/quiz/updatestatus`, {
          id: id,
          is_published: status,
        });
        if (res) {
          toast.success(`Course Updated successfully`);
          getAllQuizes();
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
              const res = axios.delete(`/api/quiz/${id}`);
              if (res) {
                getAllQuizes();
              } else {
                toast.error("something went wrong");
              }
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Your file has been deleted.",
                "success"
              );
            }
          });
      } catch (error) {
        toast.error("Somtihing went wrong");
        console.log(error);
      }
    };

    const handlePriceUpdate = async (courseId, actualprice, currentprice) => {
      setEditModalOpen(true);
      setcurrentprice(currentprice);
      setactualprice(actualprice);
      setCourseId(courseId);
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
                              Reject and Delete Course
                            </Dropdown.Item>
                          </Can>
                          <Can I="editMocks">
                            {rowData.is_published === "pending" ? (
                              <Dropdown.Item
                                eventKey="1"
                                onClick={() => handleUpdate(rowData._id, "live")}
                              >
                                <Send size="15px" className="me-1" /> Approved
                              </Dropdown.Item>
                            ) : (
                              <Dropdown.Item
                                eventKey="2"
                                onClick={() =>
                                  handleUpdate(rowData._id, "pending")
                                }
                              >
                                <Inbox size="15px" className="me-1" /> Pending
                              </Dropdown.Item>
                            )}
                            <Dropdown.Item
                              eventKey="1"
                              onClick={() =>
                                handlePriceUpdate(
                                  rowData._id,
                                  rowData.actualprice,
                                  rowData.currentprice
                                )
                              }
                            >
                              <XCircle size="15px" className="me-1" />
                              Set Price
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
                  href="/marketing/instructor/add-new-quiz"
                  className="btn btn-primary"
                >
                  Add New Mock
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
                      Approved
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="pending" className="mb-sm-3 mb-md-0">
                      Pending
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="reject" className="mb-sm-3 mb-md-0">
                      Rejected
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
                  <Tab.Pane eventKey="reject" className="pb-4">
                    <CoursesTable courses_data={allrejectedcourses} />
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      </Row>
      <Modal show={editModalOpen} onHide={() => setEditModalOpen(false)}>
        <Modal.Header closeButton onClick={modelClose}>
          <Modal.Title>Enter Course Price</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Col className="mb-3">
              <Form.Group className="mb-3" controlId="formcurrentprice">
                <Form.Label>Current Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Selling Price e.g. 999"
                  value={currentprice}
                  onChange={handleCurrentpriceChange}
                />
                {currentpriceError && (
                  <div className="text-danger">{currentpriceError}</div>
                )}
              </Form.Group>
            </Col>
            <Col className="mb-3">
              <Form.Group className="mb-3" controlId="formDiscountedPrice">
                <Form.Label>Actual Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Discounted Price e.g. 1999"
                  value={actualprice}
                  onChange={handleDiscountedPriceChange}
                />
                {discountedPriceError && (
                  <div className="text-danger">{discountedPriceError}</div>
                )}
              </Form.Group>
            </Col>
            <Button
              variant="primary"
              className="m-1"
              type="submit"
              onClick={handlePrice}
            >
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};
export const getServerSideProps = async () => {
  try {
    const quiz = await axios.get(`${process.env.NEXTAUTH_URL}/api/quiz/allQuiz`);
    const data = quiz.data.quizes;
    return {
      props: {
        data: data,
      },
    };
  } catch (error) {
    console.error("Error fetching data from quizes:", error);
    return {
      props: {
        data: [],
      },
    };
  }
};
export default AllQuizes;
