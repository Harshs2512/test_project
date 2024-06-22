// import node module libraries
import React, { Fragment, useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { Col, Row, Tab, Card, Nav, Breadcrumb, Table, Dropdown, Image, Button, Modal, Form } from 'react-bootstrap';
import {
	useTable,
	useFilters,
	useGlobalFilter,
	usePagination
} from 'react-table';
import { GlobalFilter, Pagination } from 'widgets';
import { XCircle, MoreVertical, Send, Inbox } from 'react-feather';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import Loading from 'pages/loading';
import { Can } from 'utils/accessControl';
import { useRouter } from "next/router";
const AllCourses = () => {
	const [allData, setAllData] = useState([])
	const router = useRouter();
	const [courseId, setCourseId] = useState('');
	const [loading, setLoading] = useState(false);
	const getallcourse = async () => {
		setLoading(true);
		try {
			const course = await axios.get('/api/courses/short-course/crudCourse');
			setAllData(course.data.courses);
		}
		catch (error) {
			console.log(error)
		}
		setLoading(false);
	}
	useEffect(() => {
		getallcourse();
	}, []);
	const CoursesTable = ({ courses_data }) => {
		const modelOpen = (isOpen, courseId) => {
			setEditModalOpen(isOpen);
			if (courseId !== null) {
				setCourseId(courseId);
			}
		};
		const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
			(<Link
				href="#"
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
		const formatDate = (dateString) => {
			const months = [
				'January', 'February', 'March', 'April', 'May', 'June', 'July',
				'August', 'September', 'October', 'November', 'December'
			];

			const date = new Date(dateString);
			const year = date.getFullYear().toString();
			const month = months[date.getMonth()];
			const day = String(date.getDate()).padStart(2, '0');
			return `${month} ${day}, ${year}`;
		};
		const columns = useMemo(
			() => [
				{ accessor: '_id', Header: 'ID', show: false },
				{
					accessor: 'course_title',
					Header: 'Courses',
					Cell: ({ value, row }) => {
						return (
							(<Link href="#" className="text-inherit">
								<div className="d-lg-flex align-items-center">
									<div>
										<Image
											src={`/api/courses/short-course/getthumbnail/${row.original._id}`}
											alt="gfdsa"
											className="img-4by3-lg rounded"
										/>
									</div>
									<div className="ms-lg-3 mt-2 mt-lg-0">
										<Link href={`#!`}>
											<h4 className="mb-1 text-primary-hover">{value.split(' ').slice(0, 3).join(' ')}</h4>
										</Link>
										<span className="text-inherit">
											{formatDate(row.original.createdAt)}
										</span>
									</div>
								</div>
							</Link>)
						);
					}
				},
				{
					accessor: 'project',
					Header: 'Project',
					Cell: ({ value, row }) => {

						return (
							<div className="d-flex align-items-center">
								<h5 className="mb-0">{value}</h5>
							</div>
						);
					}
				},
				{
					accessor: 'duration',
					Header: 'Course Durations',
					Cell: ({ value, row }) => {
						return (
							<div className="d-flex align-items-center">
								<h5 className="mb-0">{value}</h5>
							</div>
						);
					}
				},
			],
			[]
		);
		const data = useMemo(() => courses_data, [courses_data]);
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
		const { pageIndex, globalFilter } = state;
		const handleUpdate = async (id,action) => {
			router.push(`/dashboard/courses/short-courses/add-new-course?id=${id}&action=${action}`)
		  };
		const handleDelete = async (id) => {
			try {
				const swalWithBootstrapButtons = Swal.mixin({
					customClass: {
						confirmButton: 'btn btn-success ms-2',
						cancelButton: 'btn btn-danger'
					},
					buttonsStyling: false
				});

				const result = await swalWithBootstrapButtons.fire({
					title: 'Are you sure?',
					text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Yes, delete it!',
					cancelButtonText: 'No, cancel!',
					reverseButtons: true
				});

				if (result.isConfirmed) {
					const res = await axios.delete(`/api/courses/short-course/crudCourse?id=${id}`);
					if (res.status === 200) {
						await getallcourse();
						swalWithBootstrapButtons.fire(
							'Deleted!',
							'Your file has been deleted.',
							'success'
						);
					} else {
						toast.error("Something went wrong");
					}
				}
			} catch (error) {
				toast.error("Something went wrong");
				console.log(error);
			}
		};
		return (
			<Fragment>
				<div className=" overflow-hidden">
					<Row>
						<Col lg={12} md={12} sm={12} className="mb-lg-0 mb-2 py-4 px-5 ">
							<GlobalFilter
								filter={globalFilter}
								setFilter={setGlobalFilter}
								placeholder="Search Course"
							/>
						</Col>
					</Row>
				</div>
				{loading ? <Loading /> : <div className="border-0 overflow-y-hidden">
					{/* {loading ? <Loder /> : */}
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
												<td key={index} {...cell.getCellProps()}>{cell.render('Cell')}</td>
											);
										})}
										<td>
											<Dropdown>
												<Dropdown.Toggle as={CustomToggle}>
													<MoreVertical size="15px" className="text-secondary" />
												</Dropdown.Toggle>
												<Dropdown.Menu align="end">
													<Dropdown.Header>SETTINGS</Dropdown.Header>
													<Can I="deleteCourse">
														<Dropdown.Item eventKey="1" onClick={() => handleDelete(rowData._id)}>
															<XCircle size="15px" className="me-1" />Delete Course
														</Dropdown.Item>
													</Can>
													<Can I="editCourse">
														<Dropdown.Item
															eventKey="1"
															onClick={() =>
																handleUpdate(
																	rowData._id, "update"
																)
															}
														>
															<Send size="15px" className="me-1" />
															Update
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
				</div>}

				{/* Pagination @ Footer */}
				<Pagination
					previousPage={previousPage}
					pageCount={pageCount}
					pageIndex={pageIndex}
					gotoPage={gotoPage}
					nextPage={nextPage}
				/>
			</Fragment>
		);
	};
	return (
		<Fragment>
			<ToastContainer />
			<Row>
				<Col lg={12} md={12} sm={12}>
					<div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
						<div className="mb-3 mb-md-0">
							<h1 className="mb-1 h2 fw-bold">All Courses</h1>
							<Breadcrumb>
								<Breadcrumb.Item href="#">Home</Breadcrumb.Item>
								<Breadcrumb.Item href="#">Courses</Breadcrumb.Item>
								<Breadcrumb.Item active>All</Breadcrumb.Item>
							</Breadcrumb>
						</div>
						<div>
							<Can I="createCourse">
								<Link href="/dashboard/courses/short-courses/add-new-course" className="btn btn-primary">
									Add New Courses
								</Link>
							</Can>
						</div>
					</div>
				</Col>
			</Row>
			<Row>
				<Col lg={12} md={12} sm={12}>
					<Tab.Container defaultActiveKey="all">
						<Card>
							<Card.Header className="border-bottom-0 p-0 bg-white">
								<Nav className="nav-lb-tab">
									<Nav.Item>
										<Nav.Link eventKey="all" className="mb-sm-3 mb-md-0">
											All
										</Nav.Link>
									</Nav.Item>
								</Nav>
							</Card.Header>
							<Card.Body className="p-0">
								<Tab.Content>
									<Tab.Pane eventKey="all" className="pb-4">
										<CoursesTable courses_data={allData} />
									</Tab.Pane>
								</Tab.Content>
							</Card.Body>
						</Card>
					</Tab.Container>
				</Col>
			</Row>
		</Fragment>
	);
};

export default AllCourses;