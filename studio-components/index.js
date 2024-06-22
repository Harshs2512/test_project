/**
 * The folder studio-components contains studio component of all the pages,
 * so here you will find folder names which are listed in root pages.
 */

/**
 * MARKETING studio COMPONENTS
 */
// studio components for marketing/landings/landing-courses.js page
import CoursesFeatures4Columns from "studio-components/landings/landing-courses/Features4Columns";
import BrowseCategories from "studio-components/landings/landing-courses/BrowseCategories";
import WorldClassInstructors from "studio-components/landings/landing-courses/WorldClassInstructors";
import HeroTyped from "studio-components/landings/landing-courses/HeroTyped";
import BecomeInstructor from "studio-components/landings/landing-courses/BecomeInstructor";
import CoursesTestimonialSection from "studio-components/landings/landing-courses/TestimonialSection";
import AddCourseGuide from "./admin/Guided/add-course-guide";
import AddLearningGuide from "./admin/Guided/add-Guid-learning";
import Heatmap from "studio-components/calandar/Heatmap";
// studio components for about.js page
import FeaturesList from "studio-components/about/FeaturesList";
import HeroContent from "studio-components/about/HeroContent";
import ChallengesCard from "./challenges/card";
import FreeChallenge from "./challenges/freeChallenge"
import EditContestComponent from "./admin/add-new-contest/EditContestComponent";

// studio components for contact.js page
import ContactForm from "studio-components/contact/ContactForm";
import LeadTestimonialSection from "studio-components/landings/code-info/TestimonialSection";

// studio components for home academy page ( home-academy.js - v2.0.0 )
import HeroAcademy from "studio-components/landings/home-academy/HeroAcademy";
import AcademyStats from "studio-components/landings/home-academy/AcademyStats";
import MostPopularCourses from "studio-components/landings/home-academy/MostPopularCourses";
import LatestJobOpening from "studio-components/landings/home-academy/LatestJobOpening";
import MostPopularQuizes from "studio-components/landings/home-academy/MostPopularQuizes";
import BecomeAnInstructor from "studio-components/landings/home-academy/BecomeAnInstructor";
import WhatCustomersSay from "studio-components/landings/home-academy/WhatCustomersSay";

// studio components for /dashboard/projects/grid.js page
import ProjectCard from "studio-components/dashboard/projects/grid/ProjectCard";

// studio components for /dashboard/projects/list.js page
import ProjectListTable from "studio-components/dashboard/projects/list/ProjectListTable";
// studio components for /dashboard/projects/single/* pages
import CommonHeaderTabs from "studio-components/dashboard/projects/single/CommonHeaderTabs";
import OffcanvasCreateProjectForm from "studio-components/dashboard/projects/OffcanvasCreateProjectForm";

export {
  FreeChallenge,
  MostPopularQuizes,
  BecomeInstructor,
  BrowseCategories,
  CommonHeaderTabs,
  LeadTestimonialSection,
  ContactForm,
  CoursesFeatures4Columns,
  CoursesTestimonialSection,
  FeaturesList,
  HeroContent,
  HeroTyped,
  ProjectCard,
  ProjectListTable,
  WorldClassInstructors,
  OffcanvasCreateProjectForm,
  HeroAcademy,
  AcademyStats,
  MostPopularCourses,
  BecomeAnInstructor,
  WhatCustomersSay,
  LatestJobOpening,
  Heatmap,
  ChallengesCard,
  EditContestComponent,
  AddCourseGuide,
  AddLearningGuide
};
