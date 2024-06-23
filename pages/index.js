import {
  HeroAcademy, AcademyStats, MostPopularCourses,
  WhatCustomersSay, EnquiryForm,
  TestimonialSection, StudentStory,
  CircularCarousel, DemandedCourse, ContactUs, RunCourses,
  CybromNews,
  MostPopularOfflineCourses,
  CarouselButtons,
  BuildingSkills, ProcesstoSuccess,
  
} from 'sub-components';

import { Fragment, Suspense, useEffect } from 'react';
import axios from 'axios';

const Home = (props) => {
  const { testimonialData, studentstory, reviews, circularcarousel, demandedCourse, allcourses, carouselbutton, offlineCourses } = props
  useEffect(() => {
    document.body.className = 'bg-light';
  });
  const bg = {
    backgroundImage: `url("/images/svg/Gridwhyus.svg"), linear-gradient(0deg, rgba(23, 82, 126, 1) 16%, rgba(1, 9, 15, 1) 100%)`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  
};
  return (
    <Fragment>
      <Suspense>
        <HeroAcademy />
      </Suspense>
      <EnquiryForm upper="mt-lg-n8 bg-white"/>
      <StudentStory alldata={studentstory} />
      <TestimonialSection alldata={testimonialData} />

      {/* <ProcesstoSuccess /> */}
      <RunCourses alldata={offlineCourses} />
      <Suspense>
        <DemandedCourse alldata={demandedCourse} />
      </Suspense>

      {/* <FAQsection /> */}
      {/* <BuildingSkills /> */}
      <CircularCarousel alldata={circularcarousel} />
      {/* <MostPopularCourses alldata={allcourses} /> */}
      <MostPopularOfflineCourses alldata={offlineCourses} />
      <CarouselButtons alldata={carouselbutton} bg={bg}/>
      <WhatCustomersSay alldata={reviews} />
    
      <CybromNews alldata={carouselbutton} />
      {/* <MostPopularQuizes alldata={allquizes} />
      <MostPopularBlogs alldata={allblogs} /> */}
      {/* <BecomeAnInstructor /> */}
      
       <ContactUs />
      
      <AcademyStats />

    </Fragment>
  );
};

export const getServersiProps = async () => {
  try {
    const data1 = await axios.get(`${process.env.NEXTAUTH_URL}/api/siteSettings/landingPage/placementRecords/getRecords`);
    const data2 = await axios.get(`${process.env.NEXTAUTH_URL}/api/siteSettings/landingPage/placementStory/getRecords`);
    const data3 = await axios.get(`${process.env.NEXTAUTH_URL}/api/siteSettings/landingPage/reviewAndrating/getRecords`);
    const data4 = await axios.get(`${process.env.NEXTAUTH_URL}/api/siteSettings/landingPage/circularCarousel/getRecords`);
    const data5 = await axios.get(`${process.env.NEXTAUTH_URL}/api/siteSettings/landingPage/demandedCourse/getRecords`);
    const data6 = await axios.get(`${process.env.NEXTAUTH_URL}/api/siteSettings/landingPage/carouselButton/getRecords`);
    const data7 = await axios.get(`${process.env.NEXTAUTH_URL}/api/courses/getdashboarddata`);
    const data8 = await axios.get(`${process.env.NEXTAUTH_URL}/api/siteSettings/megaMenu/coursePage/getRecords`);
    // const data6 = await axios.get(`${process.env.NEXTAUTH_URL}/api/blogs/getpostfordashboard`);
    // const data2 = await axios.get(`${process.env.NEXTAUTH_URL}/api/siteSettings/landingPage/carouselButton/getRecords`)
    const testimonialData = data1?.data;
    const studentstory = data2?.data;
    const reviews = data3?.data;
    const circularcarousel = data4?.data;
    const demandedCourse = data5?.data;
    const allcourses = data7?.data;
    const carouselbutton = data6?.data;
    const offlineCourses = data8?.data;

    return {
      props: {
        testimonialData,
        studentstory,
        reviews,
        circularcarousel,
        allcourses,
        demandedCourse,
        carouselbutton,
        offlineCourses,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        testimonialData: [],
        studentstory: [],
        circularcarousel: [],
        reviews: [],
        allcourses: [],
        demandedCourse: [],
        carouselbutton: [],
        offlineCourses: [],
      },
    };
  }
}
export default Home;