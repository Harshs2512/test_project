import { v4 as uuid } from 'uuid';

const jobDetails = `
<div class="mt-6">
    <h2 class="mb-3 fs-3">Job description</h2>
    <p>Maintains information technology strategies by managing staff; researching, Budgeting and
        implementing
        technological strategic solutions.
    </p>
</div>
<div class="mt-6">
    <h2 class="mb-3 fs-3">Role</h2>
    <p>Aliquam pellentesque mollis interdum. Proin ligula lacus, maximus quis ante a, luctus sodales
        sapien. Donec ut
        tristique nisi. Nulla a quam sit amet turpis convallis porttitor vel sed quam. Ut in odio
        enim. Maecenas eu tellus erat.
        Maecenas nec maximus elit, ac suscipit justo. Maecenas nisl tellus, sodales non gravida
        eget, placerat sit amet erat.
    </p>
</div>
<div class="mt-6">
    <h2 class="mb-3 fs-3">Responsibilities</h2>
    <ul>
        <li> Lorem ipsum dolor sit amet, consectetur adipiscing elitì</li>
        <li> Vivamus maximus sem ac pellentesque tinciduntì</li>
        <li> Sed vitae metus in mauris ultricies tempor hendrerit eu nisiì</li>
        <li> Sed in odio a lorem porttitor dictum et eget nullaì</li>
        <li> Donec molestie tortor sed risus hendrerit, in laoreet diam tinciduntì</li>
        <li> Curabitur finibus lacus ac dui placerat venenatisì</li>
        <li> Aenean id ligula molestie, pretium ipsum in, varius elit.</li>
    </ul>
    </div>
    <div class="mt-6">
    <h2 class="mb-3 fs-3">Desired Candidate Profile</h2>
    <ul>
        <li> Lorem ipsum dolor sit amet, consectetur adipiscing elitì</li>
        <li> Minimum consulting experience of 2 years including Threat Hunting role</li>
        <li> Sed vitae metus in mauris ultricies tempor hendrerit eu nisiì</li>
        <li> Donec molestie tortor sed risus hendrerit, in laoreet diam tinciduntì</li>
        <li>Sed in odio a lorem porttitor dictum et eget nullaì</li>
        <li> Curabitur finibus lacus ac dui placerat venenatisì</li>
        <li> Aenean id ligula molestie, pretium ipsum in, varius elit.</li>
    </ul>
</div>
<div class="mt-6">
    <h2 class="mb-3 fs-3">Perks and Benefits</h2>
    <ul>
        <li> Health insurance</li>
        <li> Employee discount</li>
        <li> Relocation assistance</li>
        <li> Cafeteri</li>
        <li>Soft Skill Trainin</li>
        <li> Free Transport</li>
        <li> Education Assistance</li>
        <li> Work From Home</li>
    </ul>
</div>
`
export const JobsListingData = [
	{
		id: uuid(),
		rolename: 'HelpDesk',
        slug : 'helpdesk-software-engineer-web3crypto',
		logo: 'https://geeks-nextjs.vercel.app/images/job/job-brand-logo/job-list-logo-1.svg',
        position: 'Amit Kumar',
        experience : 'On Campus',
        salary : '9.51 CGPA',
        location : 'Sagar Institute Research and Technology',
		postedOn: '21 hours ago',
        totalReviews : 131,
        rating : 4.5,
        featured : true,
        jobApplicants : 306,
        jobDetails : jobDetails
	},
	// {
	// 	id: uuid(),
	// 	company: 'Airtable',
    //     slug : 'airtable-senior-react-developer',
	// 	logo: '/images/job/job-brand-logo/job-list-logo-2.svg',
    //     position: 'Sumit Kumar',
    //     experience : '0 - 5 years',
    //     salary : '5k - 8k',
    //     location : 'Globus Collage Bhopal',
	// 	postedOn: '1 day ago',
    //     totalReviews : 324,
    //     rating : 4.5,
    //     featured : false,
    //     jobApplicants : 300,
    //     jobDetails : jobDetails
	// },

];

export default JobsListingData;
