// import node module libraries
import React, { Fragment, useEffect, useState } from "react";
import { Col, Row, Container, Tab } from "react-bootstrap";
import axios from "axios";
// import widget/custom components
import { FormSelect, GridListViewButton, PageHeading, GeeksSEO } from "widgets";

// import sub components
import {
  TutorialFilterOptions,
  TutorialGridView,
  TutorialListView,
} from "sub-components";
const Alltutorials = (props) => {
  const [filters, setFilters] = useState();
  const [sortData, setSortData] = useState();
  const handleFilter = (filterData) => {
    setFilters(filterData);
  };
  const handleSorting = (sortData) => {
    setSortData(sortData);
  };
  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="All Tutorials | Cybrom Technology Pvt. Ltd." />
      {/* Content */}
      <section className="py-6">
        <Container>
          <Tab.Container defaultActiveKey="list">
            <Row>
              <Col lg={12} md={12} sm={12} className="mb-4">
                <Row className="d-lg-flex justify-content-between align-items-center">
                  <Col md={6} lg={8} xl={9}>
                    <h4 className="mb-3 mb-lg-0">
                      Displaying 9 out of 68 Tutorials
                    </h4>
                  </Col>
                  <Col md={6} lg={4} xl={3} className="d-inline-flex">
                    <div className="me-2">
                      <GridListViewButton keyGrid="grid" keyList="list" />
                    </div>
                    <FormSelect
                      placeholder="Sort by"
                      onDataChange={handleSorting}
                    />
                  </Col>
                </Row>
              </Col>
              <Col xl={3} lg={3} md={4} sm={12} className="mb-4 mb-lg-0">
                <TutorialFilterOptions onDataChange={handleFilter} />
              </Col>
              {/* Tab content */}
              <Col xl={9} lg={9} md={8} sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="grid" className="pb-4 px-0">
                    <TutorialGridView filters={filters} sortBy={sortData} datas={props} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="list" className="pb-4 px-0 react-code">
                    <TutorialListView filters={filters} sortBy={sortData} datas={props} />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </section>
    </Fragment>
  );
};

export const getServerSideProps = async () => {
  try {
    const coursesRes = await axios.get(`${process.env.NEXTAUTH_URL}/api/tutorial/guided`);
    const allCourses = coursesRes?.data?.coursesGuide || [];
    let filteredData = allCourses;
    return {
      props: {
        datas: filteredData,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        data: [],
      },
    };
  }
};
export default Alltutorials;
