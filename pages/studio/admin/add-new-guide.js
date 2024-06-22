// import node module libraries
import React, { useState, Fragment } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import Link from 'next/link';
import { GeeksSEO } from 'widgets';
import GKStepperq from 'widgets/stepper/GKStepperq';
import { AddCourseGuide } from 'studio-components'; 
const AddNewGuide = () => {
	const [currentStep, setCurrentStep] = useState(1);
	const [formData, setFormData] = useState({
		course_title: 'Quiz Title',
		// courses_level: 'Intermediate',
		quiz_Duration: 'Duration',
        category_category: 'Upload Image',
	});
	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value
		});
	};
	const next = () => {
		setCurrentStep(currentStep === 4 ? 1 : currentStep + 1);
	};
	const steps = [
		{
			id: 1,
			title: 'Basic Information',
			content: (
				<AddCourseGuide
					data={formData}
					handleChange={handleChange}
					next={next}
				/>
			)
		},
	];
	return (
		<Fragment>
			{/* Geeks SEO settings  */}
			<GeeksSEO title="Add Course Guided | cybrom technology pvt.ltd." />
			<section className="py-4 py-lg-6 bg-info">
				<Container>
					<Row>
						<Col lg={{ span: 10, offset: 1 }} md={12} sm={12}>
							<div className="d-lg-flex align-items-center justify-content-between">
								<div className="mb-4 mb-lg-0">
									<h1 className="text-white mb-1">Add New Tutorial</h1>
									<p className="mb-0 text-white lead">
										Just fill the form and create your Tutorial.
									</p>
								</div>
								<div>
									<Link
										href="/dashboard/tutorials/all-tutorials"
										className="btn btn-white ">
										Back to All Tutorials
									</Link>{' '}
									<Link
										href="/dashboard/tutorials/all-tutorials"
										className="btn btn-dark">
										Save
									</Link>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
			<GKStepperq currentStep={currentStep} steps={steps} />
		</Fragment>
	);
};

export default AddNewGuide;
