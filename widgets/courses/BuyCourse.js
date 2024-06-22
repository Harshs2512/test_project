// import node module libraries
import { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import axios from "axios";
import {
  Image,
  Card,
  Row,
  Col,
  ProgressBar,
  ListGroup,
  Badge,
} from "react-bootstrap";
// import custom components
import Ratings from "widgets/ratings/Ratings";
import LevelIcon from "widgets/miscellaneous/LevelIcon";
// import utility file
import { numberWithCommas } from "helper/utils";
const BuyCourseCard = ({
  item,
  reviews,
  free,
  viewby,
  showprogressbar,
  extraclass,
}) => {
  let averageRating = 0;
  let totalRatings = 0;
  if (reviews && reviews.length > 0) {
    reviews.forEach((element) => {
      averageRating += Number(element.ratings);
      totalRatings++;
    });
    averageRating /= totalRatings;
  }
  const [userDetail, setUserDetail] = useState("");
  const created_by = async () => {
    try {
      const response = await axios.get(
        `/api/auth/usersingle/${item?.created_by}`
      );
      setUserDetail(response.data);
    } catch (error) {
      console.error("Error fetching user detail in Buy course:", error);
    }
  };
  useEffect(() => {
    created_by();
  }, [item?.created_by]);
  const GridView = () => {
    return (
      <Card className={`mb-4 card-hover ${extraclass}`}>
        <Link href={`/marketing/courses/buy-course/${item.slug}`}>
          <Link href={`/marketing/courses/buy-course/${item.slug}`}>
            {item._id ? (
              <Image
                src={`/api/courses/getthumbnail/${item._id}`}
                alt=""
                className="card-img-top rounded-top-md"
              />
            ) : (
              ""
            )}
          </Link>
          {/* Card body  */}
          <Card.Body>
            <h3 className="h4 mb-2 text-truncate-line-2">
              <Link
                href={`/marketing/courses/buy-course/${item.slug}`}
                className="text-inherit"
              >
                {item.course_title}
              </Link>
            </h3>
            <p className="p mb-1 text-secondary">
              {item.course_category && item.course_category.catName}
            </p>
            <ListGroup
              as="ul"
              bsPrefix="list-inline"
              className="mb-3 text-secondary"
            >
              <ListGroup.Item as="li" bsPrefix="list-inline-item">
                <LevelIcon level={item.level} />
                {item.level}
              </ListGroup.Item>
            </ListGroup>
            <div
              className={`lh-1 d-flex align-items-center ${
                free ||
                item.price === undefined ||
                item.price <= 0 ||
                item.discount === undefined
                  ? "mb-5"
                  : ""
              }`}
              key={item.id}
            >
              <span className="text-warning me-1 mb-0">
                <Ratings rating={averageRating} size="0.92rem" />{" "}
                {averageRating.toFixed(1)}
              </span>
              <span className="fs-6 text-muted">
                {" "}
                ({numberWithCommas(totalRatings)})
              </span>
            </div>
            {item.currentprice > 0 ? (
              <div className={`lh-1 mt-3`}>
                <span className="text-dark fw-bold me-1">
                  &#x20B9;{item.currentprice}
                </span>{" "}
                <del className="fs-6 text-muted">
                  &#x20B9;{item.actualprice}
                </del>
              </div>
            ) : (
              <Badge bg="success" className="py-2">
                Free
              </Badge>
            )}
          </Card.Body>
        </Link>
        <Card.Footer>
          <Row className="align-items-center g-0">
            <Col className="col-auto">
              {userDetail ? (
                <Image
                  src={`/api/auth/profileimgadmin/${
                    userDetail && userDetail._id
                  }`}
                  className="rounded-circle avatar-xs"
                  alt="img"
                />
              ) : (
                ""
              )}
            </Col>
            <Col className="col ms-2">
              <span>
                {userDetail.fname} {userDetail.lname}
              </span>
            </Col>
          </Row>
          <span className={`${showprogressbar ? "" : "d-none"}`}>
            {" "}
            <ProgressBar
              variant="success"
              now={item.progress}
              className="mt-3"
              style={{ height: "5px" }}
            />
          </span>
        </Card.Footer>
      </Card>
    );
  };

  /** Used in Course Filter Page  */
  const ListView = () => {
    return (
      <Link href={`/marketing/courses/buy-course/${item.slug}`}>
        <Card className="mb-4 card-hover">
          <Row className="g-0">
            <Link
              href={`/marketing/courses/buy-course/${item.slug}`}
              className="bg-cover img-left-rounded col-12 col-md-12 col-xl-3 col-lg-3 "
              style={{
                background: `url(/api/courses/getthumbnail/${item._id})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "top center",
              }}
            >
              {item._id ? (
                <Image
                  src={`/api/courses/getthumbnail/${item._id}`}
                  alt="..."
                  className="img-fluid d-lg-none invisible"
                />
              ) : (
                ""
              )}
            </Link>
            <Col lg={9} md={12} sm={12}>
              {/* <!-- Card body --> */}
              <Card.Body>
                <h3 className="mb-2 text-truncate-line-2 ">
                  <Link
                    href={`/marketing/courses/buy-course/${item.slug}`}
                    className="text-inherit"
                  >
                    {item.course_title}
                  </Link>
                </h3>
                {/* <!-- List inline --> */}
                <ListGroup as="ul" bsPrefix="list-inline" className="mb-5">
                  <ListGroup.Item as="li" bsPrefix="list-inline-item">
                    <LevelIcon level={item.level} />
                    {item.level}
                  </ListGroup.Item>
                  <ListGroup.Item as="li" bsPrefix="list-inline-item">
                    <span className="text-warning">
                      {" "}
                      <Ratings rating={averageRating} />{" "}
                      {averageRating.toFixed(1)}
                    </span>
                    <span className="fs-6 text-muted">
                      {" "}
                      ({numberWithCommas(totalRatings)})
                    </span>
                  </ListGroup.Item>
                </ListGroup>
                <Row className="align-items-center g-0">
                  <Col className="col-auto">
                    {userDetail && userDetail._id ? (
                      <Image
                        src={`/api/auth/profileimgadmin/${
                          userDetail && userDetail._id
                        }`}
                        className="rounded-circle avatar-xs"
                        alt="profile_img"
                      />
                    ) : (
                      ""
                    )}
                  </Col>
                  <Col className="col ms-2">
                    <span>
                      {userDetail && userDetail.fname}{" "}
                      {userDetail && userDetail.lname}
                    </span>
                  </Col>
                  <Col>
                    {item.currentprice > 0 ? (
                      <div
                        className={` lh-1 mt-3 justify-content-end align-items-end d-flex`}
                      >
                        <div>
                          <span className="text-dark fw-bold me-1">
                            &#x20B9;{item.currentprice}
                          </span>{" "}
                          <del className="fs-6 text-muted">
                            &#x20B9;{item.actualprice}
                          </del>
                        </div>
                      </div>
                    ) : (
                      <Badge bg="success" className="py-2">
                        Free
                      </Badge>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Link>
    );
  };

  /** Used in Instructor Profile Page  */
  const ListGroupView = () => {
    return (
      <div className="d-lg-flex align-items-center">
        <div className="ms-lg-3 mt-2 mt-lg-0">
          <h4 className="text-primary-hover">
            {item.title}{" "}
            <Badge bg="light-success" className="text-success">
              New
            </Badge>
          </h4>
          <ListGroup
            as="ul"
            bsPrefix="list-inline"
            className="fs-6 mb-0 text-inherit"
          >
            <ListGroup.Item as="li" bsPrefix="list-inline-item">
              <i className="far fa-clock me-1"></i>
              {item.duration}
            </ListGroup.Item>
            <ListGroup.Item as="li" bsPrefix="list-inline-item">
              <LevelIcon level={item.level} />
              {item.level}
            </ListGroup.Item>
            <ListGroup.Item as="li" bsPrefix="list-inline-item">
              <span className="text-warning">
                {" "}
                <Ratings rating={item.rating} /> {item.rating.toFixed(1)}
              </span>
              <span className="fs-6 text-muted">
                {" "}
                ({numberWithCommas(item.ratingby)})
              </span>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </div>
    );
  };
  return (
    <Fragment>
      {viewby === "grid" ? (
        <GridView />
      ) : viewby === "list" ? (
        <ListView />
      ) : (
        <ListGroupView />
      )}
    </Fragment>
  );
};

// Specifies the default values for props
BuyCourseCard.defaultProps = {
  free: false,
  viewby: "grid",
  showprogressbar: false,
  extraclass: "",
};

// Typechecking With PropTypes
BuyCourseCard.propTypes = {
  item: PropTypes.object.isRequired,
  free: PropTypes.bool,
  viewby: PropTypes.string,
  showprogressbar: PropTypes.bool,
  extraclass: PropTypes.string,
};

export default BuyCourseCard;
