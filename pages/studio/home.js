// import sub components
import {
  HeroAcademy,
  AcademyStats,
  MostPopularCourses,
  BecomeAnInstructor,
  BrowseCategories,
} from "studio-components";
import axios from "axios";
import { Fragment, useEffect } from "react";
import StudioLayout from "layouts/studio/LayoutwithFooter";
const Home = (props) => {
  useEffect(() => {
    document.body.className = "bg-white";
  });
  return (
    <Fragment className="bg-white">
      <HeroAcademy />
      <BecomeAnInstructor data={props?.problem}/>
      <BrowseCategories />
      <AcademyStats />
      <MostPopularCourses /> 
    </Fragment>
  );
};
Home.Layout = StudioLayout;

export const getServerSideProps = async () => {
	try {
	  const response = await axios.get(`${process.env.NEXTAUTH_URL}/api/problemDay/crudProblem`);
	  const cat = await axios.get(`${process.env.NEXTAUTH_URL}/api/problemDay/crudCategory`);
	  const contest = await axios.get(`${process.env.NEXTAUTH_URL}/api/Contest/crudContest`);
      const contestsData = contest?.data?.Contests || [];
	  const problemsData = response?.data?.problems || [];
	  const category = cat?.data || [];
	  return {
		props: {
		  problem: problemsData,
		  category:category,
		  contestsData:contestsData,
		},
	  };
	} catch (error) {
	  console.error("Error fetching data:", error);
	  return {
		props: {
		  problem: [],
		  category:[],
		  contestsData:[],
		},
	  };
	}
  };
export default Home;
