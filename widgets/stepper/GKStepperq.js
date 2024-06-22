// import node module libraries
import { Fragment } from 'react';
import { Container, Row, Col} from 'react-bootstrap';

const GKStepperq = (props) => {
	const { currentStep, steps } = props;

	return (
		<section className="pb-12">
			<Container>
				<div className="stepper">
					<Row>
						<Col lg={{ span: 10, offset: 1 }} md={12} sm={12}>
							<div className="stepper">

								<div className="stepper-content mt-5 ">
									<div className="stepper-pane fade active">
										{steps[currentStep - 1].content}
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</div>
			</Container>
		</section>
	);
};

export default GKStepperq;
