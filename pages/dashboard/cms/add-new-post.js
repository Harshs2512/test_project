// import node module libraries
import { Fragment, useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Trash, XCircle, Copy } from 'react-feather';
import {
	Col,
	Row,
	Breadcrumb,
	Card,
	Button,
	Form,
	ListGroup,
	Image,
	InputGroup,
	Badge
} from 'react-bootstrap';
import { ReactQuillEditor } from 'widgets';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loder from 'widgets/Loder';
import { useRouter } from 'next/router';
import ReactTagInput from '@pathofdev/react-tag-input';



const AddNewPost = () => {
	const defaulttags = ['Best', 'Tags']
	const [tags, setTags] = useState(defaulttags);
	const titleInputRef = useRef(null);
	const thumbnailInputRef = useRef(null);
	const descriptionInputRef = useRef(null);
	const categoryInputRef = useRef(null);
	const contentInputRef = useRef(null);
	const slugInputRef = useRef(null);
	const [loading, setLoading] = useState(false)
	const [category, setCategory] = useState()
	const [title, setTitle] = useState('');
	const [slug, setSlug] = useState('');
	const [description, setDescription] = useState('');
	const [postcategory, setPostcategory] = useState('');
	const [thumbnail, setImage] = useState('');
	const [titleError, setTitleError] = useState('');
	const [slugError, setSlugError] = useState('');
	const [descriptionError, setDescriptionError] = useState('');
	const [categoryError, setCategoryError] = useState('');
	const [thumbnailError, setThumbnailError] = useState('');
	const [contentError, setContentError] = useState('');
	const router = useRouter();
	const handleChangeTitle = (e) => {
		const { value } = e.target;
		setTitle(value);
		setTitleError(value.trim().length > 0 ? '' : 'Title is required');
	};
	const handleChangeDescription = (e) => {
		const { value } = e.target;
		setDescription(value);
		setDescriptionError(value.trim().length > 0 ? '' : 'Description is required');
	}
	const handleChangeCategory = (e) => {
		const { value } = e.target;
		setPostcategory(value);
		setCategoryError(value.trim().length > 0 ? '' : 'Category is required');
	};
	const handleChangeThumbnail = (e) => {
		setImage(e.target.files[0]);
		setThumbnailError(e.target.files[0] ? '' : 'Thumbnail is required');
	};
	const handleContentChange = (content) => {
		setContent(content); // Store "content" as an HTML string
		setContentError(content.trim().length > 0 ? '' : 'Content is required');
	};
	const handleSlugChange = (e) => {
		const { value } = e.target;
		setSlug(value);
		setSlugError(value?.trim().length > 0 ? '' : 'slug is required');
	};
	const validateForm = () => {
		const titleValid = title.trim().length > 0;
		const categoryValid = postcategory.trim().length > 0;
		const thumbnailValid = !!thumbnail;
		const contentValid = content.trim().length > 0;
		const descriptionValid = description.trim().length > 0;
		const slugValid = slug.trim().length > 0;

		setTitleError(titleValid ? '' : 'Title is required');
		setCategoryError(categoryValid ? '' : 'Category is required');
		setThumbnailError(thumbnailValid ? '' : 'Thumbnail is required');
		setContentError(contentValid ? '' : 'Content is required');
		setDescriptionError(descriptionValid ? '' : 'Description is required');
		setSlugError(slugValid ? '' : 'Slug is required');

		if (!titleValid && titleInputRef.current) {
			titleInputRef.current.focus();
		}
		if (!slugValid && slugInputRef.current) {
			slugInputRef.current.focus();
		}
		if (!thumbnailValid && thumbnailValid.current) {
			thumbnailInputRef.current.focus();
		}
		if (!contentValid && contentValid.current) {
			contentInputRef.current.focus();
		}
		if (!categoryValid && categoryValid.current) {
			categoryInputRef.current.focus();
		}
		if (!descriptionValid && descriptionValid.current) {
			descriptionInputRef.current.focus();
		}
		return titleValid && categoryValid && thumbnailValid && contentValid && slugValid;
	};
	const [content, setContent] = useState('');
	const handleUpload = async () => {
		const { data } = await axios.get('/api/getUploadSignature');
		console.log(data)
		const formData = new FormData();
		formData.append('file', thumbnail);
		formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
		formData.append('timestamp', data.timestamp);
		formData.append('signature', data.signature);
		formData.append('upload_preset', 'vblzgnrs');

		const response = await axios.post(
			`https://api.cloudinary.com/v1_1/dodumze05/upload`,
			formData
		);
		console.log(response.data)
		// setUploadData(response.data);
	};
	const submitHandler = async (e) => {
		if (!validateForm()) {
			return;
		}
		setLoading(true)
		try {
			const productData = new FormData();
			productData.append("title", title);
			productData.append("slug", slug);
			productData.append("description", description);
			productData.append("thumbnail", thumbnail);
			productData.append("postcategory", postcategory);
			productData.append("content", content);
			productData.append("metatags", tags);
			console.log(productData)
			const { data } = await axios.post("/api/blogs/addblog", productData);
			if (data?.success) {
				toast.success(data?.message);
				// setTimeout(() => {
				// 	router.push("/dashboard/cms/all-posts");
				// }, 1000);
			} else {
				toast.info("Blog Already Exist");
			}
			setLoading(false)
		} catch (error) {
			console.log(error)
		}
	};

	const getcategories = async (req, res) => {
		try {
			const res = await axios.get(`/api/blogs/category/getcategory`);
			const liveCategories = res.data?.categories?.filter((c) => c.status === 'live');
			setCategory(liveCategories)
		} catch (error) {
			console.log(error)
		}
	};

	useEffect(() => {
		getcategories();
	}, []);

	return (
		<Fragment>
			<ToastContainer />
			<Row>
				<Col lg={12} md={12} sm={12}>
					<div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
						<div className="mb-3 mb-md-0">
							<h1 className="mb-1 h2 fw-bold">Add New Post</h1>
							<Breadcrumb>
								<Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
								<Breadcrumb.Item href="#">CMS</Breadcrumb.Item>
								<Breadcrumb.Item active>Add New Post</Breadcrumb.Item>
							</Breadcrumb>
						</div>
						<div>
							<Link href="/dashboard/cms/all-posts" className="btn btn-outline-secondary">
								Back to All Post
							</Link>
						</div>
					</div>
				</Col>
			</Row>
			<Row>
				<Col xl={8} lg={8} md={12} sm={12}>
					<Card>
						<Card.Header>
							<h4 className="mb-0">Create Post</h4>
						</Card.Header>
						<Card.Body>
							<Form.Group className="mb-5">
								<Form.Label htmlFor="postTitle">Thumbnail</Form.Label>
								{/* <div {...getRootProps({ className: 'dropzone' })}> */}
								<Form.Control
									id="image"
									ref={thumbnailInputRef}
									type="file"
									name="image"
									className={thumbnailError ? 'error' : ''}
									accept="image/*"
									onChange={handleChangeThumbnail}
									autoFocus
								/>

								<p>Drag &apos;n&apos; drop some files here, or click to select files</p>
								{/* </div> */}
								{/* <aside style={thumbsContainer}>{thumbs}</aside> */}
								<Form.Text className='text-danger'>
									{thumbnailError}
								</Form.Text>
							</Form.Group>
							<button onClick={handleUpload}>Upload</button>
							<Form className="mt-4" onSubmit={submitHandler}>
								<Row>
									<Col md={9} sm={12}>
										{/* Title  */}
										<Form.Group className="mb-5">
											<Form.Label htmlFor="postTitle">Title</Form.Label>
											<Form.Control
												ref={titleInputRef}
												type="text"
												placeholder="Post Title"
												id="postTitle"
												value={title}
												onChange={handleChangeTitle}
												className={titleError ? 'error' : ''}
												autoFocus
											/>
											<Form.Text className="text-muted">
												keep your post titles under 60 characters. Write heading
												that describe the topic content Contextualize for Your
												Audience
											</Form.Text>
											<br />
											<Form.Text className="text-danger">
												{titleError}
											</Form.Text>
										</Form.Group>
										<Form.Group className="mb-5">
											<Form.Label htmlFor="postTitle">Description</Form.Label>
											<Form.Control
												ref={descriptionInputRef}
												type="text"
												placeholder="Post Description"
												id="description"
												value={description}
												onChange={handleChangeDescription}
												className={descriptionError ? 'error' : ''}
												autoFocus
											/>
											<Form.Text className="text-muted">
												keep your post description under 200 characters. Write heading
												that describe the topic content Contextualize for Your
												Audience
											</Form.Text>
											<br />
											<Form.Text className="text-danger">
												{descriptionError}
											</Form.Text>
										</Form.Group>

										{/*   Slug  */}
										<Form.Group className="mb-3">
											<Form.Label htmlFor="basic-url">Slug</Form.Label>
											<InputGroup>
												<InputGroup.Text id="basic-addon3">
													https://example.com/
												</InputGroup.Text>
												<Form.Control
													id="basic-url"
													ref={slugInputRef}
													aria-describedby="basic-addon3"
													placeholder="designcourses"
													value={slug}
													onChange={handleSlugChange}
													className={slugError ? 'error' : ''}
												/>
											</InputGroup>
											<Form.Text className="text-muted">
												{' '}
												Field must contain a unique value
											</Form.Text>
											<br />
											<Form.Text className="text-danger">
												{slugError}
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
															{/* {c.status === 'pending' ? "adsf" : ''} */}
															{c.title}
														</option>
													))}
											</Form.Select>
											<Form.Text className="text-danger">
												{categoryError}
											</Form.Text>
										</Form.Group>

									</Col>

									<Col lg={12} md={12} sm={12}>
										{/* Editor */}
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
									</Col>
								</Row>
								<Button variant="primary" className="m-1" onClick={() => submitHandler()}>
									{!loading ? 'Publish' : ''} {loading ? <Loder /> : ''}
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
				<Col xl={4} lg={4} md={12} sm={12}>
					{/*  List group  */}
					<Card className="mt-4 mt-lg-0 mb-4">
						<Card.Header className="d-lg-flex">
							<h4 className="mb-0">Add Tags</h4>
						</Card.Header>
						<Card.Body className="p-0">
							{/*  List group  */}
							<ListGroup variant="flush">
								<ListGroup.Item>
									<ReactTagInput tags={tags} onChange={(newTags) => setTags(newTags)} />
								</ListGroup.Item>
								<ListGroup.Item>
									<span className="text-body">Tags</span>
									<h3>
										Total <span className="text-success">{tags.length}</span> Added
									</h3>
								</ListGroup.Item>
							</ListGroup>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

export default AddNewPost;