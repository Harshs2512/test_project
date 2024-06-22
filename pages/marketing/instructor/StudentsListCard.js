import React, { Fragment, useMemo, useEffect, useState } from 'react';
import {
	useTable,
	useFilters,
	useGlobalFilter,
	usePagination
} from 'react-table';
import Link from 'next/link';
import {
	Image,
	Row,
	Col,
	Table
} from 'react-bootstrap';

// import widget/custom components
import { GlobalFilter, Pagination } from 'widgets';

// import utility file
import axios from 'axios';
import { useForm } from "react-hook-form";
const StudentsListItems = () => {
	const file = {
		lastModifieds: 1689321287775,
		name: "avatar.jpg",
		size: 1958,
		type: "image/jpeg",
		webkitRelativePath: ""
	}
	const [userdata, setPosts] = useState([])
	const {
		formState: { errors },
	} = useForm();
	const formatDate = (dateString) => {
		const months = [
			'January', 'February', 'March', 'April', 'May', 'June', 'July',
			'August', 'September', 'October', 'November', 'December'
		];

		const date = new Date(dateString);
		const year = date.getFullYear().toString().slice(2, 4);
		const month = months[date.getMonth()];
		const day = String(date.getDate()).padStart(2, '0');
		return `${month} ${day}, ${year}`;
	};
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
			// { accessor: 'email', Header: 'Email' },
			{
				accessor: 'createdAt',
				Header: 'Enrolled',
				Cell: ({ value }) => {
					return formatDate(value);
				}
			},
			{
				accessor: '',
				Header: 'Progress',
				Cell: ({ value }) => {
					// return formatDate(value);
					return("15 %")
				}
			},
			{
				accessor: 'payment',
				Header: 'Q/A',
				Cell: ({ value }) => {
					// return '$' + numberWithCommas(value);
					return("5/3")
				}
			},
			// { accessor: 'dob', Header: 'DOB' },
			{ accessor: 'country', Header: 'Locations' },
			{
				accessor: 'message',
				Header: 'Message',
				Cell: () => {
					return (
						<Link href="#" className="btn btn-outline-secondary btn-sm">
							Message
						</Link>
					);
				}
			}
		],
		[]
	);

	const data = useMemo(
		() =>
			userdata.map((user) => ({
				...user,
				avatar: user && `/api/auth/profileimgadmin/${user._id}`,
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
	const { pageIndex, globalFilter } = state;

	return (
		<Fragment>
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
					{headerGroups.map((headerGroup, index) => (
						<tr key={index} {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column, index) => (
								<th key={index} {...column.getHeaderProps()}>
									{column.render('Header')}
								</th>
							))}
							{/* <th>
								Action
							</th> */}
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
								{/* <td>
									<Dropdown>
										<Dropdown.Toggle as={CustomToggle}>
											<MoreVertical size="15px" className="text-secondary" />
										</Dropdown.Toggle>
										<Dropdown.Menu align="end">
											<Dropdown.Header>SETTINGS</Dropdown.Header>
											<Dropdown.Item eventKey="1" onClick={() => handleEditModalOpen(rowData._id)}>
												<Edit size="15px" className="dropdown-item-icon" /> Edit
											</Dropdown.Item>
											<Dropdown.Item eventKey="2" onClick={() => hadleDelete(rowData._id)}>
												<Trash size="15px" className="dropdown-item-icon" /> Remove
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</td> */}
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
		</Fragment>
	);
};

export default StudentsListItems;
