import {
  Container,
  Badge,
  Button,
  Form,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import GKOdometer from "widgets/odometer/GKOdometer";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
const HeroAcademy = () => {
  const [contests,setContest] = useState([])
  const latestContests = contests;
  let latestContest = null;
  if (latestContests?.length > 0) {
    latestContest = latestContests[latestContests.length - 1];
  }
  const [datauser, setDatauser] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useRouter();
  const { data: session } = useSession();
  const C_id = latestContest && latestContest._id;
  const currentDate = new Date();
  const startDate = new Date(latestContest && latestContest.contest_startDate);
  const endDate = new Date(latestContest && latestContest.contest_endDate);

  const showRegisterButton = currentDate < startDate;
  const showLiveBadge = startDate < endDate;
  const showExpire = currentDate > endDate;

  let formattedDate = "";
  if (!isNaN(startDate)) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    };
    formattedDate = startDate.toLocaleDateString(undefined, options);
  } else {
    console.log("Invalid date");
  }
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    contactNumber: "",
    qualification: "",
    message: "",
  });
  const email = session?.user?.email;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await axios.get("/api/Contest/contestUser/contestUser"
        );
        const userDataArray = userData?.data;
        setDatauser(userDataArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const ContestData = async () => {
    try {
      const contest = await axios.get("/api/Contest/crudContest");
      const contestsData = contest?.data?.Contests || [];
      setContest(contestsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    ContestData();
  },[]);
  const GoCode = async () => {
    const serializedProblem = JSON.stringify(latestContest);
    const encodedProblem = encodeURIComponent(serializedProblem);
    const url = `/studio/challange/Code-single/codedesign?problem=${encodedProblem}`;
    router.push(url);
  };
  const handleSubmit = async (e) => {
    const contest_id = latestContest?._id;
    const formDataWithContestId = {
      ...formData,
      contest_id: contest_id,
    };
    e.preventDefault();
    try {
      const UserData = await axios.post(
        "/api/Contest/contestUser/contestUser",
        formDataWithContestId
      );
      toast.success("Successfully Registred this Contest");
      setFormData({
        full_name: "",
        email: "",
        contactNumber: "",
        qualification: "",
        message: "",
      });
      handleClose();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("this email is already exist");
      } else if (error.response && error.response.status === 405) {
        toast.error("Enter Valid email id");
      } else {
        console.error("Submission error:", error.message);
      }
      console.error("Submission error:", error.message);
    }
  };

  return (
    <Container className="bg-white py-8 ms-lg-60 mx-auto ">
      <ToastContainer />
      <section
        className="align-items-center rounded d-flex flex-column flex-md-row"
        style={{
          maxheight: "270px",
          maxWidth: "1137px",
          backgroundImage: 'url("/images/background/Contest-Banner.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          margin: "auto",
        }}
      >
        <div className="ms-lg-12 ms-md-4 text-center text-md-start mb-md-0 w-lg-50 w-100">
          <h1 className="text-white text-sm text-sm-md">
            {latestContest?.contest_title}
          </h1>
          <div className="mb-md-0 mt-2">
            <span>
              <Badge bg="light" className="ms-1 text-success">
                {latestContest?.contest_level}
              </Badge>
            </span>
            <span>
              <Badge bg="light" className="ms-1 text-success">
                1.6k
              </Badge>
            </span>
            <span>
              <Badge bg="light" className="ms-1 text-success">
                16.5%
              </Badge>
            </span>
          </div>
          <div className="ml-12 w-100 mt-lg-8 mt-2">
            <h3 className="text-white fs-lg-2 fs-md-2 fs-sm-1">
              {formattedDate}
            </h3>
          </div>
        </div>
        {showRegisterButton === true ? (
          <div
            className="p-lg-2 text-md-end text-center w-100 w-lg-50 text-sm-center text-md-center fs-sm-4 justify-content-end"
            style={{ top: 0, right: 0, textAlign: "end", color: "black" }}
          >
            <div className="my-lg-2 mx-lg-12">
              <GKOdometer targetDate={formattedDate} />
            </div>
            <div className="mx-4 top-0 end-0">
              <Button
                className="btn btn-white text-warning"
                onClick={handleShow}
              >
                Register now
              </Button>
            </div>
          </div>
        ) : showExpire === true ? (
          <div className="mx-4 top-0 end-0 ms-lg-20 w-lg-25 ">
            <div className=" mx-lg-12">
              <Button className="btn btn-white text-warning ">Expired</Button>
            </div>
          </div>
        ) : (
          showLiveBadge === true && (
            <div className="mx-4 top-0 end-0 ms-lg-20 w-lg-25 ">
              <div className=" mx-lg-12">
                <Button
                  className="btn btn-white text-warning "
                  onClick={GoCode}
                >
                  Live now
                </Button>
              </div>
            </div>
          )
        )}
      </section>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        {" "}
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>First Fill this form</Modal.Title>
          </Modal.Header>
          <Modal.Body className="pb-0">
            <Row>
              {/* Project's Name */}
              <Col xs={12} className="mb-3">
                <Form.Group>
                  <Form.Label>
                    Enter Full Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your full name"
                    value={formData.full_name}
                    onChange={(e) =>
                      setFormData({ ...formData, full_name: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} className="mb-3">
                <Form.Group>
                  <Form.Label>
                    Email-Id<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email id"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} className="mb-3 d-flex gap-4">
                <Form.Group>
                  <Form.Label>
                    Contact Number <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your contact number"
                    value={formData.contactNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contactNumber: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Qualification<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your Qualification"
                    value={formData.qualification}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        qualification: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              {/* Description */}
              <Col xs={12} className="mb-3">
                <Form.Group controlId="formProjectBrief">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter About yourself..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="pt-0 border-0 d-inline ">
            <Col xs={12}>
              <Button variant="info" type="submit">
                Submit
              </Button>
              {/* <Button variant="info" type="submit" onClick={codePage}>
              Submit
            </Button> */}
              <Button
                onClick={handleClose}
                variant="outline-info"
                className="ms-2"
              >
                Close
              </Button>
            </Col>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default HeroAcademy;
