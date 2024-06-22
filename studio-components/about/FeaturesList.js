import { Col, Row, Card } from 'react-bootstrap';
import Link from 'next/link';
// email nat valied 166,
const Features3Columns = () => {
	return (
		<Card className="mb-5">
			{/* Card body */}
			<Card.Body>
				<div className="d-flex justify-content-between align-items-center">
					<h2 className="fw-semi-bold mb-2">
						TOP PROBLEM LISTS
					</h2>
				</div>
				<div className="d-flex mb-5 justify-content-between">
					<span>
						<span className="fw-medium" style={{color:'#98a1a3'}}>Curated lists of code problems by top YouTubers and Companies</span>
					</span>
					<span>
						<Link href="#" className="btn btn-outline-info btn-sm">
							View More
						</Link>
					</span>
				</div>
				{[1, 2, 3, 4, 5].map((data, index) => (
					<Row key={index} className="justify-content-between align-items-center text-white mt-2">
						<Col sm={6} lg={6} className='p-3 rounded m-2 border-bottom '>
							<div className='d-flex'>
								<i className="fas fa-list text-danger mb-md-0 p-1 mx-2"></i>
								<Link href='#'>
									<h5 className="mb-md-0">{data}45 Day Coding Challenge</h5>
								</Link>
							</div>
						</Col>
						<br />
						<Col sm={6} lg={6} className='p-3 rounded m-2 border-bottom '>
							<div className='d-flex'>
								<i className="fas fa-list text-danger mb-md-0 p-1 mx-2"></i>
								<Link href='#'>
									<h5 className="mb-md-0">Love Babbar DSA Sheet Problems</h5>
								</Link>
							</div>
						</Col>
					</Row>
				))}
			</Card.Body>
		</Card>

	);
};

export default Features3Columns;
