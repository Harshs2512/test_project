import { Badge, Row, Col } from "react-bootstrap";

const Question = ({ questions, selectedIndex,Title }) => {
  const questionData = questions 
  return (
    <div>
      <h4 className="">Welcome to Cybrom</h4>
      <Row className="w-100">
        <Col>
          <div className="d-flex gap-2 ">
            <span>Time:- </span>
            <h6 className="d-flex mt-1">
              <span>H: </span>
              <span>{questionData?.problem_hour}</span>
            </h6>
            <h6 className="d-flex mt-1">
              <span>M: </span>
              <span>{questionData?.problem_minute}</span>
            </h6>
            <h6 className="d-flex mt-1">
              <span>S: </span>
              <span>{questionData?.problem_second}</span>
            </h6>
          </div>
          <div>
            <h3>{questionData?.problem_title}</h3>
          </div>
        </Col>
        <Col>
          <Badge className="bg-success">{questionData?.problem_level}</Badge>
        </Col>
      </Row>
      <hr />
      <h3>Problem:-</h3>
      <p dangerouslySetInnerHTML={{ __html: questionData?.problem_Statement }}></p>
      <div>
        {questionData &&
          questionData.example &&
          questionData.example.map((sample, index) => (
            <div key={index}>
              <h3>Example {index + 1}:-</h3>
              <hr />
              <h4> Input :-</h4>
              <p>{sample.input_sample}</p>
              <h4>Output :-</h4>
              <p>{sample.output_sample}</p>
              <h4>Explanation :-</h4>
              <p dangerouslySetInnerHTML={{ __html: sample.explanation_sample }}></p>
            </div>
          ))}
      </div>
      <div>
        <h4>Constraints:-</h4>
        <p dangerouslySetInnerHTML={{ __html: questionData?.problem_Constraints }}></p>
      </div>
      <hr />
    </div>
  );
};

export default Question;
