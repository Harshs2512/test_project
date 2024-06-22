// import node module libraries
import React, { Fragment, useEffect, useState } from 'react';
import {
    Card, Row, Col, Button, Breadcrumb, Form, Table
} from 'react-bootstrap';
// import custom components
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import DefaultDashboardLayout from 'layouts/dashboard/DashboardIndex';

const AddInstructor = () => {
    const [roles, setRole] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        roles: [],
    });

    const handleRoleCheckboxChange = (roleId) => {
        const updatedRoles = selectedRoles.includes(roleId)
            ? selectedRoles.filter((id) => id !== roleId)
            : [...selectedRoles, roleId];
        setSelectedRoles(updatedRoles);
        setFormData((prevFormData) => ({
            ...prevFormData,
            roles: updatedRoles,
        }));
    };

    const fetchRoles = async () => {
        try {
            const res = await axios.get("/api/rolesandpermission/getroles");
            if (res.status === 200) {
                setRole(res.data.roles);
            }
        } catch (error) {
            console.log("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const submitData = async () => {
        try {
            const res = await axios.post(`/api/auth/addinstructor`, formData);
            if (res.status === 201) {
                toast.success("Add Success fully");
            } else {
                toast.info("Already Exist");
            }
            setFormData({
                fname: "",
                lname: "",
                email: "",
                password: "",
                roles: []
            })
            setSelectedRoles([])
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    return (
        <Fragment>
            <ToastContainer />
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                        <div className="mb-3 mb-md-0">
                            <h1 className="mb-1 h2 fw-bold">Add New Instructor</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href="#">User</Breadcrumb.Item>
                                <Breadcrumb.Item active>instructor</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center border-bottom card-header-height mb-4">
                            <h4 className="mb-0">Add New Instructor</h4>
                            <Link href='/dashboard/user/instructor' className='fs-4'>{`<-- Back`}</Link>
                        </Card.Header>
                        <Card.Body className="p-0 mx-10">
                            <Form>
                                <Form.Group className='d-lg-flex justify-content-between align-items-center'>
                                    <Form.Group className="mb-5 w-sm-50 me-2">
                                        <Form.Label htmlFor="postTitle">First name</Form.Label>
                                        <Form.Control
                                            id="fname"
                                            type="text"
                                            name="fname"
                                            placeholder='First name'
                                            value={formData.fname}
                                            onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-5 w-sm-50">
                                        <Form.Label htmlFor="postTitle">Last name</Form.Label>
                                        <Form.Control
                                            id="lname"
                                            type="text"
                                            name="lname"
                                            placeholder='Last name'
                                            value={formData.lname}
                                            onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
                                        />
                                    </Form.Group>
                                </Form.Group>
                                <Form.Group className="mb-5 me-2">
                                    <Form.Label htmlFor="postTitle"> Email Address</Form.Label>
                                    <Form.Control
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder='example@gmail.com'
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-5">
                                    <Form.Label htmlFor="postTitle">Password</Form.Label>
                                    <Form.Control
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder='***********'
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="text-contain mb-5">
                                    <Form.Label>Add Aditional Role</Form.Label>
                                    <p>Select single or multiple roles</p>
                                    <div className='d-flex'>
                                        {roles.map((role) => (
                                            <Form.Check
                                                key={role._id}
                                                type="checkbox"
                                                label={role.rolename}
                                                checked={selectedRoles.includes(role._id)}
                                                onChange={() => handleRoleCheckboxChange(role._id)}
                                                className='me-3'
                                            />
                                        ))}
                                    </div>
                                </Form.Group>
                            </Form>
                            <Button variant="primary" onClick={() => submitData()} className='text-center mb-5'>
                                Save
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

AddInstructor.Layout = DefaultDashboardLayout;

export default AddInstructor;