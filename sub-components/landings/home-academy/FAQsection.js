import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// import widget/custom components
import { GKAccordionPlus, SectionHeadingCenter } from 'widgets';

// import data files
import { FAQList } from 'data/courses/LeadCourseData';
import axios from 'axios';

const FAQsection = () => {
    const title = 'Frequently Asked questions';
    const subtitle = 'Frequently Asked questions';
    const [alldata, setAlldata] = useState([]);

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/siteSettings/landingPage/faq/getAll");
            if (res.status === 200) {
                setAlldata(res.data)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const splitFAQItems = (items) => {
        const middleIndex = Math.ceil(items.length / 2);
        const leftItems = items.slice(0, middleIndex);
        const rightItems = items.slice(middleIndex);
        return { leftItems, rightItems };
    };

    const { leftItems, rightItems } = splitFAQItems(alldata);

    return (
        <section className="py-8 bg-white">
            <Container>
                <SectionHeadingCenter
                    title={title}
                    subtitle={subtitle}
                />
                <Row className="justify-content-center">
                    <Col lg={6} md={8} sm={12} className=''>
                        {leftItems.length > 0 && <GKAccordionPlus accordionItems={leftItems} itemClass="px-0" />}
                    </Col>
                    <Col lg={6} md={8} sm={12} className=''>
                        {rightItems.length > 0 && <GKAccordionPlus accordionItems={rightItems} itemClass="px-0" />}
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default FAQsection;