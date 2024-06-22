// import node module libraries
import React, { Fragment, useState, useEffect } from 'react';
import { Col, Card, Image, Row, Form } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { MapPin, User } from 'react-feather';
import ReactPaginate from 'react-paginate';

// import utility file
import { numberWithCommas } from 'helper/utils';
import axios from 'axios'
import formatDate from 'helper/formatDate';


const StudentsGridCard = () => {
	const [userdata, setPosts] = useState([])
	const [filteredStudents, setFilteredStudents] = useState([]);
	const [loadingData, setLoadingData] = useState(true);
	const fetchData = async () => {
		try {
			const userRes = await axios.get(`/api/auth/userdata`);
			const user = userRes.data.filter((post) => post.role === 'user');
			setPosts(user);
			setLoadingData(false);
		} catch (error) {
			console.log("Error fetching data:", error);
			setLoadingData(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		setFilteredStudents(userdata);
	}, [userdata]);

	// paging start
	const [pageNumber, setPageNumber] = useState(0);
	const studentsPerPage = 8;
	const pagesVisited = pageNumber * studentsPerPage;
	const pageCount = Math.ceil(userdata.length / studentsPerPage);
	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};
	const displayStudents = filteredStudents
		.slice(pagesVisited, pagesVisited + studentsPerPage)
		.map((students) => {
			return (
				<Col xl={3} lg={6} md={6} sm={12} key={students._id}>
					<Card className="mb-5">
						<Card.Body>
							<div className="text-center">
								<div className="position-relative">
									<div className="d-flex align-items-center justify-content-center">
										{students?._id ? (
											<Image
												src={`/api/auth/profileimgadmin/${students?._id}`}
												className="rounded-circle avatar-xl mb-3"
												alt=""
											/>
										) : (
											<div className="rounded-circle avatar-xl mb-3">
												<User size="40" color="#555" />
											</div>
										)}
									</div>
								</div>

								<h4 className="mb-0">{students.fname} {students.lname}</h4>
								{students.address ? <p className="mb-0">
									<MapPin size="12" className="me-1 fs-6" />
									{students.country}
								</p> : ''}
							</div>
							<div className="d-flex justify-content-between border-bottom py-2 mt-6">
								<span>Payments</span>
								<span className="text-dark">
									${numberWithCommas(students.payment)}
								</span>
							</div>
							<div className="d-flex justify-content-between border-bottom py-2">
								<span>Joined at</span>
								<span>{formatDate(`${students.createdAt}`)}</span>
							</div>
							<div className="d-flex justify-content-between pt-2">
								<span>Courses</span>
								<span className="text-dark"> {students.email} </span>
							</div>
						</Card.Body>
					</Card>
				</Col>
			);
		});
	// end of paging
	// searching code started
	const [searchTerm, setSearchTerm] = useState('');
	const getSearchTerm = (event) => {
		let searchTerm = event.target.value;
		setSearchTerm(searchTerm);
		if (searchTerm !== '') {
			const newStudentsList = userdata.filter((student) => {
				const searchFields = ['username', 'email', 'address', 'country'];
				return searchFields.some((field) =>
					student[field]?.toLowerCase().includes(searchTerm.toLowerCase())
				);
			});
			setFilteredStudents(newStudentsList);
			setPageNumber(0);
		} else {
			setFilteredStudents(userdata);
		}
	};
	return (
		<Fragment>
			{loadingData ? (
				<div>Loading...</div>
			) : (
				<Fragment>
					<div className="mb-4">
						<Form.Control
							type="search"
							placeholder="Search Students"
							value={searchTerm}
							onChange={getSearchTerm}
						/>
					</div>
					<Row>
						{searchTerm !== '' ? (
							filteredStudents.length > 0 ? (
								displayStudents // Display the filtered results if there are matching students
							) : (
								<Col>No matching students found.</Col> // Display "No matching students found" when there are no matches
							)
						) : (
							displayStudents // Display the original list of students when the search bar is empty
						)}
					</Row>
					<ReactPaginate
						previousLabel={<ChevronLeft size="14px" />}
						nextLabel={<ChevronRight size="14px" />}
						pageCount={pageCount}
						onPageChange={changePage}
						containerClassName={'justify-content-center mb-0 pagination'}
						previousLinkClassName={'page-link mx-1 rounded'}
						nextLinkClassName={'page-link mx-1 rounded'}
						pageClassName={'page-item'}
						pageLinkClassName={'page-link mx-1 rounded'}
						disabledClassName={'paginationDisabled'}
						activeClassName={'active'}
					/>
				</Fragment>
			)}
		</Fragment>
	);
};

export default StudentsGridCard;
