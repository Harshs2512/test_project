// import node module libraries
import React, { useContext, Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import {
	Accordion,
	useAccordionButton,
	AccordionContext,
	ListGroup,
	Button
} from 'react-bootstrap';

import Icon from '@mdi/react';
import { mdiPlay } from '@mdi/js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const GKAccordionDefault = ({ accordionItems, onDataChange, isAdmin}) => {
	const [LectureData, setLectureData] = useState({
		videoUrl: '',
		lectureTitle: '',
		isApproved: false
	});
	useEffect(() => {
		onDataChange(LectureData);
	}, [LectureData, onDataChange]);
	
	useEffect(() => {
		setLectureData({
			videoUrl: accordionItems && accordionItems.section[0].lecture[0].videos_details.video,
			lectureTitle: accordionItems && accordionItems.section[0].lecture[0].lecture_name,
			isApproved: false
		});
	}, [])
	const ContextAwareToggle = ({ children, eventKey, callback }) => {
		const { activeEventKey } = useContext(AccordionContext);
		const decoratedOnClick = useAccordionButton(
			eventKey,
			() => callback && callback(eventKey)
		);
		const isCurrentEventKey = activeEventKey === eventKey;
		return (
			<Fragment>
				<Link
					href="#!"
					onClick={decoratedOnClick}
					aria-expanded={isCurrentEventKey}
					className="d-flex align-items-center text-inherit text-decoration-none h4 mb-0"
					data-bs-toggle="collapse"
					aria-controls="courseTwo">
					<div className="me-auto">{children.section_name}</div>
					<span className="chevron-arrow ms-4">
						<i className="fe fe-chevron-down fs-4"></i>
					</span>

				</Link>
			</Fragment>
		);
	};
	const toggleApprovalStatus = async (sectionIndex, lectureIndex) => {
		const updatedCourseData = { ...accordionItems };
		if (updatedCourseData.section[sectionIndex].lecture[lectureIndex].isApproved === 'true') {
			updatedCourseData.section[sectionIndex].lecture[lectureIndex].isApproved = 'false'
		}
		else {
			updatedCourseData.section[sectionIndex].lecture[lectureIndex].isApproved = 'true'
		}
		const formData = new FormData();
		formData.append('course_title', updatedCourseData.course_title);
		formData.append('course_category', updatedCourseData.course_category);
		formData.append('level', updatedCourseData.level);
		formData.append('description', updatedCourseData.description);
		formData.append('requirment', updatedCourseData.tags);
		formData.append('media', JSON.stringify(updatedCourseData.media));
		formData.append('section', JSON.stringify(updatedCourseData.section));
		try {
			const response = await axios.put(`/api/courses/addcourse?id=${updatedCourseData._id}`, formData);
			toast.success("Successfully Update")
		} catch (error) {
			toast.error("not uppdated course")
			console.error('Error:', error);
		}
	}
	return (
		<Fragment>
			<ToastContainer />
			<Accordion defaultActiveKey={accordionItems}>
				<ListGroup as="ul" variant="flush">
					{accordionItems && accordionItems.section.map((item, sectionIndex) => {
						if (item.lecture && item.lecture.length === 0) {
							return (
								<ListGroup.Item
									key={sectionIndex}
									as="li"
								>
									<ContextAwareToggle eventKey={item._id}>
										{item}
									</ContextAwareToggle>
									<Accordion.Collapse eventKey={item._di}>
										<ListGroup variant="flush">
											<ListGroup.Item className="border-0 fs-5 px-0 py-4">
												{item.summary}
											</ListGroup.Item>
										</ListGroup>
									</Accordion.Collapse>
								</ListGroup.Item>
							);
						} else {
							return (
								<ListGroup.Item
									key={sectionIndex}
									as="li"
								>
									<ContextAwareToggle eventKey={item._id}>
										{item}
									</ContextAwareToggle>
									<Accordion.Collapse eventKey={item._id} className="test">
										<ListGroup className="py-4" as="ul">
											{item.lecture && item.lecture.map((subitem, lectureIndex) => (
												<ListGroup.Item
													key={lectureIndex}
													as="li"
													disabled={subitem.locked}
													className="px-0 py-1 border-0"
												>
													<Link
														href="#!"
														className={`d-flex justify-content-between align-items-center text-inherit text-decoration-none`}
														onClick={(e) => setLectureData({
															videoUrl: subitem.videos_details.video,
															lectureTitle: subitem.lecture_name,
															isApproved: subitem.isApproved
														})}>

														<div className="text-truncate ">
															<span className="icon-shape bg-light icon-sm rounded-circle me-2">
																{subitem.locked ? (
																	<i className="fe fe-lock fs-4"></i>
																) : (
																	<Icon path={mdiPlay} size={0.8} />
																)}{' '}
															</span>
															<span className="fs-5">{subitem.lecture_name}</span>
														</div>
														{isAdmin && <div className="text-truncate">
															<h3 className="mb-0 text-truncate-line-2">
																{subitem.isApproved !== 'true' ? (
																	<Button
																		onClick={() =>
																			toggleApprovalStatus(
																				sectionIndex, // Pass section index
																				lectureIndex // Pass lecture index
																			)
																		}
																		className='p-1'
																		variant="danger"
																	>
																		Not Approved
																	</Button>
																) : (
																	<Button
																		onClick={() =>
																			toggleApprovalStatus(
																				sectionIndex, // Pass section index
																				lectureIndex // Pass lecture index
																			)
																		}
																		className='p-1'
																		variant="success"
																	>
																		Approved
																	</Button>
																)}
															</h3>
														</div>}
													</Link>
												</ListGroup.Item>
											))}
										</ListGroup>
									</Accordion.Collapse>
								</ListGroup.Item>
							);
						}
					})}
				</ListGroup>
			</Accordion>
		</Fragment>
	);
};

export default GKAccordionDefault;
