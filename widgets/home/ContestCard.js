import { Fragment, useState, useEffect } from "react";
import { Col, Row, Container, Tab, Nav, Collapse } from "react-bootstrap";
import { CodeSlider } from "widgets";
import axios from "axios";

const MostPopularCourses = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null); 
  const [activeLevel, setActiveLevel] = useState("All"); 
  const [originalData, setOriginalData] = useState();
  const tabs = ["All"];
  const levels = ["Beginners", "Intermediate", "Advanced"];
  const [filteredData, setFilteredData] = useState([]);
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setActiveLevel("All"); 
    fetchData(category);
  };

  const handleLevelClick = (level) => {
    console.log(level,"level")
    setActiveLevel(level);
    filterDataByLevel(originalData, level);
  };

  const fetchData = async (category = null) => {
    try {
      let coursesRes;
      if (category) {
        coursesRes = await axios.get(
          `/api/Course-guide/guided?category=${category}`
        );
      } else {
        coursesRes = await axios.get(`/api/Course-guide/guided`);
      }
      const GuidData = coursesRes?.data?.Learning || [];
      setData(GuidData);
      setOriginalData(GuidData);

      setFilteredData(GuidData);

      const categoriesRes = await axios.get(`/api/Contest/crudCategory`);
      setCategories(categoriesRes?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterDataByLevel = (originalData, level) => {
    if (level === "All") {
      setFilteredData(originalData);
    } else {
      const filtered = originalData.filter((learning) => learning.contest_level === level);
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <section className="pb-lg-14 pb-8 bg-white">
        <Container>
          <Row>
            <Col xs={12}>
              <div className="mb-6">
                <h2 className="mb-1 h1">Most Popular Code Learning Guide</h2>
                <p>
                  These are the most popular courses among Cybrom Courses
                  learners worldwide in the year 2023
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Tab.Container defaultActiveKey="All">
                <Nav className="nav-lb-tab  mb-6 bg-gray-200 px-5 rounded-3 justify-content-center">
                  <Nav.Item className="ms-0">
                    <Nav.Link
                      className={`mb-sm-3 mb-md-0 ${activeCategory === null ? "active" : ""}`}
                      onClick={() => handleCategoryClick(null)}
                    >
                      All
                    </Nav.Link>
                  </Nav.Item>
                  {categories.map((category, index) => (
                    <Nav.Item key={index} className={index === 0 ? "ms-0" : ""}>
                      <Nav.Link
                        className={`mb-sm-3 mb-md-0 ${activeCategory === category._id ? "active" : ""}`}
                        onClick={() => handleCategoryClick(category._id)}
                      >
                        {category.catName}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
                <div className="nav-lb-tab  mb-6 px-5 rounded-3 justify-content-center d-flex">
                  {levels.map((level, index) => (
                    <Nav.Item key={index} className={index === 0 ? "ms-0" : ""}>
                      <Nav.Link
                        className={`mb-sm-3 mb-md-0 ${activeLevel === level ? "active" : ""}`}
                        onClick={() => handleLevelClick(level)}
                      >
                        {level}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </div>
                <Tab.Content>
                  <Tab.Pane eventKey="All" className="pb-4 p-4 ps-0 pe-0">
                    <Row>
                      <Col lg={12} md={12} sm={12}>
                        <CodeSlider Item={filteredData} />
                      </Col>
                    </Row>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default MostPopularCourses;
