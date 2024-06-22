// import node module libraries
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';

// import layouts
import NavbarDefault from 'layouts/marketing/navbars/NavbarDefault';
import FooterWithLinks from 'layouts/marketing/footers/FooterWithLinks';

const NotFound = (props) => {
	useEffect(() => {
		document.body.className = 'bg-white';
	});

	return (
		<main>
			<section id="db-wrapper" className="bg-white">
				<Container className="d-flex flex-column">
					<NavbarDefault />
					{props.children}
					<FooterWithLinks />
				</Container>
			</section>
		</main>
	);
};

export default NotFound;
