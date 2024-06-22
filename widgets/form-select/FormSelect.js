// import node module libraries
import { Fragment, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const FormSelect = (props) => {
	const { placeholder, defaultselected, id, name, onChange } = props;
	const [sortData, setSortData] = useState();
	const sortByOptions = [
		{ value: 'newest', label: 'Newest' },
		{ value: 'free', label: 'Free' },
		{ value: 'most-popular', label: 'Most Popular' },
		{ value: 'highest-rated', label: 'Highest Rated' }
	];
	// useEffect(() => {
	// 	props.onDataChange(sortData);
	// }, [sortData, props.onDataChange]);
	return (
		<Fragment>
			<Form.Select
				defaultValue={defaultselected}
				id={id}
				name={name}
				onChange={(e) => setSortData(e.target.value)}
			>
				{placeholder ? (
					<option value="" className="text-muted">
						{placeholder}
					</option>
				) : (
					''
				)}
				{sortByOptions.map((item, index) => {
					return (
						<option key={index} className="text-dark">
							{item.label}
						</option>
					);
				})}
			</Form.Select>
		</Fragment>
	);
};

FormSelect.propTypes = {
	placeholder: PropTypes.string.isRequired,
	defaultselected: PropTypes.string.isRequired,
	required: PropTypes.bool.isRequired,
	id: PropTypes.string,
	name: PropTypes.string
};

FormSelect.defaultProps = {
	placeholder: '',
	defaultselected: '',
	required: false,
	id: '',
	name: ''
};

export default FormSelect;
