import { v4 as uuid } from "uuid";

export const DashboardMenu = [
  {
    id: uuid(),
    title: "Management",
    icon: "settings",
    children: [
      {
        id: uuid(),
        link: "/dashboard/roles-and-permissions/allroles",
        name: "Roles",
      },
      {
        id: uuid(),
        link: "/dashboard/roles-and-permissions/permissions/allpermissions",
        name: "Permissions",
      },
      {
        id: uuid(),
        link: "/dashboard/roles-and-permissions/user-managment/allusers",
        name: "Users",
      },
    ],
  },
  // {
  //   id: uuid(),
  //   title: "Dashboard",
  //   icon: "bar-chart-2",
  //   children: [
  //     { id: uuid(), link: "/dashboard/overview", name: "Overview" },
  //     { id: uuid(), link: "/dashboard/analytics", name: "Analytics" },
  //   ],
  // },
  {
    id: uuid(),
    title: "Dashboard",
    icon: "bar-chart-2",
    children: [
      { id: uuid(), link: "/dashboard/analytics/all-analytics", name: "All" },
      { id: uuid(), link: "/dashboard/analytics/courses/", name: "Courses" },
      { id: uuid(), link: "/dashboard/analytics/mock", name: "Mocks" },
      { id: uuid(), link: "/dashboard/analytics/contest", name: "Contest" },
    ],
  },
  {
    id: uuid(),
    title: "Courses",
    icon: "book",
    children: [
      {
        id: uuid(),
        title: "Online Courses",
        icon: "book",
        children: [
          {
            id: uuid(),
            link: "/dashboard/courses/all-courses",
            name: "All Courses",
          },
          {
            id: uuid(),
            link: "/dashboard/courses/courses-category",
            name: "Courses Category",
          },
        ],
      },
      {
        id: uuid(),
        title: "Offline Courses",
        icon: "book",
        children: [
          {
            id: uuid(),
            link: "/dashboard/courses/offline-courses/all-courses",
            name: "All Courses",
          },
          {
            id: uuid(),
            link: "/dashboard/courses/courses-category",
            name: "Course Category",
          },
        ],
      },
      {
        id: uuid(),
        title: "Short Courses",
        icon: "book",
        children: [
          {
            id: uuid(),
            link: "/dashboard/courses/short-courses/all-courses",
            name: "All Short Courses",
          },
          // {
          //   id: uuid(),
          //   link: "/dashboard/courses/courses-category",
          //   name: "Course Category",
          // },
        ],
      }
    ],
  },
  {
    id: uuid(),
    title: "Contests",
    icon: "package",
    children: [
      {
        id: uuid(),
        link: "/dashboard/contests/all-contests",
        name: "All Contests",
      },
      {
        id: uuid(),
        link: "/dashboard/contests/contests-category",
        name: "Contests Category",
      },
    ],
  },
  {
    id: uuid(),
    title: "Problem Of Day",
    icon: "code",
    children: [
      {
        id: uuid(),
        link: "/dashboard/problemDay/all-problem",
        name: "All Problem",
      },
      {
        id: uuid(),
        link: "/dashboard/problemDay/problem-category",
        name: "Problem Category",
      },
    ],
  },
  {
    id: uuid(),
    title: "Job & Internship",
    icon: "command",
    children: [
      {
        id: uuid(),
        link: "/dashboard/jobandinternship/all-job",
        name: "All Job",
      },
      {
        id: uuid(),
        link: "/dashboard/jobandinternship/all-internship",
        name: "All Internship",
      },
    ],
  },
  {
    id: uuid(),
    title: "Mocks",
    icon: "copy",
    children: [
      { id: uuid(), link: "/dashboard/quizes/all-quizes", name: "All Mocks" },
    ],
  },
  {
    id: uuid(),
    title: "Tutorials",
    icon: "clipboard",
    children: [
      {
        id: uuid(),
        link: "/dashboard/tutorials/all-tutorials",
        name: "All Tutorials",
      },
    ],
  },
  {
    id: uuid(),
    title: "Guided Path",
    icon: "globe",
    children: [
      {
        id: uuid(),
        link: "/dashboard/Guided-path/learning-paths",
        name: "All Guided",
      },
    ],
  },
  {
    id: uuid(),
    title: "Orders",
    icon: "shopping-cart",
    children: [
      { id: uuid(), link: "/dashboard/orders/all-orders", name: "All Orders" },
    ],
  },
  {
    id: uuid(),
    title: "User",
    icon: "user",
    children: [
      { id: uuid(), link: "/dashboard/user/instructor", name: "Instructor" },
      { id: uuid(), link: "/dashboard/user/students", name: "Students" },
    ],
  },
  {
    id: uuid(),
    title: "CMS",
    icon: "airplay",
    children: [
      { id: uuid(), link: "/dashboard/cms/cms-dashboard", name: "Overview" },
      { id: uuid(), link: "/dashboard/cms/all-posts", name: "All Posts" },
      { id: uuid(), link: "/dashboard/cms/category", name: "Category" },
    ],
  },
  {
    id: uuid(),
    title: "Reviews",
    icon: "layout",
    children: [
      {
        id: uuid(),
        link: "/dashboard/reviews/reviewandrating",
        name: "Review and Rating",
      },
      // {
      //   id: uuid(),
      //   link: "/dashboard/reviews/placementReview",
      //   name: "Placement Reviews",
      // },
    ],
  },
  {
    id: uuid(),
    title: "Site Settings",
    icon: "compass",
    children: [
      {
        id: uuid(),
        title: "Landing Page",
        icon: "layout",
        children: [
          {
            id: uuid(),
            link: "/dashboard/siteSettings/LandingPage/placementRecords",
            name: "Placement Records",
          },
          {
            id: uuid(),
            link: "/dashboard/siteSettings/SecondPage/allCourseLogo",
            name: "Course Logo",
          },
          {
            id: uuid(),
            link: "/dashboard/siteSettings/LandingPage/ourTeam",
            name: "Our Team",
          },
          {
            id: uuid(),
            link: "/dashboard/siteSettings/LandingPage/placementStory",
            name: "Student Stories",
          },
          {
            id: uuid(),
            link: "/dashboard/siteSettings/LandingPage/faq",
            name: "FAQ section",
          },
          {
            id: uuid(),
            link: "/dashboard/siteSettings/LandingPage/faq-section-special/alldata",
            name: "FAQ section Special",
          },
          {
            id: uuid(),
            link: "/dashboard/siteSettings/LandingPage/circularCarousel",
            name: "Circular Carousel",
          },
          {
            id: uuid(),
            link: "/dashboard/siteSettings/LandingPage/demandedCourse",
            name: "Demanded Course",
          },
          {
            id: uuid(),
            link: "/dashboard/siteSettings/LandingPage/footer",
            name: "Footer",
          },
          {
            id: uuid(),
            link: "/dashboard/siteSettings/LandingPage/quiz",
            name: "Quiz Guide",
          },
          {
            id: uuid(),
            link: "/dashboard/siteSettings/LandingPage/why-us",
            name: "Why Us",
          },
          {
            id: uuid(),
            link: "/dashboard/siteSettings/LandingPage/carouselButton/alldata",
            name: "Carousel Buttons",
          },
          {
            id: uuid(),
            link: "/dashboard/siteSettings/LandingPage/ourPrograms/alldata",
            name: "Our Programs",
          },
        ],
      },
      {
        id: uuid(),
        title: "Projects",
        icon: "files",
        children: [
          // {
          //   id: uuid(),
          //   link: '/dashboard/projects/create-project',
          //   name: 'Create Project'
          // },
          { id: uuid(), link: '/dashboard/projects/grid', name: 'All Projects' },
        ],
      },
      {
        id: uuid(),
        title: "Second Page",
        icon: "layout",
        children: [
          {
            id: uuid(),
            link: "/dashboard/siteSettings/SecondPage/heroSection",
            name: "Hero Section",
          },
          {
            id: uuid(),
            link: "/dashboard/siteSettings/SecondPage/heroFromRightForm",
            name: "Enquiry form section",
          },
          {
            id: uuid(),
            link: "/dashboard/siteSettings/SecondPage/pricingplansection",
            name: "Placement Program",
          },
          {
            id: uuid(),
            link: "/dashboard/siteSettings/SecondPage/compareplanSection",
            name: "Compare Plans",
          },
          {
            id: uuid(),
            link: "/dashboard/siteSettings/SecondPage/faqwithImageSection",
            name: "Faq Section",
          },
          {
            id: uuid(),
            link: "/dashboard/siteSettings/SecondPage/ouronlineProgramSection",
            name: "Online Programs",
          },
          {
            id: uuid(),
            link: "/dashboard/siteSettings/SecondPage/ourofflineProgramSection",
            name: "Offline Programs",
          },
          {
            id: uuid(),
            link: "/dashboard/siteSettings/SecondPage/best-class",
            name: "Best in Class",
          },
          {
            id: uuid(),
            link: "/dashboard/siteSettings/SecondPage/careerGoals/alldata",
            name: "Career Goals",
          },
        ],
      },
      {
        id: uuid(),
        title: "Third Page",
        icon: "layout",
        children: [
          {
            id: uuid(),
            link: "/dashboard/siteSettings/ThirdPage/heroSection",
            name: "Hero Section",
          },
          {
            id: uuid(),
            link: "/dashboard/siteSettings/ThirdPage/curriculumSection",
            name: "Curriculum Section",
          },
          {
            id: uuid(),
            link: "/dashboard/siteSettings/ThirdPage/prepGuideCourse",
            name: "Job Prep Course Guide",
          },
        ],
      },
      {
        id: uuid(),
        title: "Reviews and Rating",
        icon: "layout",
        children: [
          {
            id: uuid(),
            link: "/dashboard/siteSettings/LandingPage/reviewAndratings",
            name: "Reviews and Rating",
          },
        ],
      },
      {
        id: uuid(),
        title: "Mega Menu",
        icon: "layout",
        children: [
          {
            id: uuid(),
            link: "/dashboard/siteSettings/MegaMenu/megamenuCategory",
            name: "Category",
          },
          {
            id: uuid(),
            link: "/dashboard/siteSettings/MegaMenu/coursePage",
            name: "Course Page",
          },
        ],
      },
      {
        id: uuid(),
        title: "Pap Course",
        icon: "layout",
        children: [
          {
            id: uuid(),
            link: "/dashboard/siteSettings/papCourse/addPapcourse",
            name: "Add Course",
          },
          {
            id: uuid(),
            link: "/dashboard/siteSettings/MegaMenu/coursePage",
            name: "All Course",
          },
        ],
      },
    ],
  },
  {
    id: uuid(),
    title: "Events",
    icon: "monitor",
    children: [
      {
        id: uuid(),
        link: "/dashboard/meetings/allmeetings",
        name: "All Meetings",
      },
      {
        id: uuid(),
        link: "/dashboard/meetings/createMeeting",
        name: "Create Meeting",
      },
    ],
  },
  {
    id: uuid(),
    title: "Go to site",
    icon: "arrow-right",
    link: "/",
  },
];

export default DashboardMenu;
