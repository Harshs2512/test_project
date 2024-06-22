// import node module libraries
import { Container, Row, Col } from "react-bootstrap";
import {
  LightningChargeFill,
  ChatFill,
  CloudFill,
  GridFill,
} from "react-bootstrap-icons";

// import widget/custom components
import { FeatureTopIcon2, SectionHeadingLeft2 } from "widgets";

const Features2Columns = () => {
  const features = [
    {
      id: 1,
      icon: `https://files.codingninjas.in/discuss-with-top-coders-17905.svg`,
      title: "Discuss with top coders",
      description: `Everyday discussions on problems with some of the best coders out there`,
    },
    {
      id: 2,
      icon: `https://files.codingninjas.in/view-top-solutions-17906.svg`,
      title: "View top solutions",
      description: `Learn from the best coders by seeing the best solutions and their stats`,
    },
    {
      id: 3,
      icon: `https://files.codingninjas.in/get-recognised-17907.svg`,
      title: "Top solvers get recognised",
      description: `Stand out from the crowd by earning recognition by reaching the top of the leaderboard`,
    },
    {
      id: 4,
      icon: `https://files.codingninjas.in/view-top-solutions-17906.svg`,
      title: "Well-integrated",
      description: `Praesent dolor velit, porta id pharetra quis, rutrum vitae velit. In ut neque qnas tristique imperdiet porta.`,
    },
  ];

  return (
    <section className="pb-8 pb-lg-12 bg-white">
      <Container>
        <Row>
          <Col xl={{ offset: 1, span: 11 }} sm={12}>
            <Row>
              <Col lg={12} md={12} sm={12} className="mb-8">
                {/*  Section left heading */}
                <SectionHeadingLeft2
                  title="Why problem of the day is for you?"
                  description="Everything you need, customize and extend when you need more."
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
            {features.map((item, index) => {
              return (
                <Col lg={3} md={6}
                  key={index} 
                >
                  <FeatureTopIcon2 item={item} />
                </Col>
              );
            })}
        </Row>
        <hr className="mt-6" />
      </Container>
    </section>
  );
};
export default Features2Columns;
