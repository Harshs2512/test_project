// import node module libraries
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import {
  useTable,
  useFilters,
  useGlobalFilter,
  usePagination
} from 'react-table';
import { Row, Col, Image, Table, Card, Form } from 'react-bootstrap';
import axios from 'axios';
import { useRouter } from "next/router";
// import widget/custom components
import { GlobalFilter, Pagination, FormSelect } from 'widgets';

// import profile layout wrapper
import ProfileLayout from 'layouts/marketing/instructor/ProfileLayout';

const QuizResult = () => {
  const [quizResultData, setQuizResultData] = useState([])
  const router = useRouter();
  const { quizId } = router.query;
  const [quizResult, setQuizResult] = useState();
  const sortOptions = [
    { value: 'Free', label: 'Free' },
    { value: 'Newest', label: 'Newest' },
    { value: 'Oldest', label: 'Oldest' }
  ];
  const fetchQuiz = useCallback(async () => {
    try {
      const response = await axios.get(`/api/quiz/${quizId}`);
      setQuizResult(response.data.quiz);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  }, [quizId]);
  
  const detailResult = useCallback(async () => {
    try {
      const response = await axios.get(`/api/quiz/quizresult/findbyquizid?quizId=${quizId}`);
      setQuizResultData(response.data.quizResult);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  }, [quizId]);
  
  useEffect(() => {
    if (quizId) {
      fetchQuiz();
    }
  }, [quizId, fetchQuiz]);
  
  useEffect(() => {
    detailResult();
  }, [quizId, detailResult]);
  
  

  const formatDate = (dateString) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
  
    const date = new Date(dateString);
    const year = date.getFullYear().toString(); 
    const month = months[date.getMonth()]; 
    const day = String(date.getDate()).padStart(2, '0'); 
    const hours = String(date.getHours()).padStart(2, '0'); 
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0'); 
    const formattedDate = `${month} ${day}, ${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  };
  const columns = useMemo(
    () => [
      { accessor: 'id', Header: 'ID', show: false },
      { accessor: 'image', Header: '', show: false },
      {
        accessor: 'created_by',
        Header: 'Students',
        Cell: ({ value, row }) => {
          const [userData, setUserData] = React.useState(null);
          const [error, setError] = React.useState(null);
          React.useEffect(() => {
            async function fetchUserData() {
              try {
                const response = await axios.get(`/api/auth/usersingle/${value}`);
                const user = response.data;
                setUserData(user);
              } catch (error) {
                console.error("Error fetching user data: quiz Result", error);
                setError(error);
              }
            }

            fetchUserData();
          }, [value]);

          if (error) {
            return <div>Error loading user data</div>;
          }
          if (!userData) {
            return <div>Loading...</div>;
          }
          return (
            <div className="d-flex align-items-center">
              <Image
                src={`/api/auth/profileimgadmin/${userData._id}`}
                alt=""
                className="rounded-circle avatar-xs me-2"
              />
              <h5 className="mb-0">{userData.fname} {userData.lname}</h5>
            </div>
          );
        }
      },
      {
        accessor: (row) => Math.round(row.score),
        Header: 'Score'
      }
      ,
      {
        accessor: 'quizId', Header: 'Attempts',
        Cell: ({ value }) => {
          return 1 + ' attempts';
        }
      },
      {
        accessor: 'createdAt',
        Header: 'Finishing Time',
        Cell: ({ value }) => {
          const formattedDate = formatDate(value);
          return <span>{formattedDate}</span>;
        }
      }
    ],
    []
  );

  const data = useMemo(() => quizResultData, [quizResultData]);

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

  const setFromPage = (recordsPerPage, pageNo) => recordsPerPage * pageNo + 1;
  const setToPage = (recordsPerPage, pageNo, recordsOnCurrentPage) => {
    return recordsOnCurrentPage < recordsPerPage
      ? recordsPerPage * (pageNo + 1) - (recordsPerPage - recordsOnCurrentPage)
      : recordsPerPage * (pageNo + 1);
  };
  return (
    <ProfileLayout>
      <Card className="mb-4">
        <Card.Header>
          <h3 className="mb-0">Result - {quizResult && quizResult.title} </h3>
        </Card.Header>
        <Card.Body className="border-bottom">
          <Row className="row-cols-lg-2 row-cols-1">
            <Col>
              <Card className="bg-gray-100 shadow-none mb-3 mb-lg-0">
                <Card.Body>
                  <h4 className="mb-0">Participate</h4>
                  <div className="mt-5 d-flex justify-content-between align-items-center lh-1">
                    <div>
                      <span className="fs-3 text-dark fw-semi-bold">{quizResultData.length}</span>
                    </div>
                    <div className="align-middle">
                      <i className="fe fe-users h2 text-danger"></i>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            {/* <Col>
              <Card className="bg-gray-100 shadow-none mb-3 mb-lg-0">
                <Card.Body>
                  <h4 className="mb-0">Scores</h4>
                  <div className="mt-5 d-flex justify-content-between align-items-center lh-1">
                    <div>
                      <span className="fs-3 text-dark fw-semi-bold">82</span>
                    </div>
                    <div className="align-middle">
                      <i className="fe fe-clipboard h2 text-primary"></i>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col> */}
            <Col>
              <Card className="bg-gray-100 shadow-none mb-3 mb-lg-0">
                <Card.Body>
                  <h4 className="mb-0">Total Time</h4>
                  <div className="mt-5 d-flex justify-content-between align-items-center lh-1">
                    <div>
                      <span className="fs-3 text-dark fw-semi-bold">0{quizResult && quizResult.hours} : {quizResult && quizResult.minutes} : 0{quizResult && quizResult.seconds}</span>
                    </div>
                    <div className="align-middle">
                      <i className="fe fe-clock h2 text-success"></i>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
        <Card.Body className="card-body border-bottom">
          <Form className="row">
            <Col lg={9} md={7} xs={12} className="mb-lg-0 mb-2">
              <GlobalFilter
                filter={globalFilter}
                setFilter={setGlobalFilter}
                placeholder="Search"
              />
            </Col>
            <Col lg={3} md={5} xs={12}>
              <Form.Control
                as={FormSelect}
                placeholder="Sort by"
                options={sortOptions}
              />
            </Col>
          </Form>
        </Card.Body>
        {/* table */}
        <Table responsive hover {...getTableProps()} className="text-nowrap table-centered">
          <thead className="table-light">
            {headerGroups.map((headerGroup, index) => (
              <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <th key={index} {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr key={index} {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    return (
                      <td key={index} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Card.Footer className="card-footer">
          {/* Pagination */}
          <div className="d-flex align-items-center w-100 justify-content-between">
            <span>
              Showing {setFromPage(page.length, pageIndex)} -
              {setToPage(
                page.length,
                pageIndex,
                page.length
              )}{' '}
              of {quizResultData.length}{' '} entries
            </span>
            <Pagination
              previousPage={previousPage}
              pageCount={pageCount}
              pageIndex={pageIndex}
              gotoPage={gotoPage}
              nextPage={nextPage}
            />
          </div>
        </Card.Footer>
      </Card>
    </ProfileLayout>
  )
}

export default QuizResult;
