// Section : Team Section
// Style : Grid with round images

// import node module libraries
import { Col, Row, Container, Image } from "react-bootstrap";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
// import widget/custom components
import { GKTippy } from "widgets";
import axios from "axios";
const TeamGridRoundImages = () => {
  const defaultSkin = useSelector((state) => state.app.skin);
  const [allposts, setAllposts] = useState([]);
  const getPosts = async () => {
    try {
      const res = await axios.get("/api/about/addRecord");
      if (res.status === 200) {
        setAllposts(res?.data);
      }
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <section className="py-lg-8 py-6 bg-white">
      <Container>
        <Row>
          <Col md={6} sm={12} className="offset-right-md-6 mb-5">
            {/* <!-- heading --> */}
            <h2 className="display-4 mb-3 fw-bold">Our Team</h2>
            {/* <!-- lead --> */}
            <p className="lead mb-5">
              Want to work with some of the best global talent and build a tool
              used by all the companies you know and love? Join the Cybrom team
              and help shape the future of design.
            </p>
            {/* <!-- btn --> */}
            <Link href="#" className="btn btn-primary">
              Openings
            </Link>
          </Col>
        </Row>
        <Row>
          {allposts?.map((item, index) => (
            <Col md={2} sm={3} key={index} className="col-3">
              <div className="p-xl-5 p-lg-3 mb-3 mb-lg-0">
                <GKTippy
                  content={
                    <span>
                      <span className="fs-4">{item.name} </span>
                      <br />
                      <span className="fs-4 fw-light">{item.position} </span>
                    </span>
                  }
                >
                  <Image
                    src={`/api/about/getStudenticon/${item?._id}`}
                    alt="image"
                    className="imgtooltip  rounded-circle"
                    width={150}
                    height={150}
                  />
                </GKTippy>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default TeamGridRoundImages;
