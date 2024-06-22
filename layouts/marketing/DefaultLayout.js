// import node module libraries
import React, { Fragment, useEffect } from "react";
import Script from "next/script";
// import layouts
import NavbarDefault from "layouts/marketing/navbars/NavbarDefault";
import Footer from "layouts/marketing/footers/FooterWithLinks";

const DefaultLayout = (props) => {
  useEffect(() => {
    document.body.className = "bg-light";
  });
  return (
    <Fragment>
      <NavbarDefault login />
      <main>{props.children}</main>
      <Footer bgColor="bg-light" />
      <script src="https://cdn.botpress.cloud/webchat/v1/inject.js"></script>
      <script src="https://mediafiles.botpress.cloud/bd7b4eff-f9dc-4311-94c2-7bd966ffc3ea/webchat/config.js" defer></script>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </Fragment>
  );
};

export default DefaultLayout;
