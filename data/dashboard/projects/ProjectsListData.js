import { v4 as uuid } from 'uuid';

export const ProjectsListData = [
	{
		id: uuid(),
		title: 'Web Application ',
		category: 'Web Design',
		progress: '80',
		status: 'In Progress',
		duedate: '20 minutes',
		budget: 22000,
		Attempted:'11.0k',
		icon: 'layout',
		team: [1, 2, 3, 4, 5, 6, 7, 8] // it's team member's id taken from ProjectTeamMembersData.js
	},
	{
		id: uuid(),
		title: 'Application Develop',
		category: 'Web Development',
		progress: '100',
		status: 'Finished',
		duedate: '20 minutes',
		budget: 20000,
		Attempted:'14.0k',
		icon: 'clipboard',
		team: [4, 5, 6, 7, 8, 9, 10, 11, 12]
	},
	{
		id: uuid(),
		title: 'CRM Dashboard',
		category: 'Front End Development',
		progress: '30',
		status: 'Cancel',
		duedate: '20 minutes',
		budget: 0,
		Attempted:'10.0k',
		icon: 'users',
		team: [5, 8, 9, 4, 1, 6]
	},

	{
		id: uuid(),
		title: 'Marketing Sites',
		category: 'Web Design',
		progress: '10',
		status: 'Cancel',
		duedate: '20 minutes',
		budget: 0,
		Attempted:'4.0k',
		icon: 'cpu',
		team: [3, 4, 5, 6, 7]
	},
	{
		id: uuid(),
		title: 'Chat Application',
		category: 'Web Design',
		progress: '65',
		status: 'Pending',
		duedate: '20 minutes',
		budget: 20000,
		Attempted:'1.0k',
		icon: 'message-square',
		team: [2, 3, 4, 5, 6, 7, 8]
	},
	{
		id: uuid(),
		title: 'E-Commerce Project',
		category: 'Web Development',
		progress: '100',
		status: 'Finished',
		duedate: '20 minutes',
		budget: 25000,
		Attempted:'14.10k',
		icon: 'shopping-cart',
		team: [9, 1, 3, 4, 5, 6, 7, 8]
	},
	{
		id: uuid(),
		title: 'CRM Dashboard',
		category: 'Web Design',
		progress: '30',
		status: 'Cancel',
		duedate: '20 minutes',
		budget: 0,
		Attempted:'9.0k',
		icon: 'cpu',
		team: [11, 6, 3, 4, 5]
	},
	{
		id: uuid(),
		title: 'Marketing Sites',
		category: 'Front End Development',
		progress: '10',
		status: 'Cancel',
		duedate: '20 minutes',
		budget: 0,
		Attempted:'8.0k',
		icon: 'message-square',
		team: [10, 2, 3, 4, 5, 6, 7, 8, 9, 1, 11, 12]
	}
];

export default ProjectsListData;
