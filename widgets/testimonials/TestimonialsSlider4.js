import React from "react";
import { Container, Row } from "react-bootstrap";
import PropTypes from 'prop-types';
import { StatTopSVGIcon } from 'widgets/stats/StatTopSVGIcon';
import { useMediaQuery } from "react-responsive";

const TestimonialsSlider4 = ({ alldata }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 475px)' });
    const isTablet = useMediaQuery({ query: '(max-width: 768px)' });

    const slicePoint = 6; // Number of cards to display

    const slicedData = alldata?.slice(0, slicePoint);

    return (
        <Container>
            <Row>
                <div className={`marquee d-flex ${isMobile ? 'flex-wrap' : ''}`}>
                    <div className={`marquee-group gap-2 me-2 ${isTablet ? 'mb-3' : ''}`}>
                        {slicedData?.map((item, index) => (
                            <StatTopSVGIcon item={item} key={index} indexNumber={index} />
                        ))}
                    </div>
                    <div className={`marquee-group gap-2 ${isTablet ? 'mb-3' : ''}`}>
                        {slicedData?.map((item, index) => (
                            <StatTopSVGIcon item={item} key={index} indexNumber={index + slicedData.length} />
                        ))}
                    </div>
                </div>
            </Row>
        </Container>
    );
};

TestimonialsSlider4.defaultProps = {
    recommended: false,
    popular: false,
    trending: false
};

TestimonialsSlider4.propTypes = {
    recommended: PropTypes.bool,
    popular: PropTypes.bool,
    trending: PropTypes.bool
};

export default TestimonialsSlider4;
