export const DashboardMenu = [

	{
		id: 1,
		title: "Dashboard",
		link: "#",
		icon: 'home'
	},
	{
		id: 2,
		title: 'Learning Plan',
		link: '/marketing/student/quiz',
		icon: 'globe'
	},
	{
		id: 3,
		title: 'Leaderboard',
		link: '/marketing/student/quiz-attempt',
		icon: 'airplay'
	},
];

export const AccountSettingsMenu = [
	{
		id: 1,
		title: 'Edit Profile',
		link: '/marketing/student/edit-profile',
		icon: 'settings'
	},
	{
		id: 2,
		title: 'Security',
		link: '/marketing/student/security',
		icon: 'user'
	},
	{
		id: 3,
		title: 'Notifications',
		link: '/marketing/student/notifications',
		icon: 'bell'
	},
	{
		id: 4,
		title: 'Go to home',
		link: '/',
		icon: 'power'
	}
];

export const InstructorDashboardMenu = [DashboardMenu, AccountSettingsMenu];

export default InstructorDashboardMenu;
