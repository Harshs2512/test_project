import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Col, Row, Form, InputGroup, Button } from 'react-bootstrap';
import { Image } from 'react-bootstrap-icons';
import { FormSelectLevel } from 'widgets';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreateProjectForm = ({item}) => {

	const privacyOptions = [
		{ value: 'publicToTeam', label: 'Public to your team' },
		{ value: 'privateToProjectMembers', label: 'Private to project members' },
		{ value: 'privateToYou', label: 'Private to you' }
	  ];
	  const projectBudget = [
		{ value: 'projectAmount', label: 'Based on Project Amount' },
		{ value: 'projectHours', label: 'Based on Project Hours' }
	  ];
		const categories = [
			{ value: 'Website Development', label: 'Website Development' },
			{ value: 'App Development', label: 'App Development' },
			{ value: 'Digital Marketing', label: 'Digital Marketing' }
		];
	  const priorityOptions = [
		{ value: 'high', label: 'High' },
		{ value: 'medium', label: 'Medium' },
		{ value: 'low', label: 'Low' }
	  ];

  const [icon, setIcon] = useState();
  const [coverImage, setCoverImage] = useState();
  const [actiontype, setActiontype] = useState("");
  const [formData, setFormData] = useState({
    id:'',
    title: item.title || '',
    projectBrief: item.projectBrief || '',
    start_date: item.start_date || '',
    duedate: item.duedate || '',
    privacy: item.privacy ||'',
    category:item.category|| "",
    client_name:item.client_name || '',
    budget:item.budget || '',
    priority: item.priority ||'',
  });
  useEffect(()=>{
    setFormData({
      id:item._id || '',
      title: item.title || '',
      projectBrief: item.projectbrief || '',
      start_date: item.start_date || '',
      duedate: item.duedate || '',
      privacy: item.privacy ||'',
      category:item.categories|| "",
      client_name:item.client_name || '',
      budget:item.budget || '',
      priority: item.priority ||'',
    });
  },[item])
  const handleChangeicon = (e) => {
    setIcon(e.target.files[0]);
  };
  const handleCoverImage = (e) => {
    setCoverImage(e.target.files[0]);
  };
  const renderImagePreview = (file) => {
    if (!file) return null;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleSubmit = async () => {
    const data = new FormData();
    data.append("id", formData.id);
		data.append("title", formData.title);
		data.append("projectbrief", formData.projectBrief);
		data.append("start_date", formData.start_date);
		data.append("duedate", formData.duedate);
		data.append("privacy", formData.privacy);
		data.append("categories",formData.category);
		data.append("client_name", formData.client_name)
		data.append("budget", formData.budget);
		data.append("priority", formData.priority);
		data.append("icon", icon);
		data.append("coverimage", coverImage);
    try {
        const result = await axios.put(`/api/siteSettings/project/addRecord`, data);
        if (result.status === 200) {
          toast.success("Project Record Updated Successfully.");

        }
        if (result.error) {
          toast.error(result.error);
        }
    } catch (error) {
      toast.error("record Already Exist");
      console.log(error);
    }
  };
  return (
    <Form>
      <ToastContainer />
      <Row>
		  <Col xs={12} className="mb-3">
			<Form.Group controlId="formProjectTitle">
			  <Form.Label>Name <span className="text-danger">*</span></Form.Label>
			  <Form.Control
				type="text"
				placeholder="Enter project title"
				value={formData.title}
				onChange={(e) => setFormData({ ...formData, title: e.target.value })}
				required
			  />
			</Form.Group>
		  </Col>
		  <Col xs={12} className="mb-3">
			<Form.Group controlId="formProjectBrief">
			  <Form.Label>Description</Form.Label>
			  <Form.Control
				as="textarea"
				rows={3}
				placeholder="Enter brief about project..."
				value={formData.projectBrief}
				onChange={(e) => setFormData({ ...formData, projectBrief: e.target.value })}
			  />
			</Form.Group>
		  </Col>
		  <Col md={6} xs={12} className="mb-3">
			<Form.Group controlId="formCategoryOptions">
			  <Form.Label>Categories</Form.Label>
			  <FormSelectLevel
				options={categories}
				placeholder="Select Category"
				value={formData.category}
				onChange={(e) => setFormData({ ...formData, category: e.target.value })}
			  />
			</Form.Group>
		  </Col>
		  <Col md={6} xs={12} className="mb-3">
			<Form.Group controlId="formClientName">
			  <Form.Label>
				Client Name <span className="text-danger">*</span>
			  </Form.Label>
			  <Form.Control
				type="text"
				placeholder="Enter Client Name"
				value={formData.client_name}
				onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
				required
			  />
			</Form.Group>
		  </Col>
		  <Col md={6} xs={12} className="mb-3">
			<Form.Label>Start Date <span className="text-danger">*</span></Form.Label>
			<InputGroup>
			  <Form.Control
				type="date"
				placeholder="Enter start Date"
				name="start_date"
				id="start_date"
				value={formData.start_date}
				onChange={(e) =>
				  setFormData({ ...formData, start_date: e.target.value })
				}
			  />
			  <InputGroup.Text className="text-muted">
				<i className="fe fe-calendar"></i>
			  </InputGroup.Text>
			</InputGroup>
		  </Col>
		  <Col md={6} xs={12} className="mb-3">
			<Form.Label>End Date <span className="text-danger">*</span></Form.Label>
			<InputGroup>
			  <Form.Control
				type="date"
				placeholder="Enter due Date"
				name="duedate"
				id="duedate"
				value={formData.duedate}
				onChange={(e) =>
				  setFormData({ ...formData, duedate: e.target.value })
				}
			  />
			  <InputGroup.Text className="text-muted">
				<i className="fe fe-calendar"></i>
			  </InputGroup.Text>
			</InputGroup>
		  </Col>
		  <Col md={6} xs={12} className="mb-3">
			<Form.Group controlId="formPrivacyOptions">
			  <Form.Label>Privacy</Form.Label>
			  <FormSelectLevel
				options={privacyOptions}
				placeholder="Select Privacy"
				value={formData.privacy}
				onChange={(e) => setFormData({ ...formData, privacy: e.target.value })}
			  />
			</Form.Group>
		  </Col>
		  
		  <Col md={6} xs={12} className="mb-3">
			<Form.Group controlId="formBudget">
			  <Form.Label>Budget</Form.Label>
			  <FormSelectLevel
				options={projectBudget}
				placeholder="Project Budget"
				value={formData.budget}
				onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
			  />
			</Form.Group>
		  </Col>
		  <Col md={6} xs={12} className="mb-3">
			<Form.Group controlId="formPriority">
			  <Form.Label>Priority</Form.Label>
			  <FormSelectLevel
				options={priorityOptions}
				placeholder="Set Priority"
				value={formData.priority}
				onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
			  />
			</Form.Group>
		  </Col>
		  <Col md={3} xs={12} className="mb-4">
			<div>
			  <h5 className="mb-3">Project Logo</h5>
			  <div className="icon-shape icon-xxl border rounded position-relative">
				<span className="position-absolute">
				  <Image size={25} className="text-muted" />
				</span>
				<Form.Control
				  type="file"
				  className="form-control border-0 opacity-0"
				  name="image"
				  accept="image/*"
				  onChange={handleChangeicon}
				/>
			  </div>
			  <div>
				{icon && (
				  <img
					src={URL.createObjectURL(icon)}
					alt="Project Logo"
					className="img-fluid"
				  />
				)}
			  </div>
			</div>
		  </Col>
		  <Col xs={12} className="mb-4">
			<h5 className="mb-3">Cover Image</h5>
			<div className="dropzone mt-4 p-4 border-dashed text-center">
			  <Form.Control
				type="file"
				className="form-control border-0 opacity-0"
				name="image"
				accept="image/*"
				onChange={handleCoverImage}
			  />
			</div>
			{coverImage && (
			  <img
				src={URL.createObjectURL(coverImage)}
				alt="Cover Image"
				className=" img-fluid "
			  />
			)}
  
		  </Col>
		  <Col xs={12}>
			<Button variant="primary" onClick={handleSubmit}>Submit</Button>
			<Link href="/dashboard/projects/grid" passHref>
			  <Button variant="outline-primary" className="ms-2">Close</Button>
			</Link>
		  </Col>
		</Row>
    </Form>
  );
};

export default CreateProjectForm;
