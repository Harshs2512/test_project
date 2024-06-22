// import node module libraries
import { Fragment } from 'react';
import { Col, Row } from 'react-bootstrap';

// import sub components
import SectionHeading from './SectionHeading';

const Stat = () => {
	const title = 'Our core values';
	const description = `Cybrom is the leading global marketplace for teaching and learning, connecting millions of students to the skills they need to succeed.`;

	const counters = [
		{
			id: 1,
			title: 'Learners',
			value: '10k'
		},
		{
			id: 2,
			title: 'Instructors',
			value: '40+'
		},
		{
			id: 3,
			title: 'Courses',
			value: '20+'
		},
		{
			id: 4,
			title: 'Course enrollments',
			value: '15+'
		}
	];
	return (
		<Fragment>
			<SectionHeading title={title} description={description} />
			<Row>
				{counters.map((item, index) => {
					return (
						<Col lg={3} md={6} sm={6} xs={6} key={index}>
							{/* Counter */}
							<div className="border border-2 border-info shadow-lg  pt-2 mt-3 mb-2 rounded-1   text-center  bg-gray-700">
								<h1 className="display-3 fw-bold mb-0 text-white">{item.value}</h1>
								<p className="text-uppercase  fw-bold text-info">{item.title}</p>
							</div>
						</Col>
					);
				})}
			</Row>
		</Fragment>
	);
};

export default Stat;
