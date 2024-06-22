// import node module libraries
import React, {Fragment } from "react";
import { Col, Card } from "react-bootstrap";
import { GKAccordionProgress } from "widgets";
import { CourseIndex } from "data/courses/CourseIndexData";

const GKAccordionDefault = ({ parsedItem }) => {
  return (
    <Fragment>
      <Col xl={12} lg={12} md={12} sm={12}>
        <Card>
          <GKAccordionProgress
            accordionItems={CourseIndex}
            parsedItem={parsedItem}
          />
        </Card>
      </Col>
    </Fragment>
  );
};

export default GKAccordionDefault;
