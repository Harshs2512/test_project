import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  Table,
  Badge,
  Button,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import Link from "next/link";
import axios from "axios";
import { GeeksSEO } from "widgets";
import Loading from "./../../loading";
import ProfileLayout from "layouts/marketing/student/ProfileLayout";
import jsPDF from "jspdf";
import { useSession ,getSession} from 'next-auth/react';
const Invoice = (props) => {
  const { data: session } = useSession();
	const userId = session?.user?._id
  const orderData= props?.data;
  const [loading, setLoading] = useState(false);
  const [singleOrder, setSingleOrder] = useState();
  const [userData, setUserData] = useState();
  const [userDetails, setUserDetails] = useState({});
  const item = singleOrder?.purchase_item;
  const [isDataReady, setIsDataReady] = useState(false);
  useEffect(() => {
    setIsDataReady(true);
    if (isDataReady) {
      generatePDF();
    }
  }, [singleOrder, userData]);
  const formatCreatedAt = (isoDate) => {
    const date = new Date(isoDate);
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  useEffect(() => {
    const fetchUserDetails = async (instructorId) => {
      try {
        const response = await axios.get(
          `/api/auth/usersingle/${instructorId && instructorId}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching user details", error);
        return null;
      }
    };
    if (item && Array.isArray(item)) {
      Promise.all(item.map((data) => fetchUserDetails(data && data.created_by)))
        .then((userDetailsArray) => {
          const userDetailsMap = userDetailsArray.reduce(
            (map, userDetail, index) => {
              if (userDetail) {
                map[item[index].created_by] = userDetail;
              }
              return map;
            },
            {}
          );
          setUserDetails(userDetailsMap);
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }
  }, [item]);
  let price = 0;
  let discount = 0;
  let paidAmount = 0;
  let actualPrice = 0;
  item &&
    item.forEach((element) => {
      const currentprice = Number(element.currentprice);
      const actualprice = Number(element.actualprice);
      actualPrice += actualprice;
      price += currentprice;
      discount += actualprice;
      discount = discount - price;
      discount = discount < 0 ? -discount : discount;
      paidAmount = (price / 100) * 18;
      paidAmount = price + paidAmount;
    });
  let Tax = paidAmount - price;
  const formattedTax = Tax.toFixed(2);
  const userDetail = async () => {
    try {
      const response = await axios.get(`/api/auth/usersingle/${userId}`);
      const user = response.data;
      setUserData(user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  useEffect(() => {
    userDetail();
  }, []);
  const handleDownload = async (orderId) => {
    try {
      const response = await axios.get(`/api/orders/findorder?orderId=${orderId}`);
      const data = response?.data;
      setSingleOrder(data);
    } catch (error) {
      console.error("API running error", error);
    }
  };
  const generatePDF = async () => {
    try {
      if (isDataReady) {
        const pdf = new jsPDF();
        pdf.rect(
          10,
          10,
          pdf.internal.pageSize.width - 20,
          pdf.internal.pageSize.height - 20
        );
        pdf.addImage(
          "/images/brand/logo/cybrom_long.png",
          "PNG",
          25,
          20,
          30,
          10
        );

        pdf.setFontSize(10);

        pdf.text("Cybrom Courses", 25, 40);
        pdf.text(`INVOICE ID: #${singleOrder?.order_id}`, 25, 50);

        pdf.text("Invoice From", 25, 70);
        pdf.text("Cybrom Technology Pvt.Ltd.", 25, 75);
        pdf.text(
          "185, 3rd Floor, Zone-I,\nMaharana Pratap Nagar,\nBhopal, Madhya Pradesh\n462011",
          25,
          80
        );

        pdf.text("Invoice To", pdf.internal.pageSize.width / 2 + 20, 70);
        pdf.text(
          `${userData && userData.fname} ${userData && userData.lname}`,
          pdf.internal.pageSize.width / 2 + 20,
          75
        );
        pdf.text(
          `${userData && userData.email}`,
          pdf.internal.pageSize.width / 2 + 20,
          80
        );
        pdf.text(
          "775 Rolling Green Rd\nundefined Orange, Oklahoma\n45785 United States",
          pdf.internal.pageSize.width / 2 + 20,
          85
        );
        pdf.text("INVOICED ID", 25, 105);
        pdf.text(`#${singleOrder.order_id}`, 25, 110);

        pdf.text("Date", pdf.internal.pageSize.width / 2 + 20, 105);
        pdf.text(
          formatCreatedAt(singleOrder && singleOrder.createdAt),
          pdf.internal.pageSize.width / 2 + 20,
          110
        );
        pdf.line(25, 126, pdf.internal.pageSize.width - 30, 126);
        pdf.text("Purchase Item", 25, 130);
        pdf.text("Type", 100, 130);
        pdf.text("Amounts", pdf.internal.pageSize.width - 30, 130, {
          align: "right",
        });
        pdf.line(25, 126 + 6, pdf.internal.pageSize.width - 30, 126 + 6);

        let yOffset = 135;
        singleOrder.purchase_item.forEach((data, index) => {
          let itemType;

          if (data.title) {
            itemType = "Mock";
          } else if (data.contest_title) {
            itemType = "Contest";
          } else {
            itemType = "Course";
          }

          pdf.text(
            `${data.course_title || data.assignmentName || data.title || data.contest_title}`,
            25,
            yOffset + 3
          );
          pdf.text(
            `${
              userDetails[data && data.created_by]
                ? userDetails[data && data.created_by].fname +
                  " " +
                  userDetails[data && data.created_by].lname
                : " "
            }`,
            25,
            yOffset + 8
          );
          pdf.text(itemType, 100, yOffset + 5);
          pdf.text(
            `INR ${data.currentprice}`,
            pdf.internal.pageSize.width - 30,
            yOffset + 5,
            { align: "right" }
          );
          yOffset += 15;
        });

        const lineY = yOffset;
        pdf.line(25, lineY - 2, pdf.internal.pageSize.width - 30, lineY - 2);
        pdf.text("Payment Details", 25, yOffset + 3);
        pdf.line(25, lineY + 5, pdf.internal.pageSize.width - 30, lineY + 5);

        pdf.setFont("bold");
        pdf.text("Sub Total:", 25, yOffset + 12);
        pdf.text(
          `INR ${actualPrice}`,
          pdf.internal.pageSize.width - 30,
          yOffset + 12,
          { align: "right" }
        );
        pdf.text("Discount (GKDIS15%):", 25, yOffset + 20);
        pdf.text(
          `INR ${discount}`,
          pdf.internal.pageSize.width - 30,
          yOffset + 20,
          { align: "right", decoration: "overline" }
        );
        pdf.text("Shipping Charge:", 25, yOffset + 25);
        pdf.text("free INR 0", pdf.internal.pageSize.width - 30, yOffset + 25, {
          align: "right",
        });

        pdf.text("Tax Vat 18% (included):", 25, yOffset + 35);
        pdf.text(
          `INR ${formattedTax}`,
          pdf.internal.pageSize.width - 30,
          yOffset + 35,
          { align: "right" }
        );
        pdf.line(25, lineY + 40, pdf.internal.pageSize.width - 30, lineY + 40);
        pdf.text("Paid by Customer:", 25, yOffset + 45);
        pdf.text(
          `INR ${Number(singleOrder?.total_price).toFixed(2)}`,
          pdf.internal.pageSize.width - 30,
          yOffset + 45,
          { align: "right" }
        );

        pdf.text(
          "Notes: Invoice was created on a computer and is valid without the signature and seal.",
          15,
          yOffset + 60
        );
        pdf.save(`invoice_${singleOrder.order_id}.pdf`);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  if (loading) {
    return (
      <ProfileLayout>
        <Loading />
      </ProfileLayout>
    );
  }
  return (
    <ProfileLayout>
      <GeeksSEO title="Invoice | Cybrom Technology Pvt. Ltd." />
      <Card className="border-0">
        <Card.Header>
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">Invoices</h3>
            <p className="mb-0">You can find all of your order Invoices.</p>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-invoice border-0">
            <Table hover responsive className="table mb-0 text-nowrap">
              <thead className="table-light">
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col">Date</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Item</th>
                  <th scope="col">Order Status</th>
                  <th scope="col">Download</th>
                </tr>
              </thead>
              <tbody>
                {orderData?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Link
                        href={`/marketing/student/invoice-details?orderId=${item.order_id}`}
                      >
                        #{item.order_id}
                      </Link>
                    </td>
                    <td>{formatDate(item.createdAt)}</td>
                    <td>{Number(item.total_price).toFixed(2)}</td>
                    <td className="cursor-pointer">
                      <OverlayTrigger
                        trigger="hover"
                        key="popover"
                        placement="top"
                        overlay={
                          <Popover
                            id={`popover-positioned-${index}`}
                            className="bg-black text-white"
                          >
                            <Popover.Body>{`Items: ${item.purchase_item
                              .map(
                                (item) =>
                                  item.title ||
                                  item.course_title ||
                                  item.assignmentName
                              )
                              .join(", ")}`}</Popover.Body>
                          </Popover>
                        }
                      >
                        <span className="popover-trigger">
                          {item.purchase_item.length}
                        </span>
                      </OverlayTrigger>
                    </td>
                    <td>
                      <Badge
                        bg={item.order_status === "paid" ? "success" : "danger"}
                      >
                        {item.order_status}
                      </Badge>
                    </td>
                    <td>
                      <Button
                        className="fe fe-download p-0"
                        onClick={() => handleDownload(item?.order_id)}
                      >
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </ProfileLayout>
  );
};
export const getServerSideProps = async ({ req }) => {
  try {
    const session = await getSession({ req });
    const userId = session?.user?._id;
    const orders = await axios.get(`${process.env.NEXTAUTH_URL}/api/courses/buy-course/buy-detail?userId=${userId}`);
    const data = orders?.data?.Orders;
    return {
      props: {
        data: data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        data: [],
      },
    };
  }
};

export default Invoice;
