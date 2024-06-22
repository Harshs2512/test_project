// import node module libraries
import React, { useEffect } from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';
// import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { CldImage } from 'next-cloudinary';

const BlogCard = ({ item }) => {
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

	return (
		<Card className="mb-4 shadow-lg ">
			{console.log(item)}
			<Link href={`/blog/${item.slug}`} className="card-img-top">
				{item && item._id ?
					(<CldImage
						width="960"
						height="600"
						src={item?.thumbnail}
						sizes="100vw"
						alt="Description of my image"
						className="rounded-top-md img-fluid"
					/>) : (
						<Card.Img
							variant="top"
							src="/images/course/Grey-BG.jpg"
							className="rounded-top-md img-fluid"
						/>
					)
				}
			</Link>
			{/* <Link href={`/blog/${item.slug}`} className="card-img-top">
				{item && item._id ? (
					<Image
						src={`/api/blogs/thumbnail/${item._id}`}
						alt={`course ${item._id}`} className="card-img-top rounded-top-md img-fluid"
						width={450}
						height={100}
					/>
				) : ""
				}

			</Link> */}
			<Card.Body>
				<h3>
					<Link href={`/blog/${item.slug}`} className="text-inherit">
						{item.title}
					</Link>
				</h3>
				<p> {item.description} </p>
				{/*  Media content  */}
				<Row className="align-items-center g-0 mt-4">
					<Col className="col lh-1">
						<p className="fs-6 mb-0">{formatDate(`${item.createdAt}`)}</p>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
}

// Typechecking With PropTypes
BlogCard.propTypes = {
	item: PropTypes.object.isRequired
};

export default BlogCard;
