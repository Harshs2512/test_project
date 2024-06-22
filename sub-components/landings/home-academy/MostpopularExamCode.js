import React, { Fragment, useState } from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
import { useRouter } from "next/router";
const MostpopularExamCode = () => {
  const router=useRouter()
  const cardHoverStyle = {
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer', // Change cursor to a pointer
  };

  const cardHoveredStyle = {
    transform: 'scale(1.05)',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    borderColor: 'red',
    cursor: 'pointer', // Change cursor to a pointer
  };

  // Track hover state for each card individually
  const [isHovered, setIsHovered] = useState({ card1: false, card2: false });

  const handleMouseEnter = (card) => {
    setIsHovered({ ...isHovered, [card]: true });
  };

  const handleMouseLeave = (card) => {
    setIsHovered({ ...isHovered, [card]: false });
  };

  return (
    <Fragment>
      <section className="pb-lg-14 pb-8">
        <Container>
          <Row>
            <Col xs={12}>
              <div className="mb-6">
                <h2 className="mb-1 h1">Most Popular In Cybrom</h2>
                <p>
                  These are the most popular practice coding among Cybrom
                  Courses learners worldwide in the year 2023
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={5} className="mb-4 m-3">
              <Card   onClick={()=>{
                router.push("/authentication/sign-up")
              }}
                className="text-center"
                style={
                  isHovered.card1
                    ? { ...cardHoverStyle, ...cardHoveredStyle }
                    : cardHoverStyle
                }
                onMouseEnter={() => handleMouseEnter("card1")}
                onMouseLeave={() => handleMouseLeave("card1")}
              >
                <Card.Header>
                  <Card.Body>
                    <h1>Coding Practice</h1>
                    <h4>Click here for registration</h4>
                  </Card.Body>
                </Card.Header>
              </Card>
            </Col>
            <Col md={5} className="mb-4 m-3">
              <Card   onClick={()=>{
                router.push("/authentication/sign-up")
              }}
                className="text-center"
                style={
                  isHovered.card2
                    ? { ...cardHoverStyle, ...cardHoveredStyle }
                    : cardHoverStyle
                }
                onMouseEnter={() => handleMouseEnter("card2")}
                onMouseLeave={() => handleMouseLeave("card2")}
              >
                <Card.Header>
                  <Card.Body>
                    <h1>Coding Contest</h1>
                    <h4>Click here for registration</h4>
                  </Card.Body>
                </Card.Header>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default MostpopularExamCode;
