// import node module libraries
import React, { useMemo, Fragment, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Trash, Edit, MoreVertical } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DotBadge from "components/bootstrap/DotBadge";
import ReactTagInput from "@pathofdev/react-tag-input";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  usePagination,
} from "react-table";
import axios from "axios";
import {
  Card,
  Row,
  Col,
  Dropdown,
  Image,
  Badge,
  Table,
  ListGroup,
  Modal,
  Button,
  Form,
  Switch,
} from "react-bootstrap";
// import MDI icons
import Icon from "@mdi/react";
import { mdiStar } from "@mdi/js";

// import widget/custom components
import {
  FormSelect,
  LevelIcon,
  GlobalFilter,
  Pagination,
  GeeksSEO,
  ReactQuillEditor,
  GKAccordionActions,
  GKAccordionActions2,
} from "widgets";

// import profile layout wrapper
import ProfileLayout from "layouts/marketing/instructor/ProfileLayout";

// import utility file
import { numberWithCommas } from "helper/utils";
import { useSession } from 'next-auth/react';
const MyCourses = (props) => {
  const { data: session } = useSession();
	const userId = session?.user?._id
  const [tags, setTags] = React.useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [pendingmodalShow, setPendingModalShow] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [category, setCategory] = useState("");
  const [coursedata, setCourseData] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [intialdescription, setInitialDescription] = useState("");
  const [description, setDescription] = useState(intialdescription);
  const [content, setContent] = useState("");
  const [showVideoModel, setShowVideoModel] = useState(false);
  const [newVideoURL, setNewVideoURL] = useState("");

  const formData = new FormData();
  formData.append("course_title", coursedata && coursedata.course_title);
  formData.append("course_thumbnail", selectedImage);
  formData.append("course_category", coursedata && coursedata.course_category);
  formData.append("level", coursedata && coursedata.level);
  formData.append("description", description);
  formData.append("requirment", tags);
  formData.append("media", JSON.stringify(coursedata && coursedata.media));
  formData.append("section", JSON.stringify(coursedata && coursedata.section));
  const handleClose = () => {
    setShowVideoModel(false);
  };
  
  const handleUpdateCourse = async () => {
    try {
      const response = await axios.put(
        `/api/courses/addcourse?id=${coursedata._id}`,
        formData
      );
      toast.success("Successfully Update");
      setModalShow(false);
    } catch (error) {
      toast.error("not uppdated course");
      console.error("Error:", error);
    }
  };
  const handleDescriptionChange = (newDescription) => {
    setDescription(newDescription);
  };
  useEffect(() => {
    if (coursedata && coursedata.description) {
      setInitialDescription(coursedata.description);
      setDescription(coursedata.description);
    }
  }, [coursedata]);
  const handleContentChange = (newContent) => {
    setDescription(newContent);
  };
  const fetchCourses = useCallback(async () => {
    try { 
      const response = await axios.get(`/api/courses/getCourseByInstructor?userId=${userId}`);
      setCourseList(response?.data?.courses);
    } catch (error) {
      console.error("Error fetching All courses:/api/courses/getCourseByInstructor", error);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

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

  const ActionMenu = ({ courseId, onEdit }) => {
    const handleDelete = () => {
      axios
        .delete(`/api/courses/${courseId}`)
        .then((response) => {
          courseId;
          toast.success("Course Deleted Successfully");
          fetchCourses();
        })
        .catch((error) => {
          console.error("Error deleting course:", error);
          toast.success("Course Not Deleted Successfully");
        });
    };

    return (
      <Dropdown>
        <ToastContainer />
        <Dropdown.Toggle as={CustomToggle}>
          <MoreVertical size="15px" className="text-secondary" />
        </Dropdown.Toggle>
        <Dropdown.Menu align="end">
          <Dropdown.Header>SETTINGS</Dropdown.Header>
          {/* <Dropdown.Item eventKey="1" onClick={() => setModalShow(true)}> */}
          <Dropdown.Item
            eventKey="1"
            onClick={() => {
              onEdit(courseId);
              setSelectedCourseId(courseId);
            }}
          >
            <Edit size="15px" className="dropdown-item-icon" /> Edit
          </Dropdown.Item>
          <Dropdown.Item eventKey="2" onClick={handleDelete}>
            {" "}
            <Trash size="15px" className="dropdown-item-icon" /> Remove
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };
  const handleEdit = useCallback(
    async (selectedCourseId) => {
      try {
        const response = await axios.get(`/api/courses/${selectedCourseId}`);
        const existingCourse = response.data.course[0];
        setCourseData(existingCourse);
      } catch (error) {
        console.error("Error fetching course:/api/courses/", error);
      }
    },
    [setCourseData]
  );
  const handleOpenUpdateModal = useCallback(() => {
    handleEdit();
    setModalShow(true);
  }, [handleEdit]);

  const handlePendingModal = useCallback((slug) => {
    handleEdit();
    setSelectedCourseId(slug);
    setPendingModalShow(true);
  }, [handleEdit]);
  useEffect(() => {
    if (selectedCourseId !== null) {
      handleEdit(selectedCourseId);
    }
  }, [selectedCourseId, handleEdit]);


  useEffect(() => {
    if (coursedata && coursedata.media && coursedata.media.thumbnail) {
      setThumbnail(coursedata.media.thumbnail);
      setSelectedImage(coursedata.media.thumbnail);
    }
  }, [coursedata]);
  const columns = useMemo(
    () => [
      {
        accessor: "media.thumbnail",
        Header: "Image",
        Cell: ({ value, row }) => {
          if (value && value.contentType && value.data) {
            const imageSrc = `data:${value.contentType};base64,${Buffer.from(
              value.data
            ).toString("base64")}`;
            return (
              <div className="d-lg-flex">
                <div>
                  <Link href="#">
                    <Image
                      src={imageSrc}
                      alt=""
                      className="rounded img-4by3-lg"
                    />
                  </Link>
                </div>
                <div className="ms-lg-3 mt-2 mt-lg-0">
                  <h4 className="mb-1 h5">
                    <Link href="#" className="text-inherit">
                      {row.original.course_title}
                    </Link>
                  </h4>
                  <ListGroup
                    as="ul"
                    bsPrefix="list-inline"
                    className="fs-6 mb-0"
                  >
                    <ListGroup.Item as="li" bsPrefix="list-inline-item">
                      <i className="far fa-clock me-1"></i>
                      10h 50m {row.original.duration}
                    </ListGroup.Item>
                    <ListGroup.Item as="li" bsPrefix="list-inline-item">
                      <LevelIcon level={row.original.level} />
                      {row.original.level}
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </div>
            );
          } else {
            return <div>No thumbnail available</div>;
          }
        },
      },
      {
        accessor: "students",
        Header: "Students",
        Cell: ({ value, row }) => {
          return numberWithCommas(value);
        },
      },
      {
        accessor: "rating",
        Header: "Rating",
        Cell: ({ value, row }) => {
          return (
            <Fragment>
              <span className="text-warning">
                {value}
                <Icon path={mdiStar} size={0.6} />
              </span>
              ({numberWithCommas(row.original.votes)})
            </Fragment>
          );
        },
      },
      {
        accessor: "is_published",
        Header: "Status",
        Cell: ({ value, row }) => {
          return (
            <DotBadge
              bg={
                value === "pending"
                  ? ""
                  : value === "live"
                    ? "success"
                    : value === "reject"
                      ? "danger"
                      : ""
              }
            >
              {value === "pending" ? (
                <Button
                  variant="warning"
                  className="p-1"
                  onClick={() => handlePendingModal(row.original.slug)}
                >
                  Pending
                </Button>
              ) : value === "live" ? (
                "Live"
              ) : value === "reject" ? (
                "Rejected"
              ) : (
                ""
              )}
            </DotBadge>
          );
        },
      },
      {
        accessor: "action",
        Header: "Action",
        Cell: ({ row }) => {
          return (
            <ActionMenu
              courseId={row.original.slug}
              onEdit={() => handleOpenUpdateModal(row.original.slug)}
            />
          );
        },
      },
      {
        accessor: "level",
        Header: "",
        show: false,
      },
      {
        accessor: "votes",
        Header: "",
        show: false,
      },
      {
        accessor: "course_title",
        Header: "",
        show: false,
      },
      {
        accessor: "duration",
        Header: "",
        show: true,
      },
    ],
    [handleOpenUpdateModal, handlePendingModal]
  );

  const data = useMemo(() => courseList, [courseList]);

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
        pageSize: 6,
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

  const sortby = [
    { value: "Date Created", label: "Date Created" },
    { value: "Newest", label: "Newest" },
    { value: "High Rated", label: "High Rated" },
    { value: "Law Rated", label: "Law Rated" },
    { value: "High Earned", label: "High Earned" },
  ];

  const CoursesLevel = [
    { value: "Intermediate", label: "Intermediate" },
    { value: "Beginners", label: "Beginners" },
    { value: "Advance", label: "Advance" },
  ];
  const getcategories = async (req, res) => {
    try {
      const res = await axios.get(`/api/category/getcategories`);
      setCategory(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getcategories();
  }, []);
  const handleChangeCategory = (event) => {
    const { value } = event.target;
    setCourseData({ ...coursedata, course_category: value });
  };
  const handleChange = (e) => {
    const { value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      course_title: value,
    }));
  };
  // ******************************************************************* //
  const [section, setSection] = useState([]);
  useEffect(() => {
    if (coursedata && coursedata.section) {
      const updatedSections = coursedata.section.map((item) => ({
        id: item._id,
        section_title: item.section_name,
        lecture: item.lecture.map((item) => ({
          id: 1,
          lecture_title: item.lecture_name,
          lecture_url: item.videos_details.video,
          description: item.videos_details.description,
          isApproved: item.isApproved,
        })),
      }));
      setSection(updatedSections);
    }
  }, [coursedata]);
  // Delete Lecture
  const handleDeleteLecture = (sectionIndex, lectureIndex) => {
    setSection((prevList) => {
      const updatedSections = [...prevList];
      const updatedLectures = [...updatedSections[sectionIndex].lecture];
      updatedLectures.splice(lectureIndex, 1);
      updatedSections[sectionIndex].lecture = updatedLectures;
      return updatedSections;
    });
  };
  const handleChangeUrl = (e) => {
    const { value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      media: {
        ...prevData.media,
        url: value,
      },
    }));
  };
  const handleLevelChange = (event) => {
    const selectedLevel = event.target.value;
    setCourseData((prevData) => ({
      ...prevData,
      level: selectedLevel,
    }));
  };
  React.useEffect(() => {
    if (coursedata && coursedata.requirment) {
      const parsedTags = coursedata.requirment
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
      setTags(parsedTags);
    }
  }, [coursedata]);
  const videoUrl = (sectionIndex, lectureIndex) => {
    setShowVideoModel(true);
    setCourseData((prevData) => {
      const updatedSections = [...prevData.section];
      const sectionToUpdate = updatedSections[sectionIndex];

      const updatedLectures = [...sectionToUpdate.lecture];
      const lectureToUpdate = updatedLectures[lectureIndex];

      lectureToUpdate.videos_details = {
        description: content,
        video: newVideoURL,
      };

      updatedLectures[lectureIndex] = lectureToUpdate;

      const updatedSection = {
        ...sectionToUpdate,
        lecture: updatedLectures,
      };
      updatedSections[sectionIndex] = updatedSection;

      return {
        ...prevData,
        section: updatedSections,
      };
    });
    setNewVideoURL("");
    setContent("");
  };
  // Add Section
  const AddSection = () => {
    const [show, setShow] = useState(false);
    const [sectionTitleInput, setSectionTitleInput] = useState("");
    const handleClose = () => {
      setShow(false);
      setSectionTitleInput("");
    };
    const handleShow = () => setShow(true);
    // Function to handle adding a new Section
    const handleAddSection = () => {
      if (sectionTitleInput.trim() !== "") {
        const newSection = {
          section_name: sectionTitleInput,
          lecture: [],
        };
        setCourseData((prevData) => ({
          ...prevData,
          section: [...prevData.section, newSection],
        }));
        setSectionTitleInput("");
        handleClose();
      }
    };
    return (
      <Fragment>
        <Button
          variant="outline-primary"
          className="btn btn-outline-primary btn-sm mt-3"
          onClick={handleShow}
        >
          Add Section
        </Button>{" "}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Section</Modal.Title>
          </Modal.Header>
          <Modal.Body className="pb-0">
            <Form.Group className="mb-3" controlId="formaddnewsection">
              <Form.Control
                type="text"
                placeholder="Add new section"
                value={sectionTitleInput}
                onChange={(e) => setSectionTitleInput(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="pt-0 border-0 d-inline ">
            <Button variant="primary" onClick={handleAddSection}>
              Add New Section
            </Button>
            <Button variant="outline-secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  };
  // <.......................>
  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];

    // Check if a file was selected
    if (selectedFile) {
      setSelectedImage(selectedFile);
      setSelectedFileName(selectedFile.name);
    } else {
      // User didn't select an image, so clear the current selection
      setSelectedImage(null);
      setSelectedFileName(null);
    }
  };

  // <.......................>
  const AddLecture = (props) => {
    const { sectionIndex } = props;
    const [show, setShow] = useState(false);
    const [lectureTitleInput, setLectureTitleInput] = useState("");
    const [lectureUrlInput, setLectureUrlInput] = useState("");
    const handleClose = () => {
      setShow(false);
      setLectureTitleInput("");
      setLectureUrlInput("");
    };
    const handleShow = () => setShow(true);
    const handleAddLecture = () => {
      if (lectureTitleInput.trim() !== "") {
        setCourseData((prevData) => {
          const updatedSections = [...prevData.section];
          const sectionToUpdate = updatedSections[sectionIndex];
          if (!sectionToUpdate.lecture) {
            sectionToUpdate.lecture = []; // Initialize the lecture array if it doesn't exist
          }
          const updatedLectures = [
            ...sectionToUpdate.lecture,
            {
              id: (sectionToUpdate.lecture.length + 1).toString(),
              lecture_name: lectureTitleInput,
              videos_details: {
                description: "",
                video: "",
              },
            },
          ];
          const updatedSection = {
            ...sectionToUpdate,
            lecture: updatedLectures,
          };
          updatedSections[sectionIndex] = updatedSection;
          return {
            ...prevData,
            section: updatedSections,
          };
        });

        setLectureTitleInput("");
        setLectureUrlInput("");
        setContent("");
        handleClose();
      }
    };
    // Within your component

    return (
      <Fragment>
        <Button
          variant="outline-primary"
          className="btn btn-outline-primary btn-sm mt-3"
          onClick={handleShow}
        >
          Add Lecture +
        </Button>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Lecture</Modal.Title>
          </Modal.Header>
          <Modal.Body className="pb-0">
            <Form.Group className="mb-3" controlId="formaddnewlecture">
              <Form.Label>Lecture Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add new lecture"
                value={lectureTitleInput}
                onChange={(e) => setLectureTitleInput(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="pt-0 border-0 d-inline ">
            <Button variant="primary" onClick={handleAddLecture}>
              Add New Lecture
            </Button>
            <Button variant="outline-secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  };
  const handleDeleteSection = (sectionIndex) => {
    setCourseData((prevData) => {
      const updatedSections = [...prevData.section];
      updatedSections.splice(sectionIndex, 1);
      return {
        ...prevData,
        section: updatedSections,
      };
    });
  };

  return (
    <ProfileLayout>
      {/* Cybrom SEO settings  */}
      <GeeksSEO title="Instructor Courses | Cybrom Technology Pvt. Ltd." />
      <Card className="border-0">
        <Card.Header>
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">Courses {courseList.length}</h3>
            <p className="mb-0">
              Manage your courses and its update like Accepted, Pending.
            </p>
          </div>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col lg={9} md={7} sm={12} className="mb-lg-0 mb-2">
              <GlobalFilter
                filter={globalFilter}
                setFilter={setGlobalFilter}
                placeholder="Search Your Courses"
              />
            </Col>
            <Col lg={3} md={5} sm={12}>
              <FormSelect options={sortby} placeholder="Sort by" />
            </Col>
          </Row>
        </Card.Body>
        <Card.Body className="p-0 pb-5">
          <Row>
            <Col lg={12} md={12} sm={12}>
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
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row, index) => {
                    prepareRow(row);
                    return (
                      <tr key={index} {...row.getRowProps()}>
                        {row.cells.map((cell, index) => {
                          return (
                            <td key={index} {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
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
      <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>Update Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="courseTitle">Course Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Course Title"
                  value={coursedata?.course_title}
                  onChange={handleChange}
                  name="course_title"
                />

                <Form.Text className="text-muted">
                  Write a 60 character course title.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-5">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={coursedata?.course_category}
                  onChange={handleChangeCategory}
                >
                  <option value="">Select Category</option>
                  {category &&
                    category.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.catName}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Courses level</Form.Label>
                <Form.Select
                  value={coursedata && coursedata.level}
                  onChange={handleLevelChange}
                >
                  <option value="">Select Level</option>
                  {CoursesLevel.map((level, index) => (
                    <option key={index} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="me-5">Type your Description</Form.Label>

                <ReactQuillEditor
                  value={intialdescription}
                  onChange={handleContentChange}
                />
                <Form.Text className="text-danger"></Form.Text>
              </Form.Group>
              {/******************************Course Media***********************************/}
              <Form.Label>Course cover image</Form.Label>
              <Form.Group className="mb-1 input-group">
                <Form.Control
                  id="image"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <Form.Text className="text-muted">
                  Upload your course image here. It must meet our course image
                  quality standards to be accepted. Important guidelines:
                  750x440 pixels; .jpg, .jpeg, .gif, or .png. no text on the
                  image.
                  {selectedFileName && (
                    <div>
                      <p>Selected file: {selectedFileName}</p>
                    </div>
                  )}
                  {thumbnail && thumbnail.contentType && thumbnail.data ? (
                    <div className="d-lg-flex mt-3">
                      <div>
                        <Image
                          src={`data:${thumbnail.contentType
                            };base64,${Buffer.from(thumbnail.data).toString(
                              "base64"
                            )}`}
                          alt=""
                          className="rounded img-4by3-lg"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>No thumbnail available</div>
                  )}
                </Form.Text>
              </Form.Group>
              {/* Video URL  */}
              <Form.Group className="mb-3 mt-3">
                <Form.Label>Video Url</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Video URL"
                  id="VideoURL"
                  value={coursedata?.media?.url}
                  onChange={handleChangeUrl}
                />
                <Form.Text className="text-muted">
                  Enter a valid video URL. Students who watch a well-made promo
                  video are 5X more likely to enroll in your course.
                </Form.Text>
              </Form.Group>
              {/* **************************************Update Carriculam************************** */}
              <Fragment>
                <Form>
                  {/* Card */}
                  <Card className="mb-3  border-0">
                    <Card.Header className="border-bottom px-4 py-3">
                      <h4 className="mb-0">Curriculum</h4>
                    </Card.Header>
                    {/* Card body */}
                    <Card.Body>
                      {section &&
                        section.map((item, index) => (
                          <div
                            className="bg-light rounded p-2 mb-4"
                            key={index}
                          >
                            <h4>{item.section_title}</h4>
                            <GKAccordionActions
                              accordionItems={item.lecture}
                              deleteLecture={(sectionIndex, lectureIndex) =>
                                handleDeleteLecture(
                                  index,
                                  sectionIndex,
                                  lectureIndex
                                )
                              }
                              videoUrl={(sectionIndex, lectureIndex) =>
                                videoUrl(index, sectionIndex, lectureIndex)
                              }
                            />
                            <AddLecture sectionIndex={index} />{" "}
                            <Button
                              variant="outline-primary"
                              className="btn btn-outline-danger btn-sm mt-3"
                              onClick={() => handleDeleteSection(index)}
                            >
                              Delete Section
                            </Button>
                          </div>
                        ))}{" "}
                      <AddSection />
                    </Card.Body>
                  </Card>
                </Form>
                <Modal
                  show={showVideoModel}
                  onHide={handleClose}
                  className="shadow-lg"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Add Video URL</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form.Group controlId="formVideoURL" className="mb-4 ">
                      <Form.Label>Video URL</Form.Label>
                      <Form.Control
                        type="text"
                        value={newVideoURL}
                        onChange={(e) => setNewVideoURL(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="me-5">Description</Form.Label>
                      <ReactQuillEditor
                        value={intialdescription}
                        onChange={handleDescriptionChange}
                      />
                      <Form.Text className="text-danger">
                        {/* Display any content error message here */}
                      </Form.Text>
                    </Form.Group>
                    <Button
                      variant="primary"
                      onClick={handleClose}
                      className="mt-3 me-3"
                    >
                      Submit
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={handleClose}
                      className="mt-3"
                    >
                      Close
                    </Button>
                  </Modal.Body>
                </Modal>
              </Fragment>
              <Card className="mb-3  border-0">
                <Card.Header className="border-bottom px-4 py-3">
                  <h4 className="mb-0">Requirements</h4>
                </Card.Header>
                {/* Card body */}
                <Card.Body>
                  <ReactTagInput
                    tags={tags}
                    onChange={(newTags) => setTags(newTags)}
                  />
                </Card.Body>
              </Card>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="primary" onClick={() => setModalShow(false)}>
            close
          </Button>
          <Button variant="primary" onClick={handleUpdateCourse}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={pendingmodalShow}
        onHide={() => setPendingModalShow(false)}
        size="lg"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>Curriculum</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {/* **************************************Update Carriculam************************** */}
            <Form>
              <Card.Body>
                {section &&
                  section.map((item, index) => (
                    <div className="bg-light rounded p-2 mb-4" key={index}>
                      <h4>{item.section_title}</h4>
                      <GKAccordionActions2
                        accordionItems={item.lecture}
                        isApproved={item}
                      />
                    </div>
                  ))}{" "}
              </Card.Body>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </ProfileLayout>
  );
};

export default MyCourses;
