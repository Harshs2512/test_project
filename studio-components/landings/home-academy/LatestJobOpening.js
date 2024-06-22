// import node module libraries
import { Col, Row, Container, Button } from "react-bootstrap";

// import widget/custom components
import { JobListingListviewCard } from "widgets";

// import required data files

import { useState, useEffect } from "react";
import axios from "axios";
const LatestJobOpening = () => {
  const [allPlaced, setAllPlaced] = useState([]);
  const getPosts = async () => {
    try {
      const res = await axios.get("/api/siteSettings/landingPage/placementRecords/getRecords");
      if (res.status === 200) {
        setAllPlaced(res?.data);
      }
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <section>
      <Container>
        <Row className="row">
          <div className="text-center mb-8">
            <h2 className="h2 fw-bold mt-3 text-uppercase">
              most viewed interview experiences
            </h2>
            <span className="lead fw-semi-bold ls-md">
              Read more interview experiences and keep yourself up to date
            </span>
          </div>
          <Col
            className="border rounded shadow-lg"
            xl={{ span: 12, offset: 0 }}
            md={12}
            xs={12}
            style={{ height: "875px", overflowY: "auto" }}
          >
            {allPlaced.map((item, index) => (
              <JobListingListviewCard item={item} key={index} />
            ))}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default LatestJobOpening;
