import { useEffect, useState } from 'react';
import { Form, Card } from 'react-bootstrap';
import { Ratings } from 'widgets';
import axios from 'axios';

const FilterOptions = (props) => {
	const [categories, setCategories] = useState([]);
	const [filter, setFilter] = useState({
		category: [],
		rating: null,
		skillLevel: [],
	});
	const handleCategoryFilter = (category) => {
		const updatedCategories = filter.category.includes(category)
			? filter.category.filter((c) => c !== category)
			: [...filter.category, category];
		setFilter({
			...filter,
			category: updatedCategories,
		});
	};

	const handleRatingFilter = (rating) => {
		setFilter({
			...filter,
			rating: rating === filter.rating ? null : rating,
		});
	};

	const handleSkillLevelFilter = (level) => {
		const updatedLevels = filter.skillLevel.includes(level)
			? filter.skillLevel.filter((l) => l !== level)
			: [...filter.skillLevel, level];

		setFilter({
			...filter,
			skillLevel: updatedLevels,
		});
	};

	const getCategories = async () => {
		const res = await axios.get('/api/category/getcategories')
		setCategories(res.data.categories)
	}

	useEffect(() => {
		getCategories();
		props.onDataChange(filter);
	}, [filter, props.onDataChange]);

	const resetFilters = () => {
		setFilter({
			...filter,
			rating: null,
			skillLevel: [],
			category: [],
		});
	};

	return (
		<Card>
			{/* Card header */}
			<Card.Header className='d-flex '>
				<h4 className="mb-0">Filter</h4>
				<button className="mb-0 ms-17 text-danger cursor-pointer border-0 bg-white" onClick={resetFilters}>Reset</button>
			</Card.Header>
			{/* Card body */}
			<Card.Body>
				<span className="dropdown-header px-0 mb-2"> Category</span>
				<Form>
					{/* Checkboxes for Courses */}
					{categories.map((item, index) => (
						<Form.Check
							type="checkbox"
							className="mb-1"
							label={item.catName}
							key={index}
							checked={filter.category.includes(item._id)}
							onChange={() => handleCategoryFilter(item._id)}
						/>
					))}
				</Form>
			</Card.Body>
			{/* Card body */}
			<Card.Body className="border-top">
				<span className="dropdown-header px-0 mb-2"> Ratings</span>
				<Form>
					{[4.5, 4.0, 3.5, 3.0].map((item, index) => (
						<Form.Check
							type="radio"
							id={`formRating${item}`}
							className="mb-1"
							key={index}
						>
							<Form.Check.Input
								type="radio"
								name="customRadio"
								checked={filter.rating === item}
								onChange={() => handleRatingFilter(item)}
							/>
							<Form.Check.Label>
								<span className="text-warning">
									<Ratings rating={item} />
								</span>{' '}
								<span className="fs-6 pt-1">{item} & UP</span>
							</Form.Check.Label>
						</Form.Check>
					))}
				</Form>
			</Card.Body>
			<Card.Body className="border-top">
				<span className="dropdown-header px-0 mb-2"> Skill Level</span>
				<Form>
					{['Beginners', 'Intermediate', 'Advance'].map(
						(item, index) => (
							<Form.Check
								type="checkbox"
								className="mb-1"
								label={item}
								key={index}
								checked={filter.skillLevel.includes(item)}
								onChange={() => handleSkillLevelFilter(item)}
							/>
						)
					)}
				</Form>
			</Card.Body>
		</Card>
	);
};

export default FilterOptions;
