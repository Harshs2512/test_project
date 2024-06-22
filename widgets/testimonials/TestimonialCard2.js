// import node module libraries
import PropTypes from 'prop-types';
import { Image, Button } from 'react-bootstrap';
import Link from "next/link";
// import MDI icons
import Icon from '@mdi/react';
import { mdiFormatQuoteOpen } from '@mdi/js';
import { useState } from "react";
const TestimonialCard2 = ({ item }) => {
	const [isHovered, setIsHovered] = useState(false);
	return (
		<div className="item  p-4 rounded-2 bg-white ms-4" style={{ height: "510px" }}>

			<div className="text-center p-1">
				<Image
					// src={item.image}
					src={`/api/siteSettings/landingPage/placementRecords/getStudenticon/${item._id}`} alt="Student image"
					width={150}
					height={150}
					className="rounded-circle d-inline  border border-1 border-info " />
			</div>
			<div style={{ height: "230px" }}>
				<div className="d-flex align-items-center py-2">
					<div className="ms-2">
						<h3>
							{item.student_name}
						</h3>
					</div>
				</div>
				<span className="display-6 text-muted">
					<Icon path={mdiFormatQuoteOpen} size={1} />
				</span>
				<p className="fs-3 text-dark lh-lg mb-4 text-truncate-line-3 py-2"><b>{item.position}</b> at {item.company_name} , {item.collage_name}</p>
			</div>
			<div>
				<Button
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					className={`btn px-3 fs-3 m-2 text-white ${isHovered ? 'bg-gradient-buttons-reverse border-0' : 'bg-gradient-buttons border-0'}`}
				>Explore Now<span style={{ marginLeft: '10px' }}>→</span></Button>
			</div>
		</div>
	);
};

// Typechecking With PropTypes
TestimonialCard2.propTypes = {
	item: PropTypes.object.isRequired
};

export default TestimonialCard2;
