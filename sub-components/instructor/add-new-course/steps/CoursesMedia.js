// import node module libraries
import { Card, Form, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

const CoursesMedia = (props) => {
	const [thumbnailError, setThumbnailError] = useState('');
	const [vidourlError, setVideourlError] = useState('');
	const [formData, setFormData] = useState({
		course_thumbnail: '',
		video_url: '',
	});
	const validateThumbnail = (thumb) => {
		return thumb ? '' : 'Course Thumbnail is required';
	};

	const validatevideourl = (url) => {
		return url.trim().length > 0 ? '' : 'Url is required';
	};
	useEffect(() => {
		props.onDataChange(formData);
	}, [formData, props.onDataChange]);

	const handleNext = () => {
		const thumbnailValidation = validateThumbnail(formData.course_thumbnail);
		const videourlValidation = validatevideourl(formData.video_url);
		setThumbnailError(thumbnailValidation);
		setVideourlError(videourlValidation);
		if (!thumbnailValidation && !videourlValidation) {
			next();
		}
	};
	const { next, previous } = props;
	return (
		<Form>
			{/* Card */}
			<Card className="mb-3  border-0">
				<Card.Header className="border-bottom px-4 py-3">
					<h4 className="mb-0">Courses Media</h4>
				</Card.Header>
				{/* Card body */}
				<Card.Body>
					{/* Course cover image */}
					<Form.Label>Course cover image</Form.Label>
					<Form.Group className="mb-1 input-group">
						<Form.Control
							id="image"
							type="file"
							name="image"
							// className={thumbnailError ? 'error' : ''}
							accept="image/*"
							onChange={(e) =>
								setFormData({ ...formData, course_thumbnail: e.target.files[0] })
							}
							autoFocus
						/>

						<Form.Label
							htmlFor="inputfavicon"
							className="input-group-text mb-0"
						>
							Upload
						</Form.Label>
						<Form.Text className="text-muted">
							Upload your course image here. It must meet our course image
							quality standards to be accepted. Important guidelines: 750x440
							pixels; .jpg, .jpeg,. gif, or .png. no text on the image.
						</Form.Text>
						<Form.Text className="text-danger">
							{thumbnailError}
						</Form.Text>
					</Form.Group>
					{/* Video URL  */}
					<Form.Group className="mb-3 mt-3">
						<Form.Control
							type="text"
							placeholder="Video URL"
							id="VideoURL"
							onChange={(e) =>
								setFormData({ ...formData, video_url: e.target.value })
							} />
						<Form.Text className="text-muted">
							Enter a valid video URL. Students who watch a well-made promo
							video are 5X more likely to enroll in your course.
						</Form.Text>
						<Form.Text className="text-danger">
							{vidourlError}
						</Form.Text>
					</Form.Group>
				</Card.Body>
			</Card>

			{/* Button */}
			<div className="d-flex justify-content-between">
				<Button variant="secondary" onClick={previous}>
					Previous
				</Button>
				<Button variant="primary" onClick={handleNext}>
					Next
				</Button>
			</div>
		</Form>
	);
};
export default CoursesMedia;
