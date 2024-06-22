import React, { Fragment, useEffect, useState } from "react";
import { Col, Row, Container, Tab, Nav } from "react-bootstrap";
import axios from "axios";
import { OfflineCourseCard } from "widgets";
import useMounted from "hooks/useMounted";

const MostPopularOfflineCourses = ({ alldata }) => {
  const [allcourse, setAllcourse] = useState([]);
  const [tabs, setCategories] = useState([]);
  const [activeKey, setActiveKey] = useState("ALL");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const hasMounted = useMounted();
  const handleToggle = (tab, category) => {
    setSelectedCategory(category);
    setActiveKey(tab);
    if (tab === "All") {
      setActiveKey("ALL");
    } else {
      setActiveKey(category.title);
    }
  };
  const fetchData = async () => {
    try {
      let coursesRes = [];

      if (selectedCategory) {
        coursesRes = alldata?.filter((item) => item.category === selectedCategory);
      }
      else {
        coursesRes = alldata;
      }

      const courses = coursesRes || [];
      setAllcourse(courses);
      const categoriesRes = await axios.get(`/api/siteSettings/megaMenu/category/getcategory`);
      setCategories(categoriesRes.data?.categories || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  return (
    <section className="pb-lg-14 pb-8">
      <Container>
        <Row>
          <Col xs={12}>
            <div className="mb-6 mt-10">
              <h2 className="mb-1 h1">Popular Courses</h2>
              <p>
                These are the most popular courses among Cybrom Courses
                learners worldwide in year 2024
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Tab.Container defaultActiveKey="ALL" activeKey={activeKey}>
              <Nav className="nav-lb-tab  mb-6 bg-gray-200 px-5 rounded-3 justify-content-center">
                <Nav.Item className="ms-0">
                  <Nav.Link
                    className={`mb-sm-3 mb-md-0 ${activeKey === "ALL" ? "active" : ""
                      }`}
                    onClick={() => {
                      setSelectedCategory(null);
                      setActiveKey("ALL");
                    }}
                    style={{ color: activeKey === "ALL" ? "" : "inherit" }}
                  >
                    All
                  </Nav.Link>
                </Nav.Item>
                {tabs?.map((category, index) => (
                  <Nav.Item key={index} className={index === 0 ? "ms-0" : ""}>
                    <Nav.Link
                      eventKey={category.title}
                      onClick={() => {
                        handleToggle(category.title, category._id);
                      }}
                      className={`mb-sm-3 mb-md-0 ${activeKey === category.title ? "active" : ""
                        }`}
                      style={{
                        color:
                          activeKey === category.title ? "red" : "inherit",
                      }}
                    >
                      {category.title}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>

              <Tab.Content>
                <Row>
                  {allcourse?.slice(0, 8).map((item, index) => {
                    return (
                      <Col lg={3} md={6} sm={12} key={index}>
                        {hasMounted && <OfflineCourseCard item={item} />}
                      </Col>
                    );
                  })}
                </Row>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MostPopularOfflineCourses;
