import { Fragment, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import PropTypes from "prop-types";
import Link from "next/link";
import { Navbar, NavDropdown } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";

const Tutorials = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Define mobile breakpoint
  const [hoveredCategory, setHoveredCategory] = useState(0);
  const [selectedTutorial, setSelectedTutorial] = useState(null); // Track selected tutorial
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
  const router = useRouter();
  const [categoryData, setCategoryData] = useState();
  const [tutorials, setTutorials] = useState();

  const fetchData = async () => {
    const categories = await axios.get("/api/category/getcategories");
    const coursesRes = await axios.get(`/api/tutorial/guided`);
    if (categories.status === 200) {
      setCategoryData(categories.data.categories);
    }
    if (coursesRes.status === 200) {
      setTutorials(coursesRes.data.coursesGuide);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCategoryHover = (index) => {
    setHoveredCategory(index);
  };

  const handleCategoryLeave = () => {
    setHoveredCategory(0);
  };

  const handleTutorialClick = (tutorialId, categoryId) => {
    setSelectedTutorial(tutorialId); // Set selected tutorial
    setSelectedCategory(categoryId); // Set selected category
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId); // Set selected category
  };
  const [selectedItem, setSelectedItem] = useState(null);
  const handleAllTutorialClick = () => {
    setSelectedItem('tutorials');
    router.push("/marketing/tutorial/alltutorials");
  };
  return (
    <Fragment>
      {isMobile ? (
        <Navbar.Toggle />
      ) : (
        <NavDropdown
          title="Tutorials"
          show
          className={`mt-1 ${selectedItem === "tutorials" || router.pathname === "/marketing/tutorial/alltutorials" ? "  border-2 border-bottom border-warning text-white " : " "}`}
          onClick={handleAllTutorialClick}
        >
          {categoryData?.map((item, index) => (
            <NavDropdown.Item
              key={index}
              className={`ms-0 justify-content-between ${
                selectedCategory === item._id
                  ? "border-bottom border-2 border-warning text-white"
                  : ""
              }`}
              onMouseEnter={() => handleCategoryHover(index)}
              onMouseLeave={handleCategoryLeave}
              onClick={(event) => {
                event.stopPropagation();
                handleCategoryClick(item._id);
              }}
            >
              <h5 className="p-0 m-1">{item?.catName}</h5>
              {hoveredCategory === index && (
                <NavDropdown bsPrefix="d-block" className={`dropend py-0`} show>
                  {tutorials
                    .filter((tutorial) => tutorial.category === item._id)
                    .map((tutorial, tutorialIndex) => (
                      <NavDropdown.Item
                        key={tutorialIndex}
                        className={`ml-4 ${
                          selectedTutorial === tutorial._id
                            ? "border-bottom border-2 border-warning text-white"
                            : ""
                        }`}
                        onClick={() =>
                          handleTutorialClick(tutorial._id, item._id)
                        } // Handle click event
                      >
                        <Link
                          href={`/marketing/tutorial/tutorial-single?id=${tutorial._id}`}
                        >
                          <h5 className="p-0 m-1">{tutorial.title}</h5>
                        </Link>
                      </NavDropdown.Item>
                    ))}
                </NavDropdown>
              )}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      )}
    </Fragment>
  );
};

Tutorials.defaultProps = {
  headerstyle: "navbar-default",
  login: false,
};

Tutorials.propTypes = {
  headerstyle: PropTypes.string,
  login: PropTypes.bool,
};

export default Tutorials;

// onClick={(e) => e.stopPropagation()}
