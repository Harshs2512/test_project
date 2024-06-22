// import node module libraries
import React from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';

const BlogCardFullWidth = ({ item }) => {
	const formatDate = (dateString) => {
		const months = [
			'January', 'February', 'March', 'April', 'May', 'June', 'July',
			'August', 'September', 'October', 'November', 'December'
		];

		const date = new Date(dateString);
		const year = date.getFullYear().toString(); // Get the last two digits of the year
		const month = months[date.getMonth()]; // Get the month name from the array
		const day = String(date.getDate()).padStart(2, '0');
		return `${month} ${day}, ${year}`;
	};
	const CategoryColors = (category) => {
		switch (category) {
			case 'Courses':
				return 'success';
			case 'Tutorial':
				return 'warning';
			case 'Workshop':
				return 'primary';
			case 'Company':
				return 'info';
			default:
				return 'primary';
		}
	};

	return (
        <Card className="mb-4 shadow-lg">
			<Row className="g-0">
				{/*  Image */}                
				<Link
                    href={`/blog/${item.slug}`}
                    className="col-lg-8 col-md-12 col-12 bg-cover img-left-rounded"
                    style={{
						background: `url(api/blogs/thumbnail/${item._id})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						backgroundPosition: 'top center'
					}}>
                    <Card.Img
						variant="left"
						src={item.blogpostimage}
						className="img-fluid d-lg-none invisible"
					/>

                </Link>
				<Col lg={4} md={12} sm={12}>
					{/*  Card body */}
					<Card.Body>
						<Link
                            href={`/blog/${item.slug}`}
                            className={`fs-5 mb-3 fw-semi-bold d-block text-${CategoryColors(
								item.category
							)}`}>
							{item.postcategory.title}
						</Link>
						<h1 className="mb-2 mb-lg-4">
							<Link href={`/blog/${item.slug}`} className="text-inherit">
								{item.title}
							</Link>
						</h1>
						<p> {item.description}</p>
						{/*  Media content */}
						<Row className="align-items-center g-0 mt-lg-7 mt-4">
							<Col className="col lh-1 ">
								<p className="fs-6 mb-0">{formatDate(`${item.createdAt}`)}</p>
							</Col>
							<Col className="col-auto">
								<p className="fs-6 mb-0">{item.readinglength} Min Read</p>
							</Col>
						</Row>
					</Card.Body>
				</Col>
			</Row>
		</Card>
    );
};

// Typechecking With PropTypes
BlogCardFullWidth.propTypes = {
	item: PropTypes.object.isRequired
};

export default BlogCardFullWidth;
