// import node module libraries
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Col, Row, Card, ListGroup, Dropdown, Image } from 'react-bootstrap';
import axios from 'axios';

const RecentCourses = ({ title }) => {
	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		(<Link
			href=""
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}
			className="btn-icon btn btn-ghost btn-sm rounded-circle">
			{children}
		</Link>)
	));
	CustomToggle.displayName = 'CustomToggle';
	const [allcourses, setAllcourses] = useState([]);
	const fetchCourse = async () => {
		try {
			const { data } = await axios.get('/api/analytics/recentCourses')
			setAllcourses(data)
		} catch (error) {
			console.log(error)
		}
	};

	useEffect(() => {
		fetchCourse();
	}, [title]);

	return (
		<Card className="h-100">
			<Card.Header className="d-flex align-items-center justify-content-between card-header-height">
				<h4 className="mb-0">{title}</h4>
				<Link href="/dashboard/courses/all-courses" className="btn btn-outline-secondary btn-sm">
					View all
				</Link>
			</Card.Header>
			<Card.Body>
				<ListGroup variant="flush">
					{allcourses.slice(0, 5).map((item, index) => (
						<ListGroup.Item
							className={`px-0 ${index === 0 ? 'pt-0' : ''}`}
							key={index}
						>
							<Row>
								<Col className="col-auto">
									<Link href="#">
										<Image
											src={`/api/courses/getthumbnail/${item._id}`}
											alt="course"
											className="img-fluid rounded img-4by3-lg"
										/>
									</Link>
								</Col>
								<Col className="ps-0">
									<Link href="#">
										<h5 className="text-primary-hover">{item.course_title}</h5>
									</Link>
									<div className="avatar avatar-md avatar-indicators avatar-online">
										<Image
											alt="avatar"
											src={`/api/auth/profileimgadmin/${item.created_by}`} className="rounded-circle"
										/>
										<span className="fs-6">{item.instructor_name}</span>
									</div>
								</Col>
							</Row>
						</ListGroup.Item>
					))}
				</ListGroup>
			</Card.Body>
		</Card>
	);
};
export default RecentCourses;
