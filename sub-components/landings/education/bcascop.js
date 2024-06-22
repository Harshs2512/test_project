// Section : Hero
// Style : Call To Action

// import node module libraries
import { Col, Row, Container, Image } from 'react-bootstrap';
import Link from 'next/link';

const Bcascop = () => {
	return (
		<section>
			<Container>
                <Row className="align-items-center g-0">
                <Col xl={12} lg={12} md={12} sm={12}>
						{/* Heading */}
						<div className="mt-6 pt-lg-0">
							<h1 className="display-4 fw-bold text-center ">
								Career Scop Ofter BCA Course
							</h1>
						</div>
					</Col>
                </Row>
				<Row className="align-items-center g-0">
					{/* Image */}
					<Col
						xl={12}
						lg={12}
						md={12}
						sm={12}
						className="text-lg-end text-center"
					>
						<Image src="https://distanceeducationschool.com/wp-content/uploads/2022/10/career-scop-in-BCAjpg-1536x882.jpg" alt="" className="img-fluid" />
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default Bcascop;
