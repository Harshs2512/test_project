
import { Col, Row } from 'react-bootstrap';

const SectionHeadingLeft = ({ title, subtitle, description }) => {
	return (
		<Row className="justify-content-center">
			<Col md={12} className="text-center">
				{subtitle && (
					<span className="text-primary mb-3 d-block text-uppercase fw-semi-bold ls-lg">
						{subtitle}
					</span>
				)}
				<h2 className="mb-1 display-4 fw-bold">{title}</h2>
				<p className="mb-8 lead">{description}</p>
			</Col>
		</Row>

	);
};

export default SectionHeadingLeft;
