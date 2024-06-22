// import node module libraries
import { Fragment, useEffect, useState } from 'react';
import { Row, Col, Image, Form, Button } from 'react-bootstrap';
import Link from 'next/link';
import axios from 'axios';
import useToggle from 'hooks/useToggle';
import Loading from 'pages/loading'
import useMounted from 'hooks/useMounted';
import { useMediaQuery } from 'react-responsive';

const MegaMenu = () => {
    const [hoveredCategory, setHoveredCategory] = useState(0);
    const [categories, setCategories] = useState([]);
    const [courses, setCourses] = useState([]);
    const [quizes, setQuizes] = useState([]);
    const [Mode, toggleMode] = useToggle(true);
    const [loading, setLoading] = useState(false);

    const hasMounted = useMounted();

    const isDesktop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    const changeMode = () => {
        toggleMode(true)
    };

    const handleCategoryHover = (index) => {
        setHoveredCategory(index);
    };

    const handleCategoryLeave = () => {
        setHoveredCategory(0);
    };

    const fetchData = async () => {
        if (Mode) {
            setLoading(true);
            try {
                const categories = await axios.get("/api/siteSettings/megaMenu/category/getcategory");
                const coursesRes = await axios.get('/api/siteSettings/megaMenu/coursePage/getRecords');
                if (categories.status === 200) {
                    setCategories(categories.data.categories)
                }
                if (coursesRes.status === 200) {
                    setCourses(coursesRes.data)
                }
            } catch (error) {
                console.log(error)
            }
            setLoading(false);
        }
        else {
            setLoading(true);
            try {
                const categories = await axios.get("/api/category/getcategories");
                const coursesRes = await axios.get(`/api/courses/getdashboarddata`);
                if (categories.status === 200) {
                    setCategories(categories.data.categories)
                }
                if (coursesRes.status === 200) {
                    setCourses(coursesRes.data.courses)
                }
            }
            catch (error) {
                console.log(error)
            }
            setLoading(false);
        }
    };

    const fetchQuiz = async () => {
        try {
            const allQuiz = await axios.get(`/api/quiz/allQuiz`);
            setQuizes(allQuiz.data.quizes)
        }
        catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        fetchData()
        fetchQuiz()
    }, [Mode]);

    return (
        <Fragment>
            <div className="nav-item dropdown dropdown-fullwidth pt-1">
                <Link className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    Courses
                </Link>
                <div className="dropdown-menu dropdown-menu-md bg-grey-900" onMouseLeave={handleCategoryLeave}>
                    <div className="px-4 pt-2 pb-2">
                        <Row className="row">
                            <Col xs={12}>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className="lh-1 mb-5">
                                        <h3 className="mb-1">Course Category</h3>
                                        <p>Breakthrough pricing on 100% online degrees designed to fit into your life.</p>
                                    </div>
                                    <div>
                                        <Link href='/marketing/courses/all-courses'>
                                            <Button>All Courses</Button>
                                        </Link>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} xs={12} className='custom_scrollbar' style={{ "maxHeight": "300px", "overflowY": "auto" }}>
                                <div className="border-bottom pb-2 d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">CATEGORIES</h5>
                                    <div
                                        id="pricing-switch"
                                        className="d-flex justify-content-center align-items-center"
                                    >
                                        <Form>
                                            <Form.Check
                                                name="radios"
                                                type="checkbox"
                                                className="form-switch form-switch-price"
                                                id="pricingSwitch"
                                                checked={Mode}
                                                onChange={changeMode}
                                            />
                                        </Form>
                                        <span className="ms-1">{Mode ? "OFLINE" : "ONLINE"}</span>
                                    </div>
                                </div>
                                {!loading && categories?.map((item, index) => {
                                    return (
                                        <div
                                            className={`category-btn rounded-lg align-items-center ${hoveredCategory === index ? 'show-courses' : ''
                                                }`}
                                            key={item._id}
                                            onMouseEnter={() => handleCategoryHover(index)}

                                        >
                                            <div className="d-flex mb-2 p-2 row">
                                                <div className="col-10 d-flex">
                                                    <h4 className="mb-0">{Mode ? item?.title : item?.catName}</h4>
                                                </div>
                                                <div className="col-2">
                                                    <i className="fe fe-chevron-right fe-2xl fs-3 text-dark"></i>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                {loading ? <Loading /> : ""}
                            </Col>
                            {Mode ? (
                                <Col lg={4} xs={12} className='custom_scrollbar' style={{ "maxHeight": "300px", "overflowY": "auto" }}>
                                    <div className="border-bottom pb-2 mb-3">
                                        <h5 className="mb-0">COURSES</h5>
                                    </div>
                                    {categories?.map((items, index) => {
                                        return (
                                            <div className="rounded-lg align-items-center " key={index}>
                                                {hoveredCategory === index && (
                                                    <div className="d-flex mb-2 p-1 row">
                                                        {courses.filter((course) => course?.category === items._id).map((item, index) => (
                                                            <Link href={`/marketing/landings/${item.slug}?cid=${item._id}`}
                                                                key={index}
                                                            >
                                                                <div className='py-1 d-flex'>
                                                                    {item?._id &&
                                                                        <Image src={`/api/siteSettings/megaMenu/coursePage/getlogo/${item?._id}`} alt="" className="img-fluid w-20 me-3" />
                                                                    }
                                                                    <h5 className="mb-0">{item.course_name}</h5>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </Col>
                            ) : (
                                <Col lg={4} xs={12} className='custom_scrollbar' style={{ "maxHeight": "300px", "overflowY": "auto" }}>
                                    <div className="border-bottom pb-2 mb-3">
                                        <h5 className="mb-0">COURSES</h5>
                                    </div>
                                    {categories?.map((items, index) => {
                                        return (
                                            <div className="rounded-lg align-items-center " key={index}>
                                                {hoveredCategory === index && (
                                                    <div className="d-flex mb-2 p-1 row">
                                                        {courses.filter((course) => course.course_category === items._id).map((item) => (
                                                            <Link href={`/marketing/courses/course-single/${item.slug}`}>
                                                                <div className='py-1 d-flex'>
                                                                    <Image src={`/api/courses/getthumbnail/${item._id}`} alt="" className="img-fluid w-20 me-3" />
                                                                    <h5 className="mb-0">{item.course_title}</h5>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </Col>
                            )}
                            <Col lg={4} xs={12} className='custom_scrollbar rounded' style={{ "maxHeight": "300px", "overflowY": "auto", "overflowX": "hidden" }}>
                                <div className="border-bottom pb-2 mb-3">
                                    <h5 className="mb-0">QUIZ</h5>
                                </div>
                                {quizes?.map((item, index) => {
                                    return (
                                        <Link href={`/marketing/student/quiz-single/single-quiz?quizId=${item?._id}`} key={index}>
                                            <div className="rounded-lg" >
                                                <div className="d-flex mb-1 p-1 row cursor-pointer">
                                                    <div className='py-1 d-flex'>
                                                        <Image src={`/api/quiz/quizthumbnail/${item._id}`} alt="" className="img-fluid w-20 me-3" />
                                                        <h5 className="mb-0">{item.title}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default MegaMenu;