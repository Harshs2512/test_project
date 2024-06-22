// import node module libraries
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Image, Card } from 'react-bootstrap';

const CoursePathCard = ({ item }) => {
	return (
		<Card className="mb-4 card-hover">
			<div className="d-flex justify-content-between align-items-center p-4">
				<div className="d-flex">
					<Link href={`/marketing/courses/course-category/${item?._id}`}>
						<Image src={`/api/siteSettings/secondPage/ouronlineprograms/getlogo/${item.c_id}`} alt="" className="avatar-md" />
					</Link>
					<div className="ms-3">
						<h4 className="mb-1">
							<Link href={`/marketing/courses/course-category/${item?._id}?cid=${item.c_id}`} className="text-inherit">
								{item?.catName}
							</Link>
						</h4>
						<p className="mb-0 fs-6">
							<span className="me-2">
								ONLINE COURSE
							</span>
						</p>
					</div>
				</div>
			</div>
		</Card>
	);
};

// Typechecking With PropTypes
CoursePathCard.propTypes = {
	item: PropTypes.object.isRequired
};

export default CoursePathCard;
