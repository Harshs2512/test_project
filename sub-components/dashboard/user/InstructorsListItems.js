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
import { MoreVertical, Trash, Edit, Inbox, Send } from 'react-feather';

// import MDI icons
import Icon from '@mdi/react';
import { mdiStar } from '@mdi/js';
import { useForm } from 'react-hook-form';
import { GlobalFilter, Pagination } from 'widgets';
import { numberWithCommas } from 'helper/utils';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Can } from 'utils/accessControl';
import formatDate from 'helper/formatDate';
import DotBadge from 'components/bootstrap/DotBadge';
import { useRouter } from 'next/router';
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const InstructorsListItems = () => {
	const file = {
		lastModifieds: 1689321287775,
		name: "avatar.jpg",
		size: 1958,
		type: "image/jpeg",
		webkitRelativePath: ""
	}
	const [profileImage, setProfileImage] = useState(file);
	const [loading, setLoading] = useState(false)
	const [userdata, setPosts] = useState([])
	const [editModalOpen, setEditModalOpen] = useState(false);
	const router = useRouter()

	const fetchData = async () => {
		try {
			const userRes = await axios.get(`/api/auth/getinstructors`);
			const courseCountsPromises = userRes.data?.map(async (instructor) => {
				try {
					const response = await axios.get(`/api/counterdata/instructorcoursecount?instructorId=${instructor._id}`);
					return response.data.courseCount;
				} catch (error) {
					console.error(error);
					return 0;
				}
			});
			const courseCounts = await Promise.all(courseCountsPromises);
			const instructorsWithCourseCount = userRes.data.map((instructor, index) => ({
				...instructor,
				courseCount: courseCounts[index],
			}));
			setPosts(instructorsWithCourseCount);
		} catch (error) {
			console.log("Error fetching data:", error);
		}
	};

	const hadleDelete = async (userId) => {
		try {
			setLoading(true)
			await axios.delete(`/api/auth/usersingle/${userId}`)
			toast.success("User Deleted")
			fetchData();
		}
		catch (error) {
			console.log(error)
		}
		finally {
			setLoading(false)
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

	const columns = useMemo(
		() => [
			{ accessor: 'id', Header: 'ID', show: false },
			{
				accessor: 'fname',
				Header: 'Name',
				Cell: ({ value, row }) => {
					const id = row.original._id;
					return (
						<div className="d-flex align-items-center">
							{id && <Image
								src={`/api/auth/profileimgadmin/${id}`}
								alt="Avatar"
								className="rounded-circle avatar-md me-2"
							/>}
							<h5 className="mb-0">{value}</h5>
						</div>
					);
				}
			},
			{
				accessor: 'courseCount', Header: 'Courses',
				Cell: ({ value }) => {
					return (
						<div className="d-flex align-items-center">
							<span className="mb-0">{value}</span>
						</div>
					);
				}
			},
			{
				accessor: 'createdAt',
				Header: 'Joined',
				Cell: ({ value }) => {
					return (
						<div className="d-flex align-items-center">
							<span className="mb-0">{formatDate(value)}</span>
						</div>
					);
				}
			},
			{
				accessor: 'students',
				Header: 'Students',
				Cell: ({ value }) => {
					return numberWithCommas(value);
				}
			},
			{
				accessor: 'verified',
				Header: 'Verified',
				Cell: ({ value }) => {
					return (
						<DotBadge
							bg={
								value ? 'success' : 'danger'}
						>{value ? 'Verified' : 'Not Verified'}</DotBadge>

					);
				}
			},
			{
				accessor: 'rating',
				Header: 'Rating',
				Cell: ({ value }) => {
					return (
						<div className="align-middle text-warning border-top-0">
							{value} <Icon path={mdiStar} size={0.6} />
						</div>
					);
				}
			},
		],
		[]
	);

	const data = useMemo(() => userdata, [userdata]);

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

	const {
		handleSubmit,
		register,
		getValues,
		setValue,
		formState: { errors },
	} = useForm();

	const { pageIndex, globalFilter } = state;

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
			toast.success(response.data.message)
			setEditModalOpen(false)
		} catch (error) {
			// toast.error(error);
			console.log(error)
		}
		finally {
			setLoading(false)
		}
	};

	const handleUpdate = async (id, verified) => {
		try {
			const res = await axios.put(`/api/auth/instructorsingle/${id}`, { verified })
			if (res.data.verified) {
				toast.warning(`Rejected`);
				fetchData();
			}
			else {
				toast.success(`User approved successfully`);
				fetchData();
			}
		} catch (error) {
			toast.error("Somtihing went wrong");
			console.log(error)
		}
	}

	const handleImageChange = (event) => {
		const selectedImage = event.target.files[0];
		setProfileImage(selectedImage);
	};

	return (
		<Fragment>
			<ToastContainer />
			<div className=" overflow-hidden">
				<Row>
					<Col lg={12} md={12} sm={12} className="mb-lg-0 mb-2 px-5 py-4">
						<GlobalFilter
							filter={globalFilter}
							setFilter={setGlobalFilter}
							placeholder="Search Instructor"
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
												{rowData.verified ? (
													<Dropdown.Item eventKey="1" onClick={() => handleUpdate(rowData._id, false)}>
														<Send size="15px" className="dropdown-item-icon" /> Reject
													</Dropdown.Item>
												) : (
													<Dropdown.Item eventKey="2" onClick={() => handleUpdate(rowData._id, true)}>
														<Inbox size="15px" className="dropdown-item-icon" /> Approved
													</Dropdown.Item>
												)}
												<Dropdown.Item eventKey="1" onClick={() => router.push(`/dashboard/user/edit-instructor?id=${rowData._id}`)}>
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

export default InstructorsListItems;
