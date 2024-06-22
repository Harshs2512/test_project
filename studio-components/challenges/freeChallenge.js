import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import {
  Col,
  Row,
  Container,
  Card,
  ListGroup,
  Image,
  Badge,
  Button,
  Offcanvas,
  Modal,
  Form,
} from "react-bootstrap";
import Link from "next/link";
import { AvatarGroup, Avatar } from "components/bootstrap/Avatar";
import ProjectTeamMembersData from "data/dashboard/projects/ProjectTeamMembersData";
import { useRouter } from "next/router";
const ChallengesCard = (props) => {
  const AllData = props?.data;
  const latestContest = Object.values(AllData)
  .filter(item => (item.currentprice === '0' || parseInt(item.currentprice) === 0) && item.is_published === 'live');

  const handleShow = async (CardData) => {
    try {
        const serializedProblem = JSON.stringify(CardData);
        const encodedProblem = encodeURIComponent(serializedProblem);
        const url = `/studio/challange/Code-single/codedesign?problem=${encodedProblem}`;
        router.push(url);
    } catch (error) {
      console.error("Error fetching  data", error);
    }
  };
  const [showAllCards, setShowAllCards] = useState(false);
  const visibleCards = showAllCards
    ? latestContest
    : latestContest && latestContest.slice(0, 6);
  const MAX_AVATARS = 5;

  const displayedMembers = ProjectTeamMembersData.slice(0, MAX_AVATARS);
  const remainingCount = Math.max(
    ProjectTeamMembersData.length - MAX_AVATARS,
    0
  );
  const router = useRouter();
  return (
    <Container>
      <section className="pt-lg-12 pb-lg-3 pt-8 pb-6 mx-auto">
        <Container>
          <Row className="mb-4">
            <Col>
              <div>
                <h1>Free Code challenge</h1>
                <p>
                  Ready to level up your coding skills? Join our code challenge,
                  where you can participate, practice, and unleash your full
                  coding potential.
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <h3>Basic challenges</h3>
                  <p>
                    Dive into our exclusive, time-limited challenges and unlock
                    amazing rewards from top tech giants.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
          <Container fluid>
            <Row>
              {visibleCards &&
                visibleCards.map((card, index) => (
                  <Col key={index} xs={12} sm={6} md={6} lg={4}>
                    <Card className="mb-4 card-hover ">
                      {/* Card body  */}
                      <Card.Body className="p-1 m-1">
                        <div className="align-items-start g-0 position-relative ">
                          <Badge className=" bg-success pill position-absolute top-0 end-0">
                            Live 
                          </Badge>
                           <Image
                            src={`/api/Contest/getthumbnail/${card && card._id}`}
                            className="img-fluid rounded "
                            alt={`Contest ${card._id}`}
                          />
                        </div>
                        <h3 className="h4 mb-2 text-truncate-line-2 my-4">
                          <Link href="#" className="text-inherit">
                            {card.contest_title}
                          </Link>
                        </h3>
                        <ListGroup
                          as="ul"
                          bsPrefix="list-inline"
                          className="mb-3 d-flex justify-content-between mt-6"
                        >
                          <ListGroup.Item as="li" bsPrefix="list-inline-item">
                            <span>Started on</span>
                          </ListGroup.Item>
                          <ListGroup.Item as="li" bsPrefix="list-inline-item">
                            <span>Ending on </span>
                          </ListGroup.Item>
                        </ListGroup>
                        <ListGroup
                          as="ul"
                          bsPrefix="list-inline"
                          className="mb-3 d-flex justify-content-between"
                        >
                          <ListGroup.Item as="li" bsPrefix="list-inline-item">
                            <span className="fw-bold">
                              {card.contest_startDate}
                            </span>
                          </ListGroup.Item>
                          <ListGroup.Item as="li" bsPrefix="list-inline-item">
                            <span className="fw-bold">
                              {card.contest_endDate}
                            </span>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                      {/* Card Footer */}
                      <Card.Footer>
                        <Row>
                          <Col className="col-auto">
                            <AvatarGroup>
                              {displayedMembers.map((member, index) => (
                                <Avatar
                                  size="md"
                                  src={member.image}
                                  type={`${
                                    member.image == null ? "initial" : "image"
                                  }`}
                                  name={member.name}
                                  className="rounded"
                                  imgtooltip
                                  key={index}
                                />
                              ))}
                              {remainingCount > 0 && (
                                <Avatar
                                  size="md"
                                  type="initial"
                                  name={`+${remainingCount}`}
                                  variant="light"
                                  className="rounded text-dark"
                                  showExact
                                />
                              )}
                            </AvatarGroup>
                          </Col>
                          <Col className="col-auto mt-2">
                            <small>Enrolled Student</small>
                          </Col>
                        </Row>

                        <Row>
                          <Button
                            onClick={() => handleShow(card)}
                            className="btn btn-info mt-3"
                          >
                            View Challenge
                          </Button>
                        </Row>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
            </Row>
            <Row xs={12} sm={6} md={4} lg={12} className="justify-content-end">
              {!showAllCards.length > 6 ? (
                <p
                  className="btn-sm cursor-pointer text-warning"
                  variant="outline-info"
                  onClick={() => setShowAllCards(true)}
                >
                  View All Challenges....
                </p>
              ) : (
                // <p
                //   className="btn-sm cursor-pointer text-warning"
                //   variant="outline-info"
                //   onClick={() => setShowAllCards(false)}
                // >
                //   view less Challenges...
                // </p>
                " "
              )}
            </Row>
          </Container>
        </Container>
      </section>
    </Container>
  );
};
export default ChallengesCard;
