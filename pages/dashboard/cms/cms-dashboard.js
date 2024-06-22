// // import node module libraries
// import React, { Fragment, useMemo, useState, useEffect } from 'react';
// import { useTable } from 'react-table';
// import {
// 	Card,
// 	Row,
// 	Col,
// 	Table,
// 	Breadcrumb
// } from 'react-bootstrap';
// import Link from 'next/link';

// // import widget/custom components
// import { StatRightBGIcon, GKTippy } from 'widgets';

// // import custom components
// import DotBadge from 'components/bootstrap/DotBadge';

// // import MDI icons
// import {
// 	mdiTextBoxMultiple,
// 	mdiAccountMultiple,
// 	mdiMessageReplyText
// } from '@mdi/js';

// import axios from 'axios';
// import formatDate from 'helper/formatDate';


// const CMSDashboard = (props) => {
// 	const [allposts, setAllposts] = useState([]);

// 	useEffect(() => {
// 		if (props.data.success) {
// 			setAllposts(props.data.blogs);
// 		}
// 	}, [props.data.success, props.data.blogs]);

// 	const counter = props?.counts;
// 	const category = props?.category?.categories;

// 	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
// 		(<Link
// 			href=""
// 			ref={ref}
// 			onClick={(e) => {
// 				e.preventDefault();
// 				onClick(e);
// 			}}
// 			className="btn-icon btn btn-ghost btn-sm rounded-circle">
// 			{children}
// 		</Link>)
// 	));
// 	CustomToggle.displayName = 'CustomToggle';

// 	const columns = useMemo(
// 		() => [
// 			{ accessor: 'id', Header: 'ID', show: false },
// 			{
// 				accessor: 'title',
// 				Header: 'POST',
// 				Cell: ({ value }) => {
// 					return (
// 						<div className="mb-0 w-75 text-wrap">
// 							<Link href="#" className="text-inherit">
// 								{value}
// 							</Link>
// 						</div>
// 					);
// 				}
// 			},
// 			{
// 				accessor: 'postcategory',
// 				Header: 'CATEGORY',
// 				Cell: ({ value, row }) => {
// 					const categoryStatus = category.find((cat) => cat._id === value);
// 					return (
// 						<Fragment>
// 							{categoryStatus?.title}
// 						</Fragment>
// 					)
// 				}
// 			},
// 			{
// 				accessor: 'updatedAt',
// 				Header: 'UPDATED AT',
// 				Cell: ({ value }) => {
// 					return <span>{formatDate(value)}</span>
// 				}
// 			},
// 			{
// 				accessor: 'status',
// 				Header: 'STATUS',
// 				Cell: ({ value }) => {
// 					return (
// 						<Fragment>
// 							<DotBadge
// 								bg={
// 									value === 'pending' ? 'danger' : value === 'live' ? 'success' : ''
// 								}
// 							></DotBadge>
// 							{value === 'live' ? 'Live' : value === 'pending' ? 'Disabled' : ''}
// 							{/* {loading ? <Loder /> : ''} */}
// 						</Fragment>
// 					);
// 				}
// 			},
// 		],
// 		[allposts, category]
// 	);

// 	const data = useMemo(() => allposts, [allposts]);

// 	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
// 		useTable({
// 			columns,
// 			data,
// 			initialState: {
// 				hiddenColumns: columns.map((column) => {
// 					if (column.show === false) return column.accessor || column.id;
// 					else return false;
// 				})
// 			}
// 		});

// 	return (
// 		<Fragment>
// 			<Row>
// 				<Col lg={12} md={12} sm={12}>
// 					<div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
// 						<div className="mb-3 mb-md-0">
// 							<h1 className="mb-1 h2 fw-bold">CMS Dashboard</h1>
// 							<Breadcrumb>
// 								<Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
// 								<Breadcrumb.Item href="#">CMS</Breadcrumb.Item>
// 								<Breadcrumb.Item active>Overview</Breadcrumb.Item>
// 							</Breadcrumb>
// 						</div>
// 						<div>
// 							<Link href="/dashboard/cms/add-new-post" className="btn btn-primary">
// 								New Post
// 							</Link>
// 						</div>
// 					</div>
// 				</Col>
// 			</Row>

// 			<Row>
// 				<Col xl={4} lg={6} md={12} sm={12}>
// 					<StatRightBGIcon
// 						title="TOTAL POSTS"
// 						value={counter && counter.Blogs}
// 						summary={`${counter && counter.Blogs} Posts in last 30 days`}
// 						iconName={mdiTextBoxMultiple}
// 						iconColorVariant="primary"
// 						classValue="mb-4"
// 					/>
// 				</Col>
// 				{/* <Col xl={3} lg={6} md={12} sm={12}>
// 					<StatRightBGIcon
// 						title="ASSETS"
// 						value="367"
// 						summary="300+ Media Object"
// 						iconName={mdiImageMultiple}
// 						iconColorVariant="warning"
// 						classValue="mb-4"
// 					/>
// 				</Col> */}
// 				<Col xl={4} lg={6} md={12} sm={12}>
// 					<StatRightBGIcon
// 						title="USERS"
// 						value={counter && counter.Users}
// 						summary={`${counter && counter.Users} User in last 30 days`}
// 						iconName={mdiAccountMultiple}
// 						iconColorVariant="success"
// 						classValue="mb-4"
// 					/>
// 				</Col>
// 				<Col xl={4} lg={6} md={12} sm={12}>
// 					<StatRightBGIcon
// 						title="TOTAL CATEGORIES"
// 						value={counter && counter.Blogs_category}
// 						summary={`${counter && counter.Blogs_category} Category in last 30 days`}
// 						iconName={mdiMessageReplyText}
// 						iconColorVariant="info"
// 						classValue="mb-4"
// 					/>
// 				</Col>
// 			</Row>

// 			<Row>
// 				<Col lg={12} md={12} sm={12}>
// 					<Card>
// 						<Card.Header className="d-flex justify-content-between align-items-center border-bottom-0 card-header-height">
// 							<h4 className="mb-0">Recent Posts</h4>
// 						</Card.Header>
// 						<Card.Body className="p-0">
// 							<Table hover responsive {...getTableProps()} className="text-nowrap table-centered">
// 								<thead className="table-light">
// 									{headerGroups.map((headerGroup, index) => (
// 										<tr key={index} {...headerGroup.getHeaderGroupProps()}>
// 											{headerGroup.headers.map((column, index) => (
// 												<th key={index} {...column.getHeaderProps()}>
// 													{column.render('Header')}
// 												</th>
// 											))}
// 											{/* <th>Action</th> */}
// 										</tr>
// 									))}
// 								</thead>
// 								{/* Apply the table body props */}
// 								<tbody {...getTableBodyProps()}>
// 									{rows.map((row, index) => {
// 										prepareRow(row);
// 										const rowData = row.original; // Get the data for the current row
// 										return (
// 											<tr key={index} {...row.getRowProps()}>
// 												{row.cells.map((cell, index) => {
// 													return (
// 														<td key={index} {...cell.getCellProps()}>
// 															{cell.render('Cell')}
// 														</td>
// 													);
// 												})}
// 											</tr>
// 										);
// 									})}
// 								</tbody>
// 							</Table>
// 						</Card.Body>
// 					</Card>
// 				</Col>
// 			</Row>
// 		</Fragment>
// 	);
// };

// export const getServerSideProps = async () => {
// 	try {
// 		const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/blogs/getpostfordashboard`);
// 		const count = await axios.get(`${process.env.NEXTAUTH_URL}/api/counterdata/counts`);
// 		const cat = await axios.get(`${process.env.NEXTAUTH_URL}/api/blogs/category/getcategory`);
// 		const blogData = res?.data || [];
// 		const counts = count?.data?.counterData || [];
// 		const category = cat?.data || []
// 		return {
// 			props: {
// 				data: blogData,
// 				counts: counts,
// 				category: category,
// 			},
// 		};
// 	} catch (error) {
// 		console.error("Error fetching data:", error);
// 		return {
// 			props: {
// 				data: [],
// 				counts: [],
// 				category: [],
// 			},
// 		};
// 	}
// };

// export default CMSDashboard;

// import node module libraries
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import {
	Card,
	Row,
	Col,
	Table,
	Breadcrumb
} from 'react-bootstrap';
import Link from 'next/link';

// import widget/custom components
import { StatRightBGIcon, GKTippy } from 'widgets';

// import custom components
import DotBadge from 'components/bootstrap/DotBadge';

// import MDI icons
import {
	mdiTextBoxMultiple,
	mdiAccountMultiple,
	mdiMessageReplyText
} from '@mdi/js';
import axios from 'axios';
import formatDate from 'helper/formatDate';
import { Can } from 'utils/accessControl';


const CMSDashboard = () => {
	const [counter, setCounter] = useState()
	const [allposts, setAllposts] = useState([])
	const [category, setCategory] = useState([])
	const getCount = async () => {
		try {
			const res = await axios.get("/api/counterdata/counts")
			setCounter(res.data.counterData)
		}
		catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		getCount();
	}, [])

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

	const getPosts = async () => {
		try {
			const res = await axios.get("/api/blogs/getpostfordashboard");
			setAllposts(res.data.blogs);
		} catch (error) {
			console.log("Error fetching posts:", error);
		}
	};
	const getCategory = async () => {
		try {
			const res = await axios.get("/api/blogs/category/getcategory");
			setCategory(res.data.categories);
		} catch (error) {
			console.log("Error fetching posts:", error);
		}
	};
	useEffect(() => {
		getPosts();
		getCategory();
	}, [])

	const columns = useMemo(
		() => [
			{ accessor: 'id', Header: 'ID', show: false },
			{
				accessor: 'title',
				Header: 'POST',
				Cell: ({ value }) => {
					return (
						<div className="mb-0 w-75 text-wrap">
							<Link href="#" className="text-inherit">
								{value}
							</Link>
						</div>
					);
				}
			},
			{
				accessor: 'postcategory',
				Header: 'CATEGORY',
				Cell: ({ value, row }) => {
					const categoryStatus = category.find((cat) => cat._id === value);
					return (
						<Fragment>
							{categoryStatus?.title}
						</Fragment>
					)
				}
			},
			{
				accessor: 'updatedAt',
				Header: 'UPDATED AT',
				Cell: ({ value }) => {
					return <span>{formatDate(value)}</span>
				}
			},
			{
				accessor: 'status',
				Header: 'STATUS',
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
		[category]
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

	return (
		<Fragment>
			<Row>
				<Col lg={12} md={12} sm={12}>
					<div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between ">
						<div className="mb-3 mb-md-0">
							<h1 className="mb-1 h2 fw-bold">CMS Dashboard</h1>
							<Breadcrumb>
								<Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
								<Breadcrumb.Item href="#">CMS</Breadcrumb.Item>
								<Breadcrumb.Item active>Overview</Breadcrumb.Item>
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
				<Col xl={4} lg={6} md={12} sm={12}>
					<StatRightBGIcon
						title="TOTAL POSTS"
						value={counter && counter.Blogs}
						summary={`${counter && counter.Blogs} Posts in last 30 days`}
						iconName={mdiTextBoxMultiple}
						iconColorVariant="primary"
						classValue="mb-4"
					/>
				</Col>
				{/* <Col xl={3} lg={6} md={12} sm={12}>
					<StatRightBGIcon
						title="ASSETS"
						value="367"
						summary="300+ Media Object"
						iconName={mdiImageMultiple}
						iconColorVariant="warning"
						classValue="mb-4"
					/>
				</Col> */}
				<Col xl={4} lg={6} md={12} sm={12}>
					<StatRightBGIcon
						title="USERS"
						value={counter && counter.Users}
						summary={`${counter && counter.Users} User in last 30 days`}
						iconName={mdiAccountMultiple}
						iconColorVariant="success"
						classValue="mb-4"
					/>
				</Col>
				<Col xl={4} lg={6} md={12} sm={12}>
					<StatRightBGIcon
						title="TOTAL CATEGORIES"
						value={counter && counter.Blogs_category}
						summary={`${counter && counter.Blogs_category} Category in last 30 days`}
						iconName={mdiMessageReplyText}
						iconColorVariant="info"
						classValue="mb-4"
					/>
				</Col>
			</Row>

			<Row>
				<Col lg={12} md={12} sm={12}>
					<Card>
						<Card.Header className="d-flex justify-content-between align-items-center border-bottom-0 card-header-height">
							<h4 className="mb-0">Recent Posts</h4>
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
											{/* <th>Action</th> */}
										</tr>
									))}
								</thead>
								{/* Apply the table body props */}
								<tbody {...getTableBodyProps()}>
									{rows.map((row, index) => {
										prepareRow(row);
										const rowData = row.original; // Get the data for the current row
										return (
											<tr key={index} {...row.getRowProps()}>
												{row.cells.map((cell, index) => {
													return (
														<td key={index} {...cell.getCellProps()}>
															{cell.render('Cell')}
														</td>
													);
												})}
											</tr>
										);
									})}
								</tbody>
							</Table>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

export default CMSDashboard;
