import { v4 as uuid } from "uuid";

const NavbarDefault = [
  {
    id: uuid(),
    menuitem: "Home",
    link: "/",
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

export default NavbarDefault;
