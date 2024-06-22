import { Col, Row, Container, Image } from "react-bootstrap";
import Link from "next/link";

const HeroHeader = () => {
  return (
    <section
      className="align-items-center rounded bg-danger mx-auto "
      style={{
        backgroundImage: 'url("/images/background/Course-Trackpath.jpg")',
        backgroundRepeat: "no-repeat",
        height:"400px",
        width:"100%",
        backgroundSize:"cover",
      }}
    >
      <Container>
        {/*  Hero Section  */}
        <Row className="align-items-center g-0">
          <Col xl={8} lg={7} md={12}>
            <div className=" py-lg-0">
              <p className="text-black mb-4 lead mt-lg-22 mt-md-16">
                Preparation is the key! Choose your tracks and start preparing
                for your next big interview. Prepare for companies like
              </p>
              <div className="gap-4 d-lg-flex">
                <Link href="#" className="btn btn-info text-white mt-3">
                  Full Stack Development
                </Link>{" "}
                <Link href="#" className="btn btn-info text-white mt-3">
                  Mern Stack Development
                </Link>{" "}
                <Link href="#" className="btn btn-info text-white mt-3">
                  Data Science
                </Link>{" "}
                <Link href="#" className="btn btn-info text-white mt-3">
                  Cyber Security and Ethical Hacking
                </Link>{" "}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default HeroHeader;
