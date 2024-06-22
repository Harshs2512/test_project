// import node module libraries
import { Card, Form, Row, Col, Button, Image } from 'react-bootstrap';
import { signIn, signOut, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditProfile() {
	const [edit, setEdit] = useState(false);
	const [profileImage, setProfileImage] = useState(false);
	const [mystate, setState] = useState('');
	const [userdata, setUserdata] = useState('');
	const { data: session } = useSession();
	const {
		handleSubmit,
		register,
		getValues,
		setValue,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		setValue("username", session && session.user.username);
		setValue("email", session && session.user.email);
		userData()
	}, [session]);

	useEffect(() => {
		setValue("fname", userdata && userdata[0].fname);
		setValue("lname", userdata && userdata[0].lname);
		setValue("phone", userdata && userdata[0].phone);
		setValue("address", userdata && userdata[0].address);
		setValue("country", userdata && userdata[0].country);
		setValue("dob", userdata && userdata[0].dob);
		setValue("mystate", userdata && userdata[0].mystate);
		setValue("zipcode", userdata && userdata[0].zipcode);
	}, [userdata])

	const userData = async () => {
		try {
			const response = await axios.get(`/api/auth/userdata`);
			const thisuser = response.data.filter((user) => user.email === session.user.email);
			setUserdata(thisuser)
		}
		catch (error) {
			console.log(error)
		}
	}
	const handleImageChange = (event) => {
		const selectedImage = event.target.files[0];
		setProfileImage(selectedImage);
	};
	const submitHandler = async ({ fname, lname, address, phone, email, dob, country, zipcode }) => {
		try {
			const formData = new FormData();
			formData.append("image", profileImage);
			formData.append("fname", fname);
			formData.append("lname", lname);
			formData.append("phone", phone);
			formData.append("address", address);
			formData.append("mystate", mystate);
			formData.append("dob", dob);
			formData.append("email", email);
			formData.append("country", country);
			formData.append("zipcode", zipcode);
			const response = await axios.put("/api/auth/update", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			toast.success(response.data.message)
			setEdit(!edit);
			const result = await signIn("credentials", {
				redirect: false,
				email,
				password,
			});
			if (result.error) {
				toast.error(result.error);
			}
		} catch (error) {
			// toast.error(error);
			console.log(error)
		}
	};

	// const { state, dispatch } = useContext(Store);

	const logoutClickHandler = () => {
		// Cookies.remove("cart");
		// dispatch({ type: "CART_RESET" });
		signOut({ callbackUrl: "/login" });
	};

	const statelist = [
		{ value: "Andhra Pradesh", label: "Andhra Pradesh" },
		{ value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
		{ value: "Assam", label: "Assam" },
		{ value: "Bihar", label: "Bihar" },
		{ value: "Chhattisgarh", label: "Chhattisgarh" },
		{ value: "Goa", label: "Goa" },
		{ value: "Gujarat", label: "Gujarat" },
		{ value: "Haryana", label: "Haryana" },
		{ value: "Himachal Pradesh", label: "Himachal Pradesh" },
		{ value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
		{ value: "Jharkhand", label: "Jharkhand" },
		{ value: "Karnataka", label: "Karnataka" },
		{ value: "Kerala", label: "Kerala" },
		{ value: "Madhya Pradesh", label: "Madhya Pradesh" },
		{ value: "Maharashtra", label: "Maharashtra" },
		{ value: "Manipur", label: "Manipur" },
		{ value: "Meghalaya", label: "Meghalaya" },
		{ value: "Mizoram", label: "Mizoram" },
		{ value: "Nagaland", label: "Nagaland" },
		{ value: "Odisha", label: "Odisha" },
		{ value: "Punjab", label: "Punjab" },
		{ value: "Rajasthan", label: "Rajasthan" },
		{ value: "Sikkim", label: "Sikkim" },
		{ value: "Tamil Nadu", label: "Tamil Nadu" },
		{ value: "Telangana", label: "Telangana" },
		{ value: "Tripura", label: "Tripura" },
		{ value: "Uttarakhand", label: "Uttarakhand" },
		{ value: "Uttar Pradesh", label: "Uttar Pradesh" },
		{ value: "West Bengal", label: "West Bengal" },
		{ value: "Andaman and Nicobar Islands", label: "Andaman and Nicobar Islands" },
		{ value: "Chandigarh", label: "Chandigarh" },
		{ value: "Dadra and Nagar Haveli", label: "Dadra and Nagar Haveli" },
		{ value: "Daman and Diu", label: "Daman and Diu" },
		{ value: "Delhi", label: "Delhi" },
		{ value: "Lakshadweep", label: "Lakshadweep" },
		{ value: "Puducherry", label: "Puducherry" },
	];

	const handleEdit = () => {
		setEdit(!edit);
	};
	const handleChangeSatate = (e) => {
		const { value } = e.target;
		setState(value)
	};
	return (
		<Card className="border-0">
			<ToastContainer />
			<Card.Header>
				<div className="mb-3 mb-lg-0">
					<h3 className="mb-0">Profile Details</h3>
					<p className="mb-0">
						You have full control to manage your own account setting.
					</p>
				</div>
			</Card.Header>
			<Card.Body>
				<div className="d-lg-flex align-items-center justify-content-between">
					<div className="d-flex align-items-center mb-4 mb-lg-0">
						{!edit ?
							<Image
								src={`/api/auth/profileimgadmin/${session && session.user._id}`}
								// src={location.pathname.includes('student') ? "/images/avatar/avatar-3.jpg" : "/images/avatar/avatar-1.jpg"}
								id="img-uploaded"
								className="avatar-xl rounded-circle"
								alt=""
							/> : <div className="avatar avatar-xl input-container">
								<input type="file" accept="image/*" onChange={handleImageChange} disabled={!edit} />
								{profileImage && (
									<div className="profile-image-preview">
										<img src={URL.createObjectURL(profileImage)} alt="Profile Preview" />
									</div>
								)}
							</div>}
						<div className="ms-3">
							<h4 className="mb-0">Your avatar</h4>
							<p className="mb-0">
								PNG or JPG no bigger than 800px wide and tall.
							</p>
						</div>
					</div>
					<div>
						<span onClick={handleEdit}>{edit ?
							" "
							:
							<Button variant="outline-secondary" size="sm">
								Edit
							</Button>}
						</span>

					</div>
				</div>
				<hr className="my-5" />
				<div>
					<h4 className="mb-0">Personal Details</h4>
					<p className="mb-4">Edit your personal information and address.</p>
					{/* Form */}
					<Form onSubmit={handleSubmit(submitHandler)}>
						<Row>
							{/* First name */}
							<Col md={6} sm={12} className="mb-3">
								<Form.Group className="mb-3" controlId="formFirstName">
									<Form.Label>First Name</Form.Label>
									<Form.Control
										type="text"
										placeholder="First Name"
										required
										{...register("fname", {
											required: "Please enter name",
										})}
										disabled={!edit}
									/>
									{errors.name && (
										<div className="text-danger">{errors.name.message}</div>
									)}
								</Form.Group>
							</Col>

							{/* Last name */}
							<Col md={6} sm={12} className="mb-3">
								<Form.Group className="mb-3" controlId="formLastName">
									<Form.Label>Last Name</Form.Label>
									<Form.Control
										type="text"
										placeholder="Last Name"
										required
										{...register("lname", {
											required: "Please enter name",
										})}
										disabled={!edit}
									/>
								</Form.Group>
							</Col>

							{/* Phone */}
							<Col md={6} sm={12} className="mb-3">
								<Form.Group className="mb-3" controlId="formPhone">
									<Form.Label>Phone</Form.Label>
									<Form.Control
										type="text"
										placeholder="Phone"
										{...register("phone", {
											required: "Please enter name",
										})}
										required disabled={!edit}
									/>
								</Form.Group>
							</Col>

							{/* Birthday */}
							<Col md={6} sm={12} className="mb-3">
								<Form.Group className="mb-3" controlId="formBirthday">
									<Form.Label>Birthday</Form.Label>
									<Form.Control
										// as={FlatPickr}
										type='date'
										// value={''}
										placeholder="Date of Birth"
										{...register("dob")}
										required
										disabled={!edit}
									/>
								</Form.Group>
							</Col>
							{/* Address Line 1 */}
							<Col md={6} sm={12} className="mb-3">
								<Form.Group className="mb-3" controlId="formBirthday">
									<Form.Label>Address</Form.Label>
									<Form.Control
										type="text"
										placeholder="Address"
										required
										{...register("address", {
											required: "Please enter address",
										})}
										disabled={!edit}
									/>
								</Form.Group>
							</Col>
							<Col md={6} sm={12} className="mb-3">
								<Form.Group className="mb-3" controlId="formBirthday">
									<Form.Label>zipCode/Postal Code</Form.Label>
									<Form.Control
										type="text"
										placeholder="ZipCode"
										required
										{...register("zipcode", {
											required: "Please enter zipcode",
										})}
										disabled={!edit}
									/>
								</Form.Group>
							</Col>
							{/* State */}
							<Col md={6} sm={12} className="mb-3">
								<Form.Group className="mb-3" controlId="formCountry">
									<Form.Label>State</Form.Label>
									<Form.Select onChange={handleChangeSatate} disabled={!edit}>
										{statelist &&
											statelist.map((c,index) => (
												<option key={index} value={c.value}>
													{c.value}
												</option>
											))}
									</Form.Select>
								</Form.Group>
							</Col>
							{/* Country */}
							<Col md={6} sm={12} className="mb-3">
								{/* Country field with disabled prop */}
								<Form.Group className="mb-3" controlId="formCountry">
									<Form.Label>Country</Form.Label>
									<Form.Control
										as="select"
										disabled={!edit}
										{...register("country", {
											required: "Please enter address",
										})}
									>
										<option value="India">India</option>
									</Form.Control>
								</Form.Group>
							</Col>
							<Col md={6} sm={12} className="mb-3">
								{/* Country field with disabled prop */}
								<Form.Group className="mb-3" controlId="formCountry">
									<Form.Label>Email Id</Form.Label>
									<Form.Control
										type="text"
										placeholder="Email"
										required
										{...register("email", {
											required: "Please enter name",
										})}
										disabled={!edit}
									/>
								</Form.Group>
							</Col>
							{edit ? <Col sm={12} md={12}>
								<Button variant="primary" type="submit" className='me-3'>
									Update Profile
								</Button>
								<Button variant="gray" type="submit" onClick={() => setEdit(!edit)}>
									Cancel
								</Button>
							</Col> : ''
							}

						</Row>
					</Form>
				</div>
			</Card.Body>
		</Card>
	);
};

// export default EditProfile;
EditProfile.auth = true;

