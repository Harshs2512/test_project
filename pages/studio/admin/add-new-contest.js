// import node module libraries
import React, { useState, Fragment } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import Link from 'next/link';
import { GeeksSEO } from 'widgets';
import GKStepperq from 'widgets/stepper/GKStepperq';
import QuizInformation from 'studio-components/admin/add-new-contest/QuizInformation';

const AddNewQuiz = () => {
	const [currentStep, setCurrentStep] = useState(1);
	const [formData, setFormData] = useState({
		course_title: 'Contest Title',
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
				<QuizInformation
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
			<GeeksSEO title="Add contest | cybrom technology pvt.ltd." />
			<section className="py-4 py-lg-6 bg-primary">
				<Container>
					<Row>
						<Col lg={{ span: 10, offset: 1 }} md={12} sm={12}>
							<div className="d-lg-flex align-items-center justify-content-between">
								<div className="mb-4 mb-lg-0">
									<h1 className="text-white mb-1">Add New Contests</h1>
									<p className="mb-0 text-white lead">
										Just fill the form and create your mock test.
									</p>
								</div>
								<div>
									<Link
										href="/dashboard/contests/all-contests"
										className="btn btn-white ">
										Back to Contest
									</Link>{' '}
									<Link
										href="/dashboard/contests/all-contests"
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

export default AddNewQuiz;
