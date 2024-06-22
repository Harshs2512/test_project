import { v4 as uuid } from "uuid";

const NavbarDefault = [
  {
    id: uuid(),
    menuitem: "Learn",
    link: "/",
    children: [
      { id: uuid(), link: "/studio/guided-path", menuitem: "Guidede path" },
      { id: uuid(), link: "/studio/challenges", menuitem: "challenges" },
    ],
  },
  {
    id: uuid(),
    menuitem: "Courses",
    link: "/marketing/courses/all-courses/",
  },
  {
    id: uuid(),
    menuitem: "Mocks",
    link: "/marketing/quizes/all-mocks/",
  },
  {
    id: uuid(),
    menuitem: "Problem of Day",
    link: "/studio/request-access/",
  }
  
];

export default NavbarDefault;
