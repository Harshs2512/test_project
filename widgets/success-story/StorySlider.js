// import node module libraries
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { Container, Row, Col } from "react-bootstrap"
// import widget/custom components

import SuccesStoryCard from './success-card';
// import data files
// import { AllCoursesData } from 'data/slider/AllCoursesData';

const StorySlider = (props) => {
	const AllCoursesData = props?.alldata;
	const settings = {
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					initialSlide: 2
				}
			},
			{
				breakpoint: 540,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	};

	return (
		<Fragment>
			<Container>
				<Row className="align-items-center g-0 mb-8">
					<div>
						<h1 className="text-center fw-bolder display-3">Recent Success Stories</h1>
					</div>
						
				</Row>
				<Slider {...settings} className="pb-sm-5 mb-2 slick-slider-wrapper">
					{AllCoursesData?.map((item, index) => (
						<div className="item px-md-1" key={item.id}>
							<SuccesStoryCard key={index} item={item} extraclass="mx-2" />
						</div>
					))}
				</Slider>
			</Container>

		</Fragment>
	);
};

// Specifies the default values for props
StorySlider.defaultProps = {
	recommended: false,
	popular: false,
	trending: false,
	category: null
};

// Typechecking With PropTypes
StorySlider.propTypes = {
	recommended: PropTypes.bool,
	popular: PropTypes.bool,
	trending: PropTypes.bool,
	category: PropTypes.string
};

export default StorySlider;
