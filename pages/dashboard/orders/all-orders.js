// import node module libraries
import React, {
  Fragment,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import Link from "next/link";
import {
  Col,
  Row,
  Tab,
  Card,
  Nav,
  Breadcrumb,
  Table,
  Badge,
} from "react-bootstrap";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { GlobalFilter, Pagination } from "widgets";
import axios from "axios";
import Loading from "../../loading";
const AllOrders = () => {
  const [orderData, setOrderData] = useState([]);
  const [allPaidOrders, setAllPaidOrders] = useState([]);
  const [allCraetedOrders, setAllCreatedOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getAllOrders = async () => {
    try {
      const orders = await axios.get("/api/orders/createOrder");
      const data = orders.data;
      setOrderData(data);
      const categorizedOrders = data.map((order) => {
        const status = order.status;
        return {
          ...order,
          status: status,
        };
      });
      const paidOrders = categorizedOrders.filter(
        (order) => order.order_status === "paid"
      );
      const createdOrders = categorizedOrders.filter(
        (order) => order.order_status === "pending"
      );

      setAllPaidOrders(paidOrders);
      setAllCreatedOrders(createdOrders);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllOrders();
  }, []);
  const CoursesTable = ({ orders_data }) => {
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <Link
        href="#"
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
        {
          accessor: "order_id",
          Header: "Order Id",
          Cell: ({ value }) => {
            return (
              <Fragment>
                <Link href={`order-detail?orderId=${value}`}>#{value}</Link>
              </Fragment>
            );
          },
        },
        {
          accessor: "user_detail",
          Header: "Customer",
          Cell: ({ value, row }) => {
            const [userData, setUserData] = React.useState(null);
            const [error, setError] = React.useState(null);

            React.useEffect(() => {
              async function fetchUserData() {
                try {
                  const response = await axios.get(
                    `/api/auth/usersingle/${value}`
                  );
                  const user = response?.data;
                  setUserData(user);
                } catch (error) {
                  console.error("Error fetching user data:", error);
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
                <h5 className="mb-0">
                  {userData.fname} {userData.lname}
                </h5>
              </div>
            );
          },
        },
        {
          accessor: "createdAt",
          Header: "Created At",
          Cell: ({ value, row }) => {
            const date = new Date(value);
            const options = {
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            };
            const formattedDateTime = new Intl.DateTimeFormat(
              "en-US",
              options
            ).format(date);
            return <span>{formattedDateTime}</span>;
          },
        },
        {
          accessor: "purchase_item",
          Header: "Items",
          Cell: ({ value }) => {
            return <Fragment>{value.length}</Fragment>;
          },
        },
        {
          accessor: "order_status",
          Header: "Order status",
          Cell: ({ value }) => {
            return (
              <Badge
                bg={
                  value === "pending"
                    ? "warning"
                    : value === "paid"
                    ? "success"
                    : value === "failed"
                    ? "primary"
                    : ""
                }
              >
                {value === "pending"
                  ? "Created"
                  : value === "paid"
                  ? "Paid"
                  : value === "failed"
                  ? "failed"
                  : ""}
              </Badge>
            );
          },
        },
        {
          accessor: "total_price",
          Header: "Amount",
          Cell: ({ value }) => {
            return <Fragment>₹{Number(value).toFixed(2)}</Fragment>;
          },
        },
        {
          accessor: "payment_details",
          Header: "payment status",
          Cell: ({ value }) => {
            return (
              (<Badge bg="success">{value.payment_status}</Badge>),
              (
                <Badge
                  bg={
                    value.payment_status === "pending"
                      ? "danger"
                      : value.payment_status === "captured"
                      ? "success"
                      : value.payment_status === "failed"
                      ? "Failed"
                      : ""
                  }
                >
                  {value.payment_status === "pending"
                    ? "Failed"
                    : value.payment_status === "captured"
                    ? "Captured"
                    : value.payment_status === "failed"
                    ? "Failed"
                    : ""}
                </Badge>
              )
            );
          },
        },
      ],
      []
    );

    const data = useMemo(() => orders_data, [orders_data]);

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
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="border-0 overflow-y-hidden">
              <Table
                hover
                responsive
                {...getTableProps()}
                className="text-nowrap table-centered"
              >
                <thead className="table-light">
                  {headerGroups.map((headerGroup, index) => (
                    <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column, index) => (
                        <th key={index} {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      ))}
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
                            <td key={index} {...cell.getCellProps()}>
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

            {/* Pagination @ Footer */}
            <Pagination
              previousPage={previousPage}
              pageCount={pageCount}
              pageIndex={pageIndex}
              gotoPage={gotoPage}
              nextPage={nextPage}
            />
          </>
        )}
      </Fragment>
    );
  };
  return (
    <Fragment>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">All Orders</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#">Orders</Breadcrumb.Item>
                <Breadcrumb.Item active>All</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <Link
                href="/marketing/instructor/add-new-course"
                className="btn btn-primary"
              >
                Add New Courses
              </Link>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <Tab.Container defaultActiveKey="all">
            <Card>
              <Card.Header className="border-bottom-0 p-0 bg-white">
                <Nav className="nav-lb-tab">
                  <Nav.Item>
                    <Nav.Link eventKey="all" className="mb-sm-3 mb-md-0">
                      All
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="paid" className="mb-sm-3 mb-md-0">
                      Paid
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="created" className="mb-sm-3 mb-md-0">
                      Created
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body className="p-0">
                <Tab.Content>
                  <Tab.Pane eventKey="all" className="pb-4">
                    <CoursesTable orders_data={orderData} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="paid" className="pb-4">
                    <CoursesTable orders_data={allPaidOrders} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="created" className="pb-4">
                    <CoursesTable orders_data={allCraetedOrders} />
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AllOrders;
