// import node module libraries
import { Typewriter } from 'react-simple-typewriter'
import Link from 'next/link';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import Icon from '@mdi/react';
import { mdiCheck } from '@mdi/js';

const HeroTyped = ({ alldata }) => {
	return (
		<section className="py-lg-18 py-8 bg-auto hero-graphics">
			<Container>
				<Row className="justify-content-center">
					<Col xl={7} lg={7} md={12}>
						<div className="py-8 py-lg-0 text-center">
							<h3 className="text-dark px-3 px-md-0">{alldata[0]?.heading}</h3>
							<div className="display-2 fw-bold mb-3 text-primary d-lg-flex ms-lg-15 d-block">
								<h1 className="text-dark px-3 px-md-0 fs-2">{alldata[0]?.prefix}</h1>
								<h1 className="text-primary ms-2 fs-1">
									<Typewriter
										words={[`${alldata[0]?.typed_one}`, `${alldata[0]?.typed_two}`]}
										loop
										cursor
										cursorStyle='|'
										typeSpeed={60}
										deleteSpeed={50}
										delaySpeed={1000}
									/>
								</h1>
								<h1 className="text-dark px-3 px-md-0 fs-2">{alldata[0]?.suffix}</h1>
							</div>
							<p className="mb-6 h2 text-dark">
								{alldata[0]?.description}
							</p>
							<Link href="#" className="btn btn-white position-relative">EXPLORE OUR PROGRAMS
								<i className="fe fe-chevron-right fe-2xl ms-5 text-xl"></i>
							</Link>
							<div className="mt-8 mb-0">
								<ListGroup as="ul" bsPrefix="list-inline">
									<ListGroup.Item
										as="li"
										bsPrefix="list-inline-item text-dark fw-semi-bold lh-1 fs-4 me-3 mb-2 mb-md-0"
									>
										<span className="icon-shape icon-xs rounded-circle bg-light-success text-center me-2">
											<Icon
												path={mdiCheck}
												size={0.7}
												className="text-success"
											/>
										</span>
										<span className="align-middle">{alldata[0]?.highlight1}</span>
									</ListGroup.Item>
									<ListGroup.Item
										as="li"
										bsPrefix="list-inline-item text-dark fw-semi-bold lh-1 fs-4 me-3 mb-2 mb-md-0"
									>
										<span className="icon-shape icon-xs rounded-circle bg-light-success text-center me-2">
											<Icon
												path={mdiCheck}
												size={0.7}
												className="text-success"
											/>
										</span>
										<span className="align-middle">{alldata[0]?.highlight2}</span>
									</ListGroup.Item>
									<ListGroup.Item
										as="li"
										bsPrefix="list-inline-item text-dark fw-semi-bold lh-1 fs-4"
									>
										<span className="icon-shape icon-xs rounded-circle bg-light-success text-center me-2">
											<Icon
												path={mdiCheck}
												size={0.7}
												className="text-success"
											/>
										</span>
										<span className="align-middle">{alldata[0]?.highlight3}</span>
									</ListGroup.Item>
								</ListGroup>
							</div>
							<a href="https://mediafiles.botpress.cloud/bd7b4eff-f9dc-4311-94c2-7bd966ffc3ea/webchat/bot.html "  />
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};


export default HeroTyped;