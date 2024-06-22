// import node module libraries
import { Fragment, useEffect } from "react";

// import widget/custom components
import { ContestCard, FeaturesList, HeroHeader } from "widgets";
import StudioLayout from "layouts/studio/LayoutwithFooter";
import { HeroAcademy } from "studio-components";
const Guided = () => {
  useEffect(() => {
    document.body.className = "bg-light";
  });
  return (
    <Fragment>
      {/*  Page Content  */}

      <HeroHeader />
      {/*  Features list  */}
      <FeaturesList />
      <HeroAcademy />
      <ContestCard />
    </Fragment>
  );
};
Guided.Layout = StudioLayout;
export default Guided;
