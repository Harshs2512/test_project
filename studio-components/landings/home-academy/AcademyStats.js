// import node module libraries
import {
  Col,
  Row,
  Container,
  Tab,
  Card,
  Nav,
  Image,
  Button,
  Form,
} from "react-bootstrap";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import LatestJobOpening from "./LatestJobOpening";
const AcademyStats = () => {
  const [jobData, setJobData] = useState([]);

  const AllJob = async () => {
    try {
      const job = await axios.get("/api/jobandintern/addjob");
      const data = job && job.data && job.data.jobData;
      setJobData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    AllJob();
  }, []);

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
  return (
    <section className="pb-14 bg-white">
      <Container>
        <Row>
          <Col xl={6} lg={12} md={12} sm={12}>
            <Card className="mb-4">
              {" "}
              <Card.Header className="justify-content-between bg-primary-subtle">
                <div className="d-flex mb-3 justify-content-between">
                  <h3 className="mb-0"> What 's new</h3>{" "}
                  <span>
                    <Link href="#" className="btn btn-outline-info btn-sm">
                      View More{" "}
                    </Link>{" "}
                  </span>{" "}
                </div>{" "}
              </Card.Header>{" "}
              <Card.Body className="p-0">
                <Row className="row-cols-1 row-cols-md-1 g-1">
                  {" "}
                  <Col>
                    <Card className="mb-4 card-hover border rounded mt-4">
                      <div className=" justify-content-between align-items-center p-4">
                        <div className="d-flex">
                          <Link
                            href="#"
                            className="btn btn-outline-info btn-sm"
                          >
                            {" "}
                            Contents{" "}
                          </Link>{" "}
                          <div className="ms-3">
                            <p className="mb-0 fs-6">
                              <span className="me-2">
                                <span className="text-dark fw-medium">
                                  {" "}
                                  python{" "}
                                </span>
                                Courses{" "}
                              </span>{" "}
                              <span>
                                <span className="text-dark fw-medium"> 5 </span>
                                Hours{" "}
                              </span>{" "}
                            </p>{" "}
                          </div>{" "}
                        </div>{" "}
                        <h4 className="m-1">
                          <Link
                            href="/marketing/courses/course-path-single/"
                            className="text-inherit"
                          >
                            Striver Binary Search Contest{" "}
                          </Link>{" "}
                        </h4>{" "}
                      </div>{" "}
                    </Card>{" "}
                  </Col>
                  <Col>
                    <Card className="mb-4 card-hover border rounded mt-4">
                      <div className=" justify-content-between align-items-center p-4">
                        <div className="d-flex">
                          <Link
                            href="#"
                            className="btn btn-outline-info btn-sm"
                          >
                            {" "}
                            Library{" "}
                          </Link>{" "}
                          <div className="ms-3">
                            <p className="mb-0 fs-6">
                              <span className="me-2">
                                <span className="text-dark fw-medium">
                                  {" "}
                                  python{" "}
                                </span>
                                Courses{" "}
                              </span>{" "}
                              <span>
                                <span className="text-dark fw-medium"> 5 </span>
                                Hours{" "}
                              </span>{" "}
                            </p>{" "}
                          </div>{" "}
                        </div>{" "}
                        <h4 className="m-1">
                          <Link
                            href="/marketing/courses/course-path-single/"
                            className="text-inherit"
                          >
                            Striver Binary Search Contest{" "}
                          </Link>{" "}
                        </h4>{" "}
                      </div>{" "}
                    </Card>{" "}
                  </Col>
                </Row>{" "}
              </Card.Body>{" "}
            </Card>
            {/* Card */}
            <Card>
              <Card.Header className="justify-content-between bg-primary-subtle ">
                <div className="d-flex mb-3 justify-content-between">
                  <h3 className="mb-0"> Jobs & Internships </h3>{" "}
                  <span>
                    <Link href="#" className="btn btn-outline-info btn-sm">
                      View More{" "}
                    </Link>{" "}
                  </span>{" "}
                </div>{" "}
              </Card.Header>{" "}
              <Card.Body>
                <div
                  className="job-container"
                  style={{ height: "500px", overflowY: "auto" }}
                >
                  {" "}
                  {jobData.map((job, index) => (
                    <Card
                      key={index}
                      className="mb-4 card-hover border mt-2 bg-gray-100"
                    >
                      <div className="d-flex justify-content-between align-items-center p-2">
                        <div className="d-flex">
                          <Link
                            href="#"
                            className="rounded bg-white"
                          >
                            <Image
                               src={`/api/jobandintern/getthumbnail/${job._id}`}
                              alt="company logo"
                              className="rounded-circle avatar-lg my-3"
                            />
                          </Link>{" "}
                          <div className="ms-3">
                            <h4 className="mb-1">
                              <Link
                                href="#"
                                className="text-inherit"
                              >
                                {" "}
                                {job.job_title}{" "}
                              </Link>{" "}
                            </h4>{" "}
                            <p className="mb-0 fs-6">
                              <span className="me-2">
                                <span className="text-dark fw-medium">
                                  <i className="fas fa-briefcase"> </i>{" "}
                                </span>{" "}
                              </span>{" "}
                              <span>
                                <span className="text-dark fw-medium">
                                  {" "}
                                  {job.company_name}
                                </span>{" "}
                              </span>{" "}
                            </p>{" "}
                            <p className="mb-0 fs-6">
                              <span className="fs-6">
                                Experience :
                                <span className="text-warning">
                                  
                                  {" "}
                                  {job.experience}{" "}
                                </span>{" "}
                                Posted Date :
                                <span className="mdi mdi-star text-warning me-2">      
                                </span>
                                {formatDate(job.createdAt)}
                              </span>{" "}
                            </p>{" "}
                          </div>{" "}
                        </div>{" "}
                      </div>{" "}
                    </Card>
                  ))}{" "}
                </div>{" "}
              </Card.Body>{" "}
            </Card>
          </Col>
          <Col xl={6} lg={12} md={12} sm={12} className="mb-4 mb-xl-0">
            {/*  Card  */}
            <Tab.Container>
              <LatestJobOpening />
            </Tab.Container>{" "}
          </Col>{" "}
        </Row>{" "}
      </Container>{" "}
    </section>
  );
};

export default AcademyStats;
