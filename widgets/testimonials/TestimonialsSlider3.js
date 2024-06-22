import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import TestimonialCard3 from './TestimonialCard3';

const TestimonialsSlider3 = ({alldata}) => {
	const settings = {
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
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
			<Slider {...settings} className="pb-5 mb-5 testimonials">
				{alldata?.map((item, index) => (
					<div className="item pt-12 p-2 d-flex" key={index}>
						<TestimonialCard3 key={index} item={item} />
					</div>
				))}
			</Slider>
		</Fragment>
	);
};

// Specifies the default values for props
TestimonialsSlider3.defaultProps = {
	recommended: false,
	popular: false,
	trending: false
};

// Typechecking With PropTypes
TestimonialsSlider3.propTypes = {
	recommended: PropTypes.bool,
	popular: PropTypes.bool,
	trending: PropTypes.bool
};

export default TestimonialsSlider3;
