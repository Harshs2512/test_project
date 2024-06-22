// import node module libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
	Col,
	Row,
	Form,
	Card,
	OverlayTrigger,
	Tooltip,
	Button
} from 'react-bootstrap';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PasswordStrengthMeter } from 'widgets';
const Security = () => {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmNewPassword, setConfirmNewPassword] = useState('');
	const [message, setMessage] = useState('');
	const router = useRouter();
	// const session = useSession()
	const { data: session } = useSession();

	const userId = session && session?.user?._id || '';
	const payload = {
				userId,
				currentPassword,
				newPassword,
				confirmNewPassword,
			};
	const handleChangePassword = async () => {
		try {
			const response = await axios.post('/api/auth/passwordChange', payload);
			toast.success('Your Password is changed Successfully',{
				onClose: () => {
					router.push("/marketing/instructor/dashboard");
				}
			})
		} catch (error) {
			toast.error('Your Password has not been changed ?')
			console.log(error)
		}
	};

	return (

		<Card className="border-0">
			<ToastContainer />
			<Card.Header>
				<div className="mb-3 mb-lg-0">
					<h3 className="mb-0">Security</h3>
					<p className="mb-0">
						Edit your account settings and change your password here.
					</p>
				</div>
			</Card.Header>
			<Card.Body>
				<div>
					<h4 className="mb-0">Change Password</h4>
					<p>
						We will email you a confirmation when changing your password, so
						please expect that email after submitting.
					</p>
					{/* Form */}
					<Form onSubmit={handleChangePassword}>
						<Row>
							<Col lg={6} md={12} sm={12}>
								{/* Current password */}

								<Form.Group className="mb-3">
									<Form.Label htmlFor="currentPassword">
										Current Password
									</Form.Label>
									<Form.Control
										type="password"
										id="currentPassword"
										value={currentPassword}
										onChange={(e) => setCurrentPassword(e.target.value)}
										required
									/>
								</Form.Group>

								{/* New password */}
								<Form.Group className="mb-3">
									<Form.Label htmlFor="newpassword">New Password</Form.Label>
									<Form.Control
										type="password"
										id="newpassword"
										value={newPassword}
										onChange={(e) => setNewPassword(e.target.value)}
										required
									/>
								</Form.Group>

								<Row className="align-items-center g-0">
									<Col sm={6}>
										<span
											data-bs-toggle="tooltip"
											data-placement="right"
											title=""
										>
											Password strength
											<OverlayTrigger
												key="top"
												placement="top"
												overlay={
													<Tooltip id="tooltip-top">
														Test it by typing a password in the field below.
														To reach full strength, use at least 6 characters,
														a capital letter and a digit, e.g. 'Test01'
													</Tooltip>
												}
											>
												<i className="fas fa-question-circle ms-1"></i>
											</OverlayTrigger>
										</span>
									</Col>
								</Row>
								<PasswordStrengthMeter newPassword={newPassword} />

								{/* Confirm new password */}
								<Form.Group className="mb-3">
									<Form.Label htmlFor="confirmpassword">
										Confirm New Password
									</Form.Label>
									<Form.Control
										type="password"
										id="confirmpassword"
										value={confirmNewPassword}
										onChange={(e) => setConfirmNewPassword(e.target.value)}
										required
									/>
								</Form.Group>
								{/* Button */}
								<Button type="submit" className="btn btn-primary">
									Save Password
								</Button>
								<div className="col-6"></div>
							</Col>
							<Col lg={12} md={12} sm={12} className="mt-4">
								<p className="mb-0">
									Can't remember your current password?{' '}
									<Link href="#">Reset your password via email</Link>
								</p>
							</Col>
						</Row>
					</Form>
				</div>
			</Card.Body>
		</Card>
	);
};

export default Security;
