// import node module libraries
import { Fragment, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
	Image,
	Navbar,
	Nav,
	Container,
} from 'react-bootstrap';
// import sub components
import QuickMenu from 'layouts/studio/QuickMenu';

// import data files
import NavbarDefaultRoutes from 'routes/studio/NavbarDefault';

// import layouts
import NavDropdownMain from 'layouts/marketing/navbars/NavDropdownMain';

// import hooks
import useMounted from 'hooks/useMounted';
const NavbarDefault = ({  login }) => {
	const [expandedMenu, setExpandedMenu] = useState(false);
	const hasMounted = useMounted();
	const isDesktop = useMediaQuery({
		query: '(min-width: 1224px)'
	});
	const isLaptop = useMediaQuery({
		query: '(min-width: 1024px)'
	});
	const isTablet = useMediaQuery({ query: '(min-width: 768px)' });

	return (
		<Fragment>
			<Navbar
				onToggle={(collapsed) => setExpandedMenu(collapsed)}
				expanded={expandedMenu}
				expand="lg"
				className="navbar navbar-default py-2 p-2"
			>
				<Container fluid className="px-0 d-sm-flex d-md-flex p-0 m-0 ps-2">
					<div className='w-15 mb-n4'>
						<Link href="/studio/home" passHref legacyBehavior>
						<Navbar.Brand>
							<Image
								src="/images/brand/logo/cybrom_long.png"
								alt=""
								className={`d-none d-sm-block `}
							/>
							<Image src="/favicon.ico" alt = "" className = 'd-block d-sm-none img-fluid' />
						</Navbar.Brand>
					</Link>
					</div>
					
					{hasMounted ?
						<div className={`navbar-nav navbar-right-wrap ms-auto d-lg-none nav-top-wrap ${login ? (isDesktop || isLaptop ? 'd-none' : 'd-flex') : 'd-none'}`}>
							<QuickMenu />
						</div>
						: null}
					<Navbar.Toggle aria-controls="basic-navbar-nav">
						<span className="icon-bar top-bar mt-0"></span>
						<span className="icon-bar middle-bar"></span>
						<span className="icon-bar bottom-bar"></span>
					</Navbar.Toggle>
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav>
							{NavbarDefaultRoutes.map((item, index) => {
								if (item.menuitem === "Problem of Day") {
									return (
									  <div key={index} className="d-flex">
										<div className="nav-item pt-1 ms-1 d-md-none ">
										  <Nav.Link as={Link} href={item.link}>
											{item.menuitem}
										  </Nav.Link>
										</div>
									  </div>
									);
								  } else if (item.children === undefined) {
									return (
										<div className="nav-item pt-1 ms-2" key={index}>
											<Nav.Link as={Link} href={item.link}>
												{item.menuitem}
											</Nav.Link>
										</div>
									);
								} else {
									return (
										<NavDropdownMain
											item={item}
											key={index}
											onClick={(value) => setExpandedMenu(value)}
											className="pt-1"
										/>
									);
								}
							})}
						</Nav>
						<div className='ms-auto d-flex align-items-center'>
							<Nav className="navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap">
								<span className={login ? 'ms-auto mt-3 mt-lg-0 d-none' : 'ms-auto mt-3 mt-lg-0'}>
									<Nav.Link
										href="#"
										bsPrefix="btn"
										className="btn btn-white shadow-sm me-2"
									>
										Sign In
									</Nav.Link>
									<Nav.Link
										href="#"
										bsPrefix="btn"
										className="btn btn-primary shadow-sm"
									>
										Sign Up
									</Nav.Link>
								</span>
								{hasMounted ?
									<span
										className={`${login
											? isDesktop || isLaptop
												? 'd-flex'
												: 'd-none'
											: 'd-none'
											}`}
									>
										<QuickMenu />
									</span>
									: null}
							</Nav>
						</div>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</Fragment>
	);
};

// Specifies the default values for props
NavbarDefault.defaultProps = {
	headerstyle: 'navbar-default',
	login: false
};

// Typechecking With PropTypes
NavbarDefault.propTypes = {
	headerstyle: PropTypes.string,
	login: PropTypes.bool
};

export default NavbarDefault;
