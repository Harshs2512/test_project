// import node module libraries
import React, { useState, Fragment } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import Link from 'next/link';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import widget/custom components
import { GeeksSEO } from 'widgets';
import GKStepper from 'widgets/stepper/GKStepper';
import axios from 'axios'
// import sub components
import { BasicInformation, CoursesMedia, Curriculum, Settings } from 'sub-components';
import { useRouter } from 'next/router';


const AddNewCourse = () => {
	const router = useRouter()
	const [loading, setLoadind] = useState(false)
	const [currentStep, setCurrentStep] = useState(1);
	const [basicInformationData, setBasicInformationData] = useState({});
	const [mediaData, setMediaData] = useState({});
	const [curriculum, setCurriculam] = useState([]);
	const [settings, setSettings] = useState({});

	const handleBasicInformationDataChange = (basicInformationData) => {
		setBasicInformationData(basicInformationData);
	};
	const handleMediaDataChange = (mediaData) => {
		setMediaData(mediaData)
	};
	const handleCurriculum = (curriculum) => {
		setCurriculam(curriculum)
	};
	const handleSettings = (settings) => {
		setSettings(settings)
	};
	const next = () => {
		setCurrentStep(currentStep === 4 ? 1 : currentStep + 1);
	};
	const previous = () => {
		setCurrentStep(currentStep === 1 ? 1 : currentStep - 1);
	};
	const media = {
		url: mediaData.video_url,
	}
	const section = curriculum.map(section => ({
		'section_name': section.section_title,
		'lecture': section.lecture.map(lecture => ({
			'lecture_name': lecture.lecture_title,
			'videos_details': {
				video: lecture.lecture_url,
				description: lecture.description,
			}
		}))
	}))
	const formData = new FormData();
	formData.append("thumbnail", mediaData.course_thumbnail);
	formData.append("course_title", basicInformationData.course_title);
	formData.append("course_category", basicInformationData.category);
	formData.append("level", basicInformationData.courses_level)
	formData.append("description", basicInformationData.courses_des);
	formData.append("requirment", settings);
	formData.append("media", JSON.stringify(media));
	formData.append("section", JSON.stringify(section));
	const handleSubmit = async (e) => {
		setLoadind(true)
		e.preventDefault();
		try {
			const response = await axios.post("/api/courses/addcourse", formData);
			toast.success("course Added Successfully");
			setLoadind(false)
			router.push("/dashboard/courses/all-courses")
		} catch (error) {
			toast.error("course Not Added. Please try again.");
			console.error(error);
		}
	};
	const steps = [
		{
			id: 1,
			title: 'Basic Information',
			content: (
				<BasicInformation
					next={next}
					onDataChange={handleBasicInformationDataChange}
				/>
			)
		},
		{
			id: 2,
			title: 'Courses Media',
			content: (
				<CoursesMedia
					next={next}
					previous={previous}
					onDataChange={handleMediaDataChange}
				/>
			)
		},
		{
			id: 3,
			title: 'Curriculum',
			content: (
				<Curriculum
					next={next}
					previous={previous}
					onDataChange={handleCurriculum}
				/>
			)
		},
		{
			id: 4,
			title: 'Settings',
			content: (
				<Settings
					next={next}
					previous={previous}
					loading={loading}
					onDataChange={handleSettings}
					onSubmit={handleSubmit}
				/>
			)
		}
	];

	return (
		<Fragment>
			<ToastContainer />
			{/* Geeks SEO settings  */}
			<GeeksSEO title="Add Course |Cybrom Technology pvt. Ltd." />

			<section className="py-4 py-lg-6 bg-primary">
				<Container>
					<Row>
						<Col lg={{ span: 10, offset: 1 }} md={12} sm={12}>
							<div className="d-lg-flex align-items-center justify-content-between">
								<div className="mb-4 mb-lg-0">
									<h1 className="text-white mb-1">Add New Course</h1>
									<p className="mb-0 text-white lead">
										Just fill the form and create your courses.
									</p>
								</div>
								<div>
									<Link
										href="/marketing/instructor/my-courses"
										className="btn btn-white ">
										Back to Course
									</Link>{' '}
									<Link
										href="#"
										className="btn btn-dark">
										Save
									</Link>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
			<GKStepper currentStep={currentStep} steps={steps} />
		</Fragment>
	);
};

export default AddNewCourse;
