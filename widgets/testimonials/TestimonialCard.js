// import node module libraries
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';

// import widget/custom components
import { Ratings } from 'widgets';

const TestimonialCard = ({ item }) => {
	return (
		<Card className="border shadow-none">
			<Card.Body className="p-5">
				<div className="mb-2">
					<span className="fs-4 text-warning">
						<Ratings rating={item?.ratings} />
					</span>
				</div>
				<p className="lead text-dark font-italic fw-medium mb-0">
					"{item?.reviews}"
				</p>
			</Card.Body>
			<Card.Footer className="px-5 py-4">
				<div className="d-flex align-items-center">
					{item && item._id &&
						< Image
							src={`/api/siteSettings/landingPage/reviewAndrating/getStudentImg/${item?._id}`}
							alt=""
							className="avatar avatar-md rounded-circle"
						/>
					}
					<div className="ms-3">
						<h4 className="mb-0">{item?.student_name}</h4>
					</div>
				</div>
			</Card.Footer>
		</Card>
	);
};

// Typechecking With PropTypes
TestimonialCard.propTypes = {
	item: PropTypes.object.isRequired
};

export default TestimonialCard;
