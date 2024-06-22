
import React, { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

// import widget/custom components
import { FormSelectLevel, ReactQuillEditor } from 'widgets';
import axios from 'axios'

const BasicInformation = (props) => {
	const [titleError, setTitleError] = useState('');
	const [levelError, setLevelError] = useState('');
	const [content, setContent] = useState('');
	const [contentError, setContentError] = useState('');
	const [category, setCategory] = useState('');
	const [categoryError, setCategoryError] = useState('');
	const { next } = props;
	const { data } = props;
	const validateTitle = (title) => {
		return title.trim().length > 0 ? '' : 'Course title is required';
	};

	const validateCategory = (category) => {
		return category.trim().length > 0 ? '' : 'Category is required';
	};

	const validateContent = (content) => {
		return content.trim().length > 0 ? '' : 'Content is required';
	};

	const validateLevel = (level) => {
		return level.trim().length > 0 ? '' : 'Content is required';
	};
	const CoursesLevel = [
		{ value: 'Intermediate', label: 'Intermediate' },
		{ value: 'Beginners', label: 'Beginners' },
		{ value: 'Advance', label: 'Advance' }
	];
	const getcategories = async (req, res) => {
		try {
			const res = await axios.get(`/api/category/getcategories`);
			setCategory(res.data.categories)
		} catch (error) {
			console.log(error)
		}
	};
	useEffect(() => {
		getcategories();
	}, []);
	const handleContentChange = (content) => {
		setContent(content);
		setContentError(validateContent(content));
		setFormData({ ...formData, courses_des: content });
	};
	const handleChangeCategory = (e) => {
		const { value } = e.target;
		setCategoryError(validateCategory(value));
		setFormData({ ...formData, category: value });
	};

	const [formData, setFormData] = useState({
		course_title: '',
		category: '',
		courses_level: '',
		courses_des: ''
	});

	useEffect(() => {
		props.onDataChange(formData);
	}, [formData, props.onDataChange]);

	const handleNext = () => {
		const titleValidation = validateTitle(formData.course_title);
		const categoryValidation = validateCategory(formData.category);
		const contentValidation = validateContent(formData.courses_des);
		const levelValidation = validateLevel(formData.courses_level);

		setTitleError(titleValidation);
		setCategoryError(categoryValidation);
		setContentError(contentValidation);
		setLevelError(levelValidation);

		if (!titleValidation && !categoryValidation && !contentValidation && !levelValidation) {
			next();
		}
	};

	return (
		<Form>
			{/* Card */}
			<Card className="mb-3 ">
				<Card.Header className="border-bottom px-4 py-3">
					<h4 className="mb-0">Basic Information</h4>
				</Card.Header>
				{/* Card body */}
				<Card.Body>
					{/* Title  */}
					<Form.Group className="mb-3">
						<Form.Label htmlFor="courseTitle">Course Title</Form.Label>
						<Form.Control
							type="text"
							placeholder="Course Title"
							id="course_title"
							name="course_title"
							onChange={(e) =>
								setFormData({ ...formData, course_title: e.target.value })
							}
							required
						/>
						<Form.Text className="text-muted">
							Write a 60 character course title.
						</Form.Text><br/>
						<Form.Text className="text-danger">
							{titleError}
						</Form.Text>
					</Form.Group>

					{/* Category */}
					<Form.Group className="mb-5">
						<Form.Label>Category</Form.Label>
						<Form.Select onChange={handleChangeCategory}>
							<option value="">Select Category</option>
							{category &&
								category.map((c) => (
									<option key={c._id} value={c._id}>
										{c.catName}
									</option>
								))}
						</Form.Select>
						<Form.Text className="text-danger">
							{categoryError}
						</Form.Text>
					</Form.Group>

					{/* Courses level */}
					<Form.Group className="mb-3">
						<Form.Label>Courses level</Form.Label>
						<FormSelectLevel
							options={CoursesLevel}
							id="courses_level"
							name="courses_level"
							placeholder="Select level"
							onChange={(e) =>
								setFormData({ ...formData, courses_level: e.target.value })
							}
							required
						/>
						<Form.Text className="text-danger">
							{levelError}
						</Form.Text>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label className='me-5'>Type your Post</Form.Label>

						<ReactQuillEditor
							onChange={handleContentChange}
						/>
						<Form.Text className="text-danger">
							{contentError}
						</Form.Text>
					</Form.Group>
					{/* button */}

				</Card.Body>
			</Card>
			{/* Button */}
			<Button variant="primary" onClick={handleNext}>
				Next
			</Button>
		</Form>
	);
};

export default BasicInformation;
