import { v4 as uuid } from 'uuid';

export const ComparePlansData = [
	{
		id: uuid(),
		plantitle: 'Free',
		description: ` To start your learning to day you will get only
        <span class="text-dark fw-medium">free Course</span> access.`,
		monthly: 0,
		borderColor: 'warning',
		buttonText: 'Get Started For Free',
		buttonClass: 'outline-dark-warning',
		featureHeading: 'All core features, including:',
		features: [
			{ feature: 'Only free courses' },
			{ feature: `<span class="fw-bold text-dark">Free </span>learning paths` },
			{ feature: `<span class="fw-bold text-dark">5GB </span>storage` },
			{ feature: 'Analytics' },
			{ feature: 'Free mobile app' },
			{ feature: 'Access to support forums' }
		]
	},
	{
		id: uuid(),
		plantitle: 'Growth',
		description: `Access all
        <span class="text-dark fw-medium">premium courses, workshops, and mobile apps.</span>
        Renewed monthly.`,
		monthly: 39,
		borderColor: 'primary',
		buttonText: 'Start Today',
		buttonClass: 'primary',
		featureHeading: 'Everything in Starter, plus:',
		features: [
			{ feature: 'Offline viewing' },
			{ feature: `<span class="fw-bold text-dark">Offline </span>projects` },
			{ feature: `<span class="fw-bold text-dark">Unlimited </span>storage` },
			{ feature: 'Custom domain support' },
			{ feature: 'Bulk editing' },
			{ feature: '12 / 5 support' }
		]
	},
];

export default ComparePlansData;
