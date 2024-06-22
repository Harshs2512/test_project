// import node module libraries
import { Fragment, useState, useEffect } from 'react';
import { Card, Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { GKAccordionActions } from 'widgets';
import { ReactQuillEditor } from 'widgets';


const Curriculum = (props) => {
	const [content, setContent] = useState("")
	const [showVideoModel, setShowVideoModel] = useState(false);
	const [newVideoURL, setNewVideoURL] = useState("");
	const { next, previous } = props;
	const handleClose = () => {
		setShowVideoModel(false);
		// setLectureTitleInput(""); // Clear the input when closing the modal
		// setLectureUrlInput("");
	};

	const [section, setSection] = useState([
		{
			id: 1,
			section_title: "Introduction",
			lecture: [
				{ id: 1, lecture_title: "Introduction", lecture_url: "", description: "", }
			]
		}
	]);

	// Delete Lecture
	const handleDeleteLecture = (sectionIndex, lectureIndex) => {
		setSection((prevList) => {
			const updatedSections = [...prevList];
			const updatedLectures = [...updatedSections[sectionIndex].lecture];
			updatedLectures.splice(lectureIndex, 1);
			updatedSections[sectionIndex].lecture = updatedLectures;
			return updatedSections;
		});
	};

	const videoUrl = (sectionIndex, lectureIndex) => {
		setShowVideoModel(true); // Open the video modal
	};
	const handleContentChange = (content) => {
		setContent(content);
	};
	const handleAddVideoURL = (sectionIndex, lectureIndex) => {
		setSection((prevList) => {
			const updatedSections = [...prevList];
			updatedSections[sectionIndex].lecture[lectureIndex].lecture_url = newVideoURL;
			updatedSections[sectionIndex].lecture[lectureIndex].description = content;
			return updatedSections;
		});
		setNewVideoURL("");
		setShowVideoModel(false);
	};
	useEffect(() => {
		props.onDataChange(section);
	}, [section, props.onDataChange]);

	const handleDeleteSection = (sectionIndex) => {
		setSection((prevList) => {
			const updatedSections = prevList.filter((_, index) => index !== sectionIndex);
			return updatedSections;
		});
	};

	// Add Section
	const AddSection = () => {
		const [show, setShow] = useState(false);
		const [sectionTitleInput, setSectionTitleInput] = useState("");
		const handleClose = () => {
			setShow(false);
			setSectionTitleInput("");
		};
		const handleShow = () => setShow(true);

		// Function to handle adding a new Section
		const handleAddSection = () => {
			if (sectionTitleInput.trim() !== "") {
				setSection((prevList) => [
					...prevList,
					{ section_title: sectionTitleInput, lecture: [] },
				]);
				setSectionTitleInput("");
				handleClose();
			}
		};

		return (
			<Fragment>
				<Button
					variant="outline-primary"
					className="btn btn-outline-primary btn-sm mt-3"
					onClick={handleShow}
				>
					Add Section
				</Button>
				<Modal
					show={show}
					onHide={handleClose}
					backdrop="static"
					keyboard={false}
				>
					<Modal.Header closeButton>
						<Modal.Title>Add New Section</Modal.Title>
					</Modal.Header>
					<Modal.Body className="pb-0">
						<Form.Group className="mb-3" controlId="formaddnewsection">
							<Form.Control
								type="text"
								placeholder="Add new section"
								value={sectionTitleInput}
								onChange={(e) => setSectionTitleInput(e.target.value)} />
						</Form.Group>
					</Modal.Body>
					<Modal.Footer className="pt-0 border-0 d-inline ">
						<Button variant="primary" onClick={handleAddSection}>Add New Section</Button>
						<Button variant="outline-secondary" onClick={handleClose}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</Fragment>
		);
	};
	// <.......................>

	// <.......................>
	const AddLecture = (props) => {
		const { sectionIndex } = props;
		const [show, setShow] = useState(false);
		const [lectureTitleInput, setLectureTitleInput] = useState("");
		const [lectureUrlInput, setLectureUrlInput] = useState("");
		const handleClose = () => {
			setShow(false);
			setLectureTitleInput("");
			setLectureUrlInput("");
		};
		const handleShow = () => setShow(true);
		// Function to handle adding a new Section
		const handleAddLecture = () => {
			if (lectureTitleInput.trim() !== "") {
				setSection((prevList) => {
					const updatedSections = [...prevList];
					const updatedLectures = [...updatedSections[sectionIndex].lecture];
					updatedLectures.push({
						id: (updatedLectures.length + 1).toString(),
						lecture_title: lectureTitleInput,
						lecture_url: lectureUrlInput,
						description: content,
					});
					updatedSections[sectionIndex].lecture = updatedLectures;
					return updatedSections;
				});

				setLectureTitleInput("");
				setLectureUrlInput("");
				setContent("");
				handleClose();
			}
		};
		return (
			<Fragment>
				<Button
					variant="outline-primary"
					className="btn btn-outline-primary btn-sm mt-3"
					onClick={handleShow}
				>
					Add Lecture +
				</Button>
				<Modal
					show={show}
					onHide={handleClose}
					backdrop="static"
					keyboard={false}
				>
					<Modal.Header closeButton>
						<Modal.Title>Add New Lecture</Modal.Title>
					</Modal.Header>
					<Modal.Body className="pb-0">
						<Form.Group className="mb-3" controlId="formaddnewlecture">
							<Form.Control
								type="text"
								placeholder="Add new lecture"
								value={lectureTitleInput}
								onChange={(e) => setLectureTitleInput(e.target.value)}
							/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer className="pt-0 border-0 d-inline ">
						<Button variant="primary" onClick={handleAddLecture}>Add New Lecture</Button>
						<Button variant="outline-secondary" onClick={handleClose}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</Fragment>
		);
	};
	// <.......................>	
	return (
		<Fragment>
			<Form>
				{/* Card */}
				<Card className="mb-3  border-0">
					<Card.Header className="border-bottom px-4 py-3">
						<h4 className="mb-0">Curriculum</h4>
					</Card.Header>
					{/* Card body */}
					<Card.Body>
						{section.map((item, index) => (
							<div className="bg-light rounded p-2 mb-4" key={index}>
								<h4>{item.section_title}</h4>
								<GKAccordionActions
									accordionItems={item.lecture}
									deleteLecture={(sectionIndex, lectureIndex) =>
										handleDeleteLecture(index, sectionIndex, lectureIndex)
									}
									videoUrl={(sectionIndex, lectureIndex) =>
										videoUrl(index, sectionIndex, lectureIndex)
									}
								/>

								<AddLecture sectionIndex={index} />{' '}
								<Button
									variant="outline-primary"
									className="btn btn-outline-danger btn-sm mt-3"
									onClick={() => handleDeleteSection(index)}
								>
									Delete Section
								</Button>
							</div>
						))}
						<AddSection />
					</Card.Body>
				</Card>
				{/* Button */}
				<div className="d-flex justify-content-between">
					<Button variant="secondary" onClick={previous}>
						Previous
					</Button>
					<Button variant="primary" onClick={next}>
						Next
					</Button>
				</div>
			</Form>
			<Modal show={showVideoModel} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add Video URL</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group controlId="formVideoURL" className='mb-4 '>
						<Form.Label>Video URL</Form.Label>
						<Form.Control
							type="text"
							value={newVideoURL}
							onChange={(e) => setNewVideoURL(e.target.value)}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label className='me-5'>Description</Form.Label>
						<ReactQuillEditor
							onChange={handleContentChange}
						/>
						<Form.Text className="text-danger">
							{/* {contentError} */}
						</Form.Text>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					{section.map((item, sectionIndex) => (
						item.lecture.map((lecture, lectureIndex) => (
							<Button
								key={lecture.id}
								variant="primary"
								onClick={() => handleAddVideoURL(sectionIndex, lectureIndex)}
							>
								Add Video Details
							</Button>
						))
					))}
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
};
export default Curriculum;
