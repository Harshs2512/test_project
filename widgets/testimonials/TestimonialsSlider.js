// import node module libraries
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

// import sub components
import TestimonialCard from './TestimonialCard';
import axios from 'axios';

// import data files
import { TestimonialsList } from 'data/testimonials/TestimonialsList';

const TestimonialsSlider = () => {
	const [alldata, setAllData] = useState([]);

	const fetchData = async () => {
		try {
			const res = await axios.get("/api/siteSettings/landingPage/reviewAndrating/getRecords");
			const liveData = res.data.filter((e) => e.is_published === 'accept')
			setAllData(liveData)
		}
		catch (err) {
			console.log(err)
		}
	};

	useEffect(() => {
		fetchData();
	}, []);
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
				{alldata.map((item, index) => (
					<div className="item p-2" key={item.id}>
						<TestimonialCard key={index} item={item} />
					</div>
				))}
			</Slider>
		</Fragment>
	);
};

// Specifies the default values for props
TestimonialsSlider.defaultProps = {
	recommended: false,
	popular: false,
	trending: false
};

// Typechecking With PropTypes
TestimonialsSlider.propTypes = {
	recommended: PropTypes.bool,
	popular: PropTypes.bool,
	trending: PropTypes.bool
};

export default TestimonialsSlider;
