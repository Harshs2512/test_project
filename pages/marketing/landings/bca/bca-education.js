import {
    HeroAcademy, AcademyStats, MostPopularCourses,
    WhatCustomersSay, FAQsection,
    TestimonialSection, Bcascop,UpcomingWebinars,SkillCertificate,
    CircularCarousel, DemandedCourse, ContactUs, RequestAccessTestimonialSection, EducationHeroRightImage,
    FeaturesWithBullets
} from 'sub-components';
import { LogosTopHeading3 } from 'widgets';
import LogoList2 from 'data/clientlogos/LogoList2';
import { Fragment, Suspense, useEffect } from 'react';
import axios from 'axios';

const Bcaprogramm = (props) => {
    // const testimonialData = props?.testimonialData;
    // const studentstory = props?.studentstory;
    const reviews = props?.reviews;
    // const circularcarousel = props?.circularcarousel;
    // const demandedCourse = props?.demandedCourse;
    // const allcourses = props?.allcourses;

    useEffect(() => {
        document.body.className = 'bg-light';
    });

    return (
        <Fragment>
            <EducationHeroRightImage />
            <FeaturesWithBullets />
            <LogosTopHeading3
                title="TRUSTED BY OVER 12,500 GREAT TEAMS"
                logos={LogoList2}
                limit={5}
            /> <Bcascop />
            
            <SkillCertificate />
           <FAQsection />
            {/* <CircularCarousel alldata={circularcarousel} />
        <MostPopularCourses alldata={allcourses} /> */}
            {/* <MostPopularQuizes alldata={allquizes} />
        <MostPopularBlogs alldata={allblogs} /> */}
            {/* <BecomeAnInstructor /> */}
            <RequestAccessTestimonialSection />
            <ContactUs />
            <UpcomingWebinars />
            <WhatCustomersSay alldata={reviews} />
            <AcademyStats />

        </Fragment>
    );
};

export const getStaticProps = async () => {
    try {
        // const data1 = await axios.get(`${process.env.NEXTAUTH_URL}/api/siteSettings/landingPage/placementRecords/getRecords`);
        // const data2 = await axios.get(`${process.env.NEXTAUTH_URL}/api/siteSettings/landingPage/placementStory/getRecords`);
        const data3 = await axios.get(`${process.env.NEXTAUTH_URL}/api/siteSettings/landingPage/reviewAndrating/getRecords`);
        // const data4 = await axios.get(`${process.env.NEXTAUTH_URL}/api/siteSettings/landingPage/circularCarousel/getRecords`);
        // const data5 = await axios.get(`${process.env.NEXTAUTH_URL}/api/siteSettings/landingPage/demandedCourse/getRecords`);
        // const data6 = await axios.get(`${process.env.NEXTAUTH_URL}/api/siteSettings/landingPage/carouselButton/getRecords`);
        // const data7 = await axios.get(`${process.env.NEXTAUTH_URL}/api/courses/getdashboarddata`);
        // const testimonialData = data1?.data;
        // const studentstory = data2?.data;
        const reviews = data3?.data;
        // const circularcarousel = data4?.data;
        // const demandedCourse = data5?.data;
        // const allcourses = data7?.data;
        // const carouselbutton = data6?.data;

        return {
            props: {
                // testimonialData,
                // studentstory,
                reviews,
                // circularcarousel,
                // allcourses,
                // demandedCourse,
                // carouselbutton,

            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                // testimonialData: [],
                // studentstory: [],
                // circularcarousel: [],
                reviews: [],
                // allcourses: [],
                // demandedCourse: [],
                // carouselbutton: [],

            },
        };
    }
}

export default Bcaprogramm;