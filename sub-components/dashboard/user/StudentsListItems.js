// import node module libraries
import React, { Fragment, useMemo, useEffect, useState } from 'react';
import {
	useTable,
	useFilters,
	useGlobalFilter,
	usePagination
} from 'react-table';
import Link from 'next/link';
import {
	Dropdown,
	Image,
	Row,
	Col,
	Table
} from 'react-bootstrap';
import { MoreVertical, Trash, Edit } from 'react-feather';
import formatDate from 'helper/formatDate';

// import widget/custom components
import { GlobalFilter, Pagination } from 'widgets';

// import utility file
import { numberWithCommas } from 'helper/utils';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Form, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import Loder from 'widgets/Loder';
import { signIn, useSession } from "next-auth/react";
import { Can } from 'utils/accessControl';


const StudentsListItems = () => {
	const file = {
		lastModifieds: 1689321287775,
		name: "avatar.jpg",
		size: 1958,
		type: "image/jpeg",
		webkitRelativePath: ""
	}
	const [userdata, setPosts] = useState([])
	const [loading, setLoading] = useState(false)
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [profileImage, setProfileImage] = useState(file);

	const {
		handleSubmit,
		register,
		getValues,
		setValue,
		formState: { errors },
	} = useForm();

	const fetchData = async () => {
		try {
			const userRes = await axios.get(`/api/auth/userdata`);
			const userstudent = userRes.data.map((post) => {
				return {
					...post,
					role: post.role === 'user' ? 'user' : 'instructor',
				};
			});
			const userRole = userstudent.filter((post) => post.role === 'user');
			setPosts(userRole);
		} catch (error) {
			console.log("Error fetching data:", error);
		}
	};

	const hadleDelete = async (userId) => {
		try {
			const res = await axios.delete(`/api/auth/usersingle/${userId}`)
			toast.success("User Deleted")
			fetchData();
		}
		catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

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

	const columns = useMemo(
		() => [
			{ accessor: 'id', Header: 'ID', show: false },
			{
				accessor: 'avatar',
				Header: 'Avatar',
				Cell: ({ value }) => (
					<div className="d-flex align-items-center">
						{value ? (
							<Image
								src={value}
								alt="Avatar"
								className="rounded-circle avatar-md me-2"
							/>
						) : (
							<div
								className="rounded-circle avatar-md me-2"
								style={{
									width: '40px',
									height: '40px',
									backgroundColor: '#f2f2f2',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
							</div>
						)}
					</div>
				),
			},
			{
				accessor: 'fname',
				Header: 'Name',
				Cell: ({ value, row }) => {
					return (
						<div className="d-flex align-items-center">
							<h5 className="mb-0">{value}</h5>
						</div>
					);
				}
			},
			{ accessor: 'email', Header: 'Email' },
			{
				accessor: 'enrolled',
				Header: 'Enrolled',
				Cell: ({ value }) => {
					return value + ' Courses';
				}
			},
			{
				accessor: 'createdAt',
				Header: 'Joined At',
				Cell: ({ value }) => {
					return formatDate(value);
				}
			},
			{
				accessor: 'payment',
				Header: 'TotaL Payment',
				Cell: ({ value }) => {
					return '$' + numberWithCommas(value);
				}
			},
			{ accessor: 'dob', Header: 'DOB' },
			{ accessor: 'country', Header: 'Contry' },
		],
		[]
	);

	const data = useMemo(
		() =>
			userdata.map((user) => ({
				...user,
				avatar: user && `/api/auth/profileimgadmin/${user._id}`, // Add the avatar URL to each student object
			})),
		[userdata]
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		nextPage,
		previousPage,
		state,
		gotoPage,
		pageCount,
		prepareRow,
		setGlobalFilter
	} = useTable(
		{
			columns,
			data,
			initialState: {
				pageSize: 10,
				hiddenColumns: columns.map((column) => {
					if (column.show === false) return column.accessor || column.id;
					else return false;
				})
			}
		},
		useFilters,
		useGlobalFilter,
		usePagination
	);

	const submitHandler = async ({ fname, lname, phone, dob, email }) => {
		try {
			setLoading(true)
			const formData = new FormData();
			formData.append("image", profileImage)
			formData.append("fname", fname);
			formData.append("lname", lname);
			formData.append("phone", phone);
			formData.append("email", email);
			formData.append("dob", dob);
			const response = await axios.put("/api/auth/update", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			setLoading(false)
			toast.success(response.data.message)
			setEditModalOpen(false)
		} catch (error) {
			toast.error(error);
			console.log(error)
		}
	};

	const handleEditModalOpen = async (id) => {
		try {
			const { data } = await axios.get(`/api/auth/usersingle/${id}`)
			setValue("fname", data.fname);
			setValue("lname", data.lname);
			setValue("phone", data.phone);
			setValue("address", data.address);
			setValue("country", data.country);
			setValue("dob", data.dob);
			setValue("mystate", data.mystate);
			setValue("email", data.email);
		} catch (error) {
			console.log(error)
		}
		setEditModalOpen(true);
		window.scrollTo(0, 0); // Scroll to the top of the page
	};

	const handleImageChange = (event) => {
		const selectedImage = event.target.files[0];
		setProfileImage(selectedImage);
	};

	const { pageIndex, globalFilter } = state;

	return (
		<Fragment>
			<ToastContainer />
			<div className=" overflow-hidden">
				<Row>
					<Col lg={12} md={12} sm={12} className="mb-lg-0 mb-2 px-5 py-4">
						<GlobalFilter
							filter={globalFilter}
							setFilter={setGlobalFilter}
							placeholder="Search Students"
						/>
					</Col>
				</Row>
			</div>

			<Table hover responsive {...getTableProps()} className="text-nowrap table-centered">
				<thead className="table-light">
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()}>
									{column.render('Header')}
								</th>
							))}
							<th>
								Action
							</th>
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row) => {
						prepareRow(row);
						const rowData = row.original;
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
									);
								})}
								<td>
									<Dropdown>
										<Dropdown.Toggle as={CustomToggle}>
											<MoreVertical size="15px" className="text-secondary" />
										</Dropdown.Toggle>
										<Dropdown.Menu align="end">
											<Dropdown.Header>SETTINGS</Dropdown.Header>
											<Can I="editUser">
												<Dropdown.Item eventKey="1" onClick={() => handleEditModalOpen(rowData._id)}>
													<Edit size="15px" className="dropdown-item-icon" /> Edit
												</Dropdown.Item>
											</Can>
											<Can I="deleteUser">
												<Dropdown.Item eventKey="2" onClick={() => hadleDelete(rowData._id)}>
													<Trash size="15px" className="dropdown-item-icon" /> Remove
												</Dropdown.Item>
											</Can>
										</Dropdown.Menu>
									</Dropdown>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>

			{/* Pagination @ Footer */}
			<Pagination
				previousPage={previousPage}
				pageCount={pageCount}
				pageIndex={pageIndex}
				gotoPage={gotoPage}
				nextPage={nextPage}
			/>
			<Modal show={editModalOpen} onHide={() => setEditModalOpen(false)}>
				<Modal.Header closeButton onClick={() => setEditModalOpen(false)}>
					<Modal.Title>Update Profile</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit(submitHandler)}>
						<Col>
							<Form.Group className="mb-3">
								<Form.Label htmlFor="postTitle">Avatar</Form.Label>
								<Form.Control
									id="image"
									type="file"
									name="image"
									onChange={handleImageChange}
								/>
								<p>Drag 'n' drop some files here, or click to select files</p>
								{profileImage ? '' : <p className='text-danger'>Profile image is required</p>}
								<Form.Text className='text-danger'>
								</Form.Text>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className="mb-3">
								<Form.Label htmlFor="postTitle">Email</Form.Label>
								<Form.Control
									id="email"
									type="text"
									name="email"
									placeholder='Email'
									{...register("email", {
										required: "Please enter name",
									})}
								/>
								<Form.Text className='text-danger'>
								</Form.Text>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className="mb-3">
								<Form.Label htmlFor="postTitle">First name</Form.Label>
								<Form.Control
									id="fname"
									type="text"
									name="fname"
									placeholder='First name'
									{...register("fname", {
										required: "Please enter name",
									})}
								/>
								<Form.Text className='text-danger'>
								</Form.Text>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className="mb-3">
								<Form.Label htmlFor="postTitle">Last name</Form.Label>
								<Form.Control
									id="lname"
									type="text"
									name="lname"
									placeholder='Last name'
									{...register("lname", {
										required: "Please enter name",
									})}
								/>
								<Form.Text className='text-danger'>
								</Form.Text>
							</Form.Group>
						</Col>
						<Col className="mb-3">
							<Form.Group className="mb-3" controlId="formPhone">
								<Form.Label>Phone</Form.Label>
								<Form.Control
									type="text"
									placeholder="Phone"
									{...register("phone", {
										required: "Please enter name",
									})}
								/>
							</Form.Group>
						</Col>

						{/* Birthday */}
						<Col className="mb-3">
							<Form.Group className="mb-3" controlId="formBirthday">
								<Form.Label>Birthday</Form.Label>
								<Form.Control
									// as={FlatPickr}
									type='date'
									// value={''}
									placeholder="Date of Birth"
									{...register("dob")}
									required
								/>
							</Form.Group>
						</Col>
						<Button variant="primary" className="m-1" type="submit">
							{!loading ? 'Update' : ''} {loading ? <Loder /> : ''}
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</Fragment>
	);
};

export default StudentsListItems;
