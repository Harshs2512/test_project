// import node module libraries
import { Fragment } from 'react';
import { Col, Row, ListGroup } from 'react-bootstrap';

const DescriptionTab = ({description}) => {
	return (
		<Fragment>
			<div className="mb-4">
				<h3 className="mb-2">Course Descriptions</h3>
				<div dangerouslySetInnerHTML={{ __html: description }} />
			</div>
		</Fragment>
	);
};
export default DescriptionTab;
