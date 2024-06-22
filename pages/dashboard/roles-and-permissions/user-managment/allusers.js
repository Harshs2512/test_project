import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import {
	Card, Row, Col, Dropdown, Table, Button, Breadcrumb, Modal, Form, Image
} from 'react-bootstrap';
import Link from 'next/link';

// import custom components
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MoreVertical, Edit, Trash } from 'react-feather';
import { useSession } from 'next-auth/react';

const Allusers = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [allposts, setAllposts] = useState([]);
	const [actiontype, setActiontype] = useState('');
	const [postid, setPostid] = useState('');
	const [formData, setFormData] = useState({
		fname: "",
		lname: "",
		email: "",
		password: "",
		roles: "",
	});

	const [validationErrors, setValidationErrors] = useState({
		fname: "",
		lname: "",
		email: "",
		password: "",
		roles: [],
	});

	const [roles, setRole] = useState([]);
	const [selectedRoles, setSelectedRoles] = useState([]);

	const validateForm = () => {
		let valid = true;
		const errors = {};

		// Validate first name
		if (!formData.fname || formData.fname.trim() === "") {
			errors.fname = "First name is required";
			valid = false;
		}

		// Validate last name
		if (formData.lname.trim() === "") {
			errors.lname = "Last name is required";
			valid = false;
		}

		// Validate email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email.trim())) {
			errors.email = "Invalid email address";
			valid = false;
		}

		// Validate password (you can add more complex validation rules)
		if (formData.password.trim().length < 6) {
			errors.password = "Password must be at least 6 characters";
			valid = false;
		}

		// Validate role
		if (!formData.roleId) {
			errors.roleId = "Role is required";
			valid = false;
		}

		setValidationErrors(errors);
		return valid;
	};
	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		(<Link
			href=""
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}
			className="btn-icon btn btn-ghost btn-sm rounded-circle">
			{children}
		</Link>)
	));

	CustomToggle.displayName = 'CustomToggle';

	const fetchData = async () => {
		try {
			const res = await axios.get("/api/auth/getadmins");
			if (res.status === 200) {
				setAllposts(res.data);
			}
		} catch (error) {
			console.log("Error fetching posts:", error);
		}
	};

	const fetchRoles = async () => {
		try {
			const res = await axios.get("/api/rolesandpermission/getroles");
			if (res.status === 200) {
				setRole(res.data.roles);
			}
		} catch (error) {
			console.log("Error fetching posts:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		fetchRoles();
	}, []);

	const handleRoleCheckboxChange = (roleId) => {
		const updatedRoles = selectedRoles.includes(roleId)
			? selectedRoles.filter((id) => id !== roleId)
			: [...selectedRoles, roleId];
		setSelectedRoles(updatedRoles);
		setFormData((prevFormData) => ({
			...prevFormData,
			roles: updatedRoles,
		}));
	};

	const columns = useMemo(
		() => [
			{
				accessor: '',
				Header: 'NO',
				Cell: ({ value, row }) => {
					return (
						<div className="mb-0">
							{row.index + 1}
						</div>
					);
				}
			},
			{
				accessor: 'fname',
				Header: 'USER',
				Cell: ({ value, row }) => {
					const rowData = row.original;
					return (
						<div className="mb-0 d-flex">
							{rowData && rowData._id &&
								<Image src={`/api/auth/profileimgadmin/${rowData._id}`} className='avatar rounded-circle me-3' alt='profileimage' />
							}
							<div>
								<h5>
									{value}{" "}{rowData.lname}
								</h5>
								<span>
									{rowData.email}
								</span>
							</div>
						</div>
					);
				}
			},
			{
				accessor: 'roles',
				Header: 'ROLE',
				Cell: ({ value }) => {
					const userRoles = roles.filter((role) => value.includes(role._id));
					return (
						<Fragment>
							{userRoles.map((userRole) => (
								<div key={userRole._id} className={`btn btn-primary p-1 me-3`} style={{ opacity: "0.7" }}>
									{userRole.rolename}
								</div>
							))}
						</Fragment>
					);
				},
			},
		],
		[roles]
	);
	const data = useMemo(() => allposts, [allposts]);
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({
			columns,
			data,
			initialState: {
				hiddenColumns: columns.map((column) => {
					if (column.show === false) return column.accessor || column.id;
					else return false;
				})
			}
		});

	const handleCloseModal = () => {
		setFormData({
			fname: "",
			lname: "",
			email: "",
			password: "",
			roles: []
		})
		setModalOpen(false);
		setActiontype(false);
		setSelectedRoles([])
	};

	const actionHandler = async (id, action) => {
		setActiontype(action)
		setPostid(id)
		if (action === 'update') {
			setModalOpen(true)
			try {
				await axios.get(`/api/auth/adminsingle/${id}`)
					.then((response) => {
						const userRoles = response.data.roles || [];
						setSelectedRoles(userRoles);
						setFormData({
							fname: response.data.fname,
							lname: response.data.lname,
							email: response.data.email,
							password: response.data.password,
							roles: userRoles,
						})
					})
					.catch((error) => {
						console.error('Error fetching post content:', error);
					});
			} catch (error) {
				console.log("Error while deleting:", error);
			}
		}
		if (action === 'delete') {
			try {
				const res = await axios.delete(`/api/auth/adminsingle/${id}`);
				fetchData()
				toast.success("Deleted")
			} catch (error) {
				console.log("Error while deleting:", error);
			}
		}
	};
	const submitData = async () => {
		if (actiontype === 'update') {
			try {
				const res = await axios.put(`/api/auth/adminsingle/${postid}`, formData);
				if (res.status === 201) {
					toast.success("Created Success fully");
					fetchData();
				}
				setModalOpen(false);
				setFormData({
					lname: "",
					fname: "",
					email: "",
					password: "",
				})
			}
			catch (err) {
				toast.error(err)
				console.log(err)
			}
		}

		else {
			try {
				const res = await axios.post("/api/auth/addadmin/", formData);
				if (res.status === 201) {
					toast.success("Created Success fully");
					setFormData({
						fname: "",
						lname: "",
						email: "",
						password: ""
					})
					fetchData();
				} else {
					toast.info("Already Exist");
				};
				setModalOpen(false);
			}
			catch (err) {
				console.log(err)
				toast.error(err.response.data.message)
			}
		}
		if (validateForm()) {
			setFormData({
				fname: "",
				lname: "",
				email: "",
				password: "",
				role: "",
			});
			setValidationErrors({});
			setModalOpen(false);
		}

	};
	return (
		<Fragment>
			<ToastContainer />
			<Row>
				<Col lg={12} md={12} sm={12}>
					<div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
						<div className="mb-3 mb-md-0">
							<h1 className="mb-1 h2 fw-bold">All Users</h1>
							<Breadcrumb>
								<Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
								<Breadcrumb.Item href="#">Landing</Breadcrumb.Item>
								<Breadcrumb.Item active>Users</Breadcrumb.Item>
							</Breadcrumb>
						</div>
						<div>
							<Button className="btn btn-primary" onClick={() => setModalOpen(true)}>
								Add new
							</Button>
						</div>
					</div>
				</Col>
			</Row>
			<Row>
				<Col lg={12} md={12} sm={12}>
					<Card>
						<Card.Header className="d-flex justify-content-between align-items-center border-bottom-0 card-header-height">
							<h4 className="mb-0">All Users</h4>
						</Card.Header>
						<Card.Body className="p-0">
							<Table hover responsive {...getTableProps()} className="text-nowrap table-centered">
								<thead className="table-light">
									{headerGroups.map((headerGroup, index) => (
										<tr key={index} {...headerGroup.getHeaderGroupProps()}>
											{headerGroup.headers.map((column, index) => (
												<th key={index} {...column.getHeaderProps()}>
													{column.render('Header')}
												</th>
											))}
											<th>
												<p>{"Action"} </p>
											</th>
										</tr>
									))}
								</thead>
								{/* Apply the table body props */}
								<tbody {...getTableBodyProps()}>
									{rows.map((row, index) => {
										prepareRow(row);
										const rowData = row.original;
										return (
											<tr key={index} {...row.getRowProps()}>
												{row.cells.map((cell, index) => {
													return (
														<td key={index} {...cell.getCellProps()}>
															{cell.render('Cell')}
														</td>
													);
												})}
												<td>
													<Dropdown>
														<Dropdown.Toggle as={CustomToggle}>
															<MoreVertical size="15px" className="text-secondary" />
														</Dropdown.Toggle>
														<Dropdown.Menu align="end">
															<Dropdown.Header>SETTINGS</Dropdown.Header>
															<Dropdown.Item eventKey="1" onClick={() => actionHandler(rowData._id, 'update')} >
																<Edit size="15px" className="dropdown-item-icon" /> Edit
															</Dropdown.Item>
															<Dropdown.Item eventKey="6" onClick={() => actionHandler(rowData._id, 'delete')}>
																<Trash size="15px" className="dropdown-item-icon" /> Delete
															</Dropdown.Item>
														</Dropdown.Menu>
													</Dropdown>
												</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<Modal show={modalOpen} onHide={handleCloseModal} size='lg'>
				<Modal.Header closeButton>
					<Modal.Title>Add User</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className='mb-3'>
							<Form.Label>First Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="first name"
								value={formData.fname}
								onChange={(e) => setFormData(prevState => ({ ...prevState, fname: e.target.value }))}
							/>
							<span className='text-danger'>{validationErrors?.fname}</span>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="last name"
								value={formData.lname}
								onChange={(e) => setFormData(prevState => ({ ...prevState, lname: e.target.value }))}
							/>
							<span className='text-danger'>{validationErrors?.lname}</span>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								placeholder="email"
								value={formData.email}
								onChange={(e) => setFormData(prevState => ({ ...prevState, email: e.target.value }))}
							/>
							<span className='text-danger'>{validationErrors?.email}</span>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								value={formData.password}
								onChange={(e) => setFormData(prevState => ({ ...prevState, password: e.target.value }))}
								disabled={actiontype === 'update' ? true : false}
							/>
							<span className='text-danger'>{validationErrors?.password}</span>
						</Form.Group>
						<Form.Group className="text-contain">
							<Form.Label>Select Roles</Form.Label>
							<p>Select single or multiple roles</p>
							<div className='d-flex'>
								{roles.map((role) => (
									<Form.Check
										key={role._id}
										type="checkbox"
										label={role.rolename}
										checked={selectedRoles.includes(role._id)}
										onChange={() => handleRoleCheckboxChange(role._id)}
										className='me-3'
									/>
								))}
							</div>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={() => submitData()}>
						Save
					</Button>
					<Button
						variant="secondary"
						onClick={handleCloseModal}
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</Fragment >
	);
};

export default Allusers;