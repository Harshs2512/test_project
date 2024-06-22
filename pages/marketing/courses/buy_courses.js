// import node module libraries
import React, { useState } from 'react';
import { Col, Row, Container, Tab } from 'react-bootstrap';
import ProfileLayout from 'layouts/marketing/student/ProfileLayout';
// import widget/custom components
import { GridListViewButton, GeeksSEO } from 'widgets';
import axios from "axios";
// import sub components
import { CourseBuyGridView, CourseBuyListView } from 'sub-components';
import {getSession} from "next-auth/react"
const CourseFilterPage = (props) => {
	return (
		<ProfileLayout>
			{/* Geeks SEO settings  */}
			<GeeksSEO title="All Courses | Cybrom Technology Pvt. Ltd." />
			{/* Content */}
			<section className="py-6">
				<Container>
					<Tab.Container defaultActiveKey="list">
						<Row>
							<Col lg={12} md={12} sm={12} className="mb-4">
								<Row className="d-lg-flex justify-content-between align-items-center">
									<Col md={6} lg={10} xl={10}>
										<h4 className="mb-3 mb-lg-0">
											Displaying 9 out of 68 courses
										</h4>
									</Col>
									<Col md={6} lg={2} xl={2} className="d-inline-flex">
										<div className="me-2">
											<GridListViewButton keyGrid="grid" keyList="list" />
										</div>
									</Col>
								</Row>
							</Col>

							{/* Tab content */}
							<Col xl={12} lg={12} md={12} sm={12}>
								<Tab.Content>
									<Tab.Pane eventKey="grid" className="pb-4 px-0">
										<CourseBuyGridView data={props?.data} />
									</Tab.Pane>
									<Tab.Pane eventKey="list" className="pb-4 px-0 react-code">
										<CourseBuyListView data={props?.data} />
									</Tab.Pane>
								</Tab.Content>
							</Col>
						</Row>
					</Tab.Container>
				</Container>
			</section>
		</ProfileLayout>
	);
};

export const getServerSideProps = async ({ req }) => {
	try {
	  const session = await getSession({ req });
	  const userId = session?.user?._id;
	  const orders = await axios.get(`${process.env.NEXTAUTH_URL}/api/courses/addcourse?userId=${userId}`);
	const allCourses = orders?.data?.purchaseItems;
	  return {
		props: {
		  data: allCourses,
		},
	  };
	} catch (error) {
	  console.error("Error fetching data:", error);
	  return {
		props: {
		  data: [],
		},
	  };
	}
  };

export default CourseFilterPage;
