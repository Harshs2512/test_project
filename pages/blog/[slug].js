// import node module libraries
import React, { Fragment, useEffect, useState } from "react";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { BlogCard } from "sub-components";
// import widget/custom components
import { GeeksSEO } from "widgets";

const BlogArticleSingle = (props) => {
  const router = useRouter();
  const { slug } = router.query;
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollDistance = window.scrollY;
      const pageHeight = document.body.scrollHeight;
      const scrollThreshold = pageHeight * 0.3; // 30% of page height
      setIsSticky(scrollDistance > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const formatDate = (dateString) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date(dateString);
    const year = date.getFullYear().toString();
    const month = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, "0");
    return `${month} ${day}, ${year}`;
  };
  const posts = props.blogData;
  return (
    <Fragment>
      <section className="py-4 py-lg-8 pb-14 bg-white ">

        <Container>
          {posts
            ?.filter(function (dataSource) {
              return dataSource.slug === slug;
            })?.map((item, index) => (
              <Fragment key={index}>
                <GeeksSEO title={item.title} description={item.title} tags={item.title} />
                <Row className="justify-content-center">
                  <Col xl={8} lg={8} md={12} sm={12} className="mb-2">
                    <div className="text-center mb-4">
                      <Link
                        href="#"
                        className="fs-5 fw-semi-bold d-block mb-4 text-primary"
                      >
                        {item.postcategory && item.postcategory.title}
                      </Link>
                      <h1 className="display-3 fw-bold mb-4">{item.title}</h1>
                      <span className="mb-3 d-inline-block">
                        Published on {formatDate(item.createdAt)}
                      </span>
                    </div>
                  </Col>
                </Row>
                <Row className="justify-content-between">
                  <Col xl={9} lg={8} md={12} sm={12} className="mb-2">
                    {/* Blog Content */}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.content,
                      }}
                    ></div>
                  </Col>
                  <Col xl={3} lg={4} md={12} sm={12} className="mb-2">
                    {/* form section */}
                    <div id="form" className="rounded p-3 bg-gray-100" style={{ position: 'sticky', top: '8rem', marginTop: '90vh' }}>
                      <Form>
                        <Form.Group className="mb-3 text-dark" controlId="formFirstName">
                          <Form.Label className="text-dark">
                            Name:<span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control type="text" placeholder="First Name" required />
                        </Form.Group>
                        {/* Email */}
                        <Form.Group className="mb-3" controlId="formEmail">
                          <Form.Label className="text-dark">
                            Email:<span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control type="email" placeholder="Email" required />
                        </Form.Group>
                        {/* Phone Number */}
                        <Form.Group className="mb-3" controlId="formFirstName">
                          <Form.Label className="text-dark">
                            Phone Number:<span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control type="number" placeholder="Phone" required />
                        </Form.Group>
                        {/* Messages */}
                        <Form.Group className="mb-3" controlId="formMessages">
                          <Form.Label className="text-dark">Message:</Form.Label>
                          <Form.Control as="textarea" placeholder="Messages" rows={3} />
                        </Form.Group>
                        {/* button */}
                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      </Form>
                    </div>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col lg={8} sm={12}>
                    <hr className="mt-8 mb-5" />
                    {/* Subscribe to Newsletter */}
                    <div className="py-12">
                      <div className="text-center mb-6">
                        <h2 className="display-4 fw-bold">
                          Sign up for our Newsletter
                        </h2>
                        <p className="mb-0 lead">
                          Join our newsletter and get resources, curated
                          content, and design inspiration delivered straight to
                          your inbox.
                        </p>
                      </div>
                      {/* Form */}
                      <Form className="row px-md-20">
                        <Form.Group
                          className="mb-3 col ps-0 ms-2 ms-md-0"
                          controlId="formBasicEmail"
                        >
                          <Form.Control
                            type="email"
                            placeholder="Email Address"
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3 col-auto ps-0"
                          controlId="formSubmitButton"
                        >
                          <Button variant="primary" type="submit">
                            {" "}
                            Submit
                          </Button>
                        </Form.Group>
                      </Form>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xl={12} lg={12} md={12} sm={12}>
                    <div className="my-5">
                      <h2>Related Post</h2>
                    </div>
                  </Col>
                  {posts?.slice(0, 3).map((item, index) => (
                    <Col
                      xl={4}
                      lg={4}
                      md={6}
                      sm={12}
                      key={index}
                      className="d-flex"
                    >
                      <BlogCard item={item} />
                    </Col>
                  ))}
                </Row>
              </Fragment>
            ))}
        </Container>
      </section>
    </Fragment >
  );
};
// a
export const getServerSideProps = async () => {
	try {
		const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/blogs/getposts`);
		const blogData = res?.data || [];
		return {
			props: {
				data: blogData,
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

export default BlogArticleSingle;
