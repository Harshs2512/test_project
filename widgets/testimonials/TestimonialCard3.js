// TestimonialCard3 ( added with v2.0.0 )

// import node module libraries
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';

// import sub components
import Ratings from '../ratings/Ratings';

const TestimonialCard3 = ({ item }) => {
    return (
        <Card style={{minHeight: "350px", width: "430px",}} className="border border-1  border-info ">
            <Card.Body className="text-center p-6">
                {/*  img */}
                <Image src={`/api/siteSettings/landingPage/reviewAndrating/getStudentImg/${item._id}`} alt="costomer image" 
                width={150}
                height={150}
                className="rounded-circle d-inline  mt-n15 border border-1 border-info " />
                <p className="mb-0 mt-3 fs-4">“{item.reviews}”</p>
                {/*  rating */}
                <div className="lh-1 mb-3 mt-4">
                    <span className="text-warning"> <Ratings rating={item.ratings} size='0.975rem' /></span>{' '}
                    <span className="text-warning">{item.ratings}</span>
                    {/*  text */}
                </div>
                <h3 className="mb-0 h4">{item.student_name}</h3>
            </Card.Body>
        </Card>
    );
};

// Typechecking With PropTypes
TestimonialCard3.propTypes = {
    item: PropTypes.object.isRequired
};

export default TestimonialCard3;
