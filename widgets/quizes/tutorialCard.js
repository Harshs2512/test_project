// import node module libraries
import { Fragment, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
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
import { useDispatch } from "react-redux";
import { addtobookmark } from "store/bookmarkSlice";
import { useSelector } from "react-redux";
import useLocalStorage from "hooks/useLocalStorage";
import axios from "axios";

const TutorialCard = ({
  item,
  reviews,
  free,
  viewby,
  showprogressbar,
  extraclass,
}) => {
  const [popupAnimationId, setPopupAnimationId] = useState(null);
  const [userDetail, setUserDetail] = useState("");
  const dispatch = useDispatch();
  const defaultBookmars = useSelector((state) => state.bookmark);
  const { storageValue, setStorageValue, getStorageValue } = useLocalStorage(
    "bookmark",
    defaultBookmars
  );
  useEffect(() => {
    const existingBookmark = getStorageValue("bookmark");
    const bookmark = existingBookmark ? JSON.parse(existingBookmark) : [];
    dispatch(addtobookmark(bookmark));
  }, [storageValue]);
  const handleBookmark = (item) => {
    const existingBookmark = localStorage.getItem("bookmark");
    const bookmark = existingBookmark ? JSON.parse(existingBookmark) : [];
    const existingIndex = bookmark.findIndex((i) => i._id === item._id);

    if (existingIndex !== -1) {
      bookmark.splice(existingIndex, 1);
    } else {
      bookmark.push(item);
    }
    setStorageValue(JSON.stringify(bookmark));
    dispatch(addtobookmark(item));
    setPopupAnimationId(item._id);
  };
  const existingBookmark = getStorageValue("bookmark");
  const bookmark = existingBookmark ? JSON.parse(existingBookmark) : [];
  let averageRating = 0;
  let totalRatings = 0;
  if (reviews && reviews.length > 0) {
    reviews.forEach((element) => {
      averageRating += Number(element.ratings);
      totalRatings++;
    });
    averageRating /= totalRatings;
  }
  const created_by = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/auth/usersingle/${item.created_by}`
      );
      setUserDetail(response.data);
    } catch (error) {
      console.error("Error fetching fetching userDetails tutorial card:", error);
    }
  }, [item.created_by]);
  useEffect(() => {
    created_by();
  }, []);
  const GridView = () => {
    return (
      <Card
        className={`mb-4 card-hover border border-warning ${extraclass}`}
        style={{ height: "460px" }}
      >
        {/* Card body  */}
        <Card.Body>
          <h3 className="h4 mb-2 text-truncate-line-2 ">
            <Link href={`/marketing/tutorial/tutorial-single/?id=${item._id}`} className="text-inherit">
              {item.title}
            </Link>
          </h3>
          <ListGroup as="ul" bsPrefix="list-inline" className="mb-3">
            <ListGroup.Item as="li" bsPrefix="list-inline-item">
              {item.description.split(" ").slice(0, 20).join(" ")}
            </ListGroup.Item>
          </ListGroup>

          <div
            className={`lh-1  align-items-center ${
              free ||
              item.price === undefined ||
              item.price <= 0 ||
              item.discount === undefined
                ? "mb-5"
                : ""
            }`}
          ></div>
          <div className="d-flex">
            <span className="me-2">
              <svg
                id="fi_10307058"
                enableBackground="new 0 0 512 512"
                height="24"
                viewBox="0 0 512 512"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <g clip-rule="evenodd" fill-rule="evenodd">
                    <path
                      d="m26.17 6.06h459.67c14.4 0 26.16 11.76 26.16 26.16v290.28c0 14.4-11.76 26.16-26.16 26.16h-459.67c-14.4 0-26.17-11.76-26.17-26.16v-290.27c0-14.4 11.77-26.17 26.17-26.17z"
                      fill="#0593fc"
                    ></path>
                    <path
                      d="m123.23 47.48h265.55c5.5 0 10.09 3.49 10.89 8.28 4.11 25.37 26.96 45.44 55.81 49.1 5.44.68 9.44 4.71 9.44 9.55v125.94c0 4.82-4 8.84-9.44 9.55-28.86 3.63-51.7 23.7-55.81 49.07-.79 4.79-5.39 8.31-10.89 8.31h-265.55c-5.5 0-10.09-3.52-10.86-8.31-4.14-25.37-26.99-45.44-55.84-49.07-5.44-.71-9.44-4.73-9.44-9.55v-125.95c0-4.85 4-8.87 9.44-9.55 28.86-3.66 51.7-23.73 55.84-49.1.76-4.78 5.36-8.27 10.86-8.27z"
                      fill="#f5f8f9"
                    ></path>
                    <path
                      d="m319.78 317.68 26.16 7 26.16 7.03-46.09 171.95c-.74 2.72-4.45 3.12-5.7.57l-13.1-26.16c-.82-1.64-2.92-2.18-4.45-1.19l-24.39 16.12c-2.35 1.56-5.39-.62-4.68-3.37z"
                      fill="#ff4155"
                    ></path>
                    <path
                      d="m424.41 317.68-26.16 7-26.14 7.03 46.06 171.95c.74 2.72 4.45 3.12 5.7.57l13.1-26.16c.82-1.64 2.92-2.18 4.45-1.19l24.4 16.12c2.35 1.56 5.39-.62 4.68-3.37z"
                      fill="#ff4155"
                    ></path>
                    <path
                      d="m379.73 224.22 11.99 12.81c2.81 3 6.75 4.11 10.69 2.98l18-5.1c5.9-1.67 11.91 1.9 13.29 7.85l3.97 17.12c.91 4 3.8 6.92 7.77 7.94l18.14 4.56c5.92 1.5 9.38 7.57 7.57 13.44l-5.1 16.81c-1.19 3.91-.17 7.88 2.78 10.74l13.41 13.01c4.37 4.25 4.31 11.28-.17 15.45l-12.81 11.99c-3 2.81-4.11 6.77-2.98 10.71l5.1 17.97c1.67 5.9-1.87 11.91-7.85 13.29l-17.12 3.97c-3.97.91-6.92 3.8-7.91 7.77l-4.59 18.14c-1.47 5.95-7.57 9.38-13.44 7.6l-16.78-5.13c-3.94-1.19-7.91-.17-10.77 2.78l-13.01 13.41c-4.25 4.37-11.28 4.31-15.45-.14l-11.99-12.84c-2.78-3-6.75-4.11-10.69-2.98l-18 5.1c-5.9 1.67-11.91-1.87-13.29-7.85l-3.97-17.09c-.91-4-3.8-6.94-7.77-7.94l-18.14-4.56c-5.92-1.5-9.38-7.6-7.57-13.46l5.1-16.78c1.19-3.94.17-7.91-2.78-10.77l-13.41-13.02c-4.37-4.25-4.31-11.28.17-15.45l12.81-11.99c3-2.78 4.11-6.75 2.98-10.69l-5.1-18c-1.67-5.9 1.87-11.91 7.85-13.29l17.12-3.97c3.97-.91 6.92-3.8 7.91-7.77l4.59-18.14c1.47-5.92 7.57-9.35 13.44-7.57l16.78 5.1c3.94 1.22 7.91.17 10.77-2.75l13.01-13.44c4.26-4.36 11.29-4.3 15.45.18z"
                      fill="#fea832"
                    ></path>
                    <path
                      d="m372.08 402.6c37.7 0 68.43-30.73 68.43-68.4 0-37.7-30.73-68.43-68.43-68.43-37.67 0-68.4 30.73-68.4 68.43 0 37.68 30.73 68.4 68.4 68.4z"
                      fill="#ffd23b"
                    ></path>
                  </g>
                  <path
                    d="m146.07 128.46c-4.56 0-8.28-3.71-8.28-8.28 0-4.54 3.71-8.25 8.28-8.25h219.85c4.56 0 8.28 3.71 8.28 8.25 0 4.56-3.71 8.28-8.28 8.28z"
                    fill="#bec7cf"
                  ></path>
                  <path
                    d="m95.47 182.12c-4.54 0-8.25-3.69-8.25-8.25s3.71-8.25 8.25-8.25h321.05c4.56 0 8.25 3.69 8.25 8.25s-3.69 8.25-8.25 8.25z"
                    fill="#bec7cf"
                  ></path>
                  <path
                    clip-rule="evenodd"
                    d="m406.35 238.9 14.06-4c2.98-.85 6.01-.34 8.45 1.13l-14.06 3.97c-2.95.86-5.96.43-8.45-1.1zm22.85 193.24c-2.49 1.56-5.64 2.07-8.73 1.13l-13.12-4.03c2.55-1.62 5.67-2.04 8.73-1.11zm-50.77 13.44c-4.25 3.06-10.26 2.58-13.97-1.39l-11.99-12.84c-.68-.74-1.45-1.36-2.24-1.87l3.94-1.11c3.94-1.13 7.91-.03 10.69 2.98l11.99 12.84c.47.51 1.01.99 1.58 1.39zm-50.71-13.24-3.94 1.13c-5.9 1.67-11.91-1.87-13.29-7.85l-3.97-17.09c-.91-4-3.8-6.94-7.77-7.94l-18.14-4.56c-5.92-1.5-9.38-7.6-7.57-13.46l5.1-16.78c1.19-3.94.17-7.91-2.78-10.77l-13.41-13.02c-4.37-4.25-4.31-11.28.17-15.45l12.81-11.99c3-2.78 4.11-6.75 2.98-10.69l-5.1-18c-1.67-5.9 1.87-11.91 7.85-13.29l17.12-3.97c3.97-.91 6.92-3.8 7.91-7.77l4.59-18.14c1.47-5.92 7.57-9.35 13.44-7.57l3.66 1.11c-2.27 1.39-4 3.66-4.71 6.46l-4.59 18.14c-.99 3.97-3.94 6.86-7.91 7.77l-17.12 3.97c-5.98 1.39-9.52 7.4-7.85 13.29l5.1 18c1.13 3.94.03 7.91-2.98 10.69l-12.81 11.99c-4.48 4.17-4.54 11.2-.17 15.45l13.41 13.01c2.95 2.86 3.97 6.83 2.78 10.77l-5.1 16.78c-1.81 5.87 1.64 11.96 7.57 13.46l18.14 4.56c3.97.99 6.86 3.94 7.77 7.94l3.97 17.09c.67 2.96 2.48 5.31 4.84 6.73zm21.51-193.21c.74-.45 1.42-1.02 2.04-1.64l13.01-13.44c3.74-3.85 9.67-4.25 13.86-1.25-.51.37-1.02.79-1.47 1.25l-13.01 13.44c-2.86 2.92-6.83 3.97-10.77 2.75z"
                    fill="#e5972d"
                    fill-rule="evenodd"
                  ></path>
                  <path
                    clip-rule="evenodd"
                    d="m372.11 265.78c2.07 0 4.14.11 6.18.28-34.87 3.15-62.22 32.43-62.22 68.15 0 35.69 27.35 65 62.22 68.12-2.04.2-4.11.28-6.18.28-37.79 0-68.43-30.61-68.43-68.4s30.64-68.43 68.43-68.43z"
                    fill="#e6bd35"
                    fill-rule="evenodd"
                  ></path>
                  <path
                    clip-rule="evenodd"
                    d="m306.4 408.05-21.63 80.7-6.41 4.25c-2.35 1.56-5.39-.62-4.68-3.37l23.95-89.32 1.11.28c3.8.96 6.64 3.71 7.66 7.46zm21.32 89.32-1.7 6.29c-.74 2.72-4.45 3.12-5.7.57l-11.96-23.87 5.27-3.49c1.53-.99 3.6-.45 4.42 1.19z"
                    fill="#e63b4d"
                    fill-rule="evenodd"
                  ></path>
                  <path
                    clip-rule="evenodd"
                    d="m397.9 427.97 20.27 75.69c.74 2.72 4.45 3.12 5.7.57l3.46-6.86-18.08-67.52-5.56-1.7c-1.99-.6-3.95-.66-5.79-.18zm48.76 52.39 19.16 12.64c2.35 1.56 5.39-.62 4.68-3.37l-.26-.88-18-11.88c-1.53-.99-3.6-.45-4.42 1.19z"
                    fill="#e63b4d"
                    fill-rule="evenodd"
                  ></path>
                  <path
                    clip-rule="evenodd"
                    d="m26.17 6.06h22.71c-14.37 0-26.16 11.76-26.16 26.16v290.28c0 14.4 11.79 26.16 26.16 26.16h-22.71c-14.4 0-26.17-11.76-26.17-26.16v-290.27c0-14.4 11.77-26.17 26.17-26.17z"
                    fill="#0584e3"
                    fill-rule="evenodd"
                  ></path>
                </g>
              </svg>
            </span>
            <small>
              Earn <b>Certicate</b> of Completion
            </small>
          </div>
          <div className="d-flex my-2">
            <span className="me-2">
              <svg
                id="fi_2838590"
                enableBackground="new 0 0 512 512"
                height="24"
                viewBox="0 0 512 512"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <circle cx="256" cy="256" fill="#6aa9ff" r="256"></circle>
                  <g>
                    <path
                      d="m512 256c0-140.61-115.39-256-256-256v512c140.61 0 256-115.39 256-256z"
                      fill="#4895ff"
                    ></path>
                  </g>
                  <circle cx="256" cy="256" fill="#edf5ff" r="226"></circle>
                  <path
                    d="m482 256c0-124.072-101.928-226-226-226v452c124.072 0 226-101.928 226-226z"
                    fill="#d5e8fe"
                  ></path>
                  <circle
                    cx="128.721"
                    cy="383.279"
                    fill="#47568c"
                    r="15"
                  ></circle>
                  <circle
                    cx="383.279"
                    cy="128.721"
                    fill="#29376d"
                    r="15"
                  ></circle>
                  <circle
                    cx="128.721"
                    cy="128.721"
                    fill="#47568c"
                    r="15"
                  ></circle>
                  <circle
                    cx="383.279"
                    cy="383.279"
                    fill="#29376d"
                    r="15"
                  ></circle>
                  <path
                    d="m106 271h-30c-8.291 0-15-6.709-15-15s6.709-15 15-15h30c8.291 0 15 6.709 15 15s-6.709 15-15 15z"
                    fill="#47568c"
                  ></path>
                  <path
                    d="m436 271h-30c-8.291 0-15-6.709-15-15s6.709-15 15-15h30c8.291 0 15 6.709 15 15s-6.709 15-15 15z"
                    fill="#29376d"
                  ></path>
                  <path
                    d="m241 76v30c0 8.291 6.709 15 15 15v-60c-8.291 0-15 6.709-15 15z"
                    fill="#47568c"
                  ></path>
                  <path
                    d="m271 106v-30c0-8.291-6.709-15-15-15v60c8.291 0 15-6.709 15-15z"
                    fill="#ff7b4a"
                  ></path>
                  <path
                    d="m256 391c-8.291 0-15 6.709-15 15v30c0 8.291 6.709 15 15 15s15-6.709 15-15v-30c0-8.291-6.709-15-15-15z"
                    fill="#47568c"
                  ></path>
                  <path
                    d="m356.605 335.395-85.605-85.606v-83.789c0-8.291-6.709-15-15-15s-15 6.709-15 15v90c0 3.984 1.582 7.793 4.395 10.605l10.605 10.606 79.395 79.395c5.859 5.859 15.352 5.859 21.211 0s5.859-15.352-.001-21.211z"
                    fill="#47568c"
                  ></path>
                  <g fill="#29376d">
                    <path d="m271 106v-30c0-8.291-6.709-15-15-15v60c8.291 0 15-6.709 15-15z"></path>
                    <path d="m271 436v-30c0-8.291-6.709-15-15-15v60c8.291 0 15-6.709 15-15z"></path>
                    <path d="m356.605 356.605c5.859-5.859 5.859-15.352 0-21.211l-85.605-85.605v-83.789c0-8.291-6.709-15-15-15v126.211l79.395 79.395c5.859 5.859 15.351 5.859 21.21-.001z"></path>
                  </g>
                </g>
              </svg>
            </span>
            <span>
              Average time to complete <b>{item.duration}</b>
            </span>
          </div>
          <div className="d-flex">
            <span className="me-2 ">
              <svg
                id="fi_13305716"
                viewBox="0 0 512 512"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 1"
              >
                <g fill-rule="evenodd">
                  <g fill="#1ae5be">
                    <path d="m418.82 94.943-151.772 63.784-151.772-63.784 151.772-63.779z"></path>
                    <path d="m49.35 436.1a6.008 6.008 0 0 0 6.09 6 441.848 441.848 0 0 1 179.36 35.41l8.985 3.839h-229.785v-285.181h35.35z"></path>
                    <path d="m112.81 235.434h-26.027l13.004-30.473z"></path>
                    <path d="m99.788 195.691a10.556 10.556 0 1 1 10.563-10.553 10.566 10.566 0 0 1 -10.563 10.553z"></path>
                    <path d="m462.648 196.168h35.352v285.181h-229.782l8.985-3.839a442.015 442.015 0 0 1 179.355-35.41 6.006 6.006 0 0 0 6.09-6z"></path>
                    <path d="m162.092 235.434a4.08 4.08 0 0 1 -4.053-4.057v-22.569h218.032v22.569a4.085 4.085 0 0 1 -4.061 4.057z"></path>
                  </g>
                  <path
                    d="m496 479.349h-218.011a439.946 439.946 0 0 1 178.54-35.249 8.005 8.005 0 0 0 8.119-8v-237.932h31.352zm-480-281.181h31.35v237.932a8.007 8.007 0 0 0 8.119 8 439.643 439.643 0 0 1 178.541 35.249h-218.01zm83.788-4.477a8.556 8.556 0 1 1 8.563-8.553 8.566 8.566 0 0 1 -8.563 8.553zm0 16.362-9.978 23.381h19.971zm-36.44-61.8v279.8a455.87 455.87 0 0 1 184.652 39.964v-218.58h-85.908a18.074 18.074 0 0 1 -18.051-18.06v-75.348q-18-3.44-36.251-5.364v11.261a24.531 24.531 0 0 1 7.039 42.6l14.431 33.765a8 8 0 0 1 -7.359 11.144h-44.211a8 8 0 0 1 -7.359-11.144l14.427-33.765a24.532 24.532 0 0 1 7.034-42.6v-12.648q-14.2-.976-28.444-1.029zm44.442-41.266 36.251 15.229v17.545q-18-3.318-36.251-5.17v-27.6zm159.258-73.65 146.61 61.61-146.61 61.614-146.61-61.618 146.61-61.61zm107.023 161.472h-214.032v-65.87l103.91 43.668a7.963 7.963 0 0 0 6.2 0l103.923-43.668v65.87zm-214.032 16v20.57a2.08 2.08 0 0 0 2.053 2.057h209.918a2.084 2.084 0 0 0 2.061-2.057v-20.57zm288.611-62.555a438.425 438.425 0 0 0 -58.581 4.138v78.985a18.079 18.079 0 0 1 -18.059 18.06h-108.01v218.58a455.87 455.87 0 0 1 184.65-39.965v-279.8zm55.35 33.916h-39.352v-41.87a8 8 0 0 0 -7.879-8 455.107 455.107 0 0 0 -66.7 3.939v-14.027l47.339-19.89a8 8 0 0 0 0-14.753l-167.26-70.29a8.028 8.028 0 0 0 -6.2 0l-167.259 70.29a8.009 8.009 0 0 0 -4.9 7.374v38.294q-18.258-1.209-36.563-.938a8 8 0 0 0 -7.879 8v41.87h-39.347a8 8 0 0 0 -8 8v297.181a8 8 0 0 0 8 8h496a8 8 0 0 0 8-8v-297.183a8 8 0 0 0 -8-7.997z"
                    fill="#0635c9"
                  ></path>
                </g>
              </svg>
            </span>
            <small>
              Pre requisties : <b>Basic aptitude and enthusiasm to learn</b>
            </small>
          </div>
        </Card.Body>
        {/* Card Footer */}
        <Card.Footer>
          <Row className="align-items-center g-0">
            <Col className="col-auto">
              <Image
                src={item.instructor_image}
                className="rounded-circle avatar-xs"
                alt=""
              />
            </Col>
            <Col className="col ms-2">
              <span>{item.instructor_name}</span>
            </Col>
            <Col className="col-auto">
              <Badge className="bg-success ">{item.course_level}</Badge>
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
          <div className="text-center">
            <Link
              href={`/marketing/tutorial/tutorial-single/?id=${item._id}`}
              className="btn btn-outline-info mt-3"
            >
              Start Learning
            </Link>
          </div>
        </Card.Footer>
      </Card>
    );
  };

  /** Used in Course Filter Page  */
  const ListView = () => {
    return (
      <Link
        href={`/marketing/tutorial/tutorial-single/?id=${item._id}`}
      >
        <Card className="mb-4 card-hover">
          <Row className="g-0">
            <Col lg={12} md={12} sm={12}>
              {/* <!-- Card body --> */}
              <Card.Body>
                <div className="d-lg-flex justify-content-between ">
                  <h3 className="mb-2 text-truncate-line-2 ">
                    <Link
                      href={`/marketing/tutorial/tutorial-single/?id=${item._id}`}
                      className="text-inherit"
                    >
                      {item.title}
                    </Link>
                  </h3>
                  <div>
                    <Badge className="bg-success ">{item.course_level}</Badge>
                  </div>
                </div>
                {/* <!-- List inline --> */}
                <ListGroup as="ul" bsPrefix="list-inline" className="mb-5">
                  <ListGroup.Item as="li" bsPrefix="list-inline-item">
                    {item.description.split(" ").slice(0, 20).join(" ")}
                  </ListGroup.Item>
                </ListGroup>
                <Row>
                  <Col>
                    <div className="d-flex">
                      <span className="me-2">
                        <svg
                          id="fi_10307058"
                          enableBackground="new 0 0 512 512"
                          height="24"
                          viewBox="0 0 512 512"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g>
                            <g clip-rule="evenodd" fill-rule="evenodd">
                              <path
                                d="m26.17 6.06h459.67c14.4 0 26.16 11.76 26.16 26.16v290.28c0 14.4-11.76 26.16-26.16 26.16h-459.67c-14.4 0-26.17-11.76-26.17-26.16v-290.27c0-14.4 11.77-26.17 26.17-26.17z"
                                fill="#0593fc"
                              ></path>
                              <path
                                d="m123.23 47.48h265.55c5.5 0 10.09 3.49 10.89 8.28 4.11 25.37 26.96 45.44 55.81 49.1 5.44.68 9.44 4.71 9.44 9.55v125.94c0 4.82-4 8.84-9.44 9.55-28.86 3.63-51.7 23.7-55.81 49.07-.79 4.79-5.39 8.31-10.89 8.31h-265.55c-5.5 0-10.09-3.52-10.86-8.31-4.14-25.37-26.99-45.44-55.84-49.07-5.44-.71-9.44-4.73-9.44-9.55v-125.95c0-4.85 4-8.87 9.44-9.55 28.86-3.66 51.7-23.73 55.84-49.1.76-4.78 5.36-8.27 10.86-8.27z"
                                fill="#f5f8f9"
                              ></path>
                              <path
                                d="m319.78 317.68 26.16 7 26.16 7.03-46.09 171.95c-.74 2.72-4.45 3.12-5.7.57l-13.1-26.16c-.82-1.64-2.92-2.18-4.45-1.19l-24.39 16.12c-2.35 1.56-5.39-.62-4.68-3.37z"
                                fill="#ff4155"
                              ></path>
                              <path
                                d="m424.41 317.68-26.16 7-26.14 7.03 46.06 171.95c.74 2.72 4.45 3.12 5.7.57l13.1-26.16c.82-1.64 2.92-2.18 4.45-1.19l24.4 16.12c2.35 1.56 5.39-.62 4.68-3.37z"
                                fill="#ff4155"
                              ></path>
                              <path
                                d="m379.73 224.22 11.99 12.81c2.81 3 6.75 4.11 10.69 2.98l18-5.1c5.9-1.67 11.91 1.9 13.29 7.85l3.97 17.12c.91 4 3.8 6.92 7.77 7.94l18.14 4.56c5.92 1.5 9.38 7.57 7.57 13.44l-5.1 16.81c-1.19 3.91-.17 7.88 2.78 10.74l13.41 13.01c4.37 4.25 4.31 11.28-.17 15.45l-12.81 11.99c-3 2.81-4.11 6.77-2.98 10.71l5.1 17.97c1.67 5.9-1.87 11.91-7.85 13.29l-17.12 3.97c-3.97.91-6.92 3.8-7.91 7.77l-4.59 18.14c-1.47 5.95-7.57 9.38-13.44 7.6l-16.78-5.13c-3.94-1.19-7.91-.17-10.77 2.78l-13.01 13.41c-4.25 4.37-11.28 4.31-15.45-.14l-11.99-12.84c-2.78-3-6.75-4.11-10.69-2.98l-18 5.1c-5.9 1.67-11.91-1.87-13.29-7.85l-3.97-17.09c-.91-4-3.8-6.94-7.77-7.94l-18.14-4.56c-5.92-1.5-9.38-7.6-7.57-13.46l5.1-16.78c1.19-3.94.17-7.91-2.78-10.77l-13.41-13.02c-4.37-4.25-4.31-11.28.17-15.45l12.81-11.99c3-2.78 4.11-6.75 2.98-10.69l-5.1-18c-1.67-5.9 1.87-11.91 7.85-13.29l17.12-3.97c3.97-.91 6.92-3.8 7.91-7.77l4.59-18.14c1.47-5.92 7.57-9.35 13.44-7.57l16.78 5.1c3.94 1.22 7.91.17 10.77-2.75l13.01-13.44c4.26-4.36 11.29-4.3 15.45.18z"
                                fill="#fea832"
                              ></path>
                              <path
                                d="m372.08 402.6c37.7 0 68.43-30.73 68.43-68.4 0-37.7-30.73-68.43-68.43-68.43-37.67 0-68.4 30.73-68.4 68.43 0 37.68 30.73 68.4 68.4 68.4z"
                                fill="#ffd23b"
                              ></path>
                            </g>
                            <path
                              d="m146.07 128.46c-4.56 0-8.28-3.71-8.28-8.28 0-4.54 3.71-8.25 8.28-8.25h219.85c4.56 0 8.28 3.71 8.28 8.25 0 4.56-3.71 8.28-8.28 8.28z"
                              fill="#bec7cf"
                            ></path>
                            <path
                              d="m95.47 182.12c-4.54 0-8.25-3.69-8.25-8.25s3.71-8.25 8.25-8.25h321.05c4.56 0 8.25 3.69 8.25 8.25s-3.69 8.25-8.25 8.25z"
                              fill="#bec7cf"
                            ></path>
                            <path
                              clip-rule="evenodd"
                              d="m406.35 238.9 14.06-4c2.98-.85 6.01-.34 8.45 1.13l-14.06 3.97c-2.95.86-5.96.43-8.45-1.1zm22.85 193.24c-2.49 1.56-5.64 2.07-8.73 1.13l-13.12-4.03c2.55-1.62 5.67-2.04 8.73-1.11zm-50.77 13.44c-4.25 3.06-10.26 2.58-13.97-1.39l-11.99-12.84c-.68-.74-1.45-1.36-2.24-1.87l3.94-1.11c3.94-1.13 7.91-.03 10.69 2.98l11.99 12.84c.47.51 1.01.99 1.58 1.39zm-50.71-13.24-3.94 1.13c-5.9 1.67-11.91-1.87-13.29-7.85l-3.97-17.09c-.91-4-3.8-6.94-7.77-7.94l-18.14-4.56c-5.92-1.5-9.38-7.6-7.57-13.46l5.1-16.78c1.19-3.94.17-7.91-2.78-10.77l-13.41-13.02c-4.37-4.25-4.31-11.28.17-15.45l12.81-11.99c3-2.78 4.11-6.75 2.98-10.69l-5.1-18c-1.67-5.9 1.87-11.91 7.85-13.29l17.12-3.97c3.97-.91 6.92-3.8 7.91-7.77l4.59-18.14c1.47-5.92 7.57-9.35 13.44-7.57l3.66 1.11c-2.27 1.39-4 3.66-4.71 6.46l-4.59 18.14c-.99 3.97-3.94 6.86-7.91 7.77l-17.12 3.97c-5.98 1.39-9.52 7.4-7.85 13.29l5.1 18c1.13 3.94.03 7.91-2.98 10.69l-12.81 11.99c-4.48 4.17-4.54 11.2-.17 15.45l13.41 13.01c2.95 2.86 3.97 6.83 2.78 10.77l-5.1 16.78c-1.81 5.87 1.64 11.96 7.57 13.46l18.14 4.56c3.97.99 6.86 3.94 7.77 7.94l3.97 17.09c.67 2.96 2.48 5.31 4.84 6.73zm21.51-193.21c.74-.45 1.42-1.02 2.04-1.64l13.01-13.44c3.74-3.85 9.67-4.25 13.86-1.25-.51.37-1.02.79-1.47 1.25l-13.01 13.44c-2.86 2.92-6.83 3.97-10.77 2.75z"
                              fill="#e5972d"
                              fill-rule="evenodd"
                            ></path>
                            <path
                              clip-rule="evenodd"
                              d="m372.11 265.78c2.07 0 4.14.11 6.18.28-34.87 3.15-62.22 32.43-62.22 68.15 0 35.69 27.35 65 62.22 68.12-2.04.2-4.11.28-6.18.28-37.79 0-68.43-30.61-68.43-68.4s30.64-68.43 68.43-68.43z"
                              fill="#e6bd35"
                              fill-rule="evenodd"
                            ></path>
                            <path
                              clip-rule="evenodd"
                              d="m306.4 408.05-21.63 80.7-6.41 4.25c-2.35 1.56-5.39-.62-4.68-3.37l23.95-89.32 1.11.28c3.8.96 6.64 3.71 7.66 7.46zm21.32 89.32-1.7 6.29c-.74 2.72-4.45 3.12-5.7.57l-11.96-23.87 5.27-3.49c1.53-.99 3.6-.45 4.42 1.19z"
                              fill="#e63b4d"
                              fill-rule="evenodd"
                            ></path>
                            <path
                              clip-rule="evenodd"
                              d="m397.9 427.97 20.27 75.69c.74 2.72 4.45 3.12 5.7.57l3.46-6.86-18.08-67.52-5.56-1.7c-1.99-.6-3.95-.66-5.79-.18zm48.76 52.39 19.16 12.64c2.35 1.56 5.39-.62 4.68-3.37l-.26-.88-18-11.88c-1.53-.99-3.6-.45-4.42 1.19z"
                              fill="#e63b4d"
                              fill-rule="evenodd"
                            ></path>
                            <path
                              clip-rule="evenodd"
                              d="m26.17 6.06h22.71c-14.37 0-26.16 11.76-26.16 26.16v290.28c0 14.4 11.79 26.16 26.16 26.16h-22.71c-14.4 0-26.17-11.76-26.17-26.16v-290.27c0-14.4 11.77-26.17 26.17-26.17z"
                              fill="#0584e3"
                              fill-rule="evenodd"
                            ></path>
                          </g>
                        </svg>
                      </span>
                      <small>
                        Earn <b>Certicate</b> of Completion
                      </small>
                    </div>
                    <div className="d-flex my-2">
                      <span className="me-2">
                        <svg
                          id="fi_2838590"
                          enableBackground="new 0 0 512 512"
                          height="24"
                          viewBox="0 0 512 512"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g>
                            <circle
                              cx="256"
                              cy="256"
                              fill="#6aa9ff"
                              r="256"
                            ></circle>
                            <g>
                              <path
                                d="m512 256c0-140.61-115.39-256-256-256v512c140.61 0 256-115.39 256-256z"
                                fill="#4895ff"
                              ></path>
                            </g>
                            <circle
                              cx="256"
                              cy="256"
                              fill="#edf5ff"
                              r="226"
                            ></circle>
                            <path
                              d="m482 256c0-124.072-101.928-226-226-226v452c124.072 0 226-101.928 226-226z"
                              fill="#d5e8fe"
                            ></path>
                            <circle
                              cx="128.721"
                              cy="383.279"
                              fill="#47568c"
                              r="15"
                            ></circle>
                            <circle
                              cx="383.279"
                              cy="128.721"
                              fill="#29376d"
                              r="15"
                            ></circle>
                            <circle
                              cx="128.721"
                              cy="128.721"
                              fill="#47568c"
                              r="15"
                            ></circle>
                            <circle
                              cx="383.279"
                              cy="383.279"
                              fill="#29376d"
                              r="15"
                            ></circle>
                            <path
                              d="m106 271h-30c-8.291 0-15-6.709-15-15s6.709-15 15-15h30c8.291 0 15 6.709 15 15s-6.709 15-15 15z"
                              fill="#47568c"
                            ></path>
                            <path
                              d="m436 271h-30c-8.291 0-15-6.709-15-15s6.709-15 15-15h30c8.291 0 15 6.709 15 15s-6.709 15-15 15z"
                              fill="#29376d"
                            ></path>
                            <path
                              d="m241 76v30c0 8.291 6.709 15 15 15v-60c-8.291 0-15 6.709-15 15z"
                              fill="#47568c"
                            ></path>
                            <path
                              d="m271 106v-30c0-8.291-6.709-15-15-15v60c8.291 0 15-6.709 15-15z"
                              fill="#ff7b4a"
                            ></path>
                            <path
                              d="m256 391c-8.291 0-15 6.709-15 15v30c0 8.291 6.709 15 15 15s15-6.709 15-15v-30c0-8.291-6.709-15-15-15z"
                              fill="#47568c"
                            ></path>
                            <path
                              d="m356.605 335.395-85.605-85.606v-83.789c0-8.291-6.709-15-15-15s-15 6.709-15 15v90c0 3.984 1.582 7.793 4.395 10.605l10.605 10.606 79.395 79.395c5.859 5.859 15.352 5.859 21.211 0s5.859-15.352-.001-21.211z"
                              fill="#47568c"
                            ></path>
                            <g fill="#29376d">
                              <path d="m271 106v-30c0-8.291-6.709-15-15-15v60c8.291 0 15-6.709 15-15z"></path>
                              <path d="m271 436v-30c0-8.291-6.709-15-15-15v60c8.291 0 15-6.709 15-15z"></path>
                              <path d="m356.605 356.605c5.859-5.859 5.859-15.352 0-21.211l-85.605-85.605v-83.789c0-8.291-6.709-15-15-15v126.211l79.395 79.395c5.859 5.859 15.351 5.859 21.21-.001z"></path>
                            </g>
                          </g>
                        </svg>
                      </span>
                      <span>
                        Average time to complete <b>{item.duration}</b>
                      </span>
                    </div>
                    <div className="d-flex">
                      <span className="me-2">
                        <svg
                          id="fi_13305716"
                          viewBox="0 0 512 512"
                          height="24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                          data-name="Layer 1"
                        >
                          <g fill-rule="evenodd">
                            <g fill="#1ae5be">
                              <path d="m418.82 94.943-151.772 63.784-151.772-63.784 151.772-63.779z"></path>
                              <path d="m49.35 436.1a6.008 6.008 0 0 0 6.09 6 441.848 441.848 0 0 1 179.36 35.41l8.985 3.839h-229.785v-285.181h35.35z"></path>
                              <path d="m112.81 235.434h-26.027l13.004-30.473z"></path>
                              <path d="m99.788 195.691a10.556 10.556 0 1 1 10.563-10.553 10.566 10.566 0 0 1 -10.563 10.553z"></path>
                              <path d="m462.648 196.168h35.352v285.181h-229.782l8.985-3.839a442.015 442.015 0 0 1 179.355-35.41 6.006 6.006 0 0 0 6.09-6z"></path>
                              <path d="m162.092 235.434a4.08 4.08 0 0 1 -4.053-4.057v-22.569h218.032v22.569a4.085 4.085 0 0 1 -4.061 4.057z"></path>
                            </g>
                            <path
                              d="m496 479.349h-218.011a439.946 439.946 0 0 1 178.54-35.249 8.005 8.005 0 0 0 8.119-8v-237.932h31.352zm-480-281.181h31.35v237.932a8.007 8.007 0 0 0 8.119 8 439.643 439.643 0 0 1 178.541 35.249h-218.01zm83.788-4.477a8.556 8.556 0 1 1 8.563-8.553 8.566 8.566 0 0 1 -8.563 8.553zm0 16.362-9.978 23.381h19.971zm-36.44-61.8v279.8a455.87 455.87 0 0 1 184.652 39.964v-218.58h-85.908a18.074 18.074 0 0 1 -18.051-18.06v-75.348q-18-3.44-36.251-5.364v11.261a24.531 24.531 0 0 1 7.039 42.6l14.431 33.765a8 8 0 0 1 -7.359 11.144h-44.211a8 8 0 0 1 -7.359-11.144l14.427-33.765a24.532 24.532 0 0 1 7.034-42.6v-12.648q-14.2-.976-28.444-1.029zm44.442-41.266 36.251 15.229v17.545q-18-3.318-36.251-5.17v-27.6zm159.258-73.65 146.61 61.61-146.61 61.614-146.61-61.618 146.61-61.61zm107.023 161.472h-214.032v-65.87l103.91 43.668a7.963 7.963 0 0 0 6.2 0l103.923-43.668v65.87zm-214.032 16v20.57a2.08 2.08 0 0 0 2.053 2.057h209.918a2.084 2.084 0 0 0 2.061-2.057v-20.57zm288.611-62.555a438.425 438.425 0 0 0 -58.581 4.138v78.985a18.079 18.079 0 0 1 -18.059 18.06h-108.01v218.58a455.87 455.87 0 0 1 184.65-39.965v-279.8zm55.35 33.916h-39.352v-41.87a8 8 0 0 0 -7.879-8 455.107 455.107 0 0 0 -66.7 3.939v-14.027l47.339-19.89a8 8 0 0 0 0-14.753l-167.26-70.29a8.028 8.028 0 0 0 -6.2 0l-167.259 70.29a8.009 8.009 0 0 0 -4.9 7.374v38.294q-18.258-1.209-36.563-.938a8 8 0 0 0 -7.879 8v41.87h-39.347a8 8 0 0 0 -8 8v297.181a8 8 0 0 0 8 8h496a8 8 0 0 0 8-8v-297.183a8 8 0 0 0 -8-7.997z"
                              fill="#0635c9"
                            ></path>
                          </g>
                        </svg>
                      </span>
                      <small>
                        Pre requisties :{" "}
                        <b>Basic aptitude and enthusiasm to learn</b>
                      </small>
                    </div>
                  </Col>
                  <Col
                    className="col-auto"
                    onClick={() => handleBookmark(item)}
                  >
                    <div>
                      <div className="text-center">
                        <Link
                          href={`/marketing/tutorial/tutorial-single/?id=${item._id}`}
                          className="btn btn-outline-info mt-3"
                        >
                          Start Learning
                        </Link>
                      </div>
                    </div>
                  </Col>
                </Row>
                {/* <!-- Row --> */}
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
        <div>
          <Image src={item.image} alt="" className="rounded img-4by3-lg" />
        </div>
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
TutorialCard.defaultProps = {
  free: false,
  viewby: "grid",
  showprogressbar: false,
  extraclass: "",
};

// Typechecking With PropTypes
TutorialCard.propTypes = {
  item: PropTypes.object.isRequired,
  free: PropTypes.bool,
  viewby: PropTypes.string,
  showprogressbar: PropTypes.bool,
  extraclass: PropTypes.string,
};

export default TutorialCard;
