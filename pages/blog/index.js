// import node module librariesNav
import React, { Fragment, useState } from 'react';
import { Col, Row, Container, Form, Button, Nav } from 'react-bootstrap';
import Link from 'next/link';
import { BlogCard } from 'sub-components';
import { GeeksSEO } from 'widgets';
import BlankLayout from 'layouts/marketing/BlankLayout';
import NavbarDefault from 'layouts/marketing/DefaultLayout';
import axios from 'axios';

const BlogListing = (props) => {
	const liveCategory = props.category?.categories?.filter((item) => item.status === "live")
	const posts = props?.data;
	return (
		<Fragment>
			<div className="optinly-embed-popup-7626aa0d-1795-446d-b98c-f318b77959d3" />
			<NavbarDefault>
				{/* Geeks SEO settings  */}
				<GeeksSEO title="Blog | Cybrom Technology Pvt.Ltd." />
				{/* Default Navbar */}
				<main>
					{/* Page header */}
					<section className="pt-9 pb-9 bg-white ">
						<Container>
							<Row>
								<Col
									lg={{ span: 10, offset: 1 }}
									xl={{ span: 8, offset: 2 }}
									md={12}
									sm={12}
								>
									<div className="text-center mb-5">
										<h1 className=" display-2 fw-bold">Cybrom Newsroom</h1>
										<p className="lead">
											Our features, journey, tips and us being us. Lorem ipsum dolor
											sit amet, accumsan in, tempor dictum neque.
										</p>
									</div>
									{/* Form */}
									<Form className="row px-md-20">
										<Form.Group
											className="mb-3 col ps-0 ms-2 ms-md-0"
											controlId="formBasicEmail"
										>
											<Form.Control type="email" placeholder="Email Address" />
										</Form.Group>
										<Form.Group
											className="mb-3 col-auto ps-0"
											controlId="formSubmitButton"
										>
											<Button variant="primary" type="submit">
												Submit
											</Button>
										</Form.Group>
									</Form>
								</Col>
							</Row>
						</Container>
					</section>

					{/* Content */}
					<section className="pb-8 bg-white">
						<Container>
							<Row>
								<Col xl={12} lg={12} md={12} sm={12}>
									{/* Flush Nav */}
									<div className="flush-nav">
										<Nav>
											<Link href="/blog/listing/" className="ps-0 nav-link active">
												All
											</Link>
											{liveCategory && liveCategory.map((item, index) => (
												<Fragment key={index}>
													<Link href={`/blog/category/${item.title}?category=${item._id}`} className="nav-link">
														{item.title}
													</Link>
												</Fragment>
											))}
										</Nav>
									</div>
								</Col>
							</Row>
						</Container>
						<Container>
							<Row>
								{posts?.filter((item) => item.status === 'live').map((item, index) => (
									<Col xl={4} lg={4} md={6} sm={12} key={index} className="d-flex">
										<BlogCard item={item} />
									</Col>
								))}
							</Row>
						</Container>
					</section>
				</main>
			</NavbarDefault>
		</Fragment >
	);
};

export const getServerSideProps = async () => {
	try {
		const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/blogs/getposts`);
		const cat = await axios.get(`${process.env.NEXTAUTH_URL}/api/blogs/category/getcategory`);
		const blogData = res?.data || [];
		const category = cat?.data || [];
		return {
			props: {
				data: blogData,
				category: category,
			},
		};
	} catch (error) {
		console.error("Error fetching data:", error);
		return {
			props: {
				data: [],
				category: [],
			},
		};
	}
};
BlogListing.Layout = BlankLayout;
export default BlogListing;