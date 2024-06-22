// import node module libraries
import React, { useState, useEffect, useCallback } from 'react';
import { Card, Image, Row, Col, ListGroup } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Loading from '../../loading';
import Link from 'next/link';
import axios from 'axios';
const PrintInvoiceDetails = React.forwardRef((props, ref) => {
	const router = useRouter();
	const { orderId } = router.query;
	const [singleOrder, setSingleOrder] = useState();
	const paymentId = singleOrder?.payment_details?.payment_id;
	const [userData, setUserData] = useState();
	const [paymentDetaile, setPaymentDetaile] = useState();
	const user = userData && userData;
	const item = singleOrder && singleOrder.purchase_item;
	const userId = singleOrder && singleOrder.user_detail;

	const [userDetails, setUserDetails] = useState({});
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
		if (item && Array.isArray(item)) {
			Promise.all(
				item.map((data) => fetchUserDetails(data && data.created_by))
			)
				.then((userDetailsArray) => {
					const userDetailsMap = userDetailsArray.reduce((map, userDetail, index) => {
						if (userDetail) {
							map[item[index].created_by] = userDetail;
						}
						return map;
					}, {});
					setUserDetails(userDetailsMap);
				})
				.catch((error) => {
					console.error("An error occurred:", error);
				});
		}
	}, [item]);
	let price = 0;
	let discount = 0;
	let paidAmount = 0;
	let actualPrice = 0
	item && item.forEach(element => {
		const currentprice = Number(element.currentprice);
		const actualprice = Number(element.actualprice);
		actualPrice += actualprice;
		price += currentprice;
		discount += actualprice;
		discount = discount - price;
		discount = discount < 0 ? -discount : discount;
		paidAmount = (price / 100) * 18
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
	const fetchOrder = useCallback(async () => {
		try {
			const response = await axios.get(`/api/orders/findorder?orderId=${orderId}`);
			const data = response.data;
			setSingleOrder(data);
		} catch (error) {
			console.error("Order Fetching error:", error);
		}
	}, [orderId]);
	useEffect(() => {
		fetchOrder();
	}, [orderId]);
	const fetchPayment = async () => {
		try {
			const response = await axios.get(`/api/orders/paymentDetail?paymentId=${paymentId}`);
			const data = response.data;
			setPaymentDetaile(data);
		} catch (error) {
			console.error("Order Fetching error:", error);
		}
	}
	useEffect(() => {
		fetchPayment();
	}, [paymentId]);
	const userDetail = useCallback(async () => {
		try {
			const response = await axios.get(`/api/auth/usersingle/${userId}`);
			const user = response.data;
			setUserData(user);
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	}, [userId])
	useEffect(() => {
		userDetail();
	}, [userId]);
	  const currentDate = new Date().toLocaleString('en-US');
	return (
		<Card className="border-0" ref={ref}>
			<Card.Body>
				{/* Card body */}
				<div className="d-flex justify-content-between mb-6">
					<div>
						{/* Images */}
						<Image src="/images/brand/logo/cybrom_long.png" alt="" className="mb-4 " />
						<h4 className="mb-0">Cybrom Courses</h4>
						<small>INVOICE ID: #1001</small>
					</div>
				</div>
				{/* Row */}
				<Row>
					<Col md={8} sm={12}>
						<span className="fs-6">Invoice From</span>
						<h5 className="mb-3">Cybrom Technology Pvt.Ltd.</h5>
						<p>
							185, 3rd Floor, Zone-I, <br />Maharana Pratap Nagar, Bhopal,<br /> Madhya Pradesh <br /> 462011
						</p>
					</Col>
					<Col md={4} sm={12}>
						<span className="fs-6">Invoice To</span>
						<h5>{user && user.fname}{' '} {user && user.lname} </h5>
						<h5 className="mb-3">{user && user.email}</h5>

						<p>
							775 Rolling Green Rd <br />  Orange, Oklahoma <br />{' '}
							45785 United States
						</p>
					</Col>
				</Row>
				{/* Row */}
				<Row className="mb-5">
					<Col sm={8}>
						<span className="fs-6">INVOICED ID</span>
						<h6 className="mb-0">#1001</h6>
					</Col>
					<Col sm={4}>
						<span className="fs-6">Date : </span>
						<h6 className="mb-0">{currentDate}</h6>
					</Col>
				</Row>
				<Row>
					<Col>
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
													className={`px-0 ${index === 0 ? 'pt-0' : ''}`}
													key={index}
												>
													<Row>
														<Col className="col-auto">
															<Link href="#">
																{data.questions_list && data.questions_list.length > 0 ? (
																	<Image
																		src={`/api/quiz/quizthumbnail/${data._id}`}
																		className="img-fluid rounded img-4by3-lg"
																		alt=""
																	/>
																) : data.questionsList && data.questionsList.length > 0 ? (
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
																) :   (
																	<Image
																		src={`/api/courses/getthumbnail/${data._id}`}
																		className="img-fluid rounded img-4by3-lg"
																		alt=''
																	/>
																)}
															</Link>
														</Col>
														<Col className="ps-0">
															<Link href="#">
																<h5 className="text-primary-hover">
																	{data.course_title || data.title || data.contest_title}
																</h5>
															</Link>
															<div className="d-flex align-items-center">
																{data && data.created_by? 
																<Image
																	src={`/api/auth/profileimgadmin/${data && data.created_by}`}
																	alt=""
																	className="rounded-circle avatar-xs me-2"
																/> :
																"" }
																<span className="fs-6">
																	{userDetails[data && data.created_by] ? userDetails[data && data.created_by].fname + ' ' + userDetails[data && data.created_by].lname : ' ' }
																</span>
															</div>
														</Col>
														<Col className="col">
															<h5 className="text-primary-hover">
																{data.course_title ? "Course" : data.assignmentName ? "Code" : data.title ? 'Mock' : data.contest_title ? "Contest" : ""}
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
										<p>	Discount (GKDIS15%) :</p>
										<p><del>₹{discount}</del></p>
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
				</Row>
				{/* Short note */}
				<p className="border-top pt-3 mb-0 ">
					Notes: Invoice was created on a computer and is valid without the
					signature and seal.
				</p>
			</Card.Body>
		</Card>
	);
});
PrintInvoiceDetails.displayName = 'PrintInvoiceDetails';
export default PrintInvoiceDetails;
