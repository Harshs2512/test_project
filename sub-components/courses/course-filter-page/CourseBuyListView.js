// import node module libraries
import { Fragment, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import { BuyCourse } from "widgets";

const CourseListView = (data) => {
  const allCourses = data?.data;
	const Records = [].concat(...allCourses.map(order => order));
  const [Reviews, setReviews] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const RecordsPerPage = 6;
  const pagesVisited = pageNumber * RecordsPerPage;
  const pageCount = Math.ceil(Records.length / RecordsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const displayRecords = Records.slice(
    pagesVisited,
    pagesVisited + RecordsPerPage
  )
    .filter((item) => item.is_published === "live")
    .map((Records, index) => {
      const courseReviews = Reviews.filter((review) => {
        return review.courseId._id === Records._id;
      });
      return (
        <Col sm={12} md={12} lg={12} key={index}>
          <BuyCourse item={Records} viewby="list" reviews={courseReviews} />
        </Col>
      );
    });
  // end of paging
  return (
    <Fragment>
      {
        <Row>
          {displayRecords.length > 0 ? (
            displayRecords
          ) : (
            <Col>No matching records found.</Col>
          )}
        </Row>
      }
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
