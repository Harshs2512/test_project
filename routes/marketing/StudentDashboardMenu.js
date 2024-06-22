export const DashboardMenu = [

	{
		id: 1,
		title: "My Courses",
		link: "/marketing/courses/buy_courses",
		icon: 'rr-book'
	},
	{
		id: 2,
		title: 'My Mock Test',
		link: '/marketing/student/quiz',
		icon: 'br-problem-solving'
	},
	{
		id: 3,
		title: 'My Contests',
		link: '/marketing/student/contests',
		icon: 'rr-trophy-star'
	},
	{
		id: 4,
		title: 'My Guided Path',
		link: '/marketing/student/my-guided-path',
		icon: 'rr-tour-guide-people'
	},
	{
		id: 5,
		title: 'Mock Result ',
		link: '/marketing/student/quiz-attempt',
		icon: 'rr-people-poll'
	},
	{
		id: 6,
		title: 'My Subscriptions',
		link: '/marketing/student/subscriptions',
		icon: 'rr-subscription'
	},
	{
		id: 7,
		title: 'Billing Info',
		link: '/marketing/student/billing-info',
		icon: 'rr-receipt'
	},
	{
		id: 8,
		title: 'Payment',
		link: '/marketing/student/payment',
		icon: 'rr-wallet-arrow'
	},
	{
		id: 9,
		title: 'My Invoice',
		link: '/marketing/student/invoice',
		icon: 'rr-benefit-porcent'
	}
];

export const AccountSettingsMenu = [
	{
		id: 1,
		title: 'Show Profile',
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
		id: 4,
		title: 'Notifications',
		link: '/marketing/student/notifications',
		icon: 'bell'
	},
	{
		id: 6,
		title: 'Sign Out',
		link: '/',
		icon: 'power'
	},
	{
		id: 6,
		title: 'Go to Cybrom Studio',
		link: '/authentication/sign-code',
		icon: 'code'
	}];

export const InstructorDashboardMenu = [DashboardMenu, AccountSettingsMenu];

export default InstructorDashboardMenu;
