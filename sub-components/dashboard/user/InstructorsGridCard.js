import React, { Fragment, useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Col, Card, Image, Row, Form } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'react-feather';
import axios from 'axios'
import { MapPin, User } from 'react-feather';

// import MDI icons
import Icon from '@mdi/react';
import { mdiStar } from '@mdi/js';

// import utility file
import { numberWithCommas } from 'helper/utils';
import formatDate from 'helper/formatDate';

function InstructorsGridCard() {
	const [userdata, setPosts] = useState([])
	const [filteredInstructors, setFilteredInstructors] = useState([]);
	const [pageNumber, setPageNumber] = useState(0);
	const InstructorsPerPage = 8;
	const pagesVisited = pageNumber * InstructorsPerPage;
	const pageCount = Math.ceil(userdata.length / InstructorsPerPage);

	const fetchData = async () => {
		try {
			const userRes = await axios.get(`/api/auth/userdata`);
			if (userRes.status == 200) {
				const user = userRes.data.filter((post) => post.role === 'instructor');
				setPosts(user);
			}
		} catch (error) {
			console.log("Error fetching data:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		setFilteredInstructors(userdata);
	}, [userdata]);

	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};

	const displayInstructors = filteredInstructors
		.slice(pagesVisited, pagesVisited + InstructorsPerPage)
		.map((instructors) => {
			return (
				<Col xl={3} lg={6} md={6} sm={12} key={instructors._id}>
					{console.log(instructors)}
					<Card className="mb-5">
						<Card.Body>
							<div className="text-center">
								<div className="position-relative">
									<div className="d-flex align-items-center justify-content-center">
											{instructors?._id ? (
												<Image
													src={`/api/auth/profileimgadmin/${instructors._id}`}
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
								<h4 className="mb-0">{instructors.fname} {instructors.lname}</h4>
								<p className="mb-0">{instructors.topic}</p>
							</div>
							<div className="d-flex justify-content-between border-bottom py-2 mt-4">
								<span>Students</span>
								<span className="text-dark">
									{numberWithCommas(instructors.students)}
								</span>
							</div>
							<div className="d-flex justify-content-between border-bottom py-2">
								<span>Instructor Rating</span>
								<span className="text-warning">
									{instructors.rating}{' '}
									<Icon path={mdiStar} size={0.6} className="mb-1" />{' '}
								</span>
							</div>
							<div className="d-flex justify-content-between pt-2 border-bottom py-2">
								<span>Courses</span>
								<span className="text-dark"> {instructors.courses} </span>
							</div>
							<div className="d-flex justify-content-between pt-2">
								<span>Joined At</span>
								<span className="text-dark"> {formatDate(instructors.createdAt)} </span>
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
			const newInstructorsList = userdata.filter((student) => {
				const searchFields = ['username', 'email', 'address', 'country'];
				return searchFields.some((field) =>
					student[field]?.toLowerCase().includes(searchTerm.toLowerCase())
				);
			});
			setFilteredInstructors(newInstructorsList);
			setPageNumber(0);
		} else {
			setFilteredInstructors(userdata);
		}
	};
	return (
		<Fragment>
			<div className="mb-4">
				<Form.Control
					type="search"
					placeholder="Search Instructors"
					value={searchTerm}
					onChange={getSearchTerm}
				/>
			</div>
			<Row>
				{displayInstructors.length > 0 ? (
					displayInstructors
				) : (
					<Col>No matching instructors found.</Col>
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
	);
}

export default InstructorsGridCard;
