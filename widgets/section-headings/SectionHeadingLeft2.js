// Section : Section Heading Left
// Style : H2 title and description in left aligned

// import node module libraries
import { Fragment } from 'react';

const SectionHeadingLeft2 = ({ title, description }) => {
	return (
		<Fragment>
			<div className='text-center'>
				<h3 className="mb-1 display-4">{title}</h3>
				<p className="h3 text-muted">{description}</p>
			</div>

		</Fragment>
	);
};

export default SectionHeadingLeft2;
