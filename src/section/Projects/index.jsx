import { collection, getDocs, query } from "@firebase/firestore";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { database } from "../../api/firebase";
import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { Code, GitHub } from "@mui/icons-material";
import { CodeBracketIcon } from "@heroicons/react/16/solid";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [visibleProjects, setVisibleProjects] = useState(3); // Initial number of projects to display

  const handleSeeMore = () => {
    setVisibleProjects((prevCount) => prevCount + 3); // Show 3 more projects when "See More" is clicked
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const projectList = [];
      const q = query(collection(database, "projects"));
      const qSnap = await getDocs(q);
      if (!qSnap.empty) {
        qSnap.forEach((doc) => {
          projectList.push({
            id: doc.id,
            ...doc.data(),
          });
          console.log(doc.data().description);
        });

        projectList.sort((a, b) => {
          return b.id - a.id;
        });

        console.log(projectList);
        setProjects(projectList);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="h-full w-full pt-10 flex flex-col">
      <div className="flex flex-col mb-20">
        <h1 className="text-4xl ml-8 w-48 mb-12 font-mono font-bold animate-bounce">
          Projects
        </h1>
        <div className="flex flex-row flex-wrap px-[10rem]">
          {projects.slice(0, visibleProjects).map((project, index) => (
            <div key={project.id} className="w-1/3 pr-2">
              <ProjectCard
                title={project.title}
                description={project.description}
                tags={project.tags}
                image={project.image}
                github_links={project.github_links}
                live_links={project.live_links}
                date={project.date}
              />
            </div>
          ))}
        </div>
        {visibleProjects < projects.length && (
          <button
            onClick={handleSeeMore}
            className="mt-4 mx-auto w-48 bg-gray-800 text-white py-2 px-4 rounded-3xl font-mono transition duration-300 hover:bg-gray-700"
          >
            See More
          </button>
        )}
      </div>
    </div>
  );
};

const ProjectCard = ({
  title,
  tags,
  description,
  image,
  github_links,
  live_links,
  date,
}) => {
  return (
    <Card className="max-w-[24rem] overflow-hidden rounded-md m-2 mb-14">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
        <div
          className={`flex h-full w-[24rem] bg-gray-800 p-6 justify-center items-center`}
        >
          <div className="w-[120px] h-[120px] my-8 flex items-center justify-center overflow-hidden rounded-full bg-white hover:scale-110 ease-in-out transition-transform">
            {image ? (
              <img
                src={image}
                alt="Logo"
                className="w-full h-full object-cover"
                style={{ display: "block", borderRadius: "50%" }}
              />
            ) : (
              <span className="text-black text-[3rem] font-bold">
                {title &&
                  title
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()}
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <Typography
          variant="h4"
          className="mb-2 text-2xl font-bold text-blue-800"
        >
          {title}
        </Typography>
        <div className="flex flex-wrap">
          {tags &&
            tags.split(", ").map((tag) => (
              <p
                className="text-gray-500 bg-gray-100 rounded-2xl p-2 text-xs mr-1"
                key={tag}
              >
                {tag}
              </p>
            ))}
        </div>
        {/* add for tag with gray text color */}
        <Typography
          variant="lead"
          color="gray"
          className="mt-4 font-normal h-[6rem] text-base text-gray-500 text-justify"
        >
          {description}
        </Typography>
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Tooltip content="Github">
            {/* if github link exist blue if not gray */}
            <GitHub
              className={
                github_links
                  ? "text-blue-800 hover:cursor-pointer"
                  : "text-gray-500"
              }
              onClick={() => {
                if (github_links) {
                  window.open(github_links, "_blank");
                }
              }}
            ></GitHub>
          </Tooltip>

          <Tooltip content="Live">
            <Code
              className={
                live_links
                  ? "text-blue-800 hover:cursor-pointer"
                  : "text-gray-500"
              }
              onClick={() => {
                if (live_links) {
                  window.open(live_links, "_blank");
                }
              }}
            ></Code>
          </Tooltip>
        </div>
        <Typography>{date ? date : ""}</Typography>
      </CardFooter>
    </Card>
  );
};

export default Projects;
