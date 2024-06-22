// import node module libraries
import { Fragment } from "react";
import axios from "axios"
// import sub components
import {
  Features2Columns,
  RequestAccessTestimonialSection,
} from "sub-components";
import {
  HeroAcademy,
  BecomeAnInstructor,
} from "studio-components";
import LayoutwithFooter from "layouts/studio/LayoutwithFooter";
import { LogosTopHeadingOffset, GeeksSEO } from "widgets";
import LogoList2 from "data/clientlogos/LogoList2";

const RequestAccess = (props) => {
  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="problem of day | cybrom technology pvt. ltd." />

      <main>
        <HeroAcademy />
        <Features2Columns />
        <BecomeAnInstructor data={props?.data} />
        <RequestAccessTestimonialSection />
        <LogosTopHeadingOffset limit={4} offset={2} logos={LogoList2} />
      </main>
    </Fragment>
  );
};

RequestAccess.Layout = LayoutwithFooter;

export const getServerSideProps = async () => {
  try {
    const response = await axios.get(`${process.env.NEXTAUTH_URL}/api/problemDay/crudProblem`);
    const problemsData = response?.data?.problems || [];
    return {
      props: {
        data: problemsData,
      },
    };
  } catch (error) {
    console.error("Error fetching data from quizes:", error);
    return {
      props: {
        data: [],
        contestsData:[],
      },
    };
  }
};
export default RequestAccess;
