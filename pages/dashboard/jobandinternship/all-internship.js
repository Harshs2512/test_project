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
import Loading from "../../loading";
import ReactTagInput from "@pathofdev/react-tag-input";
import { Can } from "utils/accessControl";
const AllInternship = (props) => {
  const defaulttags = ["HTML", "Python"];
  const [action, setAction] = useState("");
  const [tags, setTags] = React.useState(defaulttags);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [companyImage, setCompanyImage] = useState();
  const data = props?.data;
  const jobData = data?.filter((job) => job.post_type === "internship");
  const [formData, setFormData] = useState({
    job_title: "",
    experience: "",
    sallary: "",
    qualification: "",
    post_type: "",
    company_name: "",
    description: "",
    location: "",
  });
  const handleChangeComimg = (e) => {
    setCompanyImage(e.target.files[0]);
  };

  const submitData = async () => {
    const data = new FormData();
    data.append("id", formData.id);
    data.append("job_title", formData.job_title);
    data.append("experience", formData.experience);
    data.append("sallary", formData.sallary);
    data.append("qualification", formData.qualification);
    data.append("post_type", formData.post_type);
    data.append("company_name", formData.company_name);
    data.append("companyImage", companyImage);
    data.append("skils", tags);
    data.append("description", formData.description);
    data.append("location", formData.location);
    try {
      if (action === "update") {
        const result = await axios.put(`/api/jobandintern/addjob`, data);
        if (result.status === 200) {
          toast.success("Updated");
          setModalOpen(false);
          setFormData({
            ...formData,
            id: "",
            job_title: "",
            experience: "",
            sallary: "",
            qualification: "",
            post_type: "",
            company_name: "",
            description: "",
            location: "",
          });
        }
        if (result.error) {
          toast.error(result.error);
        }
      } else {
        const res = await axios.post("/api/jobandintern/addjob", data);
        if (res) {
          toast.success("Created Success fully");
          setFormData({
            ...formData,
            id: "",
            job_title: "",
            experience: "",
            sallary: "",
            qualification: "",
            post_type: "",
            company_name: "",
            description: "",
            location: "",
          });
          setModalOpen(false);
        } else {
          toast.info("Job Already Exist");
        }
        setModalOpen(false);
      }
    } catch (error) {
      toast.error("This category is exist!");
      console.log(error);
    }
  };
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
          accessor: "job_title",
          Header: "Job Title",
          Cell: ({ value, row }) => {
            return (
                <div className="d-lg-flex align-items-center">
                  <div>
                    <Image
                      src={`/api/jobandintern/getthumbnail/${row.original._id}`}
                      alt="image"
                      className="avatar rounded"
                      width={300}
                      height={300}
                    />
                  </div>
                  <div className="ms-lg-3 mt-2 mt-lg-0">
                      <h4 className="mb-1 text-primary-hover">{value}</h4>
                    <span className="text-inherit">
                      {formatDate(row.original.createdAt)}
                    </span>
                  </div>
                </div>
            );
          },
        },
        {
          accessor: "experience",
          Header: "Experience",
          Cell: ({ value, row }) => {
            return <div className="d-lg-flex align-items-center">{value}</div>;
          },
        },
        {
          accessor: "sallary",
          Header: "Sallary",
          Cell: ({ value, row }) => {
            return <div className="d-flex align-items-center">{value}</div>;
          },
        },
        {
          accessor: "qualification",
          Header: "Qualification",
          Cell: ({ value, row }) => {
            return <div className="d-flex align-items-center">{value}</div>;
          },
        },
        {
          accessor: "company_name",
          Header: "Company Name",
          Cell: ({ value, row }) => {
            return <div className="d-flex align-items-center">{value}</div>;
          },
        },
        {
          accessor: "location",
          Header: "Location",
          Cell: ({ value, row }) => {
            return <div className="d-flex align-items-center">{value}</div>;
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
              const res = axios.delete(`/api/jobandintern/${id}`);
              if (res) {
                toast.danger("Deleted Success fully");
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

    const handleUpdate = async (contestId, action) => {
      if (action === "update") {
        try {
          setModalOpen(true);
          const res = await axios.get(`/api/jobandintern/${contestId}`);
          setFormData({
            ...formData,
            id: res.data.contest._id,
            job_title: res.data.contest.job_title,
            experience: res.data.contest.experience,
            sallary: res.data.contest.sallary,
            qualification: res.data.contest.qualification,
            post_type: res.data.contest.post_type,
            description: res.data.contest.description,
            location: res.data.contest.location,
            company_name: res.data.contest.company_name,
          });
          // setTags(res.data.contest.skils);
          setAction(action);
          // setId(id);
        } catch (error) {
          console.log("Error while deleting:", error);
        }
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
                placeholder="Search Problem"
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
                            <Can I="deleteJobs">
                              <Dropdown.Item
                                eventKey="1"
                                onClick={() => handleDelete(rowData._id)}
                              >
                                <XCircle size="15px" className="me-1" />
                                Delete
                              </Dropdown.Item>
                            </Can>
                            <Can I="editJobs">
                              <Dropdown.Item
                                eventKey="1"
                                onClick={() => handleUpdate(rowData._id, "update")}
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
              <h1 className="mb-1 h2 fw-bold">All Internship</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#">Internship</Breadcrumb.Item>
                <Breadcrumb.Item active>All</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <Can I="createJobs">
                <Button
                  className="btn btn-info"
                  onClick={() => setModalOpen(true)}
                >
                  Add New Job
                </Button>
              </Can>
            </div>
          </div>
        </Col>
      </Row>
      <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group id="difficultyLevel" className="mb-3">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter job title"
                value={formData.job_title}
                onChange={(e) =>
                  setFormData({ ...formData, job_title: e.target.value })
                }
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group id="difficultyLevel" className="mb-3">
                  <Form.Label>Experience</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Experience"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group id="difficultyLevel" className="mb-3">
                  <Form.Label>Sallary</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Sallary"
                    id="comname"
                    value={formData.sallary}
                    onChange={(e) =>
                      setFormData({ ...formData, sallary: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group id="difficultyLevel" className="mb-3">
                  <Form.Label>Required Education</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Qualification"
                    id="comname"
                    value={formData.qualification}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        qualification: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group id="difficultyLevel" className="mb-3">
                  <Form.Label>Post type</Form.Label>
                  <Form.Select
                    as="select"
                    id="postType"
                    value={formData.post_type}
                    onChange={(e) =>
                      setFormData({ ...formData, post_type: e.target.value })
                    }
                  >
                    <option value="full-time">select</option>
                    <option value="job">Job</option>
                    <option value="internship">Internship</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group id="difficultyLevel" className="mb-3">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Company Name"
                    id="comname"
                    value={formData.company_name}
                    onChange={(e) =>
                      setFormData({ ...formData, company_name: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group id="difficultyLevel" className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Location"
                    id="comname"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group id="difficultyLevel" className="mb-3">
              <Form.Label>Company Logo</Form.Label>
              <Form.Control
                id="comimage"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChangeComimg}
              />
            </Form.Group>
            <Form.Group id="difficultyLevel" className="mb-3">
              <Form.Label>Required Skils</Form.Label>
              <Card.Body>
                <ReactTagInput
                  tags={tags}
                  onChange={(newTags) => setTags(newTags)}
                />
              </Card.Body>
            </Form.Group>
            <Form.Group id="difficultyLevel" className="mb-3">
              <Form.Label>Write Description</Form.Label>
              <Form.Control
                as="textarea"
                aria-label="With textarea"
                value={formData.description}
                placeholder="Enter job description"
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={submitData}>
            Save
          </Button>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
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
                  {/* <Nav.Item>
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
                  </Nav.Item> */}
                </Nav>
              </Card.Header>
              <Card.Body className="p-0">
                <Tab.Content>
                  <Tab.Pane eventKey="all" className="pb-4">
                    <CoursesTable courses_data={jobData} />
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
    const job = await axios.get(`${process.env.NEXTAUTH_URL}/api/jobandintern/addjob`);
    const data = job?.data?.jobData;
    return {
      props: {
        data: data,
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
export default AllInternship;
