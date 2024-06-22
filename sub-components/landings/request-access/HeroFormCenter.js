// import node module libraries
import {
	Row,
	Col,
	Image,
	Form,
	Button,
	Card,
	Badge,
	Container
} from 'react-bootstrap';
import Link from 'next/link';
const HeroFormCenter = () => {
	return (
		<section style={{position:'relative'}} >
			<video autoplay="" loop='50' playsinline="" muted="" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: '-1' }}>
				<source src="https://statics.globant.com/production/public/2022-08/FastCode_light.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			<Container>
				<Row className='pb-8'>
					<Col xl={{ span: 8, offset: 2 }} lg={12} md={12} className="">
						<div className="mb-4 mb-xl-0 text-center mt-lg-8">
							{/* <!-- Caption --> */}
							<h1 className="display-3 ls-sm  fw-bold text-white">
								EXPLORE CODING PROBLEMS{' '}
							</h1>
						</div>
					</Col>
					<Col xl={{ span: 10, offset: 1 }} sm={12} className="mt-4">
						<Card className="bg-gradient-mix-shade card-hover px-md-5 pt-md-5 px-4 pt-4 rounded-3">
							<Row className="px-2 pt-3 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border smooth-shadow-sm">
								<Col lg={6} className="p-2 p-md-6 pt-lg-0">
									<h1 className="display-4 fw-bold mb-3">
										Problem Of The Day
									</h1>
									<h3 className="fw-bold mb-3">
										Check whether BST contains Dead End
									</h3>
									<p className="lead ">
										1 December
									</p>
									<div className='d-flex mb-4 gap-2 '>
										<Badge bg="dark" pill className="fs-5">Easy</Badge>
										<Link href='#' className='btn p-0 btn-dark'>Data Structure</Link>
										<Badge bg="dark" pill className="fs-5">150 XP</Badge>
									</div>
									<Form>
										<Row>
											<Col md={5} sm={12} className="d-grid mb-3 ps-md-0">
												<Button variant="dark" type="submit">
													Solve Problem
												</Button>
											</Col>
										</Row>
									</Form>
								</Col>
								<Col
									lg={{ offset: 1, span: 5 }}
									className="p-0 overflow-hidden rounded-end-md shadow-lg"
								>
									<h2 className='mb-6 bg-dark rounded border w-50 text-center text-white'>04:50:33</h2>

									<Image
										className="rounded card-img-size-200"
										src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZPlQdcU3r56DSWZFNqXCrvtnsHoAokvvpZtBLh7t1SOQ5ZeK8KywnwhPvu6xyZhyxMp0&usqp=CAU"
										alt=""
									/>
								</Col>
							</Row>
						</Card>
					</Col>
				</Row>
			</Container>
		</section>
	);
};
export default HeroFormCenter;
