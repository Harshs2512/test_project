// import node module libraries
import Link from 'next/link';
import { Image, Card, Badge } from 'react-bootstrap';
// import widget/custom components
import { Ratings } from 'widgets';

// import utility file
import { numberWithCommas } from 'helper/utils';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const GetEnrolledCourseCard = ({ item }) => {
	const [userDetail, setUserDetail] = useState('');
	const badgeBG = () => {
		switch (item.level) {
			case 'Intermediate':
				return "info-soft"
			case 'Beginner':
				return "success-soft"
			case 'Advance':
				return "danger-soft"
		}
	}
	const created_by = useCallback(async () => {
		try {
			const response = await axios.get(`/api/auth/usersingle/${item?.created_by}`);
			setUserDetail(response.data);
		} catch (error) {
			console.error("Error fetch Course:", error);
		}
	}, [item?.created_by]);
	useEffect(() => {
		created_by();
	}, []);
	return (
		<Link href={`/marketing/courses/course-single/${item.slug}`}>
			<Card className="mb-4 card-hover">
				{/* Card Image */}
				<Link href={`/marketing/courses/course-single/${item.slug}`} className="card-img-top">
					<Image
						src={`/api/courses/getthumbnail/${item._id}`}
						alt={`course ${item._id}`} className="card-img-top rounded-top-md" />
				</Link>
				{/* Card Body */}
				<Card.Body>
					<div className="d-flex justify-content-between align-items-center mb-3">
						<Badge bg={badgeBG()}>{item.level}</Badge>
						<Link href="#" className="text-muted fs-5"><i className="fe fe-heart align-middle"></i></Link>
					</div>
					<h4 className="mb-2 text-truncate-line-2 ">
						<Link href={`/marketing/courses/course-single/${item.slug}`} className="text-inherit">{item.course_title}</Link>
					</h4>
					<small>By: {userDetail.fname}{' '}{userDetail.lname}</small>
					<div className="lh-1 mt-3">
						<span className="text-warning me-1">
							<Ratings rating={item.rating} />
						</span>
						<span className="text-warning me-1">{item.rating}</span>

						<span className="fs-6 text-muted">({numberWithCommas(item.reviews)})</span>
					</div>
				</Card.Body>
				{/* Card Footer */}
				<Card.Footer>
					<div className="row align-items-center g-0">
						<div className="col">
							<h5 className="mb-0"><span>₹{item.currentprice} {' '} ₹<del>{item.actualprice}</del></span></h5>
						</div>
						<div className="col-auto">
							<Link href="#" className="text-inherit">
								<i className="fe fe-shopping-cart text-primary me-2"></i>Get Enrolled
							</Link>
						</div>
					</div>
				</Card.Footer>
			</Card>
		</Link>
	);
};

export default GetEnrolledCourseCard;