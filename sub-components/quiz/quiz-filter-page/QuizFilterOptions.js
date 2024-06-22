import { useEffect, useState } from 'react';
import { Form, Card } from 'react-bootstrap';
import axios from 'axios';

const FilterOptions = (props) => {
	const [categories, setCategories] = useState([]);
	const [filter, setFilter] = useState({
		QuizCategory: [],
		level:[]
	});

	const handleCategoryFilter = (QuizCategory) => {
		const updatedCategories = filter.QuizCategory.includes(QuizCategory)
			? filter.QuizCategory.filter((c) => c !== QuizCategory)
			: [...filter.QuizCategory, QuizCategory];
		setFilter({
			...filter,
			QuizCategory: updatedCategories,
		});
	};
	const handlecourse_levelFilter = (level) => {
		const updatedLevels = filter?.level?.includes(level)
		  ? filter.level.filter((l) => l !== level)
		  : [...filter.level, level];
	
		setFilter({
		  ...filter,
		  level: updatedLevels,
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
			QuizCategory: [],
			level:[]
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
							checked={filter.QuizCategory.includes(item._id)}
							onChange={() => handleCategoryFilter(item._id)}
						/>
					))}
				</Form>
			</Card.Body>	
			<Card.Body className="border-top">
        <span className="dropdown-header px-0 mb-2"> Skill Level</span>
        <Form>
          {["Beginners", "Intermediate", "Advance"].map((item, index) => (
            <Form.Check
              type="checkbox"
              className="mb-1"
              label={item}
              key={index}
              checked={filter?.level?.includes(item)}
              onChange={() => handlecourse_levelFilter(item)}
            />
          ))}
        </Form>
      </Card.Body>
		</Card>
	);
};

export default FilterOptions;
