// import node module libraries
import React, { Fragment, useMemo } from 'react';
import {
	useTable,
	useFilters,
	useGlobalFilter,
	usePagination
} from 'react-table';
import Link from 'next/link';
import { Col, Row, Button, Image, Dropdown, Table } from 'react-bootstrap';
import { XCircle, MoreVertical, Send, Inbox } from 'react-feather';
import axios from 'axios'
// import widget/custom components
import { GlobalFilter, Pagination } from 'widgets';

// import custom components
import DotBadge from 'components/bootstrap/DotBadge';

const CoursesTable = ({ courses_data }) => {
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
		const year = date.getFullYear().toString(); // Get the last two digits of the year
		const month = months[date.getMonth()]; // Get the month name from the array
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
										src={`/api/courses/getthumbnail/${row.original._id}`}
										alt=""
										className="img-4by3-lg rounded"
									/>
								</div>
								<div className="ms-lg-3 mt-2 mt-lg-0">
									<h4 className="mb-1 text-primary-hover">{value}...</h4>
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
				accessor: 'created_by',
				Header: 'Instructor',
				Cell: ({ value, row }) => {
					return (
						<div className="d-flex align-items-center">
							<Image
								src={`/api/auth/profileimgadmin/${value._id}`}
								alt=""
								className="rounded-circle avatar-xs me-2"
							/>
							<h5 className="mb-0">{value.fname} {value.lname}</h5>
						</div>
					);
				}
			},
			{
				accessor: 'is_published',
				Header: 'Status',
				Cell: ({ value }) => {
					return (
						<DotBadge
							bg={
								value === 'pending'
									? 'warning'
									: value === 'live'
										? 'success'
										: value === 'reject'
											? 'danger' : ''
							}
						>{value === 'pending'
							? 'Pending'
							: value === 'live'
								? 'Live'
								: value === 'reject'
									? 'Rejected' : ''}</DotBadge>

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

	const handleUpdate = async (id, status) => {
		try {
			const res = await axios.put(`/api/courses/updatestatus`, { id: id, is_published: status })
			if (res) {
				// toast.success(`Category Updated successfully`);
			}
			else {
				// toast.error("something went wrong")
			}
		} catch (error) {
			// toast.error("Somtihing went wrong");
			console.log(error)
		}
	}
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
			<div className="border-0 overflow-y-hidden">
				<Table hover responsive {...getTableProps()} className="text-nowrap table-centered">
					<thead className="table-light">
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th {...column.getHeaderProps()}>
										{column.render('Header')}
									</th>
								))}
								<th>Action</th>
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
												<Dropdown.Item eventKey="1">
													<XCircle size="15px" className="me-1" />Reject with Feedback
												</Dropdown.Item>
												{rowData.is_published === 'pending' ? (
													<Dropdown.Item eventKey="1" onClick={() => handleUpdate(rowData._id, 'live')}>
														<Send size="15px" className="me-1" /> Approved
													</Dropdown.Item>
												) : (
													<Dropdown.Item eventKey="2" onClick={() => handleUpdate(rowData._id, 'pending')}>
														<Inbox size="15px" className="me-1" />  Pending
													</Dropdown.Item>
												)}
											</Dropdown.Menu>
										</Dropdown>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>

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

export default CoursesTable;
