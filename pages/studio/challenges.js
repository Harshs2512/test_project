// import node module libraries
import { Fragment, useEffect } from "react";
// import widget/custom components
import { HeroChallenge } from "widgets";
import { ChallengesCard, HeroAcademy ,FreeChallenge} from "studio-components";
import StudioLayout from "layouts/studio/LayoutwithFooter";
import axios from "axios";
const Guided = (props) => {
  useEffect(() => {
    document.body.className = "bg-light";
  });

  return (
    <Fragment>
      {/*  Page Content  */}
      <HeroChallenge />
      <HeroAcademy data={props?.contestsData}/>
	  <ChallengesCard data={props?.contestsData}/>
      <FreeChallenge data={props?.contestsData}/>
    </Fragment>
  );
};

Guided.Layout = StudioLayout;
export const getServerSideProps = async () => {
	try {
	  const contest = await axios.get(`${process.env.NEXTAUTH_URL}/api/Contest/crudContest`);
      const contestsData = contest?.data?.Contests || [];
	  return {
		props: {
		  contestsData:contestsData,
		},
	  };
	} catch (error) {
	  console.error("Error fetching data:", error);
	  return {
		props: {
		  contestsData:[],
		},
	  };
	}
  };
export default Guided;
