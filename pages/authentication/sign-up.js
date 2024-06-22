// import node module libraries
import { Fragment, useState } from 'react';
import { Col, Row, Card, Form, Button, Image } from 'react-bootstrap';
import Link from 'next/link';
import axios from 'axios'
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Loder from 'widgets/Loder';

// import widget/custom components
import { GeeksSEO } from 'widgets';

// import authlayout to override default layout 
import AuthLayout from 'layouts/dashboard/AuthLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = (req, res) => {
	const [loading, setLoading] = useState(false)
	const { data: session } = useSession();
	const router = useRouter();
	const { redirect } = router.query;

	useEffect(() => {
		if (session?.user) {
			router.push(redirect || "/");
		}
	}, [router, session, redirect]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const submitHandler = async ({ fname, lname, email, password }) => {
		setLoading(true)
		try {
			await axios.post("/api/auth/signup", {
				redirect: false,
				fname,
				lname,
				email,
				password,
			});

			const result = await signIn("credentials", {
				redirect: false,
				email,
				password,
			});

			if (result.error) {
				toast.error(result.error);
			}
			setLoading(false)
		} catch (res) {
			toast.error("User already exists");
		}
	};

	return (
		<Fragment>
			<ToastContainer />
			{/* Geeks SEO settings  */}
			<GeeksSEO title="Sign Up | Cybrom technology pvt.ltd." />
			<Row className="align-items-center justify-content-center g-0 min-vh-100">
				<Col lg={5} md={5} className="py-8 py-xl-0">
					<Card>
						<Card.Body className="p-6">
							<div className="mb-4">
								<Link href="/">
									<Image src="/images/brand/logo/cybrom_long.png" className="mb-4" alt="" />
								</Link>
								<h1 className="mb-1 fw-bold">Sign up</h1>
								<span>
									Already have an account?{' '}
									<Link href="/authentication/sign-in" className="ms-1">
										Sign in
									</Link>
								</span>
							</div>
							{/* Form */}
							<Form onSubmit={handleSubmit(submitHandler)}>
								<Row>
									<Col lg={12} md={12} className="mb-3">
										{/* User Name */}
										<Form.Label>First Name</Form.Label>
										<Form.Control
											type="text"
											id="fname"
											placeholder="First Name"
											{...register("fname", {
												required: "Please enter name",
											})}
											required
										/>
										{errors.name && (
											<div className="text-danger">{errors.name.message}</div>
										)}
									</Col>
									<Col lg={12} md={12} className="mb-3">
										{/* User Name */}
										<Form.Label>Last Name</Form.Label>
										<Form.Control
											type="text"
											id="lname"
											placeholder="Last Name"
											{...register("lname", {
												required: "Please enter name",
											})}
											required
										/>
										{errors.name && (
											<div className="text-danger">{errors.name.message}</div>
										)}
									</Col>
									<Col lg={12} md={12} className="mb-3">
										{/* email */}
										<Form.Label>Email </Form.Label>
										<Form.Control
											type="email"
											id="email"
											placeholder="Email address here"
											{...register("email", {
												required: "Please enter email",

												pattern: {
													value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
													message: "Please enter valid email",
												},
											})}
											required
										/>
										{errors.email && (
											<div className="text-danger	">{errors.email.message}</div>
										)}
									</Col>
									<Col lg={12} md={12} className="mb-3">
										{/* Password */}
										<Form.Label>Password </Form.Label>
										<Form.Control
											type="password"
											id="password"
											placeholder="Enter password "
											{...register("password", {
												required: "Please enter password",
												minLength: {
													value: 6,
													message: "Password is more than 5 chars",
												},
											})}
											required
										/>
										{errors.password && (
											<div className="text-danger">{errors.password.message}</div>
										)}
									</Col>
									<Col lg={12} md={12} className="mb-3">
										{/* Checkbox */}
										<Form.Check type="checkbox" id="check-api-checkbox">
											<Form.Check.Input type="checkbox" />
											<Form.Check.Label>
												I agree to the{' '}
												<Link href="/marketing/specialty/terms-and-conditions/">
													Terms of Service
												</Link>{' '}
												and{' '}
												<Link href="/marketing/specialty/terms-and-conditions/">
													Privacy Policy.
												</Link>
											</Form.Check.Label>
										</Form.Check>
									</Col>
									<Col lg={12} md={12} className="mb-0 d-grid gap-2">
										{/* Button */}
										<Button variant="primary" type="submit">
											{!loading ? 'Sign Up' : ''} {loading ? <Loder /> : ''}
										</Button>
									</Col>
								</Row>
							</Form>
							<hr className="my-4" />
							<div className="mt-4 text-center">
								{/* Facebook */}
								<Link href="#" className="btn-social btn-social-outline btn-facebook">
									<i className="fab fa-facebook"></i>
								</Link>{' '}
								{/* Twitter */}
								<Link href="#" className="btn-social btn-social-outline btn-twitter">
									<i className="fab fa-twitter"></i>
								</Link>{' '}
								{/* LinkedIn */}
								<Link href="#" className="btn-social btn-social-outline btn-linkedin">
									<i className="fab fa-linkedin"></i>
								</Link>{' '}
								{/* GitHub */}
								<Link href="#" className="btn-social btn-social-outline btn-github">
									<i className="fab fa-github"></i>
								</Link>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

SignUp.Layout = AuthLayout;

export default SignUp;