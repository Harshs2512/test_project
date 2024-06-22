import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Button, Card, Image } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import Link from 'next/link';

const StudentStory = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [allposts, setAllpost] = useState([]);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleHover = (index) => {
    setExpandedIndex(index);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/siteSettings/landingPage/placementStory/getRecords");
      if (res.status === 200) {
        setAllpost(res.data)
      }
    }
    catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchData();
    }
  }, []);

  const renderCard = (item, index) => {
    const isExpanded = index === expandedIndex;

    const cardClassName = `cursor-pointer d-flex
    ${index === 0 ? (isMobile ? 'rounded-top' : 'rounded-start bg-danger') : ''}
    ${index === 1 ? 'bg-dark' : ''} 
    ${index === 2 ? 'bg-warning' : ''} 
    ${index === 3 ? 'bg-success' : ''}
    ${index === 4 ? 'bg-gray-300' : ''}
    ${index === 4 ? (isMobile ? 'rounded-bottom' : 'rounded-end bg-danger') : ''}`

    const maincard1 = {
      "height": isMobile ? (isExpanded ? "62vh" : "30vh") : "68vh",
      "width": isExpanded ? (!isMobile ? "30vw" : "90%") : (!isMobile ? "30vh" : "90%"),
      "overflow": "hidden",
      "transition": "width 0.5s ease",
    };

    return (
      <div
        key={index}
        className={cardClassName}
        onMouseEnter={() => handleHover(index)}
        style={{
          backgroundImage: `url(/api/siteSettings/landingPage/placementStory/getStudenticon/${item._id}), url(/images/cybrommain/Studentcard${index + 1}.avif`,
          backgroundSize: `${isMobile ? (isExpanded ? "200px" : "100px") : (isExpanded ? "200px" : "170px")}, cover`,
          backgroundPosition: 'right bottom, center center',
          backgroundRepeat: 'no-repeat, no-repeat',
        }}
      >
        <div className="shadow-lg" style={maincard1}>
          <div className={`ms-md-3 ${isExpanded ? 'pe-lg-10 w-100' : ''} ${isMobile && 'mb-3'} justify-content-between text-wrap`}>
          <div className={`py-1 ${isExpanded ? "justify-content-center align-items-center p-md-3 m-md-4 p-1 m-2" : ""}`}>
              {isExpanded ? (
                <div>
                  <h3
                    className={`mb-1 ${isMobile ? 'fs-2 me-0 ms-2' : 'h1'
                      } pb-3 text-inherit text-white lh-sm`}
                  >
                    {item.title}
                  </h3>
                </div>

              ) : (
                <h3
                  className={`mb-lg-1 ${isMobile ? 'fs-3 me-0 ms-2 w-50 mt-3' : 'fs-3 me-1'
                    } mt-lg-6 text-inherit text-white lh-sm text-warning`}
                >
                  {item.title}
                </h3>
              )}
              {isExpanded && (
                <div>
                  <p
                    className={`mb-3 ${isMobile ? 'fs-4 me-0 ms-2 w-50' : 'fs-3'
                      } lh-sm text-inherit me-1 student-description text-white`}
                    style={{ "width": "290px" }}
                  >
                    {item.description}
                  </p>
                  <h2
                    className={`mb-0 ${isMobile ? 'fs-6 me-0 ms-2' : 'fs-3'
                      } text-inherit me-1 text-white`}
                  >
                    {item.student_name}
                  </h2>
                  <div className="w-20">
                    <Image
                      src={`/api/siteSettings/landingPage/placementStory/getCompanylogo/${item._id}`}
                      alt="Company Logo"
                      className="mt-3"
                    />
                  </div>
                </div>
              )}
              {!isExpanded && (
                <h2
                  className={`mb-1 ${isMobile ? 'fs-6 me-0 ms-2' : 'fs-3'
                    } text-inherit me-1 `}
                >
                  ~ {item.student_name}
                </h2>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  const bg = {
    backgroundImage: 'url("/images/svg/Grid2.svg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  return (
    <section className="py-12 pb-8 position-relative" style={bg}>
      {/* fas? */}
      <Col xl={12} md={12} xs={12}>
        <div className="text-center mb-8">
          <span className={`text-uppercase fw-bold ls-md fs-3`}>
            Latest Placed Student
          </span>
          <h2 className="h1 fw-bold mt-1">
            Every student has a placement story to inspire you!
          </h2>
        </div>
      </Col>
      <Col className="d-lg-flex justify-content-center px-5">
        {allposts.length > 0 && allposts.slice(0, 5).map((item, index) => renderCard(item, index))}
      </Col>
    </section >
  );
};

export default StudentStory;