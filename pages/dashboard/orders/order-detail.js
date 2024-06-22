// import node module libraries
import { useState, useEffect, Fragment, useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import {
  Card,
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Breadcrumb,
  Badge,
} from "react-bootstrap";
import { useRouter } from "next/router";
import Loading from "../../loading";
const OrderDetails = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const [singleOrder, setSingleOrder] = useState();
  const paymentId = singleOrder?.payment_details?.payment_id;
  const [userData, setUserData] = useState();
  const [paymentDetaile, setPaymentDetaile] = useState();
  const user = userData && userData;
  const item = singleOrder && singleOrder.purchase_item;
  const userId = singleOrder?.user_detail;
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    const fetchUserDetails = async (userId) => {
      try {
        const response = await axios.get(
          `/api/auth/usersingle/${userId ? userId : ""}`
        );
        return response?.data;
      } catch (error) {
        console.error(
          "Error fetching user details from order Details page ",
          error
        );
        return null;
      }
    };
    if (item && Array.isArray(item)) {
      Promise.all(item.map((data) => fetchUserDetails(data?.created_by)))
        .then((userDetailsArray) => {
          const userDetailsMap = userDetailsArray.reduce(
            (map, userDetail, index) => {
              if (userDetail) {
                map[item[index].created_by] = userDetail;
              }
              return map;
            },
            {}
          );
          setUserDetails(userDetailsMap);
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }
  }, [item, userId]);
  let price = 0;
  let discount = 0;
  let paidAmount = 0;
  let actualPrice = 0;
  item &&
    item.forEach((element) => {
      const currentprice = Number(element.currentprice);
      const actualprice = Number(element.actualprice);
      actualPrice += actualprice;
      price += currentprice;
      discount += actualprice;
      discount = discount - price;
      discount = discount < 0 ? -discount : discount;
      paidAmount = (price / 100) * 18;
      paidAmount = price + paidAmount;
    });
  let Tax = paidAmount - price;
  const formattedTax = Tax.toFixed(2);
  const formateData = singleOrder && singleOrder.createdAt;
  const originalDateTime = new Date(formateData);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formattedDateTime = originalDateTime.toLocaleString("en-US", options);
  const fetchOrder = async () => {
    try {
      const response = await axios.get(
        `/api/orders/findorder?orderId=${orderId}`
      );
      const data = response.data;
      setSingleOrder(data);
    } catch (error) {
      console.error("Order Fetching error:", error);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, [orderId]);
  const fetchPayment = async () => {
    try {
      const response = await axios.get(
        `/api/orders/paymentDetail?paymentId=${paymentId}`
      );
      const data = response.data;
      setPaymentDetaile(data);
    } catch (error) {
      console.error("Order Fetching error:", error);
    }
  };
  useEffect(() => {
    fetchPayment();
  }, [paymentId]);
  const userDetail = async () => {
    try {
      const response = await axios.get(`/api/auth/usersingle/${userId}`);
      const user = response.data;
      setUserData(user);
    } catch (error) {
      console.error("Error fetching user data: order page v", error);
    }
  };

  useEffect(() => {
    userDetail();
  }, [userId]);

  return (
    <Fragment>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">Single Order</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#">Order</Breadcrumb.Item>
                <Breadcrumb.Item active>Order Single</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </Col>
      </Row>
      {/* Page content */}
      <section className="pb-10">
        <Container>
          <Row>
            <Col lg={8} md={12} sm={12} className="mb-4 mb-lg-0">
              <Card className="mb-4">
                <Card.Body>
                  <ListGroup variant="flush">
                    <Row>
                      <Col className="col-auto">
                        <div>
                          <h4 className="mb-0">Order ID : {orderId}</h4>
                          <div className="d-flex  justify-space-between">
                            <p className="py-2">
                              Order Date: {formattedDateTime}{" "}
                            </p>
                            <p className="py-2 mx-2">
                              Status :{" "}
                              <Badge bg="success">
                                {singleOrder && singleOrder.order_status}
                              </Badge>{" "}
                            </p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </ListGroup>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header className="d-flex align-items-center justify-content-between card-header-height">
                  <h4 className="mb-0">Courses</h4>
                  <h4 className="mb-0"></h4>
                  <h4 className="mb-0">Item Type</h4>
                  <h4 className="mb-0">Amounts</h4>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    {item ? (
                      item.length > 0 ? (
                        item.map((data, index) => (
                          <ListGroup.Item
                            className={`px-0 ${index === 0 ? "pt-0" : ""}`}
                            key={index}
                          >
                            <Row>
                              <Col className="col-auto">
                                <Link href="#">
                                  {data.questions_list &&
                                  data.questions_list.length > 0 ? (
                                    <Image
                                      src={`/api/quiz/quizthumbnail/${data._id}`}
                                      className="img-fluid rounded img-4by3-lg"
                                      alt=""
                                    />
                                  ) : data.questionsList &&
                                    data.questionsList.length > 0 ? (
                                    <Image
                                      src={`/api/Contest/getthumbnail/${data._id}`}
                                      className="img-fluid rounded img-4by3-lg"
                                      alt=""
                                    />
                                  ) : data.topic && data.topic.length > 0 ? (
                                    <Image
                                      src={`/api/Course-guide/getthumbnail/${data._id}`}
                                      className="img-fluid rounded img-4by3-lg"
                                      alt=""
                                    />
                                  ) : (
                                    <Image
                                      src={`/api/courses/getthumbnail/${data._id}`}
                                      className="img-fluid rounded img-4by3-lg"
                                      alt=""
                                    />
                                  )}
                                </Link>
                              </Col>
                              <Col className="ps-0">
                                <Link href="#">
                                  <h5 className="text-primary-hover">
                                    {data.course_title ||
                                      data.contest_title ||
                                      data.title}
                                  </h5>
                                </Link>
                                <div className="d-flex align-items-center">
                                  {data && data.created_by ? (
                                    <Image
                                      src={`/api/auth/profileimgadmin/${
                                        data && data.created_by
                                      }`}
                                      alt=""
                                      className="rounded-circle avatar-xs me-2"
                                    />
                                  ) : (
                                    ""
                                  )}
                                  <span className="fs-6">
                                    {userDetails[data && data.created_by]
                                      ? userDetails[data && data.created_by]
                                          .fname +
                                        " " +
                                        userDetails[data && data.created_by]
                                          .lname
                                      : "User Name"}
                                  </span>
                                </div>
                              </Col>
                              <Col className="col">
                                <h5 className="text-primary-hover">
                                  {data.course_title
                                    ? "Course"
                                    : data.topic
                                    ? "Guide Path"
                                    : data.questionsList
                                    ? "Contest"
                                    : data.title
                                    ? "Mock"
                                    : ""}
                                </h5>
                              </Col>
                              <Col className="col-auto">
                                ₹{data.currentprice}
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))
                      ) : (
                        <p>No data available</p>
                      )
                    ) : (
                      <Loading />
                    )}
                  </ListGroup>
                </Card.Body>
                <Card>
                  <Card.Body>
                    <div>
                      <h4 className="mb-2">Payment Details</h4>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Sub Total :</p>
                      <p>₹{actualPrice}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p> Discount (GKDIS15%) :</p>
                      <p>
                        <del>₹{discount}</del>
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Shipping Charge :</p>
                      <p>free ₹0 </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <h5>Tax Vat 18% (included) :</h5>
                      <p>₹{formattedTax}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <h5>Paid by Customer :</h5>
                      <h5>₹{paymentDetaile?.amount / 100}</h5>
                    </div>
                  </Card.Body>
                </Card>
              </Card>
            </Col>
            <Col lg={4} md={12} sm={12}>
              <Card className="mb-4">
                {/* Card header */}
                <Card.Header>
                  <div className="d-flex justify-content">
                    <h4 className="mb-0">Customer</h4>
                  </div>
                </Card.Header>
                {/* Card Body */}
                <Card.Body className="p-0">
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <div className="d-flex align-items-center">
                        <div className="position-relative">
                          {user && user._id ? (
                            <Image
                              src={`/api/auth/profileimgadmin/${
                                user && user._id
                              }`}
                              alt=""
                              className="rounded-circle avatar-xl"
                            />
                          ) : (
                            ""
                          )}
                          <Link
                            href="#"
                            className="position-absolute mt-2 ms-n3"
                            data-bs-toggle="tooltip"
                            data-placement="top"
                            title="Verifed"
                          >
                            <Image
                              src="/images/svg/checked-mark.svg"
                              alt=""
                              height="30"
                              width="30"
                            />
                          </Link>
                        </div>
                        <div className="ms-4">
                          <h4 className="mb-0">
                            {user && user.fname} {user && user.lname}
                          </h4>
                          <p className="mb-1 fs-6">{user && user.role}</p>
                          <span className="fs-6">
                            <span className="text-warning">4.5</span>
                            <span className="mdi mdi-star text-warning me-2"></span>
                            Instructor Rating
                          </span>
                        </div>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h4>Contact : </h4>
                      <span>
                        <i className="fe fe-award align-middle me-2 text-info"></i>
                        Email : {user && user.email}
                      </span>
                      <br />
                      <span>
                        <i className="fe fe-calendar align-middle me-2 text-info"></i>
                        Contact : 6265987559
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h4> Address :</h4>
                      {user && user.Address
                        ? user && user.address
                        : "123, Indrapuri Bhopal Madhya Pradesh India 462022"}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
              {/* Card */}
              <Card>
                <Card.Body>
                  <div>
                    <h4 className="mb-2">Payment Details</h4>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>Transaction Id:</p>
                    <p>
                      {paymentDetaile?.acquirer_data?.bank_transaction_id ||
                        paymentDetaile?.acquirer_data?.auth_code ||
                        "N/A"}
                    </p>
                  </div>

                  <div className="d-flex justify-content-between">
                    <p>Payment Method:</p>
                    <p>{paymentDetaile && paymentDetaile.method}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>Card Holder Email:</p>
                    <p>{paymentDetaile && paymentDetaile.email}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>
                      {" "}
                      {paymentDetaile?.bank
                        ? "Bank:"
                        : "Card Id:"}
                    </p>
                    <p>
                      {(paymentDetaile && paymentDetaile.bank) ||
                        (paymentDetaile && paymentDetaile.card_id)}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>Total Amount:</p>
                    <h5>₹{paymentDetaile?.amount / 100}</h5>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {/* Card */}
        </Container>
      </section>
    </Fragment>
  );
};
export default OrderDetails;
