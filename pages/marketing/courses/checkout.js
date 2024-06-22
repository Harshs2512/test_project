// import node module libraries
import React, { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Col,
    Row,
    Container,
    Card,
    Form,
    Button,
    ListGroup,
    Image
} from 'react-bootstrap';
import axios from 'axios';
import { GeeksSEO, LevelIcon } from 'widgets';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import useLocalStorage from 'hooks/useLocalStorage';
import { addtocart, removetocart } from 'store/cartSlice';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Loading from '../../../pages/loading'
const CourseCheckout = () => {
    const router = useRouter();
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState(null);
    const [address, setAddress] = useState(null);
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState('')
    const [state, setState] = useState(null);
    const [zipcode, setZipcode] = useState(null);
    const [country, setCountry] = useState(null);

    const dispatch = useDispatch();
    const defaultCart = useSelector((state) => state.cart);
    const session = useSession()
    const userID = session && session.data && session.data.user && session.data.user._id;
    const [userDetails, setUserDetails] = useState({});
    const {
        setStorageValue,
        getStorageValue,
    } = useLocalStorage('cart', defaultCart);
    useEffect(() => {
        const existingCart = getStorageValue('cart');
        const cart = existingCart ? JSON.parse(existingCart) : [];
        dispatch(addtocart(cart));
    }, [getStorageValue, dispatch]);

    const existingCart = getStorageValue('cart');
    const [alldata, setAlldata] = useState(existingCart ? JSON.parse(existingCart) : []);
    const [userData, setUserData] = useState(alldata && alldata.filter(item => item.user === userID));
    const [selectedItems, setSelectedItems] = useState(userData.map(item => item));
    useEffect(() => {
        if (alldata) {
            const updateData = alldata ? alldata.filter(item => item.user === userID) : []
            setUserData(updateData);
        }
    }, [alldata, userID])
    useEffect(() => {
        if (userData) {
            setSelectedItems(userData.map(item => item));
        }
    }, [userData]);
    let price = 0;
    let discount = 0;
    let paidAmount = 0;
    selectedItems && selectedItems.forEach(element => {
        if (element && element.currentprice) {
            const currentprice = Number(element.currentprice);
            const actualprice = Number(element.actualprice);
            price += currentprice;
            discount += actualprice;
            discount = discount - price;
            discount = discount < 0 ? -discount : discount;
            paidAmount = (price / 100) * 18
            paidAmount = price + paidAmount;
        }
    });
    const deleteCartitem = (item) => {
        const existingCart = getStorageValue('cart');
        const cart = existingCart ? JSON.parse(existingCart) : [];
        const existingIndex = cart.findIndex((i) => i._id === item._id);
        if (existingIndex !== -1) {
            cart.splice(existingIndex, 1);
        }
        setStorageValue(JSON.stringify(cart));
        dispatch((dispatch) => {
            dispatch(removetocart(item));
            const updatedUserData = userData.filter((userDataItem) => userDataItem._id !== item._id);
            setUserData(updatedUserData);
        });
    }

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
        { value: "Andaman and Nicobar Islands", label: "Andaman and Nicobar Islands" },
        { value: "Chandigarh", label: "Chandigarh" },
        { value: "Dadra and Nagar Haveli", label: "Dadra and Nagar Haveli" },
        { value: "Daman and Diu", label: "Daman and Diu" },
        { value: "Delhi", label: "Delhi" },
        { value: "Lakshadweep", label: "Lakshadweep" },
        { value: "Puducherry", label: "Puducherry" },
    ];
    const countrylist = [
        { value: '1', label: 'India' },
    ];
    const fetchUserDetails = async () => {
        try {
            const user = await axios.get(`/api/auth/usersingle/${userID}`);
            setEmail(user.data.email);
            setFname(user.data.fname);
            setLname(user.data.lname);
            setAddress(user.data.address);
            setPhone(user.data.phone);
            setState(user.data.mystate);
            setCountry(user.data.country);
            setZipcode(user.data.zipcode);
        } catch (error) {
            console.error('Error fetching user details', error);
        }
    };
    useEffect(() => {
        fetchUserDetails();
    }, [userID]);
    const handleState = (e) => {
        const state = e.target.value;
        setState(state)
    }
    const handleCountry = (e) => {
        const country = e.target.value;
        setCountry(country)
    }
    const orderData = {
        user_detail: userID,
        purchase_item: selectedItems,
        total_item: selectedItems && selectedItems.forEach(element => { element && element.length }),
        total_price: paidAmount,
    };
    const handlePayment = async () => {
        if (selectedItems.length > 0) {
            const response = await axios.post("/api/orders/createOrder", orderData);
            const order = response.data.data;
            const options = {
                key:"rzp_live_hUsARCAPAsSBNo",
                name: "Cybrom Technology Pvt. Ltd.",
                currency: "INR",
                amount: paidAmount * 100,
                payment_capture: 1,
                order_id: order.order_id,
                description: "Understanding RazorPay Integration",
                image: "/images/brand/logo/cybrom_long.png",
                handler: async function (response) {
                    // if (response.length==0) return <Loading/>;
                    try {
                        const postData = {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                        };
                        const data = await axios.post("/api/orders/razorpay", postData);
                        const res = await data.data;
                        if (res?.message === "success") {
                            const existingCart = getStorageValue('cart');
                            const cart = existingCart ? JSON.parse(existingCart) : [];
                            selectedItems.forEach(item => {
                                const existingIndex = cart.findIndex(i => i._id === item._id);
                                if (existingIndex !== -1) {
                                    cart.splice(existingIndex, 1);
                                }
                            });
                            setStorageValue(JSON.stringify(cart));
                            dispatch(removetocart(...selectedItems));
                            try {
                                router.push("/marketing/student/invoice-details?orderId=" + response.razorpay_order_id);
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
        } else {
            alert("sorry Your Cart is empty Please select any item");
        }
    }
    const handleCheckboxChange = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    }
    useEffect(() => {
        const fetchUserDetails = async (userId) => {
            try {
                const response = await axios.get(`/api/auth/usersingle/${userId && userId}`);
                return response.data;
            } catch (error) {
                console.error('Error fetching user details', error);
                return null;
            }
        };
        if (userData && Array.isArray(userData)) {
            Promise.all(
                userData.map((data) => fetchUserDetails(data && data.created_by))
            )
                .then((userDetailsArray) => {
                    const userDetailsMap = userDetailsArray.reduce((map, userDetail, index) => {
                        if (userDetail) {
                            map[userData[index].created_by] = userDetail;
                        }
                        return map;
                    }, {});
                    setUserDetails(userDetailsMap);
                })
                .catch((error) => {
                    console.error("An error occurred:", error);
                });
        }
    }, [userData]);
    return (
        <Fragment>
            {/* Cybrom SEO settings  */}
            <GeeksSEO title="Checkout | Cybrom Technoloy Pvt.Ltd" />
            <section className="py-6">
                <Container>
                    <Row>
                        <Col xl={8} lg={8} md={12} sm={12}>
                            {/*  Card */}
                            <Card className="mb-4">
                                <Card.Header>
                                    <h3 className="mb-0">Product Details</h3>
                                </Card.Header>
                                {/*  Card body */}
                                {userData.length === 0 ? (<Card.Body>
                                    <h3 className="mb-0">Your cart is Empty </h3>
                                </Card.Body>)
                                 :
                                    (userData && userData.map((item, index) => (
                                        <Card.Body key={index}>
                                            {/* <Link href={`/marketing/courses/course-single/${item.slug}`}> */}
                                            <Card className="mb-2 card-hover">
                                                <Row className="g-0 my-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedItems.includes(item)}
                                                        onChange={() => handleCheckboxChange(item)}
                                                    />
                                                    <Link
                                                        href="#"
                                                        className="bg-cover img-left-rounded col-12 col-md-12 col-xl-3 col-lg-3 mx-2"
                                                    >
                                                        <div>
                                                            <div>
                                                                {item && item.questions_list && item.questions_list.length > 0 ? (
                                                                    <Image
                                                                        src={`/api/quiz/quizthumbnail/${item && item._id}`}
                                                                        className="img-fluid rounded img-4by3-lg"
                                                                        alt=""
                                                                    />
                                                                ) : (
                                                                    <Image
                                                                        src={`/api/courses/getthumbnail/${item && item._id}`}
                                                                        className="img-fluid rounded img-4by3-lg"
                                                                        alt=""
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Col className="ps-0">
                                                        <Link href="#">
                                                            <h5 className="text-primary-hover">
                                                                {item?.course_title || item?.title}
                                                            </h5>

                                                        </Link>
                                                        <ListGroup.Item as="li" bsPrefix="list-inline-item">
                                                            <LevelIcon level={item.level} />
                                                            {item.level}
                                                        </ListGroup.Item>
                                                        <ListGroup.Item as="li" bsPrefix="list-inline-item">
                                                            <i className="far fa-clock me-1"></i>
                                                            {item.questions_list ? `Hours: ${item.hours} Minutes: ${item.minutes} Seconds: ${item.seconds}` : item.duration}
                                                        </ListGroup.Item>
                                                        <div className="d-flex align-items-center">
                                                            <Image
                                                                src={`/api/auth/profileimgadmin/${item && item.created_by}`}
                                                                alt=""
                                                                className="rounded-circle avatar-xs me-2"
                                                            />
                                                            <span className="fs-6">
                                                                {userDetails[item && item.created_by] ? userDetails[item && item.created_by].fname + ' ' + userDetails[item && item.created_by].lname : 'User Name'}
                                                            </span>
                                                        </div>
                                                    </Col>
                                                    <Col className="col-auto mx-4">
                                                    <h4>{item.title ? `Mock` : item.course_title ? "Course" : "Code"}</h4>
                                                    </Col>
                                                    <Col className="col-auto mx-4">
                                                        <span className='mx-2'>₹{item.currentprice}</span>
                                                        <Button className='btn btn-secondary opacity-50 ' onClick={() => deleteCartitem(item)}>
                                                            <i className='fa fa-trash text-white'></i>
                                                        </Button>
                                                    </Col>

                                                </Row>
                                            </Card>
                                            {/* </Link> */}
                                        </Card.Body>
                                    )))}
                            </Card>
                            <Card className="mb-4">
                                <Card.Header>
                                    <h3 className="mb-0">Billing Address </h3>
                                </Card.Header>
                                <Card.Body>
                                    <Form className="row">
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
                                        <Col md={12} sm={12} className="mb-3">
                                            <Form.Group controlId="phone">
                                                <Form.Label>
                                                    Phone Number
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Phone"
                                                    required
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
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
                                            <Form.Group controlId="shippingAddress">
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Shipping address is the same as my billing address"
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="saveCard">
                                                <Form.Check
                                                    type="checkbox"
                                                    checked
                                                    label="Save this information for next time"

                                                />
                                            </Form.Group>
                                        </Col>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4} md={12} sm={12}>
                            <Card className="border-0 mb-3 mb-lg-0">
                                <div className="p-5 text-center">
                                    <div className="mb-5 mt-3">
                                        <h1 className="fw-bold">Price Details</h1>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <div className="display-4 fw-bold text-primary">₹{paidAmount.toFixed(2)}</div>
                                    </div>
                                </div>
                                <hr className="m-0" />
                                <div className="p-5">
                                    <h4 className="fw-bold mb-4">
                                        Order price detail:{' '}
                                    </h4>
                                    {/*  List */}
                                    {selectedItems && selectedItems.map((item, index) => (
                                        <ListGroup key={index} as="ul" className="mb-0" bsPrefix="list-unstyled">
                                            <ListGroup.Item as="li" className="mb-2" >
                                                <div className="d-flex align-items-center justify-content-between ">
                                                    <div className="mb-1 mb-lg-0 ">
                                                        <span>{item.course_title || item.title}</span>
                                                    </div>
                                                    <div>
                                                        <h5>&#x20B9;{item.currentprice}</h5>
                                                    </div>
                                                </div>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    ))}
                                </div>
                                <hr className="m-0" />
                                <div className="p-5">
                                    <ListGroup as="ul" className="mb-0" bsPrefix="list-unstyled">
                                        <ListGroup.Item as="li" className="mb-2" >
                                            <div className="d-flex align-items-center justify-content-between ">
                                                <div className="mb-1 mb-lg-0 ">
                                                    <h5>Total</h5>
                                                    <h5>Total Discount</h5>
                                                    <h5>Amount to be paid include GST</h5>
                                                </div>
                                                <div>
                                                    <h5>&#x20B9;{price.toFixed(2)}</h5>
                                                    <h5><del>&#x20B9;{discount.toFixed(2)}</del></h5>
                                                    <h5>&#x20B9;{paidAmount.toFixed(2)}</h5>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </div>
                                <hr className="m-0" />
                                <div className="p-4">
                                    <div className="p-4">
                                        <Button onClick={() => {
                                            handlePayment({ selectedItems })
                                        }} className="btn ">
                                            CHECK OUT
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Fragment >
    );
};

export default CourseCheckout;
