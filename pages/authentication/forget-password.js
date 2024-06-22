// import node module libraries
import { Fragment } from 'react';
import { Col, Row, Card, Form, Button, Image } from 'react-bootstrap';
import Link from 'next/link';
import { useState } from 'react';
import { GeeksSEO } from 'widgets';
import AuthLayout from 'layouts/dashboard/AuthLayout';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/router';

const ForgetPassword = () => {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const handleFormSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post('/api/auth/forgetpassword', { email });
			toast.success("Link Send Successfully for Reset Password", {
				onClose: () => {
					router.push("/authentication/sign-in");
				}
			});
		} catch (error) {
			toast.error("please Enter valid email Address ..")
			console.error('Error:', error);
		}
	};

	return (
		<Fragment>
			{/* Geeks SEO settings */}
			<ToastContainer />
			<GeeksSEO title="Forget Password | Cybrom Technology pvt. ltd." />

			<Row className="align-items-center justify-content-center g-0 min-vh-100">
				<Col lg={5} md={5} className="py-8 py-xl-0">
					<Card>
						<Card.Body className="p-6">
							<div className="mb-4">
								<Link href="/">
									<Image src="/images/brand/logo/cybrom_long.png" className="mb-4" alt="" />
								</Link>
								<h1 className="mb-1 fw-bold">Forgot Password</h1>
								<span>Fill the form to reset your password.</span>
							</div>
							{/* Form */}
							<Form onSubmit={handleFormSubmit}>
								<Row>
									<Col lg={12} md={12} className="mb-3">
										{/* email */}
										<Form.Label>Email</Form.Label>
										<Form.Control
											type="email"
											id="email"
											placeholder="Enter your email"
											required
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</Col>
									<Col lg={12} md={12} className="mb-3 d-grid gap-2">
										{/* Button */}
										<Button variant="primary" type="submit">
											Send Reset Link
										</Button>
									</Col>
								</Row>
								<span>
									Return to <Link href="/authentication/sign-in">Sign in</Link>
								</span>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

ForgetPassword.Layout = AuthLayout;

export default ForgetPassword;
