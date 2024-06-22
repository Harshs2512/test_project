// import node module libraries
import { Fragment } from 'react';
import { Col, Row, ListGroup } from 'react-bootstrap';

const QuizTranscriptTab = ({ item }) => {
	const data= item && item;
	return (
	  <Fragment>
		<div className="mb-4">
		  <h3 className="mb-2">Mock Questions Details</h3>
		  {data &&
			data.questions_list.map((question, index) => (
			  <div key={index} className="mb-2">
				<ListGroup>
				<ListGroup.Item><h4>Q. {index + 1}: {question.question}</h4></ListGroup.Item>
				</ListGroup>
			  </div>
			))}
		</div>
	  </Fragment>
	);
  };
  
export default QuizTranscriptTab;
