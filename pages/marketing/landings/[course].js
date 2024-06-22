// import node module libraries
import { Fragment, useState, useEffect } from 'react';
import {
    HeroStudentTyped, TestimonialSection, CarouselButtons, BuildingSkills,
    EnquiryForm, ContentScroll, PapCourses, AllCouseSlide, FAQsectionsingle,
    CareerGoalsSteps, ShortCourse, RequestAccessTestimonialSection
} from 'sub-components';
import { GeeksSEO, } from 'widgets';
import axios from 'axios';
import { useRouter } from 'next/router';

const CoursePage = (props) => {
    const testimonialData = props?.testimonialData;
    const carouselbutton = props?.carouselbutton;
    const courseLogo = props?.course
    const papcourse = props?.papcourse
    const scrollcontent = props?.scrolldata;
    const router = useRouter();
    const [alldata, setAlldata] = useState([]);
    const slug = router?.query?.course;
    const bg = {
        backgroundImage: `url("/images/svg/Gridwhyus2.svg"), linear-gradient(180deg, rgba(23, 82, 126, 1) 16%, rgba(1, 9, 15, 1) 100%)`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
    };
    const fetchData = async () => {
        try {
            const res = await axios.get("/api/siteSettings/megaMenu/coursePage/getRecords");
            if (res.status === 200) {
                setAlldata(res.data.find((item) => item.slug === slug));
            };
        }
        catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        fetchData();
    }, [slug]);

    return (
        <Fragment>

            {/* Cybrom SEO settings  */}
            <GeeksSEO title="Landing Course Cybrom pvt.ltd." />

            <HeroStudentTyped alldata={alldata} />
            {/* Page Content */}

            <EnquiryForm upper="mt-lg-n13 bg-white" />

            <TestimonialSection alldata={testimonialData} />

            <BuildingSkills />

            <CarouselButtons alldata={carouselbutton} bg={bg} />

            <ContentScroll data={scrollcontent} />

            <CareerGoalsSteps />

            <PapCourses data={papcourse} />
            <ShortCourse />
            <RequestAccessTestimonialSection />
            <AllCouseSlide alldata={courseLogo} />
            <FAQsectionsingle />
        </Fragment>
    );
};

export const getServerSideProps = async () => {
    try {
        const data1 = await axios.get(`${process.env.NEXTAUTH_URL}/api/siteSettings/landingPage/placementRecords/getRecords`);
        const data2 = await axios.get(`${process.env.NEXTAUTH_URL}/api/siteSettings/landingPage/carouselButton/getRecords`);
        const courses = await axios.get(`${process.env.NEXTAUTH_URL}/api/siteSettings/landingPage/courseLogo/getRecords`)
        const data3 = await axios.get(`${process.env.NEXTAUTH_URL}/api/siteSettings/papcourseSection/getRecord`);
        const data4 = await axios.get(`${process.env.NEXTAUTH_URL}/api/siteSettings/secondPage/BestInClass/addRecord`);
        const testimonialData = data1?.data;
        const carouselbutton = data2?.data;
        const papcourse = data3?.data;
        const course = courses?.data
        const scrolldata = data4?.data?.Data;
        return {
            props: {
                testimonialData,
                carouselbutton,
                course,
                papcourse,
                scrolldata
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                testimonialData: [],
                carouselbutton: [],
                papcourse: [],
                scrolldata: [],
            },
        };
    }
}

export default CoursePage;