// import node module libraries
import { Container, Row, Col, Button } from 'react-bootstrap';

// import widget/custom components
import { TestimonialsSlider2, SectionHeadingLeft2 } from 'widgets';

const TestimonialSection = () => {
	return (
		<section className="bg-gray">
			{/* <Container> */}
			<Row className="w-75 mx-auto" >
				<Col xl={12} sm={12}>
					<Row className="mb-4 p-2">
						<Col lg={12} md={12} sm={12} className="mb-4">
							<SectionHeadingLeft2
								title="Placed Students loves. Says"
								description="Optimized for a Placed Students experience."
							/>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row className="mb-4 p-2 mx-4" 
			// style={{ position: 'relative' }}
			>
				<Col
					lg={4}
					md={12}
					sm={12}
					className=" text-white p-4"
					style={{
					// 	position: 'absolute',
						top: 0,
						left: 0,
						zIndex: 1,
						borderRadius: '0 200px 0 0',
						height: '85%',
						 background: 'linear-gradient(0deg, rgba(23, 82, 126, 1) 16%, rgba(1, 9, 15, 1) 100%)' 
					}}
				>
					<div className='p-lg-6 p-2 mt-lg-4 mt-2'>
						<p className="text-white fs-3">Testimonials</p>
						<h3 className="display-4 text-white py-4">Build Your Success Story With Cybrom</h3>
						<p className="h5 text-white fs-3">Enhance your career with Cybrom Technology’s Python course and become a Python Pro</p>
						<div className=" mt-lg-4 mt-2 py-2">
							<Button variant="danger" className="fs-3 px-3">Apply NOW!<span style={{ marginLeft: '10px' }}>→</span></Button>
						</div>
					</div>

				</Col>
				<Col md={8} sm={12} className=" py-4" >
					<TestimonialsSlider2 />
				</Col>
			</Row>



			{/* </Container> */}
		</section>
	);
};
export default TestimonialSection;
