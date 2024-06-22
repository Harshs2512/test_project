// import node module libraries
import { Fragment, useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import { CourseCard } from "widgets";
import axios from "axios";

const CourseListView = ({ filters, sortBy, data }) => {
  const [Reviews, setReviews] = useState([]);
  const [filteredData, setFilteredData] = useState(data?.data);
  useEffect(() => {
    let newData = data?.data;
    if (filters?.category?.length > 0) {
      newData = newData.filter((course) =>
        filters.category.includes(course.course_category)
      );
    }
    if (filters?.skillLevel?.length > 0) {
      newData = newData.filter((course) =>
        filters.skillLevel.includes(course.level)
      );
    }
    if (filters?.rating?.length > 0) {
      newData = newData.filter((course) =>
        Reviews.some(
          (review) =>
            review.courseId === course._id &&
            filters.rating.includes(review.rating)
        )
      );
    }
    setFilteredData(newData);
  }, [data, filters]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`/api/reviewandrating/allreviewandrating`);
        const allReview = res?.data || [];
        setReviews(allReview);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  const [pageNumber, setPageNumber] = useState(0);
  const RecordsPerPage = 6;
  const pagesVisited = pageNumber * RecordsPerPage;
  const pageCount = Math.ceil(filteredData?.length / RecordsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const displayRecords = filteredData?.slice(
	pagesVisited, pagesVisited + RecordsPerPage)
    .map((courses, index) => {
      return (
        <Col sm={12} md={12} lg={12} key={index}>
          <CourseCard item={courses} viewby="list" />
        </Col>
      );
    });
  // end of paging
  return (
    <Fragment>
      <Row>
        {displayRecords?.length > 0 ? (
          displayRecords
        ) : (
          <Col>No matching records found.</Col>
        )}
      </Row>
      <ReactPaginate
        previousLabel={<ChevronLeft size="14px" />}
        nextLabel={<ChevronRight size="14px" />}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"justify-content-center mb-0 pagination"}
        previousLinkClassName={"page-link mx-1 rounded"}
        nextLinkClassName={"page-link mx-1 rounded"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link mx-1 rounded"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"active"}
      />
    </Fragment>
  );
};
export default CourseListView;
