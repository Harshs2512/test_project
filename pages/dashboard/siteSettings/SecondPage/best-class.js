import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import {
  Card,
  Row,
  Col,
  Dropdown,
  Image,
  Table,
  Button,
  Breadcrumb,
  Modal,
  Form,
} from "react-bootstrap";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Link from "next/link";

// import custom components
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MoreVertical, Edit, Trash } from "react-feather";

const OurPrograms = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [allposts, setAllposts] = useState([]);

  const [actiontype, setActiontype] = useState("");
  const [postid, setPostid] = useState("");
  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    description: "",
    image: "",
  });
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

  const getAllData = async () => {
    try {
      const res = await axios.get(
        "/api/siteSettings/secondPage/BestInClass/addRecord"
      );
      const dataAll = res?.data?.Data;
      if (res.status === 200) {
        setAllposts(dataAll);
      }
    } catch (error) {
      console.log("Error fetching data best in class:", error);
    }
  };
  useEffect(() => {
    getAllData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessor: "title",
        Header: "Title",
        Cell: ({ value, row }) => {
          return (
            <div className="mb-0 d-flex w-10">
              <Image
                src={`/api/siteSettings/secondPage/BestInClass/getlogo/${row.original._id}`}
                className="w-50 h-50"
                alt="programs"
              />
              <Link href="#" className="ms-4">
                {value}
              </Link>
            </div>
          );
        },
        Cell: ({ value, row }) => {
          return (
            <Link href="#" className="text-inherit">
              <div className="d-lg-flex align-items-center">
                <div>
                  <Image
                    src={`/api/siteSettings/secondPage/BestInClass/getlogo/${row.original._id}`}
                    alt=""
                    className="img-4by3-lg rounded"
                  />
                </div>
                <div className="ms-lg-3 mt-2 mt-lg-0">
                  <h4 className="mb-1 text-primary-hover">
                    {value.split(" ").slice(0, 3).join(" ")}
                  </h4>
                </div>
              </div>
            </Link>
          );
        },
      },
      {
        accessor: "description",
        Header: "Descriptions",
        Cell: ({ value }) => {
          return (
            <div className="mb-0 d-flex w-10">
              {value.split(" ").slice(0, 3).join(" ")}
            </div>
          );
        },
      },
    ],
    [allposts]
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

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenModal = (action) => {
    setActiontype(action);
    setModalOpen(true);
  };

  const actionHandler = async (rowData, action) => {
    setActiontype(action);
    setPostid(rowData._id);
    if (action === "update") {
      setModalOpen(true);
      setFormData({
        title: rowData.title,
        description: rowData.description,
      });

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

        const result = await swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
        });
        if (result.isConfirmed) {
            const res = await axios.delete(
                `/api/siteSettings/secondPage/BestInClass/addRecord?id=${id}`
            );
            if (res.status === 200) {
                swalWithBootstrapButtons.fire(
                    "Deleted!",
                    "Your file has been deleted.",
                    "success"
                );
                getAllData();
            } else {
                toast.error("Something went wrong");
            }
        }
    } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
    }
};
  const submitData = async () => {
    if (actiontype === "update") {
      try {
        const data = new FormData();
        data.append("id", postid);
        data.append("description", formData.description);
        data.append("title", formData.title);

        if (formData.image) {
          data.append("image", formData.image);
        } else {
          toast.warning("Please select image");
        }
        const res = await axios.put(
          `/api/siteSettings/secondPage/BestInClass/addRecord`,
          data
        );
        if (res.status === 201) {
          toast.success("Data Updated Success fully");
          getAllData();
        } else {
          toast.info("Data Already Exist");
        }
        setModalOpen(false);
      } catch (err) {
        toast.error(err);
        console.log(err);
      }
    } else {
      try {
        const data = new FormData();
        data.append("description", formData.description);
        data.append("title", formData.title);

        if (formData.image) {
          data.append("image", formData.image);
        } else {
          toast.warning("Please select image");
        }
        const res = await axios.post(
          "/api/siteSettings/secondPage/BestInClass/addRecord",
          data
        );
        if (res.status === 201) {
          toast.success("Data Created Success fully");
          setFormData({
            description: "",
            image: "",
            title: "",
          });
          setModalOpen(false);
          getAllData();
        } else {
          toast.info("DAta Already Exist");
        }
        setModalOpen(false);
      } catch (err) {
        toast.error(err.response.data.error);
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
              <h1 className="mb-1 h2 fw-bold">Best In Class</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item href="#">Landing</Breadcrumb.Item>
                <Breadcrumb.Item active>Offline programms</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <Button
                className="btn btn-primary"
                onClick={() => handleOpenModal("post")}
              >
                Add new
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center border-bottom-0 card-header-height">
              <h4 className="mb-0">Offline Programms</h4>
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
                                onClick={() => actionHandler(rowData, "update")}
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
                                  handleDelete(rowData._id)
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
      <Modal show={modalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Program</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="py-2">
              <Form.Label htmlFor="title">Data Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter here"
                name="title"
                id="title"
                value={formData.title}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  });
                }}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="description"> Description</Form.Label>
              <Form.Control
                type="text-area"
                placeholder="enter here"
                name="Description"
                id="Description"
                value={formData.description}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  });
                }}
                required
              />
              <Form.Text className="text-muted">
                Write a 30 word why us Description.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>First Image</Form.Label>
              <Form.Control
                type="file"
                name={`logo_one`}
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    image: e.target.files[0],
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => submitData()}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default OurPrograms;
