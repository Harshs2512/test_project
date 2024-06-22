// import node module libraries
import { Fragment, useEffect} from 'react';
import { Col, Row, Nav, Tab, Card, Container, Image  } from 'react-bootstrap';

// import widget/custom components
import { ProfileCover, CourseCard, GeeksSEO } from 'widgets';

// import data files
import { AllCoursesData } from 'data/slider/AllCoursesData';
// import useLocalStorage from 'hooks/useLocalStorage';
import useLocalStorage from 'hooks/useLocalStorage';

const StudentDashboard = () => {
	const dashboardData = {
		avatar: '/images/avatar/avatar-3.jpg',
		name: 'Siwani ',
		username: '@Shiwani',
		linkname: 'Account Setting',
		link: '/marketing/student/edit-profile',
		verified: true,
		outlinebutton: true,
		level: 'Beginner'
	};

	useEffect(() => {
		document.body.className = 'bg-light';
	});
	const { getStorageValue } = useLocalStorage();
	const existingBookmark = getStorageValue('bookmark');
	const bookmark = existingBookmark ? JSON.parse(existingBookmark) : [];
	return (
		<Fragment>
			{/* Geeks SEO settings  */}
			<GeeksSEO title="Student Dashboard | Cybrom Technology Pvt.ltd." />
			<section className="pt-5 pb-5">
				<Container>
					{/* User info */}
					<ProfileCover dashboardData={dashboardData} />
					{/* Content */}
					<Row className="mt-0 mt-md-4">
						<Col lg={12} md={12} sm={12}>
							<Row className="mb-6">
								<Col md={12}>
									<Tab.Container defaultActiveKey="learning">
										<Card className="bg-transparent shadow-none ">
											<Card.Header className="border-0 p-0 bg-transparent">
												<Nav className="nav-lb-tab">
													
													<Nav.Item>
														<Nav.Link
															eventKey="learning"
															className="mb-sm-3 mb-md-0"
														>
															Learning
														</Nav.Link>
													</Nav.Item>
													<Nav.Item className="ms-0">
														<Nav.Link
															eventKey="bookmarked"
															className="mb-sm-3 mb-md-0"
														>
															Bookmarked
														</Nav.Link>
													</Nav.Item>
												</Nav>
											</Card.Header>
											<Card.Body className="p-0">
												<Tab.Content>
													<Tab.Pane
														eventKey="bookmarked"
														className="pb-4 p-4 ps-0 pe-0"
													>
														<Row>
															{bookmark.length !== 0 ? bookmark.slice(0, 8)
																.map((item, index) => (
																	<Col lg={3} md={6} sm={12} key={index}>
																		<CourseCard item={item && item} />
																		
																	</Col>
																)):
																<div className='text-center  justify-content-center  align-items-center '>
																	<h2>Not Bookmarked</h2>
																	<Image src="https://static-00.iconduck.com/assets.00/bookmark-no-icon-2048x1950-drlp73do.png" 
																	alt=""
																	className='w-25' />
																</div>
																}
														</Row>
													</Tab.Pane>
													<Tab.Pane
														eventKey="learning"
														className="pb-4 p-4 ps-0 pe-0"
													>
														{/* learning courses started */}
														<Row>
															{AllCoursesData.filter(function (datasource) {
																return (
																	datasource.id === 1 ||
																	datasource.id === 2 ||
																	datasource.id === 3 ||
																	datasource.id === 4
																);
															}).map((item, index) => (
																<Col lg={3} md={6} sm={12} key={index}>
																	<CourseCard item={item} showprogressbar />
																</Col>
															))}
														</Row>
														{/* end of learning courses */}
													</Tab.Pane>
												</Tab.Content>
											</Card.Body>
										</Card>
									</Tab.Container>
								</Col>
							</Row>
						</Col>
					</Row>
				</Container>
			</section>
		</Fragment>
	);
};
export default StudentDashboard;
