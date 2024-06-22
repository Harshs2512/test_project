// import node module libraries
import { Fragment, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import { QuizCard } from "widgets";

const QuizGridView = ({ data, filters, sortBy }) => {
  const [filteredData, setFilteredData] = useState(data.data);

  useEffect(() => {
    let newData = data.data;
    if (filters?.QuizCategory?.length > 0) {
      newData = newData.filter((quiz) =>
        filters.QuizCategory.includes(quiz.QuizCategory)
      );
    }
    if (filters?.level?.length > 0) {
      newData = newData.filter((quiz) => filters.level.includes(quiz.level));
    }
    setFilteredData(newData);
  }, [data, filters]);
  //------paging start----------
  const [pageNumber, setPageNumber] = useState(0);
  const RecordsPerPage = 9;
  const pagesVisited = pageNumber * RecordsPerPage;
  const pageCount = Math.ceil(filteredData && filteredData.length / RecordsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const displayRecords = filteredData.slice(
    pagesVisited,
    pagesVisited + RecordsPerPage
  ).map((quiz, index) => {
    return (
      <Col lg={4} md={6} sm={12} key={index}>
        <QuizCard item={quiz} />
      </Col>
    );
  });

  //---end of paging start----------

  return (
    <Fragment>
      <Row>
        {displayRecords.length > 0 ? (
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

export default QuizGridView;
