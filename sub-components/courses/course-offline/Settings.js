// import node module libraries
import { Card, Form, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import ReactTagInput from '@pathofdev/react-tag-input';
import Loder from 'widgets/Loder';

const Settings = (props) => {
	const defaulttags = ['Jequry', 'Python']
	const [tags, setTags] = React.useState(defaulttags);
	const { previous } = props;
	const { loading } = props;
	useEffect(() => {
		props.onDataChange(tags);
	}, [tags, props.onDataChange]);

	return (
		<Form>
			{/* Card */}
			<Card className="mb-3  border-0">
				<Card.Header className="border-bottom px-4 py-3">
					<h4 className="mb-0">Requirements</h4>
				</Card.Header>
				{/* Card body */}
				<Card.Body>
					<ReactTagInput tags={tags} onChange={(newTags) => setTags(newTags)} />
				</Card.Body>
			</Card>
			<div className="d-flex justify-content-between mb-22">
				{/* Button */}
				<Button variant="secondary" onClick={previous}  >
					Previous
				</Button>
				{!loading ?
					<Button variant="danger" onClick={props.onSubmit}>
						{!loading ? 'Submit For Review' : ''}
					</Button>
					:
					<Button className='px-10' variant="danger" onClick={props.onSubmit}>
						<Loder />
					</Button>
				}
			</div>
		</Form>
	);
};
export default Settings;
