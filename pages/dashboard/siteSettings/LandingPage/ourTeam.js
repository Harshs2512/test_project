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
const OurTeam = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [allposts, setAllposts] = useState([]);
  const [image, setImage] = useState([]);
  const [actiontype, setActiontype] = useState("");
  const [postid, setPostid] = useState("");

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    position: "",
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
  const addNewMember = () => {
    setModalOpen(true);
    setFormData({
      id: "",
      name: "",
      position: "",
    });
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
      const res = await axios.get("/api/about/addRecord");
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
        accessor: "name",
        Header: "Name",
        Cell: ({ value, row }) => {
          return (
            <div className="">
              <Image
                src={`/api/about/getStudenticon/${row.original._id}`}
                alt=""
                className="img-fluid avatar rounded "
              />
              <Link href="#" className="text-inherit text-center ms-2 h5">
                {value}
              </Link>
            </div>
          );
        },
      },
      {
        accessor: "position",
        Header: "Designation",
        Cell: ({ value }) => {
          return (
            <div>
              <h4>{value} </h4>
            </div>
          );
        },
      },
      {
        accessor: "createdAt",
        Header: "Created Date",
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

  const handleChangeStuimg = (e) => {
    setImage(e.target.files[0]);
    // setThumbnailError(e.target.files[0] ? '' : 'Thumbnail is required');
  };

  const actionHandler = async (id, action) => {
    setActiontype(action);
    setPostid(id);
    if (action === "update") {
      setModalOpen(true);
      try {
        await axios
          .get(`/api/about/${id}`)
          .then((response) => {
            setFormData({
              id: response.data._id,
              name: response.data.name,
              position: response.data.position,
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
        const res = await axios.delete(`/api/about/${id}`);
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
    data.append("name", formData.name);
    data.append("position", formData.position);
    data.append("image", image);
    try {
      if (actiontype === "update") {
        const result = await axios.put(`/api/about/UpdateRecord`, data);
        if (result.status === 200) {
          toast.success("Record Updated Successfully.");
          setModalOpen(false);
          getPosts();
        }
        if (result.error) {
          toast.error(result.error);
        }
      } else {
        const res = await axios.post("/api/about/addRecord", data);
        if (res) {
          toast.success("new Member Added Successfully");
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
              <h1 className="mb-1 h2 fw-bold">Our Team</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item href="#">Landing</Breadcrumb.Item>
                <Breadcrumb.Item active>Our Team</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <Button
                className="btn btn-primary"
                onClick={() => addNewMember()}
              >
                Add new Member
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center border-bottom-0 card-header-height">
              <h4 className="mb-0">All Records ({allposts.length})</h4>
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
          <Modal.Title>Add Team Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group id="difficultyLevel" className="mb-3">
              <Form.Label>Member Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
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
            </Row>
            <Form.Group id="difficultyLevel" className="mb-3">
              <Form.Label>Profile Image</Form.Label>
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

export default OurTeam;
