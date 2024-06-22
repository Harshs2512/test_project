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
  Badge
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
import { useRouter } from "next/router";
import formatDate from "helper/formatDate";
import { Can } from "utils/accessControl";

const AllProblem = (props) => {
  const problem = props?.data;
  const router = useRouter();
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

    const columns = useMemo(
      () => [
        { accessor: "_id", Header: "ID", show: false },
        {
          accessor: "contest_title",
          Header: "Problem",
          Cell: ({ value, row }) => {
            return (
              <Link href="#" className="text-inherit">
                <div className="d-lg-flex align-items-center">
                  <div>
                    <Image
                      src={`/api/problemDay/getthumbnail/${row.original._id}`}
                      alt=""
                      className="img-4by3-lg rounded"
                    />
                  </div>
                  <div className="ms-lg-3 mt-2 mt-lg-0">
                    {/* <Link
                      href={`/marketing/courses/course-resume/${row.original.slug}`}
                    > */}
                      <h4 className="mb-1 text-primary-hover">{value.split(' ').slice(0, 3).join(' ')}</h4>
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
          Header: "Problem Level",
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
          accessor: "contest_startDate",
          Header: "Date",
          Cell: ({ value, row }) => {
            return <div className="d-flex align-items-center">{value}</div>;
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
              const res = axios.delete(`/api/problemDay/${id}`);
              if (res) {
                AllProblem();
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

    const handleUpdate = async (id,action) => {
      router.push(`/studio/admin/add-new-problem?id=${id}&action=${action}`)
    };
    return (
      <Fragment>
        <div className=" overflow-hidden">
          <Row>
            <Col lg={12} md={12} sm={12} className="mb-lg-0 mb-2 py-4 px-5 ">
              <GlobalFilter
                filter={globalFilter}
                setFilter={setGlobalFilter}
                placeholder="Search Problem"
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
                          <Can I="deleteProblem_of_the_day">
                            <Dropdown.Item
                              eventKey="1"
                              onClick={() => handleDelete(rowData._id)}
                            >
                              <XCircle size="15px" className="me-1" />
                              Delete
                            </Dropdown.Item>
                          </Can>
                          <Can I="editProblem_of_the_day">
                            <Dropdown.Item
                              eventKey="1"
                              onClick={() =>
                                handleUpdate(
                                  rowData._id, "update"
                                )
                              }
                            >
                              <Send size="15px" className="me-1" />
                              Update
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
              <h1 className="mb-1 h2 fw-bold">All Problems</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#">Problems</Breadcrumb.Item>
                <Breadcrumb.Item active>All</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <Can I="createProblem_of_the_day">
                <Link
                  href="/studio/admin/add-new-problem"
                  className="btn btn-info"
                >
                  Add New Problem
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
                    <CoursesTable courses_data={problem} />
                  </Tab.Pane>
                  {/* <Tab.Pane eventKey="approved" className="pb-4">
                    <CoursesTable courses_data={allapprovedcourses} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="pending" className="pb-4">
                    <CoursesTable courses_data={allpendingcourses} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="reject" className="pb-4">
                    <CoursesTable courses_data={allrejectedcourses} />
                  </Tab.Pane> */}
                </Tab.Content>
              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      </Row>
    </Fragment>
  );
};
export const getServerSideProps = async () => {
  try {
    const Problem = await axios.get(`${process.env.NEXTAUTH_URL}/api/problemDay/crudProblem`);
    const Problemdata = Problem?.data?.problems;
    return {
      props: {
        data: Problemdata,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        data: [],
      },
    };
  }
};
export default AllProblem;
