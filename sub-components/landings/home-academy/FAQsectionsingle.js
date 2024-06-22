import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
// import widget/custom components
import { GKAccordionTab, SectionHeadingCenter } from 'widgets';

import axios from 'axios';

const FAQsectionsingle = () => {

    const title = 'Frequently Asked questions';
    const subtitle = 'Frequently Asked questions';
    const [allfaqdata, setAllfaqdata] = useState([]);
    const [divindex, setDivindex] = useState(0);
    const isMobile = useMediaQuery({ query: '(max-width: 462px)' });
    const [selectedDiv, setSelectedDiv] = useState(0);

    const handleDivClick = (index) => {
        setDivindex(index);
        setSelectedDiv(index === selectedDiv ? null : index);
    };

    const getBorderColor = (index) => {
        return selectedDiv === index ? 'warning' : 'black';
    };
    const fetchDatas = async () => {
        try {
            const { data } = await axios.get("/api/siteSettings/landingPage/faq-special/addRecord");
            const faqData = data[0]?.titles;
            setAllfaqdata(faqData);
        } catch (error) {
            console.log("Error fetching categories:", error);
            toast.error("Error fetching categories");
        }
    };
    useEffect(() => {
        fetchDatas();
    }, []);
    return (
        <section className="py-8 bg-white">
            <Container>
                <SectionHeadingCenter
                    title={title}
                    subtitle={subtitle}
                />
                <Row>
      <Col md={3} className="p-2">
        <div className='p-2 d-md-block d-flex flex-column flex-md-row'>
          {allfaqdata?.map((item, arrayIndex) => (
            <div key={arrayIndex} className="w-100">
              <div
                className={`rounded d-flex p-lg-2 p-2 border border-1 border-${getBorderColor(arrayIndex)} mb-3 card-hover-with-icon shadow-lg me-2`}
                onClick={() => handleDivClick(arrayIndex)}
              >
                <h3 className={`text-${getBorderColor(arrayIndex)} mb-0 my-2`} style={{ fontSize: '1.1rem' }}>
                  {item.title}
                </h3>
              </div>
              {arrayIndex !== allfaqdata.length - 1 && !isMobile && (
                <span className="border-end-0 border-top-0 border-bottom-0 mx-5 pt-3 dashed-border border-black"></span>
              )}
            </div>
          ))}
        </div>
      </Col>
      <Col lg={9} md={8} sm={12}>
        {allfaqdata[divindex]?.Questions?.length > 0 && (
          <GKAccordionTab accordionItems={allfaqdata[divindex].Questions} itemClass="px-0" />
        )}
      </Col>
    </Row>
            </Container>
        </section>
    );
};

export default FAQsectionsingle;
