// import node module libraries
import { Fragment, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
	Image,
	Card,
	Row,
	Col,
	ProgressBar,
	ListGroup,
	Badge
} from 'react-bootstrap';
// import widget/custom components
import { GKTippy } from 'widgets';
// import custom components
import Ratings from 'widgets/ratings/Ratings';
import LevelIcon from 'widgets/miscellaneous/LevelIcon';
// import utility file
import { numberWithCommas } from 'helper/utils';
import { useDispatch } from 'react-redux';
import { addtobookmark } from 'store/bookmarkSlice';
import { useSelector } from 'react-redux';
import useLocalStorage from 'hooks/useLocalStorage';
import axios from 'axios';
import { MDBBtn,MDBRipple } from 'mdb-react-ui-kit';
const OfflineCourseCard = ({ item, reviews, free, viewby, showprogressbar, extraclass }) => {
	const [popupAnimationId, setPopupAnimationId] = useState(null);
	let averageRating = 0;
	let totalRatings = 0;
	if (reviews && reviews.length > 0) {
		reviews.forEach(element => {
			averageRating += Number(element.ratings);
			totalRatings++;
		});
		averageRating /= totalRatings;
	}


	const GridView = () => {
		return (
			<Card className={`card-hover ${extraclass}`}>
				<Link href={`/marketing/landings/${item.slug}`}>
					{
						item._id ?
						// <MDBRipple rippleColor='danger' color='light'>
							<Card.Img
							variant="top"
							src={`/images/education/skils.jpg`}
							// /api/siteSettings/megaMenu/coursePage/getlogo/${item._id}
							alt=""
							className="card-img-top rounded-top-md"
						/> 
						// </MDBRipple>
						: ''
					}
					{/* Card body  */}
					<Card.Body>
						<Card.Title className='text-center fs-4 '>{item.course_name}</Card.Title>
					</Card.Body>
					
				</Link>
			</Card>
		);
	};

	return (
		<Fragment>
			{viewby === 'grid' ? (
				<GridView />
			) : (
				''
			)}
		</Fragment>
	);
};

// Specifies the default values for props
OfflineCourseCard.defaultProps = {
	free: false,
	viewby: 'grid',
	showprogressbar: false,
	extraclass: ''
};

// Typechecking With PropTypes
OfflineCourseCard.propTypes = {
	item: PropTypes.object.isRequired,
	free: PropTypes.bool,
	viewby: PropTypes.string,
	showprogressbar: PropTypes.bool,
	extraclass: PropTypes.string
};

export default OfflineCourseCard;
