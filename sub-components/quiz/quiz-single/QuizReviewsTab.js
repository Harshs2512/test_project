// import node module libraries
import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import { Col, Row, Image, ProgressBar, Form, Modal, Button } from 'react-bootstrap';
import { GKTippy, Ratings } from 'widgets';
import moment from 'moment';
// import { Reviews } from 'data/courses/CourseIndexData';
import axios from 'axios'
import { useSession } from 'next-auth/react';

const ReviewsTab = ({ courseID }) => {
	const session = useSession()
	const [show, setShow] = useState(false);
	const [Reviews, setReviews] = useState([])
	const [Reviewdescription, setReviewdescription] = useState([])
	const [Rating, setRating] = useState(1)
	const handleClose = () => {
		setShow(false);
		setReviewdescription("");
		setRating("");
	};
	const handleShow = () => setShow(true);
	const handleRatingClick = (selectedRating) => {
		setRating(selectedRating);
	};
	const fetchData = async () => {
		try {
			if (courseID) {
				const res = await axios.get(`/api/reviewandrating/${courseID}`)
				setReviews(res.data)
			}
		}
		catch (error) {
			console.log(error)
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	const calculateRatingPercentages = (reviews) => {
		const totalReviews = reviews.length;
		const ratingCounts = {
			5: 0,
			4: 0,
			3: 0,
			2: 0,
			1: 0,
		};
		reviews.forEach((review) => {
			ratingCounts[review.ratings]++;
		});
		const ratingPercentages = {};
		for (let i = 5; i >= 1; i--) {
			ratingPercentages[i] = (ratingCounts[i] / totalReviews) * 100;
		}
		return ratingPercentages;
	};
	const ratingPercentages = calculateRatingPercentages(Reviews);

	const calculateAverageRating = (reviews) => {
		if (reviews.length === 0) {
			return 0;
		}
		const totalRatings = reviews.reduce((sum, review) => sum + parseInt(review.ratings), 0);
		const averageRating = totalRatings / reviews.length;
		const ratingOutOf5 = (averageRating / 5) * 5;
		return ratingOutOf5;
	};
	const averageRating = calculateAverageRating(Reviews);
	const handleReviewSubmit = async () => {
		try {
			const reviewData = {
				username: session.data.user._id,
				courseId: courseID,
				ratings: Rating,
				reviews: Reviewdescription,
			};
			const res = await axios.post(`/api/reviewandrating/addreview`, reviewData);
			handleClose();
			fetchData()
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Fragment>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Give Review</Modal.Title>
				</Modal.Header>
				<Modal.Body className="pb-0">
					<Form.Group className="mb-3 text-warning">
						<Form.Label>Raing</Form.Label>
						<br />
						{[1, 2, 3, 4, 5].map((value) => (
							<span
								key={value}>
								<GKTippy
									content={value === 1 ? 'Bad' : value === 2 ? 'Average' : value === 3 ? 'Good' : value === 4 ? 'Very Good' : 'Exelent'}>
									<span
										onClick={() => handleRatingClick(value)}
										style={{
											fontSize: '1.7em',
											cursor: 'pointer',
											color: value <= Rating ? '#f0ad4e' : '#ccc',
										}}
									>
										&#9733;
									</span>
								</GKTippy>
							</span>
						))}
					</Form.Group>
					<Form.Group className="mb-3" controlId="formaddnewsection">
						<Form.Label>Review</Form.Label>
						<Form.Control
							type="text"
							placeholder="Add new section"
							value={Reviewdescription}
							onChange={(e) => setReviewdescription(e.target.value)}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer className="pt-0 border-0 d-inline ">
					<Button onClick={handleReviewSubmit}>Submit Review</Button>
					<Button variant="outline-secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
			<div className="mb-3">
				<div className="d-lg-flex align-items-center justify-content-between mb-5">
					{/* Reviews */}
					<div className="mb-3 mb-lg-0">
						<h3 className="mb-4">How students rated this Mock</h3>
					</div>
					<div>
						<Link href="#" onClick={handleShow} className="btn btn-outline-primary">
							Give Review
						</Link>
					</div>
				</div>
				<Row className="align-items-center">
					<Col xs="auto" className="text-center">
						<h3 className="display-2 fw-bold">{averageRating.toFixed(1)}</h3>
						<span className="text-warning">
							<Ratings rating={averageRating} />
						</span>
						<p className="mb-0 fs-6">(Based on {Reviews.length} reviews)</p>
					</Col>
					{/* Progress bar */}
					<Col className="pt-3 order-3 order-md-2">
						<ProgressBar
							variant="warning"
							now={ratingPercentages[5]}
							className="mb-3"
							style={{ height: '6px' }}
						/>
						<ProgressBar
							variant="warning"
							now={ratingPercentages[4]}
							className="mb-3"
							style={{ height: '6px' }}
						/>
						<ProgressBar
							variant="warning"
							now={ratingPercentages[3]}
							className="mb-3"
							style={{ height: '6px' }}
						/>
						<ProgressBar
							variant="warning"
							now={ratingPercentages[2]}
							className="mb-3"
							style={{ height: '6px' }}
						/>
						<ProgressBar
							variant="warning"
							now={ratingPercentages[1]}
							className="mb-3"
							style={{ height: '6px' }}
						/>
					</Col>
					<Col xs={6} md="auto" className="order-2 order-md-3">
						{/* Rating */}
						<div>
							<span className="text-warning">
								<Ratings rating={5} />
							</span>
							<span className="ms-4">{Math.floor(ratingPercentages[5])}%</span>
						</div>
						<div>
							<span className="text-warning">
								<Ratings rating={4} />
							</span>
							<span className="ms-4">{Math.floor(ratingPercentages[4])}%</span>
						</div>
						<div>
							<span className="text-warning">
								<Ratings rating={3} />
							</span>
							<span className="ms-4">{Math.floor(ratingPercentages[3])}%</span>
						</div>
						<div>
							<span className="text-warning">
								<Ratings rating={2} />
							</span>
							<span className="ms-4">{Math.floor(ratingPercentages[2])}%</span>
						</div>
						<div>
							<span className="text-warning">
								<Ratings rating={1} />
							</span>
							<span className="ms-4">{Math.floor(ratingPercentages[1])}%</span>
						</div>
					</Col>
				</Row>
			</div>
			{/* hr */}
			<hr className="my-5" />
			<div className="mb-3">
				<div className="d-lg-flex align-items-center justify-content-between mb-5">
					{/* Reviews */}
					<div className="mb-3 mb-lg-0">
						<h3 className="mb-0">Reviews</h3>
					</div>
					<div>
						{/* Form */}
						<Form className="form-inline">
							<Form.Group
								className="d-flex align-items-center me-2"
								controlId="formBasicEmail"
							>
								<span className="position-absolute ps-3">
									<i className="fe fe-search"></i>
								</span>
								<Form.Control
									type="search"
									placeholder="Search Review"
									className=" ps-6"
								/>
							</Form.Group>
						</Form>
					</div>
				</div>
				{/* Rating */}
				{Reviews.map((item, index) => (
					<div className="d-flex border-bottom pb-4 mb-4" key={index}>
						{/* <Image
							src={`/api/auth/profileimgadmin/${item.username && item.username._id}`}
							alt=""
							className="rounded-circle avatar-lg"
						/> */}
						<div className="ms-3">
							<div className="fs-6 mb-2 text-warning">
								<Ratings rating={item.ratings} />
							</div>
							<h5
								dangerouslySetInnerHTML={{
									__html: item.reviews
								}}
							/>
							<div className="d-lg-flex align-items-center justify-content-between mb-5">
								<div className="mb-lg-0">
									<h5 className="fs-5 mb-0 text-muted">
										{item && item.username.fname} {item && item.username.lname}
									</h5>
								</div>
								<div>
									<p className="mb-0 text-muted">{moment(item && item.createdAt).fromNow()}</p>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</Fragment>
	);
};
export default ReviewsTab;
