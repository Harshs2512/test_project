// import node module libraries
import { Fragment, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
    Image,
    Card,
    Row,
    Col,
    ProgressBar,
    ListGroup,
    Badge
} from 'react-bootstrap';
// import widget/custom components
import { GKTippy } from 'widgets';
// import custom components
import Ratings from 'widgets/ratings/Ratings';
import LevelIcon from 'widgets/miscellaneous/LevelIcon';
// import utility file
import { numberWithCommas } from 'helper/utils';
import { useDispatch } from 'react-redux';
import { addtobookmark } from 'store/bookmarkSlice';
import { useSelector } from 'react-redux';
import useLocalStorage from 'hooks/useLocalStorage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const CourseCard = ({ item, reviews, free, viewby, showprogressbar, extraclass }) => {
    const [popupAnimationId, setPopupAnimationId] = useState(null);
    const [userDetail, setUserDetail] = useState('');
    const dispatch = useDispatch();
    const defaultBookmars = useSelector((state) => state.bookmark);
    const {
        storageValue,
        setStorageValue,
        getStorageValue
    } = useLocalStorage("bookmark", defaultBookmars);
    useEffect(() => {
        const existingBookmark = getStorageValue('bookmark');
        const bookmark = existingBookmark ? JSON.parse(existingBookmark) : [];
        dispatch(addtobookmark(bookmark));
    }, [storageValue]);
    const handleBookmark = (item) => {
        toast.success("Successfully Update");
        const existingBookmark = localStorage.getItem('bookmark');
        const bookmark = existingBookmark ? JSON.parse(existingBookmark) : [];
        const existingIndex = bookmark.findIndex((i) => i._id === item._id);

        if (existingIndex !== -1) {
            bookmark.splice(existingIndex, 1);
            toast.success("Item is removed to bookmark");
        } else {
            toast.success("Successfully Update");
            toast.success("Item is added to bookmark");
            bookmark.push(item);
        }
        setStorageValue(JSON.stringify(bookmark));
        dispatch(addtobookmark(item));
        setPopupAnimationId(item._id);
    }
    const existingBookmark = getStorageValue('bookmark');
    const bookmark = existingBookmark ? JSON.parse(existingBookmark) : [];
    let averageRating = 0;
    let totalRatings = 0;
    if (reviews && reviews.length > 0) {
        reviews.forEach(element => {
            averageRating += Number(element.ratings);
            totalRatings++;
        });
        averageRating /= totalRatings;
    }
    const created_by = useCallback(async () => {
        try {
            const response = await axios.get(`/api/auth/usersingle/${item.created_by}`);
            setUserDetail(response.data);
        } catch (error) {
            console.error("Error fetching user Details:QuizCard", error);
        }
    }, [item.created_by]);
    useEffect(() => {
        created_by();
    }, []);
    const GridView = () => {
        return (
            <Card className={`mb-4 card-hover ${extraclass}`}>
                <Link href={`/marketing/student/quiz-single/single-quiz/?quizId=${item._id}`}>
                    <ToastContainer />
                    <Link href={`/marketing/student/quiz-single/single-quiz/?quizId=${item._id}`}>
                        {
                            item._id ? <Image
                                src={`/api/quiz/quizthumbnail/${item._id}`}
                                alt=""
                                className="card-img-top rounded-top-md"
                            /> : ''
                        }
                    </Link>
                    {/* Card body  */}
                    <Card.Body>
                        <h3 className="h4 mb-2 text-truncate-line-2">
                            <Link href={`/marketing/student/quiz-single/single-quiz/?quizId=${item._id}`} className="text-inherit">
                                {item.title}
                            </Link>
                        </h3>
                        <p className="p mb-1 text-secondary">
                            {item.course_category && item.course_category.catName}
                        </p>
                        <ListGroup as="ul" bsPrefix="list-inline" className="mb-3 text-secondary">
                            <ListGroup.Item as="li" bsPrefix="list-inline-item">
                                <i className="far fa-clock me-1"></i>
                                0{item.hours}:{item.minutes}:{item.seconds}
                            </ListGroup.Item>
                            <ListGroup.Item as="li" bsPrefix="list-inline-item">
                                <LevelIcon level={item.level} />
                                {item.level}
                            </ListGroup.Item>
                        </ListGroup>
                        <div
                            className={`lh-1 d-flex align-items-center ${free ||
                                item.price === undefined ||
                                item.price <= 0 ||
                                item.discount === undefined
                                ? 'mb-5'
                                : ''
                                }`}
                            key={item.id}
                        >
                            <span className="text-warning me-1 mb-0" >
                                <Ratings rating={averageRating} size='0.92rem' /> {averageRating.toFixed(1)}
                            </span>
                            <span className="fs-6 text-muted">
                                {' '}
                                ({numberWithCommas(totalRatings)})
                            </span>
                        </div>
                        {item.currentprice > 0 ?
                            <div
                                className={`lh-1 mt-3`}
                            >

                                <span className="text-dark fw-bold me-1">
                                    &#x20B9;{item.currentprice}
                                </span>{' '}
                                <del className="fs-6 text-muted">&#x20B9;{item.actualprice}</del>
                            </div> :
                            <Badge bg='success' className='py-2'>Free</Badge>
                        }
                    </Card.Body>
                    {/* Card Footer */}
                </Link>
                <Card.Footer>
                    <Row className="align-items-center g-0">
                        <Col className="col-auto">
                            {userDetail && userDetail._id && (
                                 <Image
                                src={`/api/auth/profileimgadmin/${userDetail && userDetail._id}`}
                                className="rounded-circle avatar-xs"
                                alt=""
                            />
                            )}
                        </Col>
                        <Col className="col ms-2">
                            <span>{userDetail.fname}{' '}{userDetail.lname}</span>
                        </Col>
                        <Col className="col-auto" onClick={() => handleBookmark(item)}>
                            <GKTippy content="Add to Bookmarks" >
                                <i
                                    className={`${bookmark.find((i) => i._id === item._id) ? 'fa fa-bookmark text-primary' : 'fe fe-bookmark'} ${popupAnimationId === item._id ? 'popup-animation' : ''}`}
                                    onClick={() => handleBookmark(item)}
                                ></i>
                            </GKTippy>
                        </Col>
                    </Row>
                    <span className={`${showprogressbar ? '' : 'd-none'}`}>
                        {' '}
                        <ProgressBar
                            variant="success"
                            now={item.progress}
                            className="mt-3"
                            style={{ height: '5px' }}
                        />
                    </span>
                </Card.Footer>
            </Card>

        );
    };

    /** Used in Course Filter Page  */
    const ListView = () => {
        return (
            <Link href={`/marketing/student/quiz-single/single-quiz/?quizId=${item._id}`}>
                <Card className="mb-4 card-hover">
                    <Row className="g-0">
                        <Link
                            href={`/marketing/student/quiz-single/single-quiz/?quizId=${item._id}`}
                            className="bg-cover img-left-rounded col-12 col-md-12 col-xl-3 col-lg-3 "
                            style={{
                                background: `url(/api/quiz/quizthumbnail/${item._id})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition: 'top center'
                            }}
                        >
                            {item._id ? <Image
                                src={`/api/quiz/quizthumbnail/${item._id}`}
                                alt="..."
                                className="img-fluid d-lg-none invisible"
                            /> : ""}

                        </Link>
                        <Col lg={9} md={12} sm={12}>
                            {/* <!-- Card body --> */}
                            <Card.Body>
                                <h3 className="mb-2 text-truncate-line-2 ">
                                    <Link href={`/marketing/student/quiz-single/single-quiz/?quizId=${item._id}`} className="text-inherit">
                                        {item.title}
                                    </Link>
                                </h3>
                                {/* <!-- List inline --> */}
                                <ListGroup as="ul" bsPrefix="list-inline" className="mb-5">
                                    <ListGroup.Item as="li" bsPrefix="list-inline-item">
                                        <i className="far fa-clock me-1"></i>
                                        0{item.hours} : {item.minutes} : 0{item.seconds}
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li" bsPrefix="list-inline-item">
                                        <LevelIcon level={item.level} />
                                        {item.level}
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li" bsPrefix="list-inline-item">
                                        <span className="text-warning">
                                            {' '}
                                            <Ratings rating={averageRating} /> {averageRating.toFixed(1)}
                                        </span>
                                        <span className="fs-6 text-muted">
                                            {' '}
                                            ({numberWithCommas(totalRatings)})
                                        </span>
                                    </ListGroup.Item>
                                </ListGroup>
                                {/* <!-- Row --> */}
                                <Row className="align-items-center g-0">
                                    <Col className="col-auto">
                                        {userDetail && userDetail._id && (
                                            <Image
                                            src={`/api/auth/profileimgadmin/${userDetail && userDetail._id}`}
                                            className="rounded-circle avatar-xs"
                                            alt=""
                                        /> 
                                        )}
                                    </Col>
                                    <Col className="col ms-2">
                                        <span>{userDetail && userDetail.fname} {userDetail && userDetail.lname}</span>
                                    </Col>
                                    <Col className="col-auto" onClick={() => handleBookmark(item)}>
                                        <div>
                                            <h4> price : </h4><b>{item.currentprice}  <del>{item.actualprice}</del></b>
                                        </div>
                                        <GKTippy content="Add to Bookmarks" >
                                            <i
                                                className={`${bookmark.find((i) => i._id === item._id) ? 'fa fa-bookmark text-primary' : 'fe fe-bookmark'} ${popupAnimationId === item._id ? 'popup-animation' : ''}`}
                                                onClick={() => handleBookmark(item)}
                                            ></i>
                                        </GKTippy>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </Link>
        );
    };

    /** Used in Instructor Profile Page  */
    const ListGroupView = () => {
        return (
            <div className="d-lg-flex align-items-center">
                <div>
                    <Image src={item.image} alt="" className="rounded img-4by3-lg" />
                </div>
                <div className="ms-lg-3 mt-2 mt-lg-0">
                    <h4 className="text-primary-hover">
                        {item.title}{' '}
                        <Badge bg="light-success" className="text-success">
                            New
                        </Badge>
                    </h4>
                    <ListGroup
                        as="ul"
                        bsPrefix="list-inline"
                        className="fs-6 mb-0 text-inherit"
                    >
                        <ListGroup.Item as="li" bsPrefix="list-inline-item">
                            <i className="far fa-clock me-1"></i>
                            {item.duration}
                        </ListGroup.Item>
                        <ListGroup.Item as="li" bsPrefix="list-inline-item">
                            <LevelIcon level={item.level} />
                            {item.level}
                        </ListGroup.Item>
                        <ListGroup.Item as="li" bsPrefix="list-inline-item">
                            <span className="text-warning">
                                {' '}
                                <Ratings rating={item.rating} /> {item.rating.toFixed(1)}
                            </span>
                            <span className="fs-6 text-muted">
                                {' '}
                                ({numberWithCommas(item.ratingby)})
                            </span>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            </div>
        );
    };
    return (
        <Fragment>
            {viewby === 'grid' ? (
                <GridView />
            ) : viewby === 'list' ? (
                <ListView />
            ) : (
                <ListGroupView />
            )}
        </Fragment>
    );
};

// Specifies the default values for props
CourseCard.defaultProps = {
    free: false,
    viewby: 'grid',
    showprogressbar: false,
    extraclass: ''
};

// Typechecking With PropTypes
CourseCard.propTypes = {
    item: PropTypes.object.isRequired,
    free: PropTypes.bool,
    viewby: PropTypes.string,
    showprogressbar: PropTypes.bool,
    extraclass: PropTypes.string
};

export default CourseCard;
