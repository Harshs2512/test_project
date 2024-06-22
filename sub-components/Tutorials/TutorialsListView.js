// import node module libraries
import { Fragment, useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import { TutorialCard } from "widgets";
import axios from "axios";

const TutorialListView = ({ filters, sortBy, datas }) => {
  const [filteredData, setFilteredData] = useState(datas?.datas);
  useEffect(() => {
    let newData = datas.datas;
    if (filters?.category?.length > 0) {
      newData = newData.filter((tutorial) =>
        filters.category.includes(tutorial.category)
      );
    }
    if (filters?.course_level?.length > 0) {
      newData = newData.filter((tutorial) => filters.course_level.includes(tutorial.course_level));
    }
    setFilteredData(newData);
  }, [datas, filters]);

  const [pageNumber, setPageNumber] = useState(0);
  const RecordsPerPage = 6;
  const pagesVisited = pageNumber * RecordsPerPage;
  const pageCount = Math.ceil(filteredData?.length / RecordsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const displayRecords = filteredData?.slice(pagesVisited, pagesVisited + RecordsPerPage)
    .filter((item) => item.is_published === "live")
    .map((data, index) => {
      return (
        <Col sm={12} md={12} lg={12} key={index}>
          <TutorialCard item={data} viewby="list" />
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
export default TutorialListView;
