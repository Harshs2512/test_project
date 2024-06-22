// import node module libraries
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import {
	useTable,
	useFilters,
	useGlobalFilter,
	usePagination,
	useRowSelect
} from 'react-table';
import Link from 'next/link';
import { Col, Row, Dropdown, Table, Breadcrumb, Card, Badge, Modal, Form, Button } from 'react-bootstrap';
import { Trash, Send, Inbox, MoreVertical, Edit2 } from 'react-feather';
// import widget/custom components
import { GlobalFilter, Pagination, Checkbox } from 'widgets';
// import data files
import { courses } from 'data/courses/CoursesCategoryData';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { dA } from '@fullcalendar/core/internal-common';

const Megamenucategory = () => {
	const [postcount, setCountpost] = useState()
	const [modelopen, setModelopen] = useState(false)
	const [category, setCategories] = useState([])
	const [title, setTitle] = useState('')
	const [action, setAction] = useState('')
	const [cid, setCid] = useState('')

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
	const data = useMemo(() => category || [], [category]);
	const columns = useMemo(
		() => [
			{ accessor: 'id', Header: 'ID', show: false },
			{
				accessor: 'title',
				Header: 'Category',
				Cell: ({ value }) => {
					const categoryId = category && category.find((cat) => cat.title === value)?._id.toString(); // Get the category ID based on the category title
					const count = postcount && postcount[categoryId] || 0; // Get the post count for the category, default to 0 if not found
					return (
						<Link href="#" className="text-inherit position-relative">
							<h5 className="mb-0 text-primary-hover">
								{value}
							</h5>
						</Link>
					);
				},
			},
			{ accessor: 'createdAt', Header: 'Date Created' },
			{ accessor: 'updatedAt', Header: 'Date Updated' },
			{
				accessor: 'status',
				Header: 'Status',
				Cell: ({ value, row }) => {
					return (<Badge bg={value === 'live' ? 'success' : value === 'pending' ? 'warning' : ''}>{value === 'live' ? 'Live' : value === 'pending' ? 'Dissabled' : ''}</Badge>);
				}
			},
		],
		[postcount, category]
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
		usePagination,
		useRowSelect,
		(hooks) => {
			hooks.visibleColumns.push((columns) => [
				{
					id: 'selection',
					Header: ({ getToggleAllRowsSelectedProps }) => (
						<Checkbox {...getToggleAllRowsSelectedProps()} />
					),
					Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />
				},
				...columns
			]);
		}
	);

	const { pageIndex, globalFilter } = state;

	const handleSubmit = async () => {
		if (action === 'update') {
			try {
				const result = await axios.put(`/api/siteSettings/megaMenu/category/${cid}`, { title });
				if (result.status === 200) {
					toast.success("Category updated");
					setModelopen(false);
					setTitle("");
					setAction("");
					getcategory();
				}
				if (result.error) {
					toast.error(result.error);
					setAction("");
				}
			} catch (error) {
				toast.error("This category is exist!");
				console.log(error)
			}
		}
		else {
			try {
				const result = await axios.post("/api/siteSettings/megaMenu/category/addcategory", { title });
				if (result.status === 201) {
					toast.success("Category is created")
					setModelopen(false)
					getcategory()
				}
				if (result.error) {
					toast.error(result.error);
				}
			} catch (error) {
				toast.error("This category is exist!");
				console.log(error)
			}
		}
	}
	const getcategory = async () => {
		try {
			const { data } = await axios.get("/api/siteSettings/megaMenu/category/getcategory");
			setCategories(data.categories);
			localStorage.setItem("b_cat", JSON.stringify(data));
		} catch (error) {
			console.log("Error fetching categories:", error);
			toast.error("Error fetching categories");
		}
	};

	const handleUpdateStatus = async (id, title, status) => {
		try {
			const res = await axios.put(`/api/siteSettings/megaMenu/category/${id}`, { title: title, status: status })
			if (res) {
				toast.success(`Category Updated successfully`);
				getcategory();
			}
			else {
				toast.error("something went wrong")
			}
		} catch (error) {
			toast.error("Somtihing went wrong");
		}
	}

	const actionHandler = async (id, action) => {
		setAction(action)
		setCid(id)
		if (action === 'update') {
			setModelopen(true)
			try {
				await axios.get(`/api/siteSettings/megaMenu/category/${id}`)
					.then((response) => {
						setTitle(response.data.category.title)
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
				const { data } = await axios.delete(`/api/siteSettings/megaMenu/category/${id}`);
				if (data) {
					toast.success(`Category Deleted successfully`);
					getcategory();
				} else {
					toast.error(data.msg);
				}
			} catch (error) {
				toast.error("Somtihing went wrong");
			}
		}
	};

	useEffect(() => {
		getcategory();
	}, [])

	return (
		<Fragment>
			<ToastContainer />
			<Row>
				<Col lg={12} md={12} sm={12}>
					<div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
						<div className="mb-3 mb-md-0">
							<h1 className="mb-1 h2 fw-bold">Category</h1>
							<Breadcrumb>
								<Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
								<Breadcrumb.Item href="#">CMS</Breadcrumb.Item>
								<Breadcrumb.Item active>Category</Breadcrumb.Item>
							</Breadcrumb>
						</div>
						<div>
							<Link href="/dashboard/cms/all-posts" className="btn btn-outline-secondary">
								Back to All Post
							</Link>
						</div>
					</div>
				</Col>
				<div className='mb-5'>
					<button className="btn btn-outline-secondary" onClick={() => setModelopen(true)}>
						Create Category
					</button>
				</div>
			</Row>
			<Row>
				<Col lg={12} md={12} sm={12}>
					<Card>
						<Card.Body className="p-0">
							<div className=" overflow-hidden">
								<Row>
									<Col
										lg={12}
										md={12}
										sm={12}
										className="mb-lg-0 mb-2 px-5 py-4"
									>
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
									{headerGroups.map((headerGroup, index) => (
										<tr key={index} {...headerGroup.getHeaderGroupProps()}>
											{headerGroup.headers.map((column, index) => (
												<th key={index} {...column.getHeaderProps()}>
													{column.render('Header')}
												</th>
											))}
											<th>Action</th>
										</tr>
									))}
								</thead>
								<tbody {...getTableBodyProps()}>
									{page.map((row, index) => {
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
														<Dropdown.Menu align={'end'}>
															<Dropdown.Header>ACTION</Dropdown.Header>
															{rowData.status !== 'live' ? (
																<Dropdown.Item eventKey="1" onClick={() => handleUpdateStatus(rowData._id, rowData.title, 'live')}>
																	<Send size="15px" className="dropdown-item-icon" /> Publish
																</Dropdown.Item>
															) : (
																<Dropdown.Item eventKey="2" onClick={() => handleUpdateStatus(rowData._id, rowData.title, 'pending')}>
																	<Inbox size="15px" className="dropdown-item-icon" /> Disabled
																</Dropdown.Item>
															)}
															<Dropdown.Item eventKey="3" onClick={() => actionHandler(rowData._id, 'delete')}>
																<Trash size="15px" className="dropdown-item-icon" /> Delete
															</Dropdown.Item>
															<Dropdown.Item eventKey="3" onClick={() => actionHandler(rowData._id, 'update')}>
																<Edit2 size="15px" className="dropdown-item-icon" /> Edit
															</Dropdown.Item>
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
						</Card.Body>
					</Card>
				</Col>
			</Row>

			<Modal show={modelopen} >
				<Modal.Header closeButton onClick={() => setModelopen(false)}>
					<Modal.Title>Create Category</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Enter Category</Form.Label>
							<Form.Control
								type="text"
								placeholder="eg:-Frontend"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</Form.Group>
						<Button onClick={() => handleSubmit()}>
							Create
						</Button>
					</Form>
				</Modal.Body>
			</Modal>

		</Fragment>
	);
};

export default Megamenucategory;
