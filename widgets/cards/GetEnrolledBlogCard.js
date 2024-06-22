// import node module libraries
import Link from 'next/link';
import { Card, Badge,Image } from 'react-bootstrap';
const GetEnrolledBlogCard = ({ item }) => {
	const badgeBG = () => {
		switch (item.level) {
			case 'Intermediate':
				return "info-soft"
			case 'Beginner':
				return "success-soft"
			case 'Advance':
				return "danger-soft"
		}
	}
	const formatDate = (dateString) => {
		const months = [
			'January', 'February', 'March', 'April', 'May', 'June', 'July',
			'August', 'September', 'October', 'November', 'December'
		];

		const date = new Date(dateString);
		const year = date.getFullYear().toString();
		const month = months[date.getMonth()];
		const day = String(date.getDate()).padStart(2, '0');
		return `${month} ${day}, ${year}`;
	};
	return (
		<Link href={`/blog/${item.slug}`} className='bg-danger' >
			<Card className="mb-4 card-hover mx-1" style={{ height: "65vh" }}>
				{/* Card Image */}
				<Link href={`/blog/${item.slug}`} className="card-img-top">
					<Image
						src={`/api/blogs/thumbnail/${item._id}`}
						alt={`course ${item._id}`} className="card-img-top rounded-top-md"
					/>
				</Link>
				{/* Card Body */}
				<Card.Body>
					<div className="d-flex justify-content-between align-items-center mb-3">
						<Badge bg={badgeBG()}>{item.level}</Badge>
						<Link href="#" className="text-muted fs-5"><i className="fe fe-heart align-middle"></i></Link>
					</div>
					<h4 className="mb-2 text-truncate-line-2 ">
						<Link href={`/blog/${item.slug}`} className="text-inherit">{item.title}</Link>
					</h4>
					<div className="lh-1 mt-3">
						<span className="me-1">{item.description?.slice(0, 50)}...</span>
					</div>
				</Card.Body>
				{/* Card Footer */}
				<Card.Footer>
					<div className="row align-items-center g-0">
						<div className="col">
							<h5 className="mb-0">{formatDate(item.createdAt)}</h5>
						</div>
						<div className="col-auto">
							<Link href="#" className="text-inherit">
								{item.postcategory && item.postcategory.title}
							</Link>
						</div>
					</div>
				</Card.Footer>
			</Card>
		</Link>
	);
};

export default GetEnrolledBlogCard;