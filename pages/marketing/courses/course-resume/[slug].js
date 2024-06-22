// import node module libraries
import React, { Fragment, useEffect, useState,useCallback } from 'react';
import { Col, Row, Container, Card, Dropdown, Button } from 'react-bootstrap';
import Link from 'next/link';
import { MoreVertical, Youtube } from 'react-feather';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

// import MDI icons
import Icon from '@mdi/react';
import { mdiFacebook, mdiTwitter, mdiLinkedin, mdiContentCopy } from '@mdi/js';

// import widget/custom components
import GKYouTube from 'widgets/video/GKYouTube';
import { GKAccordionDefault, GeeksSEO } from 'widgets';

// import data
import { CourseIndex } from 'data/courses/CourseIndexData';

// import your layout to override default layout 
import NavbarDefault from 'layouts/marketing/navbars/NavbarDefault';
import BlankLayout from 'layouts/marketing/BlankLayout';
import { useRouter } from 'next/router';
import axios from 'axios'
import { fetchData } from 'next-auth/client/_utils';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
	(<Link
		href="#"
		ref={ref}
		onClick={(e) => {
			e.preventDefault();
			onClick(e);
		}}>
		{children}
	</Link>)
));
CustomToggle.displayName = 'CustomToggle';
const ActionMenu = () => {
	return (
		<Dropdown>
			<Dropdown.Toggle as={CustomToggle}>
				<MoreVertical size="15px" className="text-secondary" />
			</Dropdown.Toggle>
			<Dropdown.Menu align="end">
				<Dropdown.Header>SHARE</Dropdown.Header>
				<Dropdown.Item eventKey="1">
					<Icon path={mdiFacebook} size={0.8} className="text-secondary" />{' '}
					Facebook
				</Dropdown.Item>
				<Dropdown.Item eventKey="2">
					<Icon path={mdiTwitter} size={0.8} className="text-secondary" />{' '}
					Twitter
				</Dropdown.Item>
				<Dropdown.Item eventKey="3">
					<Icon path={mdiLinkedin} size={0.8} className="text-secondary" />{' '}
					Linked In
				</Dropdown.Item>
				<Dropdown.Item eventKey="4">
					<Icon path={mdiContentCopy} size={0.8} className="text-secondary" />
					Copy Link
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export const CourseResume = () => {
	const [courseData, setCourseData] = useState([]);
	const router = useRouter()
	const fetchData = useCallback(async () => {
		try {
			const res = await axios.get(`/api/courses/${router.query?.slug}`)
			setCourseData(res.data.course)
		}
		catch (error) {
			console.log(error)
		}
	},[router.query?.slug]);
	useEffect(() => {
		if (router.query?.slug) fetchData();
	}, [router.query?.slug,fetchData]);

	const [lectureData, setLectureData] = useState({
		lectureTitle: '',
		videoUrl: ''
	});
	const handleVideourlChange = (item) => {
		setLectureData(item)
	};

	return (
		<Fragment>
			{/* Geeks SEO settings  */}
			<GeeksSEO title="Course Resume | Cybrom Technology" />
			<NavbarDefault login />
			{courseData &&
				courseData.map((course) =>
					<Fragment key={course._id}>
						<main>
							<section className="course-container">
								<Container>
									<Row>
										<Col sm={12} md={12} lg={12}>
											{/*  Tab content  */}
											<div className="content">
												<div className="mt-5">
													{/*  Video */}
													<div className="d-flex align-items-center justify-content-between mb-4">
														<div className='d-flex'>
															<h3 className="me-3 mb-0 text-truncate-line-2">
																{/* {lectureData.videoUrl.slice(63, 160)} */}
																{lectureData.lectureTitle}
															</h3>
														</div>
														<div className="d-flex justify-content-between">
															<Dropdown className="video-info-icon me-2">
																<Dropdown.Toggle
																	bsPrefix=" "
																	as="a"
																	href="#"
																	variant="secondary"
																	id="dropdown-basic"
																>
																	<i className="fe fe-help-circle text-secondary"></i>
																</Dropdown.Toggle>
																<Dropdown.Menu
																	className="p-3"
																	style={{ width: '300px' }}
																>
																	<span>
																		Lorem ipsum dolor sit amet consectetur adipisicing
																		elit. cupiditate consequatur rerum eius ad ut
																		officiis
																	</span>
																</Dropdown.Menu>
															</Dropdown>
															<ActionMenu />
															<Link href="/dashboard/courses/all-courses" className='ms-2 p-1 btn btn-primary'>Dashboard</Link>
														</div>
													</div>
													<div className="mb-10">
														<GKYouTube videoId={lectureData && lectureData.videoUrl} height={'400px'} />
													</div>
												</div>
											</div>
										</Col>
									</Row>
								</Container>
							</section>
							{/*  Card */}
							<section className="card course-sidebar " id="courseAccordion">
								<SimpleBar style={{ maxHeight: '93vh' }}>
									<Card>
										<Card.Header>
											<h4 className="mb-0">Table of Content</h4>
										</Card.Header>
										{/* Course Index Accordion */}
										<GKAccordionDefault accordionItems={course} onDataChange={handleVideourlChange} isAdmin={true}/>
									</Card>
								</SimpleBar>
							</section>
						</main>
					</Fragment>
				)}
		</Fragment>

	);
};

CourseResume.Layout = BlankLayout;

export default CourseResume;
