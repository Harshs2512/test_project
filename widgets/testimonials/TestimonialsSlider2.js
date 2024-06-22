// import node module libraries
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import axios from "axios";
// import sub components
import TestimonialCard2 from './TestimonialCard2';

// Custom Arrow Component
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', bottom: '0', left: '95%', transform: 'translateX(50%)', zIndex: 2 }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', bottom: '0', left: '88%', transform: 'translateX(-50%)', zIndex: 2 }}
      onClick={onClick}
    />
  );
};

const TestimonialsSlider2 = () => {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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

  const [allposts, setAllpost] = useState([]);
  const fetchData = async () => {
    try {
      const res = await axios.get("/api/siteSettings/landingPage/placementRecords/getRecords");
      if (res.status === 200) {
        setAllpost(res.data)
      }
    }
    catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <Slider {...settings} className="pb-5 mb-5 slider-arrow-left">
        {allposts?.map((item) => (
          <div className="item" key={item.id}>
            <TestimonialCard2 item={item} />
          </div>
        ))}
      </Slider>
    </Fragment>
  );
};

// Specifies the default values for props
TestimonialsSlider2.defaultProps = {
  recommended: false,
  popular: false,
  trending: false,
};

// Typechecking With PropTypes
TestimonialsSlider2.propTypes = {
  recommended: PropTypes.bool,
  popular: PropTypes.bool,
  trending: PropTypes.bool,
};

export default TestimonialsSlider2;
