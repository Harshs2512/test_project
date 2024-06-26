// import node module libraries
import { Container } from 'react-bootstrap';

// import widget/custom components
import { SectionHeadingLeft }  from 'widgets';

// import sub components
import CoursesTabSlider from './CoursesTabSlider';

const BrowseCategories = (data) => {
	const title = "The world's top courses";
	const subtitle = 'Browse Categories';
	const description = `Choose from 32,000 online video courses with new additions published every month.`;

	return (
		<section className="py-4 py-lg-8 bg-white">
			<Container>
				<SectionHeadingLeft
					title={title}
					description={description}
					subtitle={subtitle}
				/>
				<CoursesTabSlider />
			</Container>
		</section>
	);
};
export default BrowseCategories;
