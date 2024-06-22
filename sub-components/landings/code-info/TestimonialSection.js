// import node module libraries
import { Container, Row, Col, Card } from 'react-bootstrap';
import Link from 'next/link';
const TestimonialSection = () => {
	return (
		<Container>
			<Row style={{ width: '840px' }}>
				<Col md={6} sm={12}>
					<section className="shadow-lg mb-4 bg-gray-100 p-4 rounded mt-4" style={{ margin: '-10px' }} >
						<div className='d-flex justify-content-between mx-2 p-2'>
							<h4>Your Guided Path</h4>
							<Link href='#'>See All</Link>
						</div>
						<div className="d-flex" style={{ overflowX: 'auto', whiteSpace: 'nowrap', scrollbarWidth: 'thin', scrollbarColor: 'gray lightgray' }}>
							{[1, 2, 3, 4, 5].map((type, index) => (
								<div key={index} className="card-container" style={{ marginRight: '1rem' }}>
									<Card className="shadow-lg mb-4" style={{ width: '18rem' }}>
										<Card.Body className="p-1 p-md-2 text-center">
											<div className="text-center">
												<h4 className="mb-4 my-4">Data Structures and Algorithm</h4>
												<p className="">
													<span className='mx-2'>
														<i class="fas fa-certificate "></i>
													</span>
													<span >
														Earn certificate of completion
													</span>
												</p>
												<p className=''>
													<span className='mx-2'>
														<i className="fe fe-map-pin me-1 "></i>
													</span>

													<span className=''>
														Average time to complete 120
													</span>
												</p>
												<p className='p-1'>
													<span className='mx-2'>
														<i class="fas fa-clock"></i>
													</span>
													<span className=''>
														Average time to complete 120
													</span>

												</p>
												<p className='p-2 bg-gray-100 border rounded my-2 d-flex align-items-center justify-content-center'>
													<span className='d-block'>
														Earn & upgrade badge
													</span>
													<span className='mx-2 gap-2'>
														<i className="fas fa-award fa-2x text-primary"></i>
														<i className="fas fa-award fa-2x text-primary"></i>
														<i className="fas fa-award fa-2x text-primary"></i>
													</span>
												</p>

												<Link href="#" className="btn btn-sm btn-outline-secondary mt-3 p-2">
													Start Learning
												</Link>
											</div>
										</Card.Body>
									</Card>
								</div>
							))}
						</div>
					</section>
				</Col>
				<Col md={6} sm={12}>
					<section className="shadow-lg mb-4 bg-gray-100 p-4 rounded mt-4">
						<div className='d-flex justify-content-between mx-2 p-2'>
							<h4>Contests</h4>
							<Link href='#'>See All</Link>
						</div>
						<div className="d-flex" style={{ overflowX: 'auto', whiteSpace: 'nowrap', scrollbarWidth: 'thin', scrollbarColor: 'gray lightgray' }}>
							{[1, 2, 3, 4, 5].map((type, index) => (
								<div key={index} className="card-container" style={{ marginRight: '1rem' }}>
									<Card className="shadow-lg mb-4" style={{ width: '18rem' }}>
										<Card.Body className="p-1 p-md-2 text-center">
											<div className="text-center">
												<h4 className="mb-4 my-4">Data Structures and Algorithm</h4>
												<p className="">
													<span className='mx-2'>
														<i class="fas fa-certificate "></i>
													</span>
													<span >
														Earn certificate of completion
													</span>
												</p>
												<p className=''>
													<span className='mx-2'>
														<i className="fe fe-map-pin me-1 "></i>
													</span>

													<span className=''>
														Average time to complete 120
													</span>
												</p>
												<p className='p-1'>
													<span className='mx-2'>
														<i class="fas fa-clock"></i>
													</span>
													<span className=''>
														Average time to complete 120
													</span>

												</p>
												<p className='p-2 bg-gray-100 border rounded my-2 d-flex align-items-center justify-content-center'>
													<span className='d-block'>
														Earn & upgrade badge
													</span>
													<span className='mx-2 gap-2'>
														<i className="fas fa-award fa-2x text-primary"></i>
														<i className="fas fa-award fa-2x text-primary"></i>
														<i className="fas fa-award fa-2x text-primary"></i>
													</span>
												</p>

												<Link href="#" className="btn btn-sm btn-outline-secondary mt-3 p-2">
													Start Learning
												</Link>
											</div>
										</Card.Body>
									</Card>
								</div>
							))}
						</div>
					</section>
				</Col>
			</Row>
		</Container>
	);
};
export default TestimonialSection;
