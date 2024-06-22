
import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';

// import widget/custom components
import { FormSelectLevel, ReactQuillEditor } from 'widgets';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { mdiLoading } from '@mdi/js';

const BasicInformation = (props) => {
	const [loading, setLoadind] = useState(false);
	const [titleError, setTitleError] = useState('');
	const [sectiontitleError, setSectionTitleError] = useState('');
	const [category, setCategory] = useState('');
	const [categoryError, setCategoryError] = useState('');
	const [typedtitleError, setTypedtitleError] = useState('');
	const [formData, setFormData] = useState({
		id: '',
		thumbnail: '',
		course_name: '',
		category: '',
		section_title: '',
		typedtitle_one: '',
		typedtitle_second: '',
		typedtitle_third: '',
		student_image: '',
	});
	const { next } = props;

	const validateTitle = (title) => {
		return title.trim().length > 0 ? '' : 'Course title is required';
	};

	const validateCategory = (category) => {
		return category.trim().length > 0 ? '' : 'Category is required';
	};

	const validateTypedTitle = (title) => {
		return title.trim().length > 0 ? '' : 'Typed title is required';
	};

	const validateSectiontitle = (title) => {
		return title.trim().length > 0 ? '' : 'section title is required';
	};

	const getcategories = async (req, res) => {
		try {
			const { data } = await axios.get("/api/siteSettings/megaMenu/category/getcategory");
			setCategory(data.categories);
		} catch (error) {
			console.log("Error fetching categories:", error);
			toast.error("Error fetching categories");
		}
	};

	useEffect(() => {
		getcategories();
	}, []);

	console.log(formData)

	const handleChangeCategory = (e) => {
		const { value } = e.target;
		setCategoryError(validateCategory(value));
		setFormData({ ...formData, category: value });
	};

	useEffect(() => {
		props.onDataChange(formData);
	}, [formData, props.onDataChange]);

	const handleNext = () => {
		const titleValidation = validateTitle(formData.course_name);
		const categoryValidation = validateCategory(formData.category);
		const sectiontitleValidation = validateSectiontitle(formData.section_title);
		const typedtitleValidation = validateTypedTitle(formData.typedtitle_one);

		setTitleError(titleValidation);
		setCategoryError(categoryValidation);
		setSectionTitleError(sectiontitleValidation);
		setTypedtitleError(typedtitleValidation);

		if (!titleValidation && !categoryValidation && !sectiontitleValidation && !typedtitleValidation) {
			next();
		}
	};

	return (
		<Form>
			{/* Category */}
			<Form.Group className='mb-3'>
				<Form.Label>Category</Form.Label>
				<Form.Select
					onChange={handleChangeCategory}
					value={formData.category}
				>
					{category &&
						category.map((c) => (
							<option key={c?._id} value={c?._id}>
								{c?.title}
							</option>
						))
					}
				</Form.Select>
				<Form.Text className="text-danger">
					{categoryError}
				</Form.Text>
			</Form.Group>
			{/* Title  */}
			<Row>
				<Col sm={12} lg={6}>
					<Form.Group className="mb-3">
						<Form.Label htmlFor="courseTitle">Course name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Course Title"
							id="course_title"
							name="course_title"
							value={formData.course_name}
							onChange={(e) =>
								setFormData({ ...formData, course_name: e.target.value })
							}
							required
						/>
						<Form.Text className="text-muted">
							Write a 60 character course title.
						</Form.Text><br />
						<Form.Text className="text-danger">
							{titleError}
						</Form.Text>
					</Form.Group>
				</Col>
				<Col sm={12} lg={6}>
					<Form.Group className='mb-3'>
						<Form.Label>Course Thumnail</Form.Label>
						<Form.Control
							type="file"
							name='thumnail'
							accept="image/*"
							onChange={(e) => setFormData({
								...formData,
								thumbnail: e.target.files[0]
							})}
						/>
					</Form.Group>
				</Col>
			</Row>
			<div className='mt-3 border bg-gray-200 px-3 rounded mb-3'>
				<Form.Label className='mt-1'>Content</Form.Label>
			</div>
			<Row>
				<Col sm={12} lg={6}>
					<Form.Group className="mb-3">
						<Form.Label htmlFor="courseTitle">Section Title</Form.Label>
						<Form.Control
							type="text"
							placeholder="Course Title"
							id="course_title"
							name="course_title"
							value={formData.section_title}
							onChange={(e) =>
								setFormData({ ...formData, section_title: e.target.value })
							}
							required
						/>
						<Form.Text className="text-danger">
							{sectiontitleError}
						</Form.Text>
					</Form.Group>
				</Col>
				<Col sm={12} lg={6}>
					<Form.Group className="mb-3">
						<Form.Label htmlFor="courseTitle">Typed Title 1</Form.Label>
						<Form.Control
							type="text"
							placeholder="Course Title"
							id="course_title"
							name="course_title"
							value={formData.typedtitle_one}
							onChange={(e) =>
								setFormData({ ...formData, typedtitle_one: e.target.value })
							}
							required
						/>
						<Form.Text className="text-danger">
							{typedtitleError}
						</Form.Text>
					</Form.Group>
				</Col>
				<Col sm={12} lg={6}>
					<Form.Group className="mb-3">
						<Form.Label htmlFor="courseTitle">Typed Title 2</Form.Label>
						<Form.Control
							type="text"
							placeholder="Course Title"
							id="course_title"
							name="course_title"
							value={formData.typedtitle_second}
							onChange={(e) =>
								setFormData({ ...formData, typedtitle_second: e.target.value })
							}
							required
						/>
						<Form.Text className="text-danger">
							{titleError}
						</Form.Text>
					</Form.Group>
				</Col>
				<Col sm={12} lg={6}>
					<Form.Group className="mb-3">
						<Form.Label htmlFor="courseTitle">Typed Title 3</Form.Label>
						<Form.Control
							type="text"
							placeholder="Course Title"
							id="course_title"
							name="course_title"
							value={formData.typedtitle_third}
							onChange={(e) =>
								setFormData({ ...formData, typedtitle_third: e.target.value })
							}
							required
						/>
						<Form.Text className="text-danger">
							{titleError}
						</Form.Text>
					</Form.Group>
				</Col>
			</Row>
			<Form.Group className='mb-3'>
				<Form.Label>Student Image</Form.Label>
				<Form.Control
					type="file"
					name={`logo_`}
					accept="image/*"
					onChange={(e) => setFormData({
						...formData,
						student_image: e.target.files[0]
					})}
				/>
			</Form.Group>
			<Button variant="primary" onClick={handleNext}>
				{mdiLoading ? 'Next' : 'a'}
			</Button>
		</Form>
	);
};

export default BasicInformation;
