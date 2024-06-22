// import node module libraries
import { Fragment, useState, useEffect } from 'react';
import { Col, Row, Card, Form, Button, Image } from 'react-bootstrap';
import Link from 'next/link';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from 'next/router';

// import widget/custom components
import { GeeksSEO } from 'widgets';
import AuthLayout from 'layouts/dashboard/AuthLayout';

const ForgetPassword = () => {
    const router = useRouter();
    const resetToken = router.query.resetToken;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isTokenValid, setIsTokenValid] = useState(true);

    // useEffect(() => {
    //     if (resetToken) { 
    //         const tokenCreatedAt = parseInt(resetToken.substring(0, 13), 16);
    //         console.log(tokenCreatedAt,"token vaidity")
    //         const currentTime = Date.now();
    //      console.log(currentTime,"Current Time")
    //         if (isNaN(tokenCreatedAt) || (currentTime - tokenCreatedAt) > (60 * 60 * 1000)) {
    //             setIsTokenValid(false);
    //         }
    //     } else {
    //         setIsTokenValid(false);
    //     }
    // }, [resetToken]);
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/resetPassword', { password, confirmPassword, resetToken });
            toast.success(" Reset Password successfully you can log-in",
                {
                    onClose: () => {
                        router.push("/authentication/sign-in");
                    }
                });
        } catch (error) {
            toast.error("please Enter valid email Address ..")
            console.error('Error:', error);
        }
    }

    return (
        <Fragment>
            {/* Geeks SEO settings  */}
            <ToastContainer />
            <GeeksSEO title="confirm Password | Cybrom Technology pvt. ltd." />
            {isTokenValid ? (

                <Row className="align-items-center justify-content-center g-0 min-vh-100">
                    <Col lg={5} md={5} className="py-8 py-xl-0">
                        <Card>
                            <Card.Body className="p-6">
                                <div className="mb-4">
                                    <Link href="/">
                                        <Image src="/images/brand/logo/cybrom_long.png" className="mb-4" alt="" />
                                    </Link>
                                    <h1 className="mb-1 fw-bold">Confirm Password</h1>
                                    <span>Fill the form to reset your password.</span>
                                </div>
                                {/* Form */}
                                <Form onSubmit={handleFormSubmit}>
                                    <Row>
                                        <Col lg={12} md={12} className="mb-3">
                                            {/*  password */}
                                            <Form.Label>Enter Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                id="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Enter Password."
                                                required
                                            />
                                        </Col>
                                        <Col lg={12} md={12} className="mb-3">
                                            {/*  confirm Password */}
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                id="cPassword"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="Enter Confirm Password"
                                                required
                                            />
                                        </Col>
                                        <Col lg={12} md={12} className="mb-3 d-grid gap-2">
                                            {/* Button */}
                                            <Button variant="primary" type="submit">
                                                Reset Password
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
            ) : (
                <div>
                    <h1>Expired Link</h1>
                    <p>The reset link has expired. Please request a new one.</p>
                </div>
            )}

        </Fragment>
    );
};

ForgetPassword.Layout = AuthLayout;

export default ForgetPassword;

// return (
//     <Fragment>
//         {/* Geeks SEO settings  */}
//         <ToastContainer />
//         <GeeksSEO title="Confirm Password | Cybrom Technology pvt. ltd." />

//         {isTokenValid ? (
//             <Row className="align-items-center justify-content-center g-0 min-vh-100">
//                 <Col lg={5} md={5} className="py-8 py-xl-0">
//                     <Card>
//                         <Card.Body className="p-6">
//                             {/* Rest of your form content */}
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//         ) : (
//             <div>
//                 <h1>Expired Link</h1>
//                 <p>The reset link has expired. Please request a new one.</p>
//             </div>
//         )}
//     </Fragment>
// );


