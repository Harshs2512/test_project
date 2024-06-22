// import node module libraries
import { Fragment, useState, useEffect } from 'react';
import {
    HeroStudentTyped,
    HeroCourses,
    MultiSlide,
    WayToLearn,
    GuidedCourse,
    CourseCurriculum,
    LiveProject,
    LearningProjects,
    FAQsection,
    AllCouseSlide
} from 'sub-components';
import { GeeksSEO, StorySlider, } from 'widgets';
import axios from 'axios';
import { useRouter } from 'next/router';
const CoursePage = (props) => {
    const router = useRouter();
    const slug = router?.query?.course;
    const courseLogo = props?.course;
    const hero = props?.hero;
    const studentstory = props?.testimonialData;
    const waytolearn = props?.waytolearn;
    const companies = props?.company;
    const curriculum = props?.curriculum;

    return (
        <Fragment>

            {/* Cybrom SEO settings  */}
            <GeeksSEO title={`${slug} Course Cybrom pvt.ltd.`} />

            <HeroCourses alldata={hero} />
            <MultiSlide alldata={companies} />
            <WayToLearn data={waytolearn} />
            <AllCouseSlide alldata={courseLogo} />
            <GuidedCourse />
            <LiveProject />
            <LearningProjects />
            <CourseCurriculum alldata={curriculum} />


            <StorySlider alldata={studentstory} />
            <FAQsection />
        </Fragment>
    );
};

export const getServerSideProps = async () => {
    try {
        const data1 = await axios.get(`${process.env.NEXTAUTH_URL}/api/siteSettings/landingPage/placementRecords/getRecords`);
        const data2 = await axios.get(`${process.env.NEXTAUTH_URL}/api/siteSettings/landingPage/carouselButton/getRecords`);
        const data3 = await axios.get(`${process.env.NEXTAUTH_URL}/api/siteSettings/thirdPage/waytolearnSection/getRecord`);
        const courses = await axios.get(`${process.env.NEXTAUTH_URL}/api/siteSettings/landingPage/courseLogo/getRecords`)
        const data4 = await axios.get(`${process.env.NEXTAUTH_URL}/api/siteSettings/landingPage/circularCarousel/getRecords`);
        const data5 = await axios.get(`${process.env.NEXTAUTH_URL}/api/siteSettings/thirdPage/heroSection/getRecord`);
        const data6 = await axios.get(`${process.env.NEXTAUTH_URL}/api/siteSettings/thirdPage/curriculumSection/getRecord`);

        const testimonialData = data1?.data;
        const carouselbutton = data2?.data;
        const waytolearn = data3?.data[0];
        const company = data4?.data;
        const course = courses?.data
        const hero = data5?.data
        const curriculum = data6?.data
        return {
            props: {
                testimonialData,
                carouselbutton,
                course,
                waytolearn,
                company,
                hero,
                curriculum,
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                testimonialData: [],
                carouselbutton: [],
                course: [],
                company: [],
                hero: [],
                curriculum: [],
            },
        };
    }
}

export default CoursePage;