
import { Col, Row, Container, Image } from 'react-bootstrap';
import Link from 'next/link';

const HeroChallenge = () => {
	return (
		<section className="bg-primary">
			<Container>
				{/*  Hero Section  */}
				<Row className="align-items-center g-0">
					<Col xl={7} lg={6} md={12}>
						<div className="py-5 py-lg-0">
							<h1 className="text-white display-4 fw-bold">
								Become a Data Scientist
							</h1>
							<p className="text-white-50 mb-4 lead">
								With 100% Job Placement Assistance

							</p>
							<p className="text-white-50 mb-4 lead">
								Software comes from heaven when you have good hardware. – ...<br />
								There is always one more bug to fix. – ...
								If debugging is the process of removing bugs, then programming must be the process of putting them in. – ...<br />
								Talk is cheap.
							</p>
							<Link href="/marketing/courses/course-filter-page/" className="btn btn-dark">
								Browse Courses
							</Link>{' '}
							<Link href="/authentication/sign-in/" className="btn btn-white">
								Join Cybrom Today
							</Link>
						</div>
					</Col>
					<Col xl={5} lg={6} md={12} className="text-lg-end text-center">
						<Image src='https://cybrom.com/wp-content/uploads/2023/04/saranshjjainn.png' alt="" className="img-fluid py-2" />
					</Col>
				</Row>
			</Container>
		</section >
	);
};
export default HeroChallenge;
