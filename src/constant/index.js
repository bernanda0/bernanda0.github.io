import {
  Home,
  Handyman,
  Code,
  Business,
  Email,
  GitHub,
  LinkedIn,
  Instagram,
} from "@mui/icons-material";

const navigationElements = [
  {
    id: "home",
    title: "Home",
    icon: Home,
  },
  {
    id: "skills",
    title: "Skills",
    icon: Handyman,
  },
  {
    id: "projects",
    title: "Project",
    icon: Code,
  },
  {
    id: "exp",
    title: "Experience",
    icon: Business,
  },
  {
    id: "contact",
    title: "Contact Me",
    icon: Email,
  },
];

const snsLink = [
  {
    title: "Github",
    link: "https://github.com/bernanda0",
    icon: GitHub,
  },
  {
    title: "LinkedIn",
    link: "https://www.linkedin.com/in/bernanda.rai",
    icon: LinkedIn,
  },
  {
    title: "Instagram",
    link: "https://www.instagram.com/bernanda.rai",
    icon: Instagram,
  },
];

export { navigationElements, snsLink };
