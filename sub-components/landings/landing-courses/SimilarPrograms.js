// import node module libraries
import React, { Fragment, useEffect, useState } from 'react';
import { Col, Row, Container, Form } from 'react-bootstrap';

// import widget/custom components
import { FormSelect, PageHeadingBriefinfo, GeeksSEO, SectionHeadingCenter } from 'widgets';

// import sub components
import { CoursePathCard, CoursePathCardOffline } from 'sub-components';

// import data files
import { CoursePathData } from 'data/courses/CoursePathData';
import axios from 'axios';
import useToggle from 'hooks/useToggle';
import Loader from '../../../pages/loading';
import Loder from 'widgets/Loder';

const CoursePath = () => {
    const [alldata, setAlldata] = useState([]);
    const [alldataoffline, setAlldataOffline] = useState([]);
    const [offid, setOffid] = useState([]);
    const [loading, setLoading] = useState(false);
    const [Mode, toggleMode] = useToggle(true);

    const fetchData = async () => {
        try {
            setLoading(true);

            const coursesResOff = await axios.get('/api/siteSettings/secondPage/ourofflineprograms/getRecord');
            const resOff = await axios.get('/api/siteSettings/megaMenu/coursePage/getRecords');
            if (coursesResOff.status === 200) {
                const filteredData = resOff?.data?.map((category) => {
                    const offlineProgram = coursesResOff?.data?.find((data) => data?.course === category._id);
                    return {
                        ...category,
                        c_id: offlineProgram?._id,
                    };
                });
                setAlldataOffline(filteredData);
            }
            const coursesRes = await axios.get(`/api/siteSettings/secondPage/ouronlineprograms/getRecord`);
            const res = await axios.get(`/api/category/getcategories`);

            if (coursesRes.status === 200) {
                const filteredData = res?.data?.categories.map((category) => {
                    const onlineProgram = coursesRes?.data?.find((data) => data?.category === category._id);
                    return {
                        ...category,
                        c_id: onlineProgram?._id,
                    };
                });
                setAlldata(filteredData);
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const changeMode = () => {
        toggleMode(true);
    };

    const title = 'Our Similar Programms';
    const subtitle = 'programs';
    const description = `Explore new skills, deepen existing passions, and get lost in creativity. What you find
    just might surprise and inspire you.`;
    return (
        <Fragment>
            {/* Content */}
            <section className="container py-lg-10">
                <SectionHeadingCenter
                    title={title}
                    description={description}
                    subtitle={subtitle}
                />
                <div
                    id="pricing-switch"
                    className="d-flex justify-content-center align-items-center mb-5"
                >
                    <span className="me-3">OFFLINE</span>
                    <Form>
                        <Form.Check
                            name="radios"
                            type="checkbox"
                            className="form-switch form-switch-price"
                            id="pricingSwitch"
                            checked={Mode}
                            onChange={changeMode}
                        />
                    </Form>
                    <span className="ms-2">ONLINE</span>
                </div>
                {loading ? <Loader /> :
                    <Row>
                        {!Mode ?
                            alldataoffline?.slice(0, 9).map((item, index) => (
                                <Col xl={4} lg={6} md={6} sm={12} key={index}>
                                    <CoursePathCard item={item} />
                                </Col>
                            ))
                            :
                            alldata?.filter((cid) => cid.c_id).slice(0, 9).map((item, index) => (
                                <Col xl={4} lg={6} md={6} sm={12} key={index}>
                                    <CoursePathCardOffline item={item} />
                                </Col>
                            ))
                        }
                    </Row>
                }

            </section>
        </Fragment>
    );
};

export default CoursePath;
