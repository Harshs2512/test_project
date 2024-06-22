// import node module libraries
import React, { Fragment } from 'react';
import { Col, Row, Container, Form, Button } from 'react-bootstrap';
import { BlogCard } from 'sub-components';
import { GeeksSEO } from 'widgets';
import { useRouter } from 'next/router';
import axios from 'axios';

const BlogCategory = (props) => {
	const router = useRouter()
	const categoryId = router.query.category;
	const posts = props.blogData?.filter((item) => item.postcategory === categoryId)

	return (
		<Fragment>
			{/* Geeks SEO settings  */}
			<GeeksSEO title="Blog Category | Cybrom Technology Pvt. Ltd." />

			{/* Page header */}
			<section className="pt-9 pb-9 bg-white">
				<Container>
					<Row className="row mb-10">
						<Col
							lg={{ span: 10, offset: 1 }}
							xl={{ span: 8, offset: 2 }}
							md={12}
							sm={12}
						>
							<div className="text-center mb-5">
								<h1 className="display-2 fw-bold">Blogs</h1>
								<p className="lead">
									Our features, journey, tips and us being us. Lorem ipsum dolor
									sit amet, accumsan in, tempor dictum neque.
								</p>
							</div>
							{/* Form */}
							<Form className="row px-md-20">
								<div className="mb-3 col ps-0 ms-2 ms-md-0">
									<Form.Control
										type="email"
										placeholder="Email Address"
										required=""
									/>
								</div>
								<div className="mb-3 col-auto ps-0">
									<Button variant="primary" type="submit">
										Submit
									</Button>
								</div>
							</Form>
						</Col>
					</Row>
					<Row>
						{posts.filter(function (dataSource) {
							return dataSource.postcategory === categoryId;
						}).map((item, index) => (
							<Col xl={4} lg={4} md={6} sm={12} key={index} className="d-flex">
								<BlogCard item={item} />
							</Col>
						))}
					</Row>
				</Container>
			</section>
		</Fragment>
	);
};

export async function getStaticProps(context) {
	if (process.env.NODE_ENV === "production") {
		const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/blogs/getposts`);
		const blogData = res.data
		return { props: { blogData } }
	}
	else {
		const res = await axios.get(`http://localhost:3000/api/blogs/getposts`);
		const blogData = res.data
		return { props: { blogData } }
	}
};

export async function getStaticPaths() {
	if (process.env.NODE_ENV === "production") {
		const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/blogs/getposts`);
		const blogData = res.data
		const paths = blogData.map((post) => ({
			params: { slug: post.slug },
		}))
		return { paths, fallback: 'blocking' }
	}
	else {
		const res = await axios.get(`http://localhost:3000/api/blogs/getposts`);
		const blogData = res.data
		const paths = blogData.map((post) => ({
			params: { slug: post.postcategory },
		}))
		return { paths, fallback: 'blocking' }
	}
};

export default BlogCategory;