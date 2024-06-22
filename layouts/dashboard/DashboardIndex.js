// import node module libraries
import React, { useState } from 'react';

// import sub components
import NavbarVertical from './navbars/NavbarVertical';
import NavbarTop from './navbars/NavbarTop';
import { AbilityContext } from 'utils/accessControl';
import GetAbility from 'utils/accessControl';
import Auth from 'utils/Auth';
import axios from 'axios';

const DashboardIndex = (props) => {
	const ability = GetAbility("refresh");
	const [showMenu, setShowMenu] = useState(true);
	const ToggleMenu = () => {
		return setShowMenu(!showMenu);
	};
	return (
		<AbilityContext.Provider value={ability}>
			<Auth>
				<div id="db-wrapper" className={`${showMenu ? '' : 'toggled'}`}>
					<div className="navbar-vertical navbar">
						<NavbarVertical
							showMenu={showMenu}
							onClick={(value) => setShowMenu(value)}
						/>
					</div>
					<main id="page-content">
						<header className="header">
							<NavbarTop
								data={{
									showMenu: showMenu,
									SidebarToggleMenu: ToggleMenu
								}}
							/>
						</header>
						<section className="container-fluid p-4">{props.children}</section>
					</main>
				</div>
			</Auth>
		</AbilityContext.Provider>
	);
};

export default DashboardIndex;