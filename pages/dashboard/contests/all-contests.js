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
import DotBadge from "components/bootstrap/DotBadge";
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
import Loading from "../../loading";
import { useRouter } from "next/router";
import { Can } from "utils/accessControl";
const AllCourses = () => {
  const [contests, setContests] = useState([]);
  const [allapprovedcontest, setAllapprovedcontest] = useState([]);
  const [allpendingcontest, setAllpendingcontest] = useState([]);
  const [allrejectedcontest, setAllrejectedcontest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentprice, setcurrentprice] = useState("");
  const [actualprice, setactualprice] = useState("");
  const [currentpriceError, setcurrentpriceError] = useState("");
  const [discountedPriceError, setDiscountedPriceError] = useState("");
  const [courseId, setCourseId] = useState("");
  const isValidPrice = (price) => {
    const isValid = /^\d+(\.\d{1,2})?$/.test(price);
    return isValid;
  };
  const handleCurrentpriceChange = (e) => {
    const price = e.target.value;
    setcurrentprice(price);
    if (!isValidPrice(price)) {
      setcurrentpriceError("Please enter a valid price.");
    } else {
      setcurrentpriceError("");
    }
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
  const handlePrice = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/Contest/updateprice`, {
        currentprice,
        actualprice,
        courseId,
      });
      if (res) {
        toast.success(`Contest Price set successfully`);
        AllContest();
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
  const router = useRouter();
  const AllContest = async () => {
    try {
      const Contest = await axios.get("/api/Contest/crudContest");
      const Contestdata = Contest?.data?.Contests;
      setContests(Contestdata);
      const contests = Contestdata.map((contest) => {
        return {
          ...contest,
          is_published:
            contest.is_published === "live"
              ? "live"
              : contest.is_published === "reject"
              ? "reject"
              : "pending",
        };
      });
      const publishedContests = contests.filter(
        (contest) => contest.is_published === "live"
      );
      const disabledContests = contests.filter(
        (contest) => contest.is_published === "pending"
      );
      const rejectedContests = contests.filter(
        (contest) => contest.is_published === "reject"
      );
      setAllapprovedcontest(publishedContests);
      setAllpendingcontest(disabledContests);
      setAllrejectedcontest(rejectedContests);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    AllContest();
  }, []);
  const modelClose = () => {
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
        { accessor: "_id", Header: "ID", show: false },
        {
          accessor: "contest_title",
          Header: "Contests",
          Cell: ({ value, row }) => {
            return (
              <Link href="#" className="text-inherit">
                <div className="d-lg-flex align-items-center">
                  <div>
                    <Image
                      src={`/api/Contest/getthumbnail/${row.original._id}`}
                      alt=""
                      className="img-4by3-lg rounded"
                    />
                  </div>
                  <div className="ms-lg-3 mt-2 mt-lg-0">
                    {/* <Link
                      href={`/studio/contest-single/single?problem=${row.original.slug}`}
                    > */}
                      <h4 className="mb-1 text-primary-hover">
                        {value.split(" ").slice(0, 3).join(" ")}
                      </h4>
                    {/* </Link> */}
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
          accessor: "contest_level",
          Header: "Contest Level",
          Cell: ({ value, row }) => {
            return (
              <Link href="#" className="text-inherit">
                <div className="d-lg-flex align-items-center">
                  <div className="ms-lg-3 mt-2 mt-lg-0">
                    <Badge
                      bg={
                        value === "Easy"
                          ? "warning"
                          : value === "Modrate"
                          ? "success"
                          : value === "Hard"
                          ? "info"
                          : ""
                      }
                    >
                      {value}
                    </Badge>
                  </div>
                </div>
              </Link>
            );
          },
        },
        {
          accessor: "questionsList",
          Header: "Total Question",
          Cell: ({ value, row }) => {
            return (
              <div className="d-flex align-items-center">{value.length}</div>
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
          Header: "Action",
          Cell: ({ value, row }) => {
            if (row.original.is_published === "pending") {
              return (
                <Fragment>
                  <Button
                    href="#"
                    variant="outline"
                    className="btn-outline-secondary btn-sm"
                    onClick={() =>
                      handleUpdateStatus(row.original._id, "reject")
                    }
                  >
                    Reject
                  </Button>{" "}
                  <Button
                    href="#"
                    variant="success"
                    className="btn-sm"
                    onClick={() => handleUpdateStatus(row.original, "live")}
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
                  onClick={() => handleUpdateStatus(row.original, "pending")}
                >
                  Change Status
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
            title: "Are you sure? Delete this Contest",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              const res = axios.delete(`/api/Contest/${id}`);
              if (res) {
                AllContest();
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

    const handleUpdate = async (contestId,action) => {
      router.push(`/studio/admin/add-new-contest?contestId=${contestId}&action=${action}`);
    };
    const handleUpdateStatus = async (id, status) => {
      try {
        const res = await axios.put(`/api/Contest/updatestatus`, {
          id: id,
          is_published: status,
        });
        if (res.data.updatedContest.is_published === "live") {
          toast.success(`Contest Updated successfully`);
          AllContest();
        } else if (res.data.updatedContest.is_published === "pending") {
          toast.warning(`Contest is now pending`);
          AllContest();
        } else if (res.data.updatedContest.is_published === "reject") {
          toast.warning(`Contest is now reject`);
          AllContest();
        } else {
          toast.error("something went wrong");
        }
      } catch (error) {
        toast.error("Somtihing went wrong");
        console.log(error);
      }
    };
    const SetPrice = async (courseId, actualprice, currentprice) => {
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
                placeholder="Search Contests"
              />
            </Col>
          </Row>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="border-0 overflow-y-hidden">
            {/* {loading ? <Loder /> : */}
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
                            <Can I="deleteContest">
                              <Dropdown.Item
                                eventKey="1"
                                onClick={() => handleDelete(rowData._id)}
                              >
                                <XCircle size="15px" className="me-1" />
                                Delete
                              </Dropdown.Item>
                            </Can>
                            <Can I="editContest">
                              <Dropdown.Item
                                eventKey="1"
                                onClick={() => handleUpdate(rowData._id, "update")}
                              >
                                <Send size="15px" className="me-1" />
                                Update
                              </Dropdown.Item>
                            </Can>
                            <Can I="editContest">
                              <Dropdown.Item
                                eventKey="1"
                                onClick={() =>
                                  SetPrice(
                                    rowData._id,
                                    rowData.actualprice,
                                    rowData.currentprice
                                  )
                                }
                              >
                                <Send size="15px" className="me-1" />
                                Update Price
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
        )}

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
              <h1 className="mb-1 h2 fw-bold">All Contests</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#">Contests</Breadcrumb.Item>
                <Breadcrumb.Item active>All</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <Can I="createContest">
                <Link
                  href="/studio/admin/add-new-contest"
                  className="btn btn-primary"
                >
                  Add New Contest
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
                    <CoursesTable courses_data={contests} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="approved" className="pb-4">
                    <CoursesTable courses_data={allapprovedcontest} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="pending" className="pb-4">
                    <CoursesTable courses_data={allpendingcontest} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="reject" className="pb-4">
                    <CoursesTable courses_data={allrejectedcontest} />
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

export default AllCourses;
