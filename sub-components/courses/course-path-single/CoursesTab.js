// import node module libraries
import { Fragment, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

// import widget/custom components
import { CourseCard } from 'widgets';

// import data files
import axios from 'axios';

const CoursesTab = ({ items }) => {
	const [courses, setCourses] = useState([]);

	const fetchData = async () => {
		try {
			const res = await axios.get("/api/courses/getallcourse");
			if (res.data.success === true) {
				const liveResponse = res.data.courses.filter((item) => item.course_category === items);
				setCourses(liveResponse);
			} else {
				fetchData();
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchData();
	}, [items]);

	const renderCourses = (filteredCourses) => {
		if (filteredCourses.length > 0) {
			return filteredCourses.map((item, index) => (
				<Col lg={3} md={6} sm={12} key={index}>
					<CourseCard item={item} />
				</Col>
			));
		} else {
			return <p>Course not found!</p>;
		}
	};

	const BeginnerCourses = () => {
		const beginnerCourses = courses?.filter((item) => item.level === 'Beginners');
		return renderCourses(beginnerCourses);
	};

	const IntermediateCourses = () => {
		const intermediateCourses = courses?.filter((item) => item.level === 'Intermediate');
		return renderCourses(intermediateCourses);
	};

	const AdvanceCourses = () => {
		const advanceCourses = courses?.filter((item) => item.level === 'Advance');
		return renderCourses(advanceCourses);
	};
	
	return (
		<Fragment>
			<Row>
				<Col lg={12}>
					<div className="mb-5">
						<h2 className="mb-1">Beginner</h2>
						<p>
							Learn Bootstrap tutorial for beginners with their easy components
							and utility.
						</p>
					</div>
				</Col>
			</Row>
			<Row>
				<BeginnerCourses />
			</Row>
			<hr className="my-5" />
			{/* Intermediate Courses */}
			<Row>
				<Col lg={12} md={12} sm={12}>
					<div className="mb-5">
						<h2 className="mb-1">Intermediate</h2>
						<p>Learn Bootstrap tutorial for Intermediate with node modules.</p>
					</div>
				</Col>
			</Row>
			<Row>
				<IntermediateCourses />
			</Row>
			{/* Advance Courses */}
			<hr className="my-5" />
			<Row>
				<Col lg={12} md={12} sm={12}>
					<div className="mb-5">
						<h2 className="mb-1">Advance</h2>
						<p>
							Learn Bootstrap tutorial for Advance with node modules and any
							CMS.
						</p>
					</div>
				</Col>
			</Row>
			<Row>
				<AdvanceCourses />
			</Row>
		</Fragment>
	);
};

export default CoursesTab;
