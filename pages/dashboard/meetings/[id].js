import { Col, Row, Button, Container, Breadcrumb } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loder from 'widgets/Loder';

const Meeting = () => {
    const { data: session } = useSession()
    const [alldata, setAlldata] = useState([]);
    const [showpasscode, setShowpasscode] = useState(false);
    const [loading, setLoading] = useState(false);
    const pathId = useParams()
    const router = useRouter()
    console.log(pathId)
    const fetchMeetings = async () => {
        try {
            const res = await axios.get(`/api/zoom/${pathId?.id}`);
            if (res.status === 200) {
                setAlldata(res.data)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    const deleteMeeting = async (id) => {
        setLoading(true)
        try {
            const res = await axios.delete(`/api/zoom/${id}`);
            if (res.status === 200) {
                fetchMeetings();
                toast.success("Deleted");
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    };

    useEffect(() => { fetchMeetings() }, [pathId]);

    const copyInvitationURL = async () => {
        try {
            await navigator.clipboard.writeText(`localhost:3000/zoom/meeting?meetingNumber=${alldata?.id}&role=0&userName=${session?.user?.fname}&password=${alldata?.password}`);
            toast.success('Invitation URL copied to clipboard!')
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    return (
        <Fragment>
            <ToastContainer />
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-flex justify-content-between">
                        <div className="mb-3 mb-md-0">
                            <h1 className="mb-1 h2 fw-bold">
                                Single Meeting
                            </h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Meetings</Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    My Meeting
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>{alldata?.topic}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="mb-3 mb-lg-0">
                            <Button variant='primary' onClick={() => router.push("/dashboard/meetings/allmeetings")}>All Meetings</Button>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-1 mb-4">
                        <div className="mb-3 mb-md-0">
                            <h1 className="mb-1 h2 fw-semibold">
                                Details
                            </h1>
                        </div>
                    </div>
                </Col>
            </Row>
            {alldata && Object.keys(alldata).length > 0 ? (
                <>
                    <Row className="px-1 px-lg-8">
                        <Col xl={3} md={3} xs={4} className='mb-3'>
                            <div>
                                <p className="pb-4 text-dark fw-semibold">Topic</p>
                                <p className="pb-4 text-dark fw-semibold">Time</p>
                                <p className="pb-4 text-dark fw-semibold">Meeting ID</p>
                                <p className="pb-4 text-dark fw-semibold">Security</p>
                                <p className="pb-4 text-dark fw-semibold">Invite Link</p>
                                <p className="pb-4 text-dark fw-semibold">Video</p>
                            </div>
                        </Col>
                        <Col xl={9} md={9} xs={8} className='mb-3'>
                            <div>
                                <p className="pb-4 text-dark fw-normal">{alldata?.topic}</p>
                                <p className="pb-4 text-dark fw-normal">{alldata?.start_time}</p>
                                <p className="pb-4 text-dark fw-normal">{alldata?.id}</p>
                                <div className="pb-4 d-flex gap-2">
                                    <i class="fas fa-check"></i>
                                    <p className="text-dark fw-normal">Passcode</p>
                                    {!showpasscode ? <p className="text-dark fw-normal">*******</p> :
                                        <p className="text-dark fw-normal">{alldata?.password}</p>
                                    }
                                    <p className="text-info fw-normal" style={{ cursor: 'pointer' }} onClick={() => setShowpasscode((prev) => !prev)}>{!showpasscode ? "Show" : "Hide"}</p>
                                </div>
                                <p className="pb-4 text-dark fw-bold">
                                    <Link href={`/zoom/meeting?meetingNumber=${alldata?.id}&role=0&userName=${session?.user?.fname}&password=${alldata?.password}`} target='_blank'>{`localhost:3000/zoom/meeting?meetingNumber=${alldata?.id}&role=0&userName=${session?.user?.fname}&password=${alldata?.password}`}</Link></p>
                                <div>
                                    {console.log()}
                                    <div className='d-flex gap-3'>
                                        <p className="text-dark fw-normal">Host</p>
                                        <p className="text-dark fw-normal">{alldata?.settings.host_video ? "On" : "Off"}</p>
                                    </div>
                                    <div className='d-flex gap-3'>
                                        <p className="text-dark fw-normal">Host</p>
                                        <p className="text-dark fw-normal">{alldata?.settings.participant_video ? "On" : "Off"}</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="bg-gray-200 py-3 px-2 rounded">
                        <Col lg={12} md={12} sm={12}>
                            <div className="d-flex justify-content-between gap-10">
                                <div className="mb-3 mb-md-0 d-flex gap-2">
                                    <Button variant='primary' href={alldata.start_url} target='_blank'>Start</Button>
                                    <Button variant='primary' onClick={() => copyInvitationURL()}>Copy invitation</Button>
                                    <Button variant='primary' onClick={() => router.push("/dashboard/meetings/allmeetings")}>Edit</Button>
                                    <Button variant='primary' onClick={() => deleteMeeting(alldata?.id)}>{loading ? <Loder /> : "Delete"}</Button>
                                </div>
                                <div className="mb-3 mb-lg-0">
                                    <Button variant='white' onClick={() => router.push("/dashboard/meetings/allmeetings")}>Save as Template</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </>
            ) : (
                <div className='text-center'>
                    This ID not found {pathId?.id}
                </div>
            )}
        </Fragment>
    )
}

export default Meeting;
