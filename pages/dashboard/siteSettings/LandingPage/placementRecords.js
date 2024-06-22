// import node module libraries
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import {
  Card,
  Row,
  Col,
  Dropdown,
  Table,
  Button,
  Breadcrumb,
  Modal,
  Form,
  Image
} from "react-bootstrap";
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MoreVertical, Edit, Trash } from "react-feather";



const PlacementRecords = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [allposts, setAllposts] = useState([]);
  const [companyImage, setCompanyImage] = useState([]);
  const [studentImage, setStudentImage] = useState([]);
  const [actiontype, setActiontype] = useState("");
  const [postid, setPostid] = useState("");

  const [formData, setFormData] = useState({
    id: "",
    student_name: "",
    company_name: "",
    company_logo: "",
    student_icon: "",
    course:"",
    Video_url:"",
    position: "",
    percentage: "",
    placed_date: "",
    campus_type: "",
    collage_name: "",
    selected_round: "",
    coding_number: "",

  });
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

  const getPosts = async () => {
    try {
      const res = await axios.get(
        "/api/siteSettings/landingPage/placementRecords/getRecords"
      );
      if (res.status === 200) {
        setAllposts(res.data);
      }
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const columns = useMemo(
    () => [
      { accessor: "id", Header: "ID", show: false },
      {
        accessor: "student_name",
        Header: "Student Name",
        Cell: ({ value, row }) => {
          return (
            <div className="d-flex">
              <Image
                src={
                  row.original._id
                    ? `/api/siteSettings/landingPage/placementRecords/getStudenticon/${row.original._id}`
                    : ""
                }
                alt=""
                className="avatar rounded"
                width={300}
                height={300}
              />
              <Link href="#" className="text-inherit text-center ms-4 h5">
                {value}
              </Link>
            </div>
          );
        },
      },
      {
        accessor: "company_name",
        Header: "Company",
        Cell: ({ value, row }) => {
          return (
            <h5 className="mb-0">
              <div className="d-flex">
                <Image
                  src={
                    row.original._id
                      ? `/api/siteSettings/landingPage/placementRecords/getCompanylogo/${row.original._id}`
                      : ""
                  }
                  alt=""
                  className="avatar rounded"
                  width={300}
                  height={300}
                />
                <Link href="#" className="text-inherit text-center ms-4 h5">
                  {value}
                </Link>
              </div>
            </h5>
          );
        },
      },
      {
        accessor: "createdAt",
        Header: "Created At",
        Cell: ({ value }) => {
          return <span>{formatDate(value)}</span>;
        },
      },
      {
        accessor: "updatedAt",
        Header: "Last Update",
        Cell: ({ value }) => {
          return <span>{formatDate(value)}</span>;
        },
      },
    ],
    []
  );

  const data = useMemo(() => allposts, [allposts]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
      initialState: {
        hiddenColumns: columns.map((column) => {
          if (column.show === false) return column.accessor || column.id;
          else return false;
        }),
      },
    });

  const handleChangeComimg = (e) => {
    setCompanyImage(e.target.files[0]);
    // setThumbnailError(e.target.files[0] ? '' : 'Thumbnail is required');
  };

  const handleChangeStuimg = (e) => {
    setStudentImage(e.target.files[0]);
    // setThumbnailError(e.target.files[0] ? '' : 'Thumbnail is required');
  };

  const actionHandler = async (id, action) => {
    setActiontype(action);
    setPostid(id);
    if (action === "update") {
      setModalOpen(true);
      try {
        await axios
          .get(`/api/siteSettings/landingPage/placementRecords/${id}`)
          .then((response) => {
            setFormData({
              id: response.data._id,
              company_name: response.data.company_name,
              student_name: response.data.student_name,
              position: response.data.position,
              percentage: response.data.percentage,
              course: response.data.course,
              Video_url: response.data.Video_url,
              placed_date: response.data.placed_date,
              campus_type: response.data.campus_type,
              collage_name: response.data.collage_name,
              coding_number: response.data.coding_number,
              selected_round: response.data.selected_round,
            });
          })
          .catch((error) => {
            console.error("Error fetching post content:", error);
          });
      } catch (error) {
        console.log("Error while deleting:", error);
      }
    }
    if (action === "delete") {
      try {
        const res = await axios.delete(
          `/api/siteSettings/landingPage/placementRecords/${id}`
        );
        getPosts();
        toast.success("Post Deleted");
      } catch (error) {
        console.log("Error while deleting:", error);
      }
    }
  };

  const submitData = async () => {
    const data = new FormData();
    data.append("id", formData.id);
    data.append("company_name", formData.company_name);
    data.append("student_name", formData.student_name);
    data.append("position", formData.position);
    data.append("percentage", formData.percentage);
    data.append("course",formData.course);
    data.append("Video_url", formData.Video_url)
    data.append("placed_date", formData.placed_date);
    data.append("campus_type", formData.campus_type);
    data.append("collage_name", formData.collage_name);
    data.append("coding_number", formData.coding_number);
    data.append("selected_round", formData.selected_round);
    data.append("company_logo", companyImage);
    data.append("student_icon", studentImage);
    try {
      if (actiontype === "update") {
        const result = await axios.put(`/api/siteSettings/landingPage/placementRecords/UpdatePlacedRecord`, data);
        if (result.status === 200) {
          toast.success("Record Updated Successfully.");
          setModalOpen(false);
          getPosts();
        }
        if (result.error) {
          toast.error(result.error);
        }
      } else {
        const res = await axios.post("/api/siteSettings/landingPage/placementRecords/addRecord", data);
        if (res) {
          toast.success("placement record Created Success fully");
          getPosts();
          setModalOpen(false);
        } else {
          toast.info("record Already Exist");
        }
        setModalOpen(false);
      }
    } catch (error) {
      toast.error("record Already Exist");
      console.log(error);
    }
  };

  return (
    <Fragment>
      <ToastContainer />
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">Placement Records</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item href="#">Landing</Breadcrumb.Item>
                <Breadcrumb.Item active>Placement Records</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <Button
                className="btn btn-primary"
                onClick={() => setModalOpen(true)}
              >
                Add new Placement
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center border-bottom-0 card-header-height">
              <h4 className="mb-0">All Cards</h4>
              {allposts.length > 4 ? (
                ""
              ) : (
                <h4 className="mb-0 fs-6 text-danger">
                  *Minimum 5 cards required there is only({allposts.length})
                </h4>
              )}
            </Card.Header>
            <Card.Body className="p-0">
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
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                        <td>
                          {/* {loading ? <Loder /> : ''} */}
                          <Dropdown>
                            <Dropdown.Toggle as={CustomToggle}>
                              <MoreVertical
                                size="15px"
                                className="text-secondary"
                              />
                            </Dropdown.Toggle>
                            <Dropdown.Menu align="end">
                              <Dropdown.Header>SETTINGS</Dropdown.Header>
                              <Dropdown.Item
                                eventKey="1"
                                onClick={() =>
                                  actionHandler(rowData._id, "update")
                                }
                              >
                                <Edit
                                  size="15px"
                                  className="dropdown-item-icon"
                                />{" "}
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                eventKey="6"
                                onClick={() =>
                                  actionHandler(rowData._id, "delete")
                                }
                              >
                                <Trash
                                  size="15px"
                                  className="dropdown-item-icon"
                                />{" "}
                                Delete
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
      <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Placement Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group id="difficultyLevel" className="mb-3">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                id="name"
                value={formData.student_name}
                onChange={(e) =>
                  setFormData({ ...formData, student_name: e.target.value })
                }
              />
            </Form.Group>
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
            <Row>
              <Col>
                <Form.Group id="difficultyLevel" className="mb-3">
                  <Form.Label>Position</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Position"
                    name="Position"
                    id="Position"
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group id="difficultyLevel" className="mb-3">
                  <Form.Label>Graduation % ,CGPA</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Graduation % ,CGPA"
                    name="Graduation"
                    id="Graduation"
                    value={formData.percentage}
                    onChange={(e) =>
                      setFormData({ ...formData, percentage: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group id="difficultyLevel" className="mb-3">
                  <Form.Label>Course</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Course"
                    name="Course"
                    id="Course"
                    value={formData.course}
                    onChange={(e) =>
                      setFormData({ ...formData, course: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group id="difficultyLevel" className="mb-3">
                  <Form.Label>Video URL link</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="https://player.vimeo.com/video/864349514?h=09dc3a3113"
                    name="Video_url"
                    id="Video_url"
                    value={formData.Video_url}
                    onChange={(e) =>
                      setFormData({ ...formData, Video_url: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group id="difficultyLevel" className="mb-3">
                  <Form.Label>Placed Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter Placed Date"
                    name="Placement"
                    id="Placement"
                    value={formData.placed_date}
                    onChange={(e) =>
                      setFormData({ ...formData, placed_date: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group id="difficultyLevel" className="mb-3">
                  <Form.Label>Campus</Form.Label>
                  <Form.Select
                    as="select"
                    id="Campus_type"
                    value={formData.campus_type}
                    onChange={(e) =>
                      setFormData({ ...formData, campus_type: e.target.value })
                    }
                  >
                    <option value="full-time">select</option>
                    <option value="On-Campus">On-Campus</option>
                    <option value="off-Campus">off-Campus</option>
                  </Form.Select>
                </Form.Group>

              </Col>
            </Row>
            <Form.Group id="difficultyLevel" className="mb-3">
              <Form.Label>Collage Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Collage Name"
                id="Collage"
                value={formData.collage_name}
                onChange={(e) =>
                  setFormData({ ...formData, collage_name: e.target.value })
                }
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group id="difficultyLevel" className="mb-3">
                  <Form.Label>Selected Round</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Round of Selected"
                    name="Round"
                    id="Round"
                    value={formData.selected_round}
                    onChange={(e) =>
                      setFormData({ ...formData, selected_round: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group id="difficultyLevel" className="mb-3">
                  <Form.Label>Coding Problem no.</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Coding Problem no."
                    name="Problem"
                    id="Problem"
                    value={formData.coding_number}
                    onChange={(e) =>
                      setFormData({ ...formData, coding_number: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group id="difficultyLevel" className="mb-3">
              <Form.Label>Company Logo</Form.Label>
              <span className="ms-2 fs-6">dementions should be 150 X 153</span>
              <Form.Control
                id="comimage"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChangeComimg}
              />
            </Form.Group>
            <Form.Group id="difficultyLevel" className="mb-3">
              <Form.Label>Student Image</Form.Label>
              <Form.Control
                id="stuimage"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChangeStuimg}
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
    </Fragment>
  );
};

export default PlacementRecords;
