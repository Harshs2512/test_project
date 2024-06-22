// import node module libraries
import {
  Row,
  Col,
  Image,
  Card,
  Button,
  Container,
  Badge,
} from "react-bootstrap";
import Link from "next/link";
const HeroFormLeft = () => {
  return (
    <section className="pb-8 bg-white">
      <Container>
        <Row>
          <Col xl={{ offset: 1, span: 10 }} sm={12}>
            <div className="text-center mb-8">
			  <h2 className="mb-1 display-4  text-uppercase">Problem of today</h2>
            </div>
            <section className="mb-4">
              <div>
                <div className="d-md-flex bg-warning ">
                  <div className="ms-md-3 mt-3 mt-xl-1">
                    <div className="d-sm-block d-md-flex justify-content-between mb-2">
                      <div className="mb-2 mb-md-0">
                        <h3 className="mb-4 fs-4 text-break">
                          ` It looks like there might be a small typo in your
                          question, but I assume you're asking for a "Warm-up
                          Activity Question" related to a coding problem.
                          If that's the case, here's a simple coding problem
                          along with a question to warm up your problem-solving
                          skills:`
                        </h3>
                        <Badge bg="success" className="ms-0">
                          {" "}
                          Flipkart
                        </Badge>{" "}
                        <Badge bg="success" className="ms-0">
                          {" "}
                          Amazon
                        </Badge>
                        <div className="my-4 mb-md-0">
                          <span className="me-2">
                            <Badge bg="light" className="ms-1 text-success">
                              Easy
                            </Badge>
                          </span>
                          <span className="me-2">
                            <Badge bg="light" className="ms-1 text-success">
                              1.6k
                            </Badge>
                          </span>
                          <span className="me-2">
                            <Badge bg="light" className="ms-1 text-success">
                              16.5%
                            </Badge>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="p-2">
                    <Link className="btn btn-outline-info" href="#">
                      Solve Problem
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default HeroFormLeft;
