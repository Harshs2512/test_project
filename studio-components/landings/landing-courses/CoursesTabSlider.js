// import node module libraries
import { Row, Col, Nav, Tab, Card, Image } from "react-bootstrap";
import Link from "next/link";
import { HeroContent } from "studio-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const CoursesTabSlider = () => {
  const [problemCat, setProblemCat] = useState();
  const [problem, setProblem] = useState([]);
  const router = useRouter();
  const colorArray = ["#00d4ff", "#ff8c00", "#32cd32", "#ff1493"];
  const fetchProblem = async () => {
    try {
      const res = await axios.get(`/api/problemDay/crudProblem`);
      setProblem(res?.data?.problems);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProblem();
  }, []);
  const fetchProblemCat = async () => {
    try {
      const cat = await axios.get(`/api/problemDay/crudCategory`);
      const category = cat?.data || [];
      setProblemCat(category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProblemCat();
  }, []);
  const handleShow = async (id) => {
    try {
      const problemData = await axios.get(`/api/problemDay/${id}`);
      const SingleData =problemData?.data?.problem;
      const serializedProblem = JSON.stringify(SingleData);
      const encodedProblem = encodeURIComponent(serializedProblem);
      const url = `/studio/code/Code-single/codedesign?problem=${encodedProblem}`;
      router.push(url);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };
  return (
    <Row>
      <Col md={12}>
        <Tab.Container defaultActiveKey="all">
          <Card className="bg-transparent shadow-none ">
            <Card.Header className="border-0 p-0 bg-transparent ">
              <Nav className="nav-lb-tab bg-light rounded justify-content-center">
                <Nav.Item>
                  <Nav.Link eventKey="all" className="mb-sm-3 mb-md-0">
                    Problem By companies
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="ms-0">
                  <Nav.Link eventKey="question" className="mb-sm-3 mb-md-0">
                    {" "}
                    Top problem list
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="javascript" className="mb-sm-3 mb-md-0">
                    Problem By Topics
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body className="p-0">
              <Tab.Content>
                <Tab.Pane eventKey="all" className="pb-4 p-4 ps-0 pe-0">
                  <HeroContent />
                </Tab.Pane>
                <Tab.Pane eventKey="question" className="pb-4 p-4 ps-0 pe-0">
                  {problem?.slice(0, 6).map((data, index) => (
                    <Row
                      key={index}
                      className="justify-content-between w-75 mx-auto d-flex align-items-center text-white mt-2"
                    >
                      <Col
                        sm={12}
                        lg={12}
                        className="p-3 rounded m-2 border-bottom shadow-lg border-warning"
                        style={{ borderRight: "1px solid #ccc" }}
                      >
                        <div className="d-flex">
                          <i className="fas fa-list text-danger mb-md-0 p-1 mx-2"></i>
                          <h4
                            className="mb-md-0 cursor-pointer "
                            onClick={() => handleShow(data._id)}
                          >
                            {data.contest_title}
                          </h4>
                        </div>
                      </Col>
                    </Row>
                  ))}
                </Tab.Pane>
                <Tab.Pane eventKey="javascript" className="pb-4 p-4 ps-0 pe-0">
                  <Row className="justify-content-between align-items-center text-white g-1">
                    {problemCat?.map((data, index) => (
                        <Col
                          key={index}
                          md={2}
                          className="p-3 border rounded m-2 "
                          style={{
                            backgroundColor:
                              colorArray[index % colorArray.length],
                            width: "260px",
                          }}
                        >
                          <Link href="#">
                            <h5 className="text-white mb-md-0 p-0">
                              {data.catName}
                            </h5>
                          </Link>
                        </Col>
                      ))}
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
        </Tab.Container>
      </Col>
    </Row>
  );
};

export default CoursesTabSlider;
