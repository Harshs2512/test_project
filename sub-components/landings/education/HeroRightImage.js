// import node module libraries
import { Col, Row, Container, ListGroup, Image } from 'react-bootstrap';
import Link from 'next/link';

// import bootstrap icons
import { CheckCircleFill } from 'react-bootstrap-icons';

const HeroRightImage = ({ alldata }) => {
  return (
    <section className="py-lg-4 py-2">
      <Container>
        <Row className="d-flex align-items-center">
          <Col xxl={5} xl={6} lg={6} xs={12} >
            <div>
              <h1 className="display-4 fw-bold mb-3">{alldata?.title} -
                <u className="text-warning"><span className="text-primary">In Cybrom</span></u>
              </h1>
              <p className="lead mb-4">{alldata?.description}</p>
              <ListGroup as="ul" bsPrefix='list-unstyled' className="mb-5">
                {alldata?.bulletpoints?.map((item, index) => (
                  <ListGroup.Item as="li" bsPrefix="mb-2" key={index}>
                    <CheckCircleFill size={12} fill="var(--geeks-success)" />
                    <span className="ms-2">{item?.title}</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link href="#!" className="btn btn-dark btn-lg">Get Free Counseling</Link>
            </div>
          </Col>
          <Col xxl={{ offset: 1, span: 5 }} xl={6} lg={6} xs={12} className="d-lg-flex justify-content-end">
            <div className="mt-12 mt-lg-0 position-relative">
              <Image src={`/api/siteSettings/landingPage/ourPrograms/getimage/${alldata?._id}`} alt="online course"
                className="img-fluid rounded-4 w-100 z-1 position-relative" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default HeroRightImage