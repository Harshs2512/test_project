// import node module libraries
import React, { Fragment, useEffect } from 'react';
import Script from 'next/script'
// import layouts
import NavbarDefault from 'layouts/studio/navbars/NavbarDefault';

const StudioLayout = (props) => {
	useEffect(() => {
		document.body.className = 'bg-light';
	});
	return (
		<Fragment>
			<NavbarDefault login />
			<main>
				{props.children}
			</main>
			<Script src="https://checkout.razorpay.com/v1/checkout.js" />
		</Fragment>
	);
};

export default StudioLayout;
