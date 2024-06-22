// import node module libraries
import React, { Fragment, useEffect, useState } from "react";
import {
  Col,
  Row,
  Container,
  Card,
  Form,
  ListGroup,
  Image,
  Button,
} from "react-bootstrap";
import axios from "axios";
import Link from "next/link";
import { GeeksSEO } from "widgets";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
const BuyPage = () => {
  const router = useRouter();
  const Id = router.query.id;
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState(null);
  const [address, setAddress] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(null);
  const [state, setState] = useState(null);
  const [zipcode, setZipcode] = useState(null);
  const [country, setCountry] = useState(null);
  const [BuyCourse, setBuyCourse] = useState("");
  const session = useSession();
  let price = 0;
  let discount = 0;
  let paidAmount = 0;
  const currentprice = Number(BuyCourse && BuyCourse.currentprice);
  const actualprice = Number(BuyCourse && BuyCourse.actualprice);
  price += currentprice;
  discount += actualprice;
  discount = discount - price;
  discount = discount < 0 ? -discount : discount;
  paidAmount = (price / 100) * 18;
  paidAmount = price + paidAmount;

  const statelist = [
    { value: "Andhra Pradesh", label: "Andhra Pradesh" },
    { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
    { value: "Assam", label: "Assam" },
    { value: "Bihar", label: "Bihar" },
    { value: "Chhattisgarh", label: "Chhattisgarh" },
    { value: "Goa", label: "Goa" },
    { value: "Gujarat", label: "Gujarat" },
    { value: "Haryana", label: "Haryana" },
    { value: "Himachal Pradesh", label: "Himachal Pradesh" },
    { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
    { value: "Jharkhand", label: "Jharkhand" },
    { value: "Karnataka", label: "Karnataka" },
    { value: "Kerala", label: "Kerala" },
    { value: "Madhya Pradesh", label: "Madhya Pradesh" },
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Manipur", label: "Manipur" },
    { value: "Meghalaya", label: "Meghalaya" },
    { value: "Mizoram", label: "Mizoram" },
    { value: "Nagaland", label: "Nagaland" },
    { value: "Odisha", label: "Odisha" },
    { value: "Punjab", label: "Punjab" },
    { value: "Rajasthan", label: "Rajasthan" },
    { value: "Sikkim", label: "Sikkim" },
    { value: "Tamil Nadu", label: "Tamil Nadu" },
    { value: "Telangana", label: "Telangana" },
    { value: "Tripura", label: "Tripura" },
    { value: "Uttarakhand", label: "Uttarakhand" },
    { value: "Uttar Pradesh", label: "Uttar Pradesh" },
    { value: "West Bengal", label: "West Bengal" },
    {
      value: "Andaman and Nicobar Islands",
      label: "Andaman and Nicobar Islands",
    },
    { value: "Chandigarh", label: "Chandigarh" },
    { value: "Dadra and Nagar Haveli", label: "Dadra and Nagar Haveli" },
    { value: "Daman and Diu", label: "Daman and Diu" },
    { value: "Delhi", label: "Delhi" },
    { value: "Lakshadweep", label: "Lakshadweep" },
    { value: "Puducherry", label: "Puducherry" },
  ];
  const countrylist = [{ value: "1", label: "India" }];
  const data = async () => {
    const res = await axios.get(`/api/Contest/${Id}`);
    
    setBuyCourse(res?.data?.contest);
  };
  useEffect(() => {
    if (Id) {
      data();
    }
  }, [Id]);
  const userID = session?.data?.user?._id;
  if (session.status === "unauthenticated") {
    router.push("/authentication/sign-in");
  }
  const fetchData = async (session) => {
    if (userID) {
      const user = await axios.get(`/api/auth/usersingle/${userID}`);
      setEmail(user?.data?.email);
      setFname(user?.data?.fname);
      setLname(user?.data?.lname);
      setAddress(user?.data?.address);
      setPhone(user?.data?.phone);
      setState(user?.data?.mystate);
      setCountry(user?.data?.country);
      setZipcode(user?.data?.zipcode);
    }
  };
  useEffect(() => {
    fetchData(session);
  }, [session]);
  const handleState = (e) => {
    const state = e.target.value;
    setState(state);
  };
  const handleCountry = (e) => {
    const country = e.target.value;
    setCountry(country);
  };
  const orderData = {
    user_detail: userID,
    purchase_item: BuyCourse,
    total_item: BuyCourse?.length,
    total_price: paidAmount,
  };
  const handlePayment = async () => {
    const response = await axios.post("/api/orders/createOrder", orderData);
    const order = response.data.data;
    const options = {
      key: "rzp_live_hUsARCAPAsSBNo",
      name: "Cybrom Technology Pvt. Ltd",
      currency: "INR",
      amount: paidAmount * 100,
      order_id: order.order_id,
      description: "Understanding RazorPay Integration",
      image: "/images/brand/logo/cybrom_long.png",
      handler: async function (response) {
        try {
          const data = await axios.post("/api/orders/razorpay", {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
          const res = await data.data;
          if (res?.message === "success") {
            try {
              router.push(
                "/marketing/student/invoice-details?orderId=" +
                  response.razorpay_order_id
              );
            } catch (error) {
              console.error("Routing error:", error);
            }
          }
        } catch (error) {
          console.error(error);
        }
      },
      prefill: {
        name: fname + " " + lname,
        email: email,
        contact: phone,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      alert("Payment failed. Please try again. Contact support for help");
    });
  };
  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="Checkout | Cybrom Technoloy Pvt.Ltd" />
      {/*  Content */}
      <section className="py-6">
        <Container>
          <Row>
            <Col xl={8} lg={8} md={12} sm={12}>
              {/*  Card */}
              <Card className="mb-4">
                <h3 className="my-2 mx-4">Product Details</h3>
                <Card.Header className="d-flex align-items-center justify-content-between card-header-height">
                  <h4 className="mb-0">Contest</h4>
                  <h4 className="mb-0">Amounts</h4>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item className={`px-0`}>
                      <Row>
                        <Col className="col-auto">
                          <Link href="#">
                            <Image
                              src={`/api/Contest/getthumbnail/${BuyCourse?._id}`}
                              className="img-fluid rounded img-4by3-lg"
                              alt=""
                            />
                          </Link>
                        </Col>
                        <Col className="ps-0">
                          <Link href="#">
                            <h5 className="text-primary-hover">
                              {BuyCourse?.contest_title}
                            </h5>
                          </Link>
                          <h5 className="mb-2">
                            Contest Level : {BuyCourse?.contest_level}
                          </h5>
                        </Col>
                        <Col className="col-auto">
                          ₹{BuyCourse?.currentprice}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
              <Card className="mb-4">
                <Card.Header>
                  <h3 className="mb-0">Billing Address </h3>
                </Card.Header>
                <Card.Body>
                  <Form className="row">
                    {/*  First name  */}
                    <Col md={6} sm={12} className="mb-3">
                      <Form.Group controlId="fname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="First Name"
                          required
                          value={fname}
                          onChange={(e) => setFname(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    {/*  Last name  */}
                    <Col md={6} sm={12} className="mb-3">
                      <Form.Group controlId="lname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Last Name"
                          required
                          value={lname}
                          onChange={(e) => setLname(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    {/*  Phone number  */}
                    <Col md={12} sm={12} className="mb-3">
                      <Form.Group controlId="phone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Phone"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    {/*  Address  */}
                    <Col md={12} sm={12} className="mb-3">
                      <Form.Group controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Address"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    {/*  State */}
                    <Col md={4} sm={12} className="mb-3">
                      <Form.Group className="mb-3" controlId="formState">
                        <Form.Label>State</Form.Label>
                        <Form.Select onChange={handleState}>
                          <option value={state}>{state}</option>
                          {statelist &&
                            statelist.map((c) => (
                              <option key={c.value} value={c.label}>
                                {c.label}
                              </option>
                            ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    {/*  Country  */}
                    <Col md={4} sm={12} className="mb-3">
                      <Form.Group
                        className="mb-3"
                        controlId="formBillingCountry"
                      >
                        <Form.Label>Country</Form.Label>
                        <Form.Select onChange={handleCountry}>
                          <option value={country}>{country}</option>
                          {countrylist.map((c) => (
                            <option key={c.value} value={c.label}>
                              {c.label}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    {/*  Zip code  */}
                    <Col md={4} sm={12} className="mb-3">
                      <Form.Group controlId="zipCode">
                        <Form.Label>Zip/Postal Code</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Zip"
                          required
                          value={zipcode}
                          onChange={(e) => setZipcode(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={12} lg={12}>
                      {/*  Checkbox  */}
                      <Form.Group controlId="shippingAddress">
                        <Form.Check
                          type="checkbox"
                          label="Shipping address is the same as my billing address"
                        />
                      </Form.Group>
                      {/*  Checkbox  */}
                      <Form.Group controlId="saveCard">
                        <Form.Check
                          type="checkbox"
                          label="Save this information for next time"
                        />
                      </Form.Group>
                    </Col>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={12} sm={12}>
              <Card className="border-0 mb-3 mb-lg-0 sticky-top">
                <div className="p-5 text-center">
                  <div className="mb-5 mt-3">
                    <h1 className="fw-bold">Price Details</h1>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div className="display-4 fw-bold text-primary">
                      ₹{paidAmount}
                    </div>
                  </div>
                </div>
                <hr className="m-0" />
                <div className="p-5">
                  <h4 className="fw-bold mb-4">Order price detail: </h4>
                  {/*  List */}
                  <ListGroup as="ul" className="mb-0" bsPrefix="list-unstyled">
                    <ListGroup.Item as="li" className="mb-2" bsPrefix=" ">
                      <div className="d-flex align-items-center justify-content-between ">
                        <div className="mb-1 mb-lg-0 ">
                          <span>{BuyCourse && BuyCourse.course_title}</span>
                        </div>
                        <div>
                          <h5>&#x20B9;{BuyCourse && BuyCourse.currentprice}</h5>
                        </div>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
                <hr className="m-0" />
                <div className="p-5">
                  <ListGroup as="ul" className="mb-0" bsPrefix="list-unstyled">
                    <ListGroup.Item as="li" className="mb-2" bsPrefix=" ">
                      <div className="d-flex align-items-center justify-content-between ">
                        <div className="mb-1 mb-lg-0 ">
                          <h5>Total</h5>
                          <h5>Total Discount</h5>
                          <h5>Amount to be paid include GST</h5>
                        </div>
                        <div>
                          <h5>&#x20B9;{price}</h5>
                          <h5>
                            <del>&#x20B9;{discount}</del>
                          </h5>
                          <h5>&#x20B9;{paidAmount}</h5>
                        </div>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
                <hr className="m-0" />
                <div className="p-4">
                  <Button
                    onClick={() => {
                      handlePayment({ courseId: "12345678900987654321" });
                    }}
                    className="btn "
                  >
                    CHECK OUT
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default BuyPage;
