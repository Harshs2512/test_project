// import node module libraries
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
	Image,
	Card,
	ListGroup,
} from 'react-bootstrap';
import { Clock } from 'react-bootstrap-icons';

const ShortCourseCard = ({ item, viewby, extraclass }) => {
	const GridView = () => {
		return (
			<Card className={`mb-4 card-hover ${extraclass}`}>
				<Link href={`/marketing/courses/course-single/${item.slug}`}>
					<Link href={`/marketing/courses/course-single/${item.slug}`}>
						{
							item._id ? <Image
								src={`/api/courses/short-course/getthumbnail/${item._id}`}
								alt=""
								className="card-img-top rounded-top-md"
							/> : <Image
								src={`${item.image}`}
								alt=""
								className="card-img-top rounded-top-md"
							/>
						}
					</Link>
					{/* Card body  */}
					<Card.Body>
						<h3 className="h3 mb-2 text-truncate-line-2">
							<Link href={`/marketing/courses/course-single/${item.slug}`} className="text-inherit">
								{item.course_title}
							</Link>
						</h3>
						<p className="p mb-1 text-secondary">
							{item.course_category && item.course_category.catName}
						</p>
						<ListGroup as="ul" bsPrefix="list-inline" className="mb-3 text-secondary">
							<ListGroup.Item as="li" bsPrefix="list-inline-item">
								<span className="me-1"><Clock size={30} /></span> Duration {item.duration}
							</ListGroup.Item>
						</ListGroup>
						<p className="p mb-1 text-secondary fs-3">
							<i
								className={`fe ${item.project === "No" ? 'fe-x-circle' : 'fe-check-circle'} rounded-circle p-1 text-white me-2 fs-3 ${item.project === "No" ? 'bg-danger' : 'bg-success'}`}
							></i>
							Project
						</p>
						<div className="d-flex justify-content-between py-4 px-2">
							{item?.subjectImages.slice(0, 3).map((image, index) => (
								<div className="text-center" key={index}>
									<Image
										className='rounded'
										size="md"
										src={`data:${image.contentType};base64,${Buffer.from(
											image.data
										).toString("base64")}`}
										type="image"
										name={image._id}
										width={50}
										height={50}
									/>
								</div>
							))}

						</div>

					</Card.Body>
				</Link>
			</Card>

		);
	};

	return (
		<Fragment>
			{viewby === 'grid' ? (
				<GridView />
			) : ' '}
		</Fragment>
	);
};

// Specifies the default values for props
ShortCourseCard.defaultProps = {
	free: false,
	viewby: 'grid',
	showprogressbar: false,
	extraclass: ''
};

// Typechecking With PropTypes
ShortCourseCard.propTypes = {
	item: PropTypes.object.isRequired,
	free: PropTypes.bool,
	viewby: PropTypes.string,
	showprogressbar: PropTypes.bool,
	extraclass: PropTypes.string
};

export default ShortCourseCard;
