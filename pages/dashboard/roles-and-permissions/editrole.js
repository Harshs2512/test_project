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
import { useRouter } from 'next/router';

const AddRole = () => {
    const router = useRouter();
    const { id } = router.query;

    const [formData, setFormData] = useState({
        _id: "",
        rolename: "",
        selectedpermission: [],
    });

    const selectAllPermissions = () => {
        const allPermissions = ["accessManagement", "accessDashboard", "accessOrders", "accessCourses", "createCourse", "editCourse", "deleteCourse", "createCourseCategory", "editCourseCategory", "deleteCourseCategory", "accessContests", "createContest", "editContest", "deleteContest", "createContestCategory", "editContestCategory", "deleteContestCategory", "accessJobs", "createJobs", "editJobs", "deleteJobs", "accessMocks", "createMocks", "editMocks", "deleteMocks", "accessTutorials", "createTutorial", "editTutorial", "deleteTutorial", "accessUser", "editUser", "deleteUser", "accessCms", "createBlogs", "editBlogs", "deleteBlogs", "createBlogCategory", "editBlogCategory", "deleteBlogCategory", "accessReviews", "editReviews", "deleteReviews", "accessSiteSettings", "accessProblem_of_the_day", "deleteProblem_of_the_day", "createProblem_of_the_day", "editProblem_of_the_day", "accessGuidedPath", "createGuidedPath", "editGuidedPath", "deleteGuidedPath", "accessEvents", "editEvents", "deleteEvents","deleteProblem_of_the_dayCategory","editProblem_of_the_dayCategory","createProblem_of_the_dayCategory", "createEvents"];
        setFormData((prevFormData) => ({
            ...prevFormData,
            selectedpermission: allPermissions,
        }));
    };

    const submitData = async () => {
        try {
            const res = await axios.put(`/api/rolesandpermission/${id}`, formData);
            if (res.status === 201) {
                toast.success("Add Success fully");
                router.back()
            } else {
                toast.info("Already Exist");
            }
        } catch (err) {
            setFormData({
                rolename: "",
                selectedpermission: []
            })
            toast.error(err.response);
        }
    };
    const fetchRoleById = async () => {
        try {
            if (id) {
                const res = await axios.get(`/api/rolesandpermission/${id}`);
                if (res.status === 201) {
                    const roleData = res.data;
                    setFormData({
                        _id: roleData._id,
                        rolename: roleData.rolename,
                        selectedpermission: roleData.selectedpermission,
                    });
                }
            }
        } catch (error) {
            console.log("Error fetching role data:", error);
        }
    };
    useEffect(() => {
        fetchRoleById();
    }, []);


    const addtoTag = (value) => {
        if (formData.selectedpermission.includes(value)) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                selectedpermission: prevFormData.selectedpermission.filter(permission => permission !== value),
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                selectedpermission: [...prevFormData.selectedpermission, value],
            }));
        }
    };

    return (
        <Fragment>
            <ToastContainer />
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                        <div className="mb-3 mb-md-0">
                            <h1 className="mb-1 h2 fw-bold">Add New Role</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href="#">Landing</Breadcrumb.Item>
                                <Breadcrumb.Item active>Role</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center border-bottom card-header-height mb-4">
                            <h4 className="mb-0">Add New Role</h4>
                            <Link href='/dashboard/roles-and-permissions/allroles' className='fs-4'>{`<-- Back`}</Link>
                        </Card.Header>
                        <Card.Body className="p-0 mx-10">
                            <Form>
                                <Form.Group id="heading" className='mb-3'>
                                    <Form.Label>Enter Role</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Role Name"
                                        id="rolename"
                                        value={formData.rolename}
                                        onChange={(e) => setFormData({ ...formData, rolename: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className='mb-5 text-contain'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <Form.Label>Select permissions</Form.Label>
                                        <Button variant="primary" onClick={selectAllPermissions} className='text-center mb-3 p-2'>
                                            Select All
                                        </Button>
                                    </div>
                                    {/* Permission Table */}
                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>Permissions</th>
                                                <th>Access</th>
                                                <th>Create</th>
                                                <th>Update</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Management */}
                                            <tr>
                                                <td className='h4'>Management</td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("accessManagement")}
                                                        checked={formData.selectedpermission.includes("accessManagement")}
                                                    />
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            {/* Dashboard */}
                                            <tr>
                                                <td className='h4'>Dashboard</td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("accessDashboard")}
                                                        checked={formData.selectedpermission.includes("accessDashboard")}
                                                    />
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            {/* Orders */}
                                            <tr>
                                                <td className='h4'>Orders</td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("accessOrders")}
                                                        checked={formData.selectedpermission.includes("accessOrders")}

                                                    />
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            {/* Courses */}
                                            <tr>
                                                <td className='h4'>Courses</td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("accessCourses")}
                                                        checked={formData.selectedpermission.includes("accessCourses")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("createCourse")}
                                                        checked={formData.selectedpermission.includes("createCourse")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("editCourse")}
                                                        checked={formData.selectedpermission.includes("editCourse")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("deleteCourse")}
                                                        checked={formData.selectedpermission.includes("deleteCourse")}
                                                    />
                                                </td>
                                            </tr>
                                            {/* Courses Category */}
                                            <tr>
                                                <td className='h4'>Courses Category</td>
                                                <td></td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("createCourseCategory")}
                                                        checked={formData.selectedpermission.includes("createCourseCategory")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("editCourseCategory")}
                                                        checked={formData.selectedpermission.includes("editCourseCategory")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("deleteCourseCategory")}
                                                        checked={formData.selectedpermission.includes("deleteCourseCategory")}
                                                    />
                                                </td>
                                            </tr>
                                            {/* Contests */}
                                            <tr>
                                                <td className='h4'>Contests</td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("accessContests")}
                                                        checked={formData.selectedpermission.includes("accessContests")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("createContest")}
                                                        checked={formData.selectedpermission.includes("createContest")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("editContest")}
                                                        checked={formData.selectedpermission.includes("editContest")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("deleteContest")}
                                                        checked={formData.selectedpermission.includes("deleteContest")}
                                                    />
                                                </td>
                                            </tr>
                                            {/* Contests Category */}
                                            <tr>
                                                <td className='h4'>Contest Category</td>
                                                <td></td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("createContestCategory")}
                                                        checked={formData.selectedpermission.includes("createContestCategory")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("editContestCategory")}
                                                        checked={formData.selectedpermission.includes("editContestCategory")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("deleteContestCategory")}
                                                        checked={formData.selectedpermission.includes("deleteContestCategory")}
                                                    />
                                                </td>
                                            </tr>
                                            {/* Job & Internship */}
                                            <tr>
                                                <td className='h4'>Job & Internship</td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("accessJobs")}
                                                        checked={formData.selectedpermission.includes("accessJobs")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("createJobs")}
                                                        checked={formData.selectedpermission.includes("createJobs")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("editJobs")}
                                                        checked={formData.selectedpermission.includes("editJobs")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("deleteJobs")}
                                                        checked={formData.selectedpermission.includes("deleteJobs")}
                                                    />
                                                </td>
                                            </tr>
                                            {/* Problem Of the Day */}
                                            <tr>
                                                <td className='h4'>Problem of the day</td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("accessProblem_of_the_day")}
                                                        checked={formData.selectedpermission.includes("accessProblem_of_the_day")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("createProblem_of_the_day")}
                                                        checked={formData.selectedpermission.includes("createProblem_of_the_day")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("editProblem_of_the_day")}
                                                        checked={formData.selectedpermission.includes("editProblem_of_the_day")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("deleteProblem_of_the_day")}
                                                        checked={formData.selectedpermission.includes("deleteProblem_of_the_day")}
                                                    />
                                                </td>
                                            </tr>
                                            {/* Problem Of the Day */}
                                            <tr>
                                                <td className='h4'>Problem of the day Category</td>
                                                <td></td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("createProblem_of_the_dayCategory")}
                                                        checked={formData.selectedpermission.includes("createProblem_of_the_dayCategory")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("editProblem_of_the_dayCategory")}
                                                        checked={formData.selectedpermission.includes("editProblem_of_the_dayCategory")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("deleteProblem_of_the_dayCategory")}
                                                        checked={formData.selectedpermission.includes("deleteProblem_of_the_dayCategory")}
                                                    />
                                                </td>
                                            </tr>
                                            {/* Mocks */}
                                            <tr>
                                                <td className='h4'>Mocks</td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("accessMocks")}
                                                        checked={formData.selectedpermission.includes("accessMocks")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("createMocks")}
                                                        checked={formData.selectedpermission.includes("createMocks")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("editMocks")}
                                                        checked={formData.selectedpermission.includes("editMocks")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("deleteMocks")}
                                                        checked={formData.selectedpermission.includes("deleteMocks")}
                                                    />
                                                </td>
                                            </tr>
                                            {/* Tutorials */}
                                            <tr>
                                                <td className='h4'>Tutorials</td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("accessTutorials")}
                                                        checked={formData.selectedpermission.includes("accessTutorials")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("createTutorial")}
                                                        checked={formData.selectedpermission.includes("createTutorial")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("editTutorial")}
                                                        checked={formData.selectedpermission.includes("editTutorial")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("deleteTutorial")}
                                                        checked={formData.selectedpermission.includes("deleteTutorial")}
                                                    />
                                                </td>
                                            </tr>
                                            {/* GuidedPath */}
                                            <tr>
                                                <td className='h4'>Guided Path</td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("accessGuidedPath")}
                                                        checked={formData.selectedpermission.includes("accessGuidedPath")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("createGuidedPath")}
                                                        checked={formData.selectedpermission.includes("createGuidedPath")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("editGuidedPath")}
                                                        checked={formData.selectedpermission.includes("editGuidedPath")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("deleteGuidedPath")}
                                                        checked={formData.selectedpermission.includes("deleteGuidedPath")}
                                                    />
                                                </td>
                                            </tr>
                                            {/* User */}
                                            <tr>
                                                <td className='h4'>User</td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("accessUser")}
                                                        checked={formData.selectedpermission.includes("accessUser")}
                                                    />
                                                </td>
                                                <td></td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("editUser")}
                                                        checked={formData.selectedpermission.includes("editUser")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("deleteUser")}
                                                        checked={formData.selectedpermission.includes("deleteUser")}
                                                    />
                                                </td>
                                            </tr>
                                            {/* CMS */}
                                            <tr>
                                                <td className='h4'>CMS</td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("accessCms")}
                                                        checked={formData.selectedpermission.includes("accessCms")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("createBlogs")}
                                                        checked={formData.selectedpermission.includes("createBlogs")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("editBlogs")}
                                                        checked={formData.selectedpermission.includes("editBlogs")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("deleteBlogs")}
                                                        checked={formData.selectedpermission.includes("deleteBlogs")}
                                                    />
                                                </td>
                                            </tr>
                                            {/* CMS Category */}
                                            <tr>
                                                <td className='h4'>CMS Category</td>
                                                <td></td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("createBlogCategory")}
                                                        checked={formData.selectedpermission.includes("createBlogCategory")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("editBlogCategory")}
                                                        checked={formData.selectedpermission.includes("editBlogCategory")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("deleteBlogCategory")}
                                                        checked={formData.selectedpermission.includes("deleteBlogCategory")}
                                                    />
                                                </td>
                                            </tr>
                                            {/* Reviews */}
                                            <tr>
                                                <td className='h4'>Reviews</td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("accessReviews")}
                                                        checked={formData.selectedpermission.includes("accessReviews")}
                                                    />
                                                </td>
                                                <td></td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("editReviews")}
                                                        checked={formData.selectedpermission.includes("editReviews")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("deleteReviews")}
                                                        checked={formData.selectedpermission.includes("deleteReviews")}
                                                    />
                                                </td>
                                            </tr>
                                            {/* Site Settings */}
                                            <tr>
                                                <td className='h4'>Site Settings</td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("accessSiteSettings")}
                                                        checked={formData.selectedpermission.includes("accessSiteSettings")}
                                                    />
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            {/* Events */}
                                            <tr>
                                                <td className='h4'>Events</td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("accessEvents")}
                                                        checked={formData.selectedpermission.includes("accessEvents")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("createEvents")}
                                                        checked={formData.selectedpermission.includes("createEvents")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("editEvents")}
                                                        checked={formData.selectedpermission.includes("editEvents")}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => addtoTag("deleteEvents")}
                                                        checked={formData.selectedpermission.includes("deleteEvents")}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
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


export default AddRole;