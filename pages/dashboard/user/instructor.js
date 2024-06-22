// import node module libraries
import React, { Fragment, useState, useEffect } from 'react';
import { Col, Row, Card, Tab, Breadcrumb, Button } from 'react-bootstrap';

// import widget/custom components
import { GridListViewButton } from 'widgets';

// import sub components
import { InstructorsGridView, InstructorsListItems } from 'sub-components';

// import dashboard layout to override default layout 
import DefaultDashboardLayout from 'layouts/dashboard/DashboardIndex';
import axios from 'axios';
import Link from 'next/link';

const Instructor = () => {
	const [instructorcount, setCount] = useState()
	const instructorCount = async () => {
		try {
			const countData = await axios.get("/api/counterdata/counts")
			setCount(countData.data.counterData.Instructor_count)
		}
		catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		instructorCount();
	}, []);
	return (
		<Fragment>
			<Tab.Container defaultActiveKey="grid">
				<Row>
					<Col lg={12} md={12} sm={12}>
						<div className="border-bottom pb-4 mb-4 d-flex align-items-center justify-content-between">
							<div className="mb-3 mb-md-0">
								<h1 className="mb-1 h2 fw-bold">
									Instructor <span className="fs-5 text-muted">({instructorcount})</span>
								</h1>
								<Breadcrumb>
									<Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
									<Breadcrumb.Item href="#">User</Breadcrumb.Item>
									<Breadcrumb.Item active>Instructor</Breadcrumb.Item>
								</Breadcrumb>
							</div>
							<div>
								<GridListViewButton keyGrid="grid" keyList="list" />
								<Link href={`/dashboard/user/add-instructor`}>
									<Button className='mt-3 p-2'>
										Add new Instructor
									</Button>
								</Link>
							</div>
						</div>
					</Col>
				</Row>
				<Tab.Content>
					<Tab.Pane eventKey="grid" className="pb-4">
						<InstructorsGridView />
					</Tab.Pane>
					<Tab.Pane eventKey="list" className="pb-4">
						<Card className="mb-5 ">
							<Card.Body className="p-0">
								<InstructorsListItems />
							</Card.Body>
						</Card>
					</Tab.Pane>
				</Tab.Content>
			</Tab.Container>
		</Fragment>
	);
};

Instructor.Layout = DefaultDashboardLayout;

export default Instructor;