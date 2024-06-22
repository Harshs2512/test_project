import { Col, Row, Card, Nav, Tab, Breadcrumb, Dropdown, Image, Table } from 'react-bootstrap';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import {
	useTable,
	useFilters,
	useGlobalFilter,
	usePagination,
	useRowSelect
} from 'react-table';
import Link from 'next/link';
import {
	Trash,
	MoreVertical,
	Edit,
	ToggleLeft,
	ToggleRight,
} from 'react-feather';
import { GlobalFilter, Pagination, GKTippy } from 'widgets';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DotBadge from 'components/bootstrap/DotBadge';
import axios from 'axios'
import Loading from '../../loading';
import formatDate from 'helper/formatDate';
import { Can } from 'utils/accessControl';
import { useRouter } from 'next/router';
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const AllPosts = () => {
	const [allposts, setAllposts] = useState([])
	const [category, setCategory] = useState([])
	const [loading, setLoading] = useState(false)
	const router = useRouter();

	const getAllCategory = async () => {
		try {
			const res = await axios.get(`/api/blogs/category/getcategory`);
			if (res.data.success) {
				setCategory(res.data.categories)
			}
		} catch (error) {
			console.log("Error while deleting:", error);
		}
	};

	useEffect(() => {
		getAllCategory();
	}, [loading]);

	const getPosts = async () => {
		setLoading(true);
		try {
			const res = await axios.get("/api/blogs/getpostfordashboard");
			if (res.data.success) {
				setAllposts(res.data?.blogs)
			}
		} catch (error) {
			console.log("Error fetching posts:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getPosts();
	}, []);

	const PostsTable = ({ table_data }) => {

		const CustomToggle = (({ children, onClick }, ref) => (
			(
				<Link
					href=""
					// ref={ref}
					onClick={(e) => {
						e.preventDefault();
						onClick(e);
					}}
					className="btn-icon btn btn-ghost btn-sm rounded-circle">
					{children}
				</Link>
			)
		));

		const columns = useMemo(
			() => [
				// { accessor: 'id', Header: 'ID', show: false },
				{
					accessor: 'title',
					Header: 'Post',
					Cell: ({ value, row }) => {
						return (
							<Link href="#" className="text-inherit">
								<div className="d-lg-flex align-items-center">
									<div>
										<Image
											src={`/api/blogs/thumbnail/${row.original._id}`}
											alt=""
											className="img-4by3-lg rounded"
										/>
									</div>
									<div className="ms-lg-3 mt-2 mt-lg-0">
										<Link href={`/blog/${row.original.slug}`}>
											<h4 className="mb-1 text-primary-hover">{value.split(' ').slice(0, 3).join(' ')}..</h4>
										</Link>
									</div>
								</div>
							</Link>
						);
					}
				},
				{
					accessor: 'postcategory',
					Header: 'Category',
					Cell: ({ value }) => {
						const categoryStatus = category?.find((cat) => cat._id === value)?.status.toString();
						const categoryName = category?.find((item) => item._id === value)
						return (
							<Fragment>
								<GKTippy content={categoryStatus !== 'live' ? "Users can't access this resorce because this category is not enebled now !" : 'This category is live'} >
									<Link href="category" className="bookmark text-white text-decoration-none">
										<DotBadge
											bg={
												categoryStatus === 'pending' ? 'danger' : categoryStatus === 'live' ? 'success' : ''
											}
										></DotBadge>
									</Link>
								</GKTippy>
								{categoryName?.title}
							</Fragment>
						)
					}
				},
				{
					accessor: 'updatedAt',
					Header: 'Date Updated',
					Cell: ({ value }) => {
						return <span>{formatDate(value)}</span>
					}
				},
				{
					accessor: 'status',
					Header: 'Status',
					Cell: ({ value }) => {
						return (
							<Fragment>
								<DotBadge
									bg={
										value === 'pending' ? 'danger' : value === 'live' ? 'success' : ''
									}
								></DotBadge>
								{value === 'live' ? 'Live' : value === 'pending' ? 'Disabled' : ''}
								{/* {loading ? <Loder /> : ''} */}
							</Fragment>
						);
					}
				},
			],
			[]
		);

		const data = useMemo(() => table_data, [table_data]);
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
		);
		const { pageIndex, globalFilter } = state;

		const deleteHandler = async (id) => {
			try {
				const swalWithBootstrapButtons = Swal.mixin({
					customClass: {
						confirmButton: 'btn btn-success ms-2',
						cancelButton: 'btn btn-danger'
					},
					buttonsStyling: false
				})
				swalWithBootstrapButtons.fire({
					title: 'Are you sure?',
					text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Yes, delete it!',
					cancelButtonText: 'No, cancel!',
					reverseButtons: true
				}).then((result) => {
					if (result.isConfirmed) {
						const res = axios.delete(`/api/blogs/${id}`);
						getPosts()
						toast.success("Post Deleted")
						swalWithBootstrapButtons.fire(
							'Deleted!',
							'Your file has been deleted.',
							'success'
						)
					}
				})
			} catch (error) {
				console.log("Error while deleting:", error);
			}
		};

		const handleUpdate = async (id, title, status) => {
			setLoading(true)
			try {
				const res = await axios.put(`/api/blogs/${id}`, { title, status })
				if (res) {
					toast.success('Updated successfully');
					getPosts();
				}
				else {
					toast.error("something went wrong")
				}
				setLoading(false)
			}
			catch (error) {
				toast.error("Somtihing went wrong");
			}
		}

		return (
			<Fragment>
				<ToastContainer />
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
				{loading ? <Loading /> :
					<div className="border-0 overflow-y-hidden">
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
														<Can I="editBlogs">
															<Dropdown.Item eventKey="1" onClick={() => {
																router.push(`/dashboard/cms/edit-post?id=${rowData._id}`);
															}}>
																<Edit size="15px" className="dropdown-item-icon" /> Edit
															</Dropdown.Item>

															{rowData.status !== 'live' ? (
																<Dropdown.Item eventKey="4" onClick={() => handleUpdate(rowData._id, rowData.title, 'live')}>
																	<ToggleLeft size="15px" className="dropdown-item-icon" /> Publish
																</Dropdown.Item>
															) : (
																<Dropdown.Item eventKey="5" onClick={() => handleUpdate(rowData._id, rowData.title, 'pending')}>
																	<ToggleRight size="15px" className="dropdown-item-icon" /> Unpublish
																</Dropdown.Item>
															)}
														</Can>
														<Can I="deleteBlogs">
															<Dropdown.Item eventKey="6" onClick={() => deleteHandler(rowData._id)}>
																<Trash size="15px" className="dropdown-item-icon" /> Delete
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
					</div>
				}
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
							<h1 className="mb-1 h2 fw-bold">All Posts</h1>
							<Breadcrumb>
								<Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
								<Breadcrumb.Item href="#">CMS</Breadcrumb.Item>
								<Breadcrumb.Item active>All Post</Breadcrumb.Item>
							</Breadcrumb>
						</div>
						<div>
							<Can I="createBlogs">
								<Link href="/dashboard/cms/add-new-post" className="btn btn-primary">
									New Post
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
									<Nav.Item>
										<Nav.Link eventKey="published" className="mb-sm-3 mb-md-0">
											Published
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="scheduled" className="mb-sm-3 mb-md-0">
											Disabled
										</Nav.Link>
									</Nav.Item>
								</Nav>
							</Card.Header>
							<Card.Body className="p-0">
								<Tab.Content>
									<Tab.Pane eventKey="all" className="pb-0">
										<PostsTable table_data={allposts} />
									</Tab.Pane>
									<Tab.Pane eventKey="published" className="pb-0">
										<PostsTable table_data={allposts.filter((item) => item?.status === 'live')} />
									</Tab.Pane>
									<Tab.Pane eventKey="scheduled" className="pb-4">
										<PostsTable table_data={allposts.filter((item) => item?.status === 'pending')} />
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

export default AllPosts;