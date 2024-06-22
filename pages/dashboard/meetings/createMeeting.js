// import node module libraries
import React, { Fragment, useEffect, useState } from 'react';
import {
    Card, Row, Col, Button, Breadcrumb, Form
} from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import formatDate from 'helper/formatDate';
import { useRouter } from 'next/router';
import Loder from 'widgets/Loder';

const CreateMeeting = () => {
    const router = useRouter();
    const [autoId, setAutoId] = useState(true);
    const [enddate, setEnddate] = useState(true);
    const [reccurence, setReccurence] = useState(false);
    const [occursMonth, setOccursMonth] = useState(false);
    const [loading, setLoading] = useState(false);

    const generateRandomPasscode = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters.charAt(randomIndex);
        }
        return code;
    };

    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        if (minutes >= 30) {
            hours++;
        }
        minutes = (minutes < 30) ? 0 : 30;
        hours = hours % 24;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    function generateTimeOptions() {
        const options = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                options.push(<option key={time} value={time}>{time}</option>);
            }
        }
        return options;
    }

    const [formData, setFormData] = useState({
        topic: 'My Meeting',
        agenda: '',
        date: new Date().toISOString().split('T')[0],
        time: getCurrentTime(),
        aftertime: '',
        durationTime: 1,
        durationMinute: '',
        pmi: '',
        password: generateRandomPasscode(6),
        waiting_room: false,
        settings: {
            host_video: false,
            participant_video: false,
            mute_upon_entry: false,
        },
        recurrence: {
            type: "1",
            end_date_time: new Date(),
            repeat_interval: "1",
            end_times: "1",
            monthly_day: "1",
            monthly_week: "1",
            monthly_week_day: "1",
            weekly_days: "1"
        }
    });

    const recurrenceEndDate = new Date(formData.recurrence.end_date_time);
    recurrenceEndDate.setDate(recurrenceEndDate.getDate() + 6);

    let recurrenceData;
    if (enddate) {
        if (formData.recurrence.type === "1") {
            recurrenceData = {
                end_date_time: recurrenceEndDate,
                type: formData.recurrence.type,
                repeat_interval: formData.recurrence.repeat_interval,
            };
        }
        if (formData.recurrence.type === "2") {
            recurrenceData = {
                end_date_time: recurrenceEndDate,
                type: formData.recurrence.type,
                repeat_interval: formData.recurrence.repeat_interval,
                weekly_days: formData.recurrence.weekly_days
            };
        }
        if (formData.recurrence.type === "3") {
            if (occursMonth) {
                recurrenceData = {
                    end_date_time: recurrenceEndDate,
                    type: formData.recurrence.type,
                    repeat_interval: formData.recurrence.repeat_interval,
                    monthly_day: formData.recurrence.repeat_interval,
                };
            }
            else {
                recurrenceData = {
                    end_date_time: recurrenceEndDate,
                    type: formData.recurrence.type,
                    repeat_interval: formData.recurrence.repeat_interval,
                    monthly_week: formData.recurrence.repeat_interval,
                    monthly_week_day: formData.recurrence.repeat_interval,
                };
            }
        }
    } else {
        if (formData.recurrence.type === "1") {
            recurrenceData = {
                end_times: formData.recurrence.end_times,
                type: formData.recurrence.type,
                repeat_interval: formData.recurrence.repeat_interval,
            };
        }
        if (formData.recurrence.type === "2") {
            recurrenceData = {
                end_times: formData.recurrence.end_times,
                type: formData.recurrence.type,
                repeat_interval: formData.recurrence.repeat_interval,
                weekly_days: formData.recurrence.weekly_days
            };
        }
        if (formData.recurrence.type === "3") {
            if (occursMonth) {
                recurrenceData = {
                    end_times: formData.recurrence.end_times,
                    type: formData.recurrence.type,
                    repeat_interval: formData.recurrence.repeat_interval,
                    monthly_day: formData.recurrence.repeat_interval,
                };
            }
            else {
                recurrenceData = {
                    end_times: formData.recurrence.end_times,
                    type: formData.recurrence.type,
                    repeat_interval: formData.recurrence.repeat_interval,
                    monthly_week: formData.recurrence.repeat_interval,
                    monthly_week_day: formData.recurrence.repeat_interval,
                };
            }
        }
    }

    const handleReccurence = (e) => {
        setReccurence((e) => !e)
        setFormData({ ...formData, type: "8" })
    }

    const autoID = () => {
        if (autoId) {
            const id = generateRandomId(10)
            setFormData({ ...formData, pmi: id })
            setFormData({ ...formData, waiting_room: false })
        }
        else {
            setFormData({ ...formData, pmi: '9499777785' })
            setFormData({ ...formData, waiting_room: true })
        }
    }

    useEffect(() => {
        autoID()
    }, [autoId])

    const formatDate_data = (dateString, timeString) => {
        const date = new Date(dateString);
        let hours = parseInt(timeString.split(':')[0]) - 5;
        const minutes = parseInt(timeString.split(':')[1]);
        const isoString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00Z`;
        return isoString;
    };

    const formatTime = (timeString, minuteString) => {
        const duration = parseInt(timeString) * 60 + parseInt(minuteString)
        return duration;
    };

    const generateRandomId = (length) => {
        const characters = '0123456789';
        let code = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters.charAt(randomIndex);
        }
        return code;
    };

    const handleWeeklyDayChange = (e, dayNumber) => {
        let updatedWeeklyDays = formData.recurrence.weekly_days || "";
        if (e.target.checked) {
            updatedWeeklyDays += (updatedWeeklyDays ? "," : "") + dayNumber;
        } else {
            updatedWeeklyDays = updatedWeeklyDays.split(",").filter(day => day !== dayNumber.toString()).join(",");
        }
        setFormData({ ...formData, recurrence: { ...formData.recurrence, weekly_days: updatedWeeklyDays } });
    };

    const submitData = async () => {
        setLoading(true)
        const data = {
            topic: formData.topic,
            agenda: formData.agenda,
            start_time: formatDate_data(formData.date, formData.time),
            start_url: "https://example.com/s/11111",
            timezone: "Asia/Calcutta",
            duration: formatTime(formData.durationTime, formData.durationMinute),
            pmi: false,
            password: formData.password,
            waiting_room: formData.waiting_room,
            recurrence: recurrenceData,
            settings: {
                host_video: formData.settings.host_video,
                participant_video: formData.settings.participant_video,
                mute_upon_entry: formData.settings.mute_upon_entry,
            },
            type: reccurence ? "8" : "2"
        }
        if (reccurence) {
            data.recurrence = recurrenceData;
        }
        try {
            const res = await axios.post(`/api/zoom/createMeeting`, data);
            if (res.status === 200) {
                toast.success("Add Successfully");
                router.push("/dashboard/meetings/allmeetings")
            } else {
                toast.info("Already Exist");
            };
        }
        catch (err) {
            toast.error(err.response)
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <Fragment>
            <ToastContainer />
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                        <div className="mb-3 mb-md-0">
                            <h1 className="mb-1 h2 fw-bold">Meetings</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href="#">Meetings</Breadcrumb.Item>
                                <Breadcrumb.Item active>Create Meeting </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center border-bottom card-header-height mb-4" >
                            <h4 className="mb-0">Create Meeting</h4>
                        </Card.Header>
                        <Card.Body className="p-0 mx-10">
                            <Form>
                                <Form.Group id="topic" className='mb-3'>
                                    <Form.Label>Topic</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Meeting"
                                        id="topic"
                                        value={formData.topic}
                                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group id="description" className='mb-3'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Description"
                                        id="description"
                                        value={formData.agenda}
                                        onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
                                    />
                                </Form.Group>
                                <div className='d-flex justify-content-between align-items-center mt-3'>
                                    <Form.Group id="created" className='mb-3 w-50 me-2'>
                                        <Form.Label>When</Form.Label>
                                        <Form.Control
                                            type="date"
                                            id="createdAt"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group id="question" className='mb-3 w-50'>
                                        <Form.Label>Time</Form.Label>
                                        <Form.Select
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                            value={formData.time} // Set the value to formData.time
                                        >
                                            {generateTimeOptions()}
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <div className='d-flex justify-content-between align-items-center mb-3'>
                                    <Form.Group id="question" className='mb-3 w-50 me-2'>
                                        <Form.Label>Duration</Form.Label>
                                        <Form.Select
                                            onChange={(e) => setFormData({ ...formData, durationTime: e.target.value })}
                                        >
                                            <option>{formData.durationTime}</option>
                                            {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'].map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group id="selectToastPlacement" className='mb-3 w-50 mt-5'>
                                        <Form.Select
                                            onChange={(e) => setFormData({ ...formData, durationMinute: e.target.value })}
                                        >
                                            {['0', '15', '30', '45'].map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <Form.Group id="question" className='mb-3 d-flex gap-5'>
                                    <Form.Label>Meeting ID</Form.Label>
                                    <Form.Check
                                        onChange={() => setAutoId(true)}
                                        label="Generate Automatically"
                                        checked={autoId}
                                    />
                                    <Form.Check
                                        onChange={() => setAutoId(false)}
                                        label="Personal Meeting ID 949 977 7785"
                                        checked={!autoId}
                                    />
                                </Form.Group>
                                <Form.Group id="question" className='mb-3 gap-5'>
                                    <Form.Label>Recurrence</Form.Label>
                                    <Form.Check
                                        onChange={(e) => handleReccurence(e.target.value)}
                                        label="Recurring meeting"
                                        checked={reccurence}
                                    />
                                </Form.Group>
                                {enddate ?
                                    <span className='fw-bold mb-1'>{`Every ${formData.recurrence?.type === '1' ? "day" : formData.recurrence?.type === '2' ? "week" : "month"}, until ${formatDate(recurrenceEndDate)}`}</span> :
                                    <span className='fw-bold mb-1'>{`Every ${formData.recurrence?.type === '1' ? "day" : formData.recurrence?.type === '2' ? "week" : "month"}, ${formData.recurrence.end_times} occurrence(s)`}</span>
                                }
                                {reccurence && (
                                    <div className='px-5 py-3 bg-gray-100 mb-3 rounded-lg'>
                                        <div className='d-flex justify-content-between align-items-center mb-3'>
                                            <Form.Group id="question" className='mb-1 w-50 me-2'>
                                                <Form.Label className='me-3'>Recurrence</Form.Label>
                                                <Form.Select
                                                    onChange={(e) => setFormData({ ...formData, recurrence: { ...formData.recurrence, type: e.target.value } })}
                                                    label="afdd"
                                                >
                                                    <option value={1}>Daily</option>
                                                    <option value={2}>Weekly</option>
                                                    <option value={3}>Monthly</option>
                                                </Form.Select>
                                            </Form.Group>
                                            {formData.recurrence.type === '1' && (
                                                <>
                                                    <Form.Group id="question" className='mb-1 w-50 me-2'>
                                                        <Form.Label>Repeat every</Form.Label>
                                                        <Form.Select
                                                            onChange={(e) => setFormData({ ...formData, recurrence: { ...formData.recurrence, repeat_interval: e.target.value } })}
                                                            label="afdd"
                                                        >
                                                            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '15',].map((item) => (
                                                                <option key={item} value={item}>{item}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <span className='mt-4'>day(s)</span>
                                                </>
                                            )}
                                            {formData.recurrence.type === '2' && (
                                                <>
                                                    <Form.Group id="question" className='mb-1 w-50 me-2'>
                                                        <Form.Label>Repeat every</Form.Label>
                                                        <Form.Select
                                                            onChange={(e) => setPosition(e.currentTarget.value)}
                                                            label="afdd"
                                                        >
                                                            {['1', '2', '3', '4', '5', '6', '7'].map((item) => (
                                                                <option key={item} value={item}>{item}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <span className='mt-4'>Week(s)</span>
                                                </>
                                            )}
                                            {formData.recurrence.type === '3' && (
                                                <>
                                                    <Form.Group id="question" className='mb-1 w-50 me-2'>
                                                        <Form.Label>Repeat every</Form.Label>
                                                        <Form.Select
                                                            onChange={(e) => setPosition(e.currentTarget.value)}
                                                            label="afdd"
                                                        >
                                                            {['1', '2', '3'].map((item) => (
                                                                <option key={item} value={item}>{item}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <span className='mt-4'>month(s)</span>
                                                </>
                                            )}
                                        </div>
                                        {formData.recurrence?.type === '2' && (
                                            <Form.Group id="question" className='mb-1 d-flex gap-5'>
                                                <Form.Label>Occurs on</Form.Label>
                                                <Form.Check
                                                    onChange={(e) => handleWeeklyDayChange(e, 1)}
                                                    checked={formData.recurrence.weekly_days.includes('1')}
                                                    label="Sun"

                                                />
                                                <Form.Check
                                                    onChange={(e) => handleWeeklyDayChange(e, 2)}
                                                    label="Mon"

                                                />
                                                <Form.Check
                                                    onChange={(e) => handleWeeklyDayChange(e, 3)}
                                                    label="Tue"

                                                />
                                                <Form.Check
                                                    onChange={(e) => handleWeeklyDayChange(e, 4)}
                                                    label="Wed"
                                                />
                                                <Form.Check
                                                    onChange={(e) => handleWeeklyDayChange(e, 5)}
                                                    label="Thu"
                                                />
                                                <Form.Check
                                                    onChange={(e) => handleWeeklyDayChange(e, 6)}
                                                    label="Fri"
                                                />
                                                <Form.Check
                                                    onChange={(e) => handleWeeklyDayChange(e, 7)}
                                                    label="Sat"
                                                />
                                            </Form.Group>
                                        )}
                                        {formData.recurrence?.type === '3' && (
                                            <Form.Group id="question" className='mb-3'>
                                                <Form.Label>Occurs on</Form.Label>
                                                <div className='d-flex px-10 mb-2'>
                                                    <Form.Check
                                                        type='radio'
                                                        onChange={() => setOccursMonth((prev) => !prev)}
                                                        label="Day"
                                                        checked={occursMonth}
                                                        className='me-2'
                                                    />
                                                    <Form.Select
                                                        className='w-50 me-3'
                                                        onChange={(e) => setFormData({ ...formData, recurrence: { ...formData.recurrence, monthly_day: e.target.value } })}
                                                        checked={!occursMonth}
                                                        disabled={!occursMonth}
                                                        label="afdd"
                                                    >
                                                        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '15',].map((item) => (
                                                            <option key={item} value={item}>{item}</option>
                                                        ))}
                                                    </Form.Select>
                                                    <span>of the month</span>
                                                </div>
                                                <div className='d-flex px-10'>
                                                    <Form.Check
                                                        type='radio'
                                                        onChange={() => setOccursMonth((prev) => !prev)}
                                                        checked={!occursMonth}
                                                        className='me-2'
                                                    />
                                                    <Form.Select
                                                        className='w-30 me-3'
                                                        onChange={(e) => setFormData({ ...formData, recurrence: { ...formData.recurrence, monthly_week: e.target.value } })}
                                                        label="afdd"
                                                        disabled={occursMonth}
                                                    >
                                                        <option value={1}>First</option>
                                                        <option value={2}>Second</option>
                                                        <option value={3}>Third</option>
                                                        <option value={4}>Fourth</option>
                                                        <option value={5}>Last</option>
                                                    </Form.Select>
                                                    <Form.Select
                                                        className='w-30 me-3'
                                                        onChange={(e) => setFormData({ ...formData, recurrence: { ...formData.recurrence, monthly_week_day: e.target.value } })}
                                                        label="afdd"
                                                        disabled={occursMonth}
                                                    >
                                                        <option value={1}>Sunday</option>
                                                        <option value={2}>Monday</option>
                                                        <option value={3}>Tuesday</option>
                                                        <option value={4}>Wednesday</option>
                                                        <option value={5}>Thursday</option>
                                                        <option value={6}>Friday</option>
                                                        <option value={7}>Saturday</option>
                                                    </Form.Select>
                                                    <span>of the month</span>
                                                </div>
                                            </Form.Group>
                                        )}
                                        <Form.Group id="question" className='mb-1 d-flex gap-5'>
                                            <Form.Label>End date</Form.Label>
                                            <Form.Check
                                                type="radio"
                                                onChange={() => setEnddate(true)}
                                                label="By date"
                                                checked={enddate}
                                            />
                                            <Form.Check
                                                type="radio"
                                                onChange={() => setEnddate(false)}
                                                label="After occurrences"
                                                checked={!enddate}
                                            />
                                        </Form.Group>
                                        {!enddate ?
                                            <Form.Group id="selectToastPlacement" className='mb-3'>
                                                <Form.Label>After occurrences</Form.Label>
                                                <Form.Select
                                                    onChange={(e) => setFormData({ ...formData, recurrence: { ...formData.recurrence, end_times: e.target.value } })}
                                                >
                                                    {['1', '2', '3', '4', '5', '6', '7'].map((item) => (
                                                        <option key={item} value={item}>
                                                            {item}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group> :
                                            <Form.Group id="created" className='mb-3 me-2'>
                                                <Form.Label>When</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    id="createdAt"
                                                    value={recurrenceEndDate.toISOString().split('T')[0]}
                                                    onChange={(e) => setFormData({ ...formData, recurrence: { ...formData.recurrence, end_date_time: e.target.value } })}
                                                />
                                            </Form.Group>
                                        }
                                    </div>
                                )}

                                <Form.Group id="question" className='mb-3'>
                                    <Form.Label>Template</Form.Label>
                                    <Form.Select
                                        onChange={(e) => setPosition(e.currentTarget.value)}
                                        label="afdd"
                                    >
                                        <option disabled>Personal Template</option>
                                        <option>None</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group id="passcode" className='mb-4'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Passcode"
                                        id="passcode"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                    <p className='ms-1'>Only users who have the invite link or passcode can join the meeting</p>
                                    <Form.Label>Waiting Room</Form.Label>
                                    <Form.Check
                                        onChange={(e) => setFormData({ ...formData, waiting_room: true })}
                                        label="Waiting Room"
                                        checked={formData.waiting_room}
                                    />
                                    <p className='ms-1'>Only users admitted by the host can join the meeting</p>
                                </Form.Group>
                                <Form.Group id="question" className='mb-3 d-flex gap-5'>
                                    <Form.Label>Video (HOST)</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        onChange={(e) => setFormData({ ...formData, settings: { ...formData.settings, host_video: false } })}
                                        label="Off"
                                        checked={!formData.settings.host_video}
                                    />
                                    <Form.Check
                                        type="radio"
                                        onChange={(e) => setFormData({ ...formData, settings: { ...formData.settings, host_video: true } })}
                                        label="On"
                                        checked={formData.settings.host_video}
                                    />
                                </Form.Group>
                                <Form.Group id="question" className='mb-3 d-flex gap-5'>
                                    <Form.Label>Video (PARTICIPANT)</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        onChange={(e) => setFormData({ ...formData, settings: { ...formData.settings, participant_video: false } })}
                                        label="Off"
                                        checked={!formData.settings.participant_video}
                                    />
                                    <Form.Check
                                        type="radio"
                                        onChange={(e) => setFormData({ ...formData, settings: { ...formData.settings, participant_video: true } })}
                                        label="On"
                                        checked={formData.settings.participant_video}
                                    />
                                </Form.Group>
                                <Form.Group id="question" className='mb-5'>
                                    <div className='d-flex'>
                                        <Form.Label>Settings</Form.Label>
                                        <p className='ms-3'>(Optional)</p>
                                    </div>
                                    {/* <Form.Check
                                        onChange={(e) => setPosition(e.currentTarget.value)}
                                        label="Allow participants to join anytime"
                                    /> */}
                                    <Form.Check
                                        onChange={(e) => setFormData({ ...formData, settings: { ...formData.settings, mute_upon_entry: e.target.checked } })}
                                        label="Mute participants upon entry"
                                        checked={formData.settings.mute_upon_entry}
                                    />
                                    {/* <Form.Check
                                        onChange={(e) => setPosition(e.currentTarget.value)}
                                        label="Automatically record meeting on the local computer"
                                    />
                                    <Form.Check
                                        onChange={(e) => setPosition(e.currentTarget.value)}
                                        label="Approve or block entry to users from specific regions/countriesy"
                                    /> */}
                                </Form.Group>
                            </Form>
                            <Button variant="primary" onClick={() => submitData()} className='me-2 py-2 px-3 mb-3 h1'>
                                {!loading ? "Save" : <Loder />}
                            </Button>
                            <Button variant="" onClick={() => router.push("/dashboard/meetings/allmeetings")} className='me-2 py-1 mb-3'>
                                Cancel
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment >
    );
};

export default CreateMeeting;