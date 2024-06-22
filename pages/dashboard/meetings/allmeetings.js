import { Col, Row, Button } from 'react-bootstrap';
import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Loder from 'widgets/Loder';
import formatDate from 'helper/formatDate';


const Allmeetings = () => {
    const router = useRouter();
    const [alldata, setAlldata] = useState([]);
    const [loadingMap, setLoadingMap] = useState({});

    const fetchMeetings = async () => {
        try {
            const res = await axios.get("/api/zoom/getMeeting");
            if (res.status === 200) {
                setAlldata(res.data)
            }
        }
        catch (error) {
            console.log(error)
        }
    };

    const deleteMeeting = async (id) => {
        // Set loading state for this meeting
        setLoadingMap(prevLoadingMap => ({
            ...prevLoadingMap,
            [id]: true
        }));

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
            // Reset loading state for this meeting
            setLoadingMap(prevLoadingMap => ({
                ...prevLoadingMap,
                [id]: false
            }));
        }
    }

    useEffect(() => { fetchMeetings() }, [loadingMap]);

    const formatTime = (isoString, duration) => {
        const date = new Date(isoString);
        const startHours = date.getHours();
        const startMinutes = date.getMinutes();
        const endMinutes = startMinutes + duration;
        const endHours = startHours + Math.floor(endMinutes / 60);
        const formattedStartHours = startHours > 12 ? startHours - 12 : startHours;
        const formattedEndHours = endHours > 12 ? endHours - 12 : endHours;
        const amPm = startHours >= 12 ? 'PM' : 'AM';
        const formattedStartMinutes = startMinutes < 10 ? `0${startMinutes}` : startMinutes;
        const formattedEndMinutes = endMinutes % 60 < 10 ? `0${endMinutes % 60}` : endMinutes % 60;
        return `${formattedStartHours}:${formattedStartMinutes} - ${formattedEndHours}:${formattedEndMinutes} ${amPm}`;
    };

    const isToday = (someDate) => {
        const today = new Date();
        return someDate.getDate() === today.getDate() &&
            someDate.getMonth() === today.getMonth() &&
            someDate.getFullYear() === today.getFullYear();
    };
    const renderDate = (createdAt) => {
        const date = new Date(createdAt);
        return isToday(date) ? "Today" : formatDate(createdAt);
    };

    return (
        <div>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-lg-flex justify-content-between align-items-center">
                        <div className="mb-3 mb-lg-0">
                            <h1 className="mb-0 h2 fw-bold">Dashboard</h1>
                        </div>
                        <div className="mb-3 mb-lg-0">
                            <Button variant='primary' onClick={() => router.push("/dashboard/meetings/createMeeting")}>Schedule a Meeting</Button>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <ToastContainer />
                {alldata.total_records !== 0 ? (
                    <div>
                        {alldata?.meetings?.map((items) => (
                            <Col xl={{ offset: 1, span: 10 }} md={12} xs={12} key={items.uuid} className='mb-3'>
                                <div>
                                    <h3>
                                        {renderDate(items.created_at)}
                                    </h3>
                                </div>
                                <div className="bg-gray-200 py-5 rounded">
                                    <Row className="align-items-center">
                                        <Col xl={3} md={6} xs={12}>
                                            <div className='px-3'>
                                                <h4 className="mb-3">{formatTime(items.start_time, items.duration)}</h4>
                                            </div>
                                        </Col>
                                        <Col xl={3} md={6} xs={12}>
                                            <div>
                                                <Link href={`/dashboard/meetings/${items.id}`} className="text-inherit h3">
                                                    {items.topic}
                                                </Link>
                                                <p className="mb-3">Meeting ID: {items.id}</p>
                                            </div>
                                        </Col>
                                        <Col xl={{ offset: 2, span: 4 }} md={6} xs={12}>
                                            <div className="gap-3 d-flex">
                                                <Button variant='white' onClick={() => router.push(`/dashboard/meetings/edit-meeting?mid=${items.id}`)}>Edit</Button>
                                                <Button variant='white' onClick={() => deleteMeeting(items.id)}>{loadingMap[items.id] ? <Loder /> : "Delete"}</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        ))}
                    </div>
                ) : (
                    <div className='text-center p-10'>
                        <h1 className='mb-5'>No Meetings Yet!</h1>
                        <Button variant='primary' onClick={() => router.push("/dashboard/meetings/createMeeting")}>Schedule a Meeting</Button>
                    </div>
                )}
            </Row>
        </div>
    )
}

export default Allmeetings;