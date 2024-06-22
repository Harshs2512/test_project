// import node module libraries
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  Row,
  Col,
  Image,
  Dropdown,
  ListGroup,
  Button,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import { useSelector } from "react-redux";
// simple bar scrolling used for notification item scrolling
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

// import widget/custom components
import { GKTippy } from "widgets";

// import custom components
import DotBadge from "components/bootstrap/DotBadge";
import DarkLightMode from "layouts/DarkLightMode";

// import data files
import NotificationList from "data/Notification";

// import hooks
import useMounted from "hooks/useMounted";
import { signOut, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { addUser } from "store/userSlice";
import { useRouter } from "next/router";
import useLocalStorage from "hooks/useLocalStorage";

const QuickMenu = () => {
  const router = useRouter();
  const session = useSession();
  const hasMounted = useMounted();
  const isDesktop = useMediaQuery({ query: "(min-width: 1224px)" });
  const data = session && session.data && session.data.user;
  const userId = data && data._id;
  const customSignOut = async () => {
    try {
      await signOut({ redirect: false, callbackUrl: process.env.NEXTAUTH_URL });
      router.push("/");
    } catch (error) {
      console.error("Custom sign-out error:", error);
    }
  };
  const defaultCart = useSelector((state) => state.cart);
  const { getStorageValue } = useLocalStorage("cart", defaultCart);
  const existingCart = getStorageValue("cart");
  const savedCart = existingCart ? JSON.parse(existingCart) : defaultCart;

  const userData = savedCart.filter((item) => item.user === userId);
  const Notifications = () => {
    return (
      <SimpleBar style={{ maxHeight: "300px" }}>
        <ListGroup variant="flush">
          {NotificationList.map(function (item, index) {
            return (
              <ListGroup.Item
                className={index === 0 ? "bg-light" : ""}
                key={index}
              >
                <Row className="">
                  <Col md={8}>
                    {/* Content for larger screens */}
                    <Link href="#" className="text-body">
                      {/* ... Your existing content */}
                      <p>Your</p>
                    </Link>
                  </Col>
                  <Col md={4} className="col-auto text-center me-2">
                    {/* Actions for larger screens */}
                    <GKTippy content="Mark as unread">
                      <Link href="#">
                        <DotBadge bg="secondary"></DotBadge>
                        hello
                      </Link>
                    </GKTippy>
                  </Col>
                </Row>

                {/* Responsive layout for smaller screens */}
                <Row className="d-md-none">
                  <Col>
                    <Link href="#" className="text-body">
                      {/* ... Your existing content */} Me
                    </Link>
                  </Col>
                  <Col className="col-auto text-center me-2">
                    <GKTippy content="Mark as unread">
                      <Link href="#">
                        <DotBadge bg="secondary"></DotBadge>
                        message
                      </Link>
                    </GKTippy>
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </SimpleBar>
    );
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const userData = localStorage.getItem("auth");
    const user = userData ? JSON.parse(userData) : [];
    dispatch(addUser(user.user));
  }, []);
  return (
    <Fragment>
      <DarkLightMode />
      {data ? (
        <ListGroup
          as="ul"
          bsPrefix="navbar-nav"
          className="navbar-right-wrap ms-2 d-flex nav-top-wrap"
        >
          <Dropdown as="li">
            <Dropdown.Toggle
              as="a"
              bsPrefix=" "
              id="dropdownNotification"
              className="text-dark icon-notifications me-lg-1  btn btn-light btn-icon rounded-circle indicator indicator-primary text-muted"
            >
              <i className="fe fe-bell"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu
              className="dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-end mt-4 py-0"
              aria-labelledby="dropdownNotification"
              align="end"
              show={hasMounted && isDesktop ? true : false}
            >
              <Dropdown.Item className="mt-3" bsPrefix=" " as="div">
                <div className="border-bottom px-3 pt-0 pb-3 d-flex justify-content-between align-items-end">
                  <span className="h4 mb-0">Notifications</span>
                  <Link href="/" className="text-muted">
                    <span className="align-middle">
                      <i className="fe fe-settings me-1"></i>
                    </span>
                  </Link>
                </div>
                <Notifications />
                <div className="border-top px-3 pt-3 pb-3">
                  <Link
                    href="/dashboard/notification-history"
                    className="text-link fw-semi-bold"
                  >
                    See all Notifications
                  </Link>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div as="li" className="text-center mt-1">
            <Link
              href="/studio/request-access"
              className="p-1 mx-2 btn btn-outline-info d-none d-sm-inline-block"
              id="problem-of-the-day"
            >
              Problem of the day
            </Link>

            <OverlayTrigger
              trigger="hover"
              key="popover"
              placement="bottom"
              bsPrefix=" "
              overlay={
                <Popover>
                  <Popover.Body
                    dangerouslySetInnerHTML={{
                      __html: `<h3>Know About EXP</h3><p className="p-2">you can earn EXPs by solving problems following your goal participating in contetes compliting guided path module etc.</p>`,
                    }}
                  />
                </Popover>
              }
            >
              <Button
                as="li"
                className="popover-trigger p-1 mx-2 bg-info border-info"
              >
                <i className="fas fa-coins p-1"></i>
                Your EXP <span>0</span>
              </Button>
            </OverlayTrigger>
          </div>
          <Dropdown as="li" className="ms-2">
            <Dropdown.Toggle
              as="a"
              bsPrefix=" "
              className="rounded-circle"
              id="dropdownUser"
            >
              <div className="avatar avatar-md avatar-indicators avatar-online">
                {userId && (
                  <Image
                    alt="avatar"
                    src={data && data.image ? data.image : `/api/auth/profileimgadmin/${userId}`} className="rounded-circle"
                  />
                )}
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu
              className="dashboard-dropdown dropdown-menu-end mt-4 py-0"
              align="end"
              aria-labelledby="dropdownUser"
              show={hasMounted && isDesktop ? true : false}
            >
              <Dropdown.Item
                className="mt-3"
                href={`${data.role === "user"
                  ? "/marketing/student/edit-profile"
                  : session.data.user.role === "instructor"
                    ? "/marketing/instructor/edit-profile"
                    : "/dashboard/analytics/courses"
                  }`}
              >
                <div className="d-flex">
                  <div className="avatar avatar-md avatar-indicators avatar-online">
                    {userId && (
                      <Image
                        alt="avatar"
                        src={data && data.image ? data.image : `/api/auth/profileimgadmin/${userId}`} className="rounded-circle"
                      />
                    )}
                  </div>
                  <div className="ms-3 lh-1">
                    <h5 className="mb-1">
                      {data.fname} {data.lname}
                    </h5>
                    <p className="mb-0 text-muted">{data.email}</p>
                  </div>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="2">
                <Link
                  href={`${data.role === "user"
                    ? "/marketing/student/dashboard"
                    : data.role === "instructor"
                      ? "/marketing/instructor/dashboard"
                      : "/dashboard/analytics/courses"
                    }`}
                >
                  <i className="fe fe-user me-2"></i> Dashboard
                </Link>
              </Dropdown.Item>
              <Dropdown.Item eventKey="3">
                <i className="fe fe-star me-2"></i> Subscription
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fe fe-settings me-2"></i> Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                className="mb-3"
                onClick={(e) => {
                  e.preventDefault();
                  customSignOut();
                }}
              >
                <i className="fe fe-power me-2"></i> Sign Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup>
      ) : (
        <div className="ms-3 mt-lg-0">
          <div className="d-flex align-items-center">
            <Link href="/authentication/sign-in" passHref>
              <Button className="btn btn-primary me-2">Sign In</Button>
            </Link>
            <Link href="/authentication/sign-up" passHref>
              <Button className="btn btn-primary">Sign Up</Button>
            </Link>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default QuickMenu;
