import { Fragment, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import PropTypes from "prop-types";
import Link from "next/link";
import { Image, Navbar, Nav, Container, Form } from "react-bootstrap";
import QuickMenu from "layouts/QuickMenu";
import NavDropdownMain from "layouts/marketing/navbars/NavDropdownMain";
import useMounted from "hooks/useMounted";
import MegaMenu from "./mega-menu/MegaMenu";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";
import axios from "axios";

const NavbarDefault = ({ login, applyNowAnimation }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const [categoryTutorials, setCategoryTutorials] = useState({});

  const fetchData = async () => {
    try {
      const categories = await axios.get("/api/category/getcategories");
      const coursesRes = await axios.get(`/api/tutorial/guided`);
      if (categories.status === 200) {
        setCategoryData(categories.data.categories);
      }
      if (coursesRes.status === 200) {
        setTutorials(coursesRes.data.coursesGuide);
      }
    } catch (error) {
      console.error();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const groupedTutorials = tutorials.reduce((acc, tutorial) => {
      const category = tutorial.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(tutorial);
      return acc;
    }, {});
    setCategoryTutorials(groupedTutorials);
  }, [tutorials]);

  const NavbarDefaultRoutes = [
    {
      id: uuid(),
      menuitem: "Home",
      link: "/",
    },
    {
      id: uuid(),
      menuitem: "Tutorials",
      link: "/marketing/tutorial/alltutorials",
      children: categoryData?.map((categoryItem) => ({
        id: categoryItem._id,
        link: `/marketing/tutorial/`,
        menuitem: categoryItem.catName,
        children: categoryTutorials[categoryItem._id]?.map((tutorialItem) => ({
          id: tutorialItem._id,
          link: `/marketing/tutorial/tutorial-single?id=${tutorialItem._id}`,
          menuitem: tutorialItem.title,
        })),
      })),
    },
    {
      id: uuid(),
      menuitem: "Mocks",
      link: "/marketing/quizes/all-mocks/",
    },
    {
      id: uuid(),
      menuitem: "Contest",
      link: "#",
      children: [
        {
          id: uuid(),
          link: "/authentication/sign-code",
          menuitem: "Cybrom Code Studio",
        },
      ],
    },
    {
      id: uuid(),
      menuitem: "Blogs",
      link: "/blog",
    },
    {
      id: uuid(),
      menuitem: "About",
      link: "/about",
    },
    {
      id: uuid(),
      menuitem: "Contact",
      link: "/contact",
    },
  ];

  const [expandedMenu, setExpandedMenu] = useState(false);
  const hasMounted = useMounted();
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const router = useRouter();
  const isTablet = useMediaQuery({ query: "(min-width: 768px)" });
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  useEffect(() => {
    const stickySection = document.querySelector('.sticky-top-effect');
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        stickySection.style.top = '-100px';
      } else {
        stickySection.style.top = '0';
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Fragment>
      <section
        className="sticky-top-effect bg-white"
        style={{ 
          zIndex: '1020',
          position: 'sticky',
          top: '0',
          transition: 'top 0.3s',
        }}
      >
        <div
          className="bg-warning py-0 justify-content-lg-center"
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '0.5rem 1rem',
          }}
        >
          <div 
            className="d-lg-flex gap-3 text-center"
            style={{ display: 'flex', gap: '1rem', textAlign: 'center' }}
          >
            <div 
              className="text-white cursor-pointer d-flex justify-content-center align-items-center"
              style={{ color: 'white', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <div>
                <Image
                  src="/images/png/phone-call.png"
                  alt=""
                  className="apply-now-border"
                />
              </div>
              <div>+91 9981993324</div>
            </div>
          </div>
          <div className="mt-2">
            <h4 className="text-center text-white">
              <div>
                <Link href="/marketing/landings/bca/bca-education" className="text-white">
                  Upskill now & bag top tech roles in 2024 | Get up to ₹50,000 scholarship |{' '}
                  <span>Apply Now</span>
                </Link>
              </div>
            </h4>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div>
              <Link target="_blank" href="https://api.whatsapp.com/send?phone=+919981993324&text=Hello%20from%20Cybrom!">
                <Image
                  src="/images/png/whatsapp.png"
                  alt=""
                  className="mx-1 cursor-pointer"
                  style={{ cursor: 'pointer', margin: '0 0.5rem' }}
                />
              </Link>
            </div>
            <div>
              <Link href="https://www.youtube.com/@cybromtechnology38" target="_blank">
                <Image
                  src="/images/png/youtube.png"
                  alt=""
                  className="mx-1 cursor-pointer"
                  style={{ cursor: 'pointer', margin: '0 0.5rem' }}
                />
              </Link>
            </div>
            <div>
              <Link href="https://www.instagram.com/cybromtechnology/" target="_blank">
                <Image
                  src="/images/png/instagram.png"
                  alt=""
                  className="mx-1 cursor-pointer"
                  style={{ cursor: 'pointer', margin: '0 0.5rem' }}
                />
              </Link>
            </div>
            <div>
              <Link href="https://www.facebook.com/cybromtechnologybhopal" target="_blank">
                <Image
                  src="/images/png/facebook.png"
                  alt=""
                  className="mx-1 cursor-pointer"
                  style={{ cursor: 'pointer', margin: '0 0.5rem' }}
                />
              </Link>
            </div>
          </div>
        </div>
        <Navbar
          onToggle={(collapsed) => setExpandedMenu(collapsed)}
          expanded={expandedMenu}
          expand="lg"
          className="navbar p-2 navbar-default py-2"
        >
          <Container fluid className="px-0 ps-2 d-sm-flex">
            <Link href="/" passHref legacyBehavior>
              <Navbar.Brand>
                <Image
                  src="/images/brand/logo/cybrom_long.png"
                  alt=""
                  className="d-none d-sm-block"
                  style={{ display: 'none', sm: { display: 'block' } }}
                />
                <Image
                  src="/favicon.ico"
                  alt=""
                  className="d-block d-sm-none avatar"
                  style={{ display: 'block', sm: { display: 'none' } }}
                />
              </Navbar.Brand>
            </Link>
            {hasMounted ? (
              <div
                className={`navbar-nav navbar-right-wrap ms-auto d-lg-none nav-top-wrap ${login
                  ? isDesktop || isLaptop || isTablet
                    ? "d-none"
                    : "d-flex"
                  : "d-none"
                  }`}
              >
                <QuickMenu />
              </div>
            ) : null}
            <Navbar.Toggle aria-controls="basic-navbar-nav">
              <span className="icon-bar top-bar mt-0"></span>
              <span className="icon-bar middle-bar"></span>
              <span className="icon-bar bottom-bar"></span>
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                {NavbarDefaultRoutes.map((item, index) => {
                  if (item.menuitem === "Home") {
                    return (
                      <div key={index} className="d-flex">
                        <div className="nav-item pt-1 ms-1">
                          <Nav.Link
                            as={Link}
                            href={item.link}
                            onClick={() => handleItemClick(index)}
                            className={`${selectedItem === index || item.link === router.pathname ? "border-2 border-bottom border-warning text-white" : ""}`}
                          >
                            {item.menuitem}
                          </Nav.Link>
                        </div>
                        <MegaMenu />
                      </div>
                    );
                  } else if (item.menuitem === "Tutorials") {
                    const isTutorialsSelected = selectedItem === index || item.link === router.pathname;
                    return (
                      <div key={index}>
                        <NavDropdownMain
                          item={item}
                          to={item.link}
                          onClick={(value) => setExpandedMenu(value)}
                          className={`${isTutorialsSelected ? "border-2 border-bottom border-warning text-white pt-1" : "pt-1"}`}
                        />
                      </div>
                    );
                  } else if (item.children === undefined) {
                    return (
                      <div className="nav-item pt-1 ms-1" key={index}>
                        <Nav.Link
                          as={Link}
                          href={item.link}
                          onClick={() => handleItemClick(index)}
                          className={`${selectedItem === index || item.link === router.pathname ? "border-2 border-bottom border-warning text-white" : ""}`}
                        >
                          {item.menuitem}
                        </Nav.Link>
                      </div>
                    );
                  } else {
                    return (
                      <NavDropdownMain
                        item={item}
                        key={index}
                        onClick={(value) => setExpandedMenu(value)}
                        className="pt-1"
                      />
                    );
                  }
                })}
              </Nav>
              <Form className="mt-3 mt-lg-0 ms-lg-3 d-flex align-items-center">
                <span className="position-absolute ps-3 search-icon">
                  <i className="fe fe-search"></i>
                </span>
                <Form.Control
                  type="Search"
                  id="formSearch"
                  className="ps-6"
                  placeholder="Search Courses"
                />
              </Form>
              <div className="ms-auto d-flex align-items-center">
                <Nav className="navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap">
                  <span
                    className={
                      login
                        ? "ms-auto mt-3 mt-lg-0 d-none"
                        : "ms-auto mt-3 mt-lg-0"
                    }
                  >
                    <Nav.Link
                      href="#"
                      bsPrefix="btn"
                      className="btn btn-white shadow-sm me-2"
                    >
                      Sign In
                    </Nav.Link>
                    <Nav.Link
                      href="#"
                      bsPrefix="btn"
                      className="btn btn-primary shadow-sm"
                    >
                      Sign Up
                    </Nav.Link>
                  </span>
                  {hasMounted ? (
                    <span
                      className={`${login
                        ? isDesktop || isLaptop || isTablet
                          ? "d-flex"
                          : "d-none"
                        : "d-none"
                        }`}
                    >
                      <QuickMenu />
                    </span>
                  ) : null}
                </Nav>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </section>
    </Fragment>
  );
};

// Specifies the default values for props
NavbarDefault.defaultProps = {
  headerstyle: "navbar-default",
  login: false,
};

// Typechecking With PropTypes
NavbarDefault.propTypes = {
  headerstyle: PropTypes.string,
  login: PropTypes.bool,
};

export default NavbarDefault;
