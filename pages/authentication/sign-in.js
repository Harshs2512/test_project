// import node module libraries
import { Fragment, useState } from 'react';
import { Col, Row, Card, Form, Button, Image } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getError } from "utils/error";
import { GeeksSEO } from 'widgets';
import AuthLayout from 'layouts/dashboard/AuthLayout';
import Loder from 'widgets/Loder';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

const SignIn = () => {
	const { data: session } = useSession()
	const params = useSearchParams()
	let callbackUrl = "/marketing/student/dashboard"
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm({
		defaultValues: {
			email: "",
			password: ""
		}
	})

	useEffect(() => {
		if (session && session.user) {
			router.push(callbackUrl)
		}
	}, [callbackUrl, params, router, session]);

	const submitHandler = async ({ email, password }) => {
		setLoading(true)
		try {
			const result = await signIn("credentials", {
				redirect: false,
				email,
				password,
			});
			if (result.error) {
				toast.error(result.error);
			}
			else {
				toast.success("Login Success full");
			}
		} catch (error) {
			toast.error(getError(error));
		}
		setLoading(false)
	};

	return (
		<Fragment>

			<ToastContainer />
			{/* Geeks SEO settings  */}
			<GeeksSEO title="Sign In | Cybrom technology pvt. ltd." />

			<Row className="align-items-center justify-content-center g-0 min-vh-100">
				<Col lg={5} md={5} className="py-8 py-xl-0">
					<Card>
						<Card.Body className="p-6">
							<div className="mb-4">
								<Link href="/">
									<Image src="/images/brand/logo/cybrom_long.png" className="mb-4" alt="" />
								</Link>
								<h1 className="mb-1 fw-bold">Sign in</h1>
								<span>
									Don’t have an account?{' '}
									<Link href="/authentication/sign-up" className="ms-1">
										Sign up
									</Link>
								</span>
							</div>
							{/* Form */}
							<Form onSubmit={handleSubmit(submitHandler)}>
								<Row>
									<Col lg={12} md={12} className="mb-3">
										{/* Username or email */}
										<Form.Label>Username or email </Form.Label>
										<Form.Control
											type="email"
											id="email"
											placeholder="Email address here"
											required
											{...register("email", {
												required: "Please enter email",
												pattern: {
													value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
													message: "Please enter valid email",
												},
											})}
											autoFocus
										/>
										{errors.email && (
											<div className="text-danger">{errors.email.message}</div>
										)}
									</Col>
									<Col lg={12} md={12} className="mb-3">
										{/* Password */}
										<Form.Label>Password </Form.Label>
										<Form.Control
											type="password"
											id="password"
											placeholder="**************"
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
										<div className="d-md-flex justify-content-between align-items-center">
											<Form.Group
												className="mb-3 mb-md-0"
												controlId="formBasicCheckbox"
											>
												<Form.Check type="checkbox" label="Remember me" />
											</Form.Group>
											<Link href="/authentication/forget-password">
												Forgot your password?
											</Link>
										</div>
									</Col>
									<Col lg={12} md={12} className="mb-0 d-grid gap-2">
										{/* Button */}
										<Button variant="primary" type="submit">
											{loading ? <Loder /> : "Sign in"}
										</Button>
									</Col>
								</Row>
							</Form>
							<hr className="my-4" />
							<div className="mt-4 text-center">
								{/* Facebook */}
								<Link href="#" className="btn-social btn-social-outline btn-facebook" onClick={() => signIn("google")}>
									<i className="fab fa-google"></i>
								</Link>{' '}
								{/* Twitter */}
								{/* <Link href="#" className="btn-social btn-social-outline btn-twitter" >
									<i className="fab fa-twitter"></i>
								</Link>{' '} */}
								{/* LinkedIn */}
								{/* <Link href="#" className="btn-social btn-social-outline btn-linkedin" >
									<i className="fab fa-linkedin"></i>
								</Link>{' '} */}
								{/* GitHub */}
								<Link href="#" className="btn-social btn-social-outline btn-github" onClick={() => signIn("github")}>
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

SignIn.Layout = AuthLayout;

export default SignIn;