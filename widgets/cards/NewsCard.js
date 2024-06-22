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


const NewsCard = ({ item, reviews, free, viewby, showprogressbar, extraclass }) => {

	const GridView = () => {
		return (
			<Card className={`mb-4 card-hover ${extraclass}`}>
				<Link href={`/marketing/courses/course-single/${item.slug}`}>
					<Link href={`/marketing/courses/course-single/${item.slug}`}>
						{
							item._id ? <Image
								src={`/api/courses/getthumbnail/${item._id}`}
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
						<h3 className="h4 mb-2 text-truncate-line-2">
							<Link href={`/marketing/courses/course-single/${item.slug}`} className="text-inherit">
								{item.course_title} {item.title}
							</Link>
						</h3>
						<p className="p mb-1 text-secondary">
							{item.course_category && item.course_category.catName}
						</p>
						<ListGroup as="ul" bsPrefix="list-inline" className="mb-3 text-secondary">
							<ListGroup.Item as="li" bsPrefix="list-inline-item">
								20/05/2024
							</ListGroup.Item>
						</ListGroup>
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
NewsCard.defaultProps = {
	free: false,
	viewby: 'grid',
	showprogressbar: false,
	extraclass: ''
};

// Typechecking With PropTypes
NewsCard.propTypes = {
	item: PropTypes.object.isRequired,
	free: PropTypes.bool,
	viewby: PropTypes.string,
	showprogressbar: PropTypes.bool,
	extraclass: PropTypes.string
};

export default NewsCard;
