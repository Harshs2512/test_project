import React, { Fragment, useEffect, useState } from 'react';
import { Col, Row,Offcanvas} from 'react-bootstrap';
import { OffcanvasCreateProjectForm, ProjectListTable } from 'studio-components';
import Link from 'next/link'
const InterViewReview = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Fragment>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="mb-3 mb-md-0 mx-4">
              <h1 className="mb-1 h2 fw-bold">TOP PROBLEM LISTS</h1>
              <span className="fw-medium text-warning">Curated lists of code problems by top YouTubers and Companies</span>
            </div>
            <div>
              <span>
                <Link href="#" className="btn btn-outline-secondary btn-sm">
                  View More
                </Link>
              </span>
              <Offcanvas
                show={show}
                onHide={handleClose}
                placement="end"
                name="end"
                style={{ width: '600px' }}
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title as="h3">Create Project</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="pt-0">
                  <OffcanvasCreateProjectForm onClick={handleClose} />
                </Offcanvas.Body>
              </Offcanvas>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          {/* <ProjectListTable onNewProject={handleShow} /> */}
        </Col>
      </Row>
    </Fragment>
  );
};

export default InterViewReview;
