// import node module libraries
import React, { Fragment, useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { Col, Row, Table, Card, Form } from "react-bootstrap";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  usePagination,
} from "react-table";

// import widget/custom components
import { GlobalFilter, Pagination, FormSelect } from "widgets";

// import custom components
import { AvatarGroup, Avatar } from "components/bootstrap/Avatar";
// import utility file
import { numberWithCommas, getStatusColor } from "helper/utils";
import axios from "axios";
import { useRouter } from "next/router";
const ProjectListTable = (props) => {
  const router = useRouter();
  const [problem, setProblem] = useState([]);
  const fetchProblem = async () => {
    try {
      const res = await axios.get(`/api/problemDay/crudProblem`);
      const problemData = res?.data?.problems;
      setProblem(problemData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProblem();
  }, []);
  const filterOptions = [
    { value: "In Progress", label: "In Progress" },
    { value: "Pending", label: "Pending" },
    { value: "Modified", label: "Modified" },
    { value: "Finished", label: "Finished" },
    { value: "Cancel", label: "Cancel" },
  ];
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="btn-icon btn btn-ghost btn-sm rounded-circle"
    >
      {children}
    </Link>
  ));
  CustomToggle.displayName = "CustomToggle";
  const columns = useMemo(
    () => [
      { accessor: "id", Header: "ID", show: false },
      {
        accessor: "contest_title",
        Header: "Problem Title",
        Cell: ({ value, row }) => {
          return (
            <div className="d-flex align-items-center">
              <div className="ms-3">
                <h4
                  className="mb-0 cursor-pointer"
                  onClick={() => handleShow(row.original._id)}
                >
                  {value}
                </h4>
              </div>
            </div>
          );
        },
      },
      {
        accessor: "companyImages",
        Header: "Companies",
        Cell: ({ value, row }) => {
          return (
            <AvatarGroup>
              {row?.original?.companyImages.slice(0, 3).map((image, index) => (
                <Avatar
                  key={index}
                  size="md"
                  src={`data:${image.contentType};base64,${Buffer.from(
                    image.data
                  ).toString("base64")}`}
                  type="image"
                  name={image._id}
                  className="rounded-square rounded"
                  imgtooltip
                />
              ))}
              {row?.original?.companyImages.length > 3 && (
                <Avatar
                  size="md"
                  type="initial"
                  name={row?.original?.companyImages.length - 3 + "+"}
                  variant="light"
                  className="rounded text-dark"
                  showExact
                />
              )}
            </AvatarGroup>
          );
        },
      },
      {
        accessor: "contest_level",
        Header: "Level",
        Cell: ({ value }) => {
          return (
            <span
              className={`badge bg-light-${getStatusColor(
                value
              )} text-dark-${getStatusColor(value)}`}
            >
              {value}
            </span>
          );
        },
      },
      // { accessor: 'duedate', Header: 'Avg. time' },
    ],
    []
  );

  const data = useMemo(() => problem, [problem]);
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
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 10,
        hiddenColumns: columns.map((column) => {
          if (column.show === false) return column.accessor || column.id;
          else return false;
        }),
      },
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  const { pageIndex, globalFilter } = state;
  const handleShow = async (id) => {
    try {
      const problemData = await axios.get(`/api/problemDay/${id}`);
      const SingleData = problemData?.data?.problem;
      const serializedProblem = JSON.stringify(SingleData);
      const encodedProblem = encodeURIComponent(serializedProblem);
      const url = `/studio/code/Code-single/codedesign?problem=${encodedProblem}`;
      router.push(url);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };
  return (
    <Fragment>
      <Row className="justify-content-md-between mb-4 mb-xl-0">
        <Col xl={4} lg={4} md={6} xs={12}>
          {/* search records */}
          <div className="mb-2 mb-lg-4">
            <GlobalFilter
              filter={globalFilter}
              setFilter={setGlobalFilter}
              placeholder="Search by problem title"
            />
          </div>
        </Col>
        <Col xxl={2} lg={2} md={6} xs={12}>
          {/* records filtering options */}
          <Form.Control
            as={FormSelect}
            placeholder="Filter"
            options={filterOptions}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <Card>
            <Card.Body className="p-0">
              <div className="border-0 overflow-y-hidden">
                <Table
                  responsive
                  {...getTableProps()}
                  className="text-nowrap"
                  hover
                >
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th {...column.getHeaderProps()}>
                            {column.render("Header")}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()} className="p-0">
                          {row.cells.map((cell) => {
                            return (
                              <td
                                {...cell.getCellProps()}
                                className="align-middle bg-white p-1"
                              >
                                {cell.render("Cell")}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ProjectListTable;
