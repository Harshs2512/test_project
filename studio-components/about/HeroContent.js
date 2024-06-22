// import node module libraries
import { Col, Row } from 'react-bootstrap';
import {  ProjectListTable } from 'studio-components';
import React from 'react';
const HeroContent = () => {
	return (
		<>
			<Row>
				<Col xs={12}>
					<ProjectListTable />
				</Col>
			</Row>
		</>
	);
};
export default HeroContent;
