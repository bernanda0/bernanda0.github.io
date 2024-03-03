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

const Projects = () => {
  const [projects, setProjects] = useState([]);

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
        });
        // sort by id
        projectList.sort((a, b) => {
          return a.id - b.id;
        });
        setProjects(projectList);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="h-full w-full pt-10 flex flex-col justify-center">
      <div className="flex flex-col mb-20">
        <h1 className="text-4xl ml-8 w-48 mb-12 font-mono font-bold animate-bounce">
          Projects
        </h1>
        <div className="flex flex-row flex-wrap justify-center px-48">
          {projects.map((project, index) => (
            <div key={project.id} className="w-1/3 px-2">
              <ProjectCard
                title={project.title}
                description={project.description}
                image={project.image}
                github_links={project.github_links}
                live_links={project.live_links}
              />
            </div>
          ))}

          {/* Add empty ProjectCard components to fill rows */}
          {[...Array(6 - (projects.length % 3))].map((_, index) => (
            <div key={index} className="w-1/3 px-2 py-2">
              <ProjectCard />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({
  title,
  description,
  image,
  github_links,
  live_links,
}) => {
  return (
    <Card className="max-w-[24rem] overflow-hidden rounded-md m-2">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
        <div className={`relative bg-gray-800 inline-block p-6`}>
          <div className="w-[24rem] h-[12rem] overflow-hidden">
            <img
              src={
                image
                // "https://www.pinclipart.com/picdir/big/157-1578186_user-profile-default-image-png-clipart.png"
              }
              alt="Logo"
              className="w-full h-full object-cover"
              style={{ display: "block", borderRadius: "50%" }}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <Typography variant="h4" color="blue-gray">
          UI/UX Review Check
        </Typography>
        <Typography variant="lead" color="gray" className="mt-3 font-normal">
          Because it&apos;s about motivating the doers. Because I&apos;m here to
          follow my dreams and inspire others.
        </Typography>
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center -space-x-3">
          <Tooltip content="Natali Craig">
            <Avatar
              size="sm"
              variant="circular"
              alt="natali craig"
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
              className="border-2 border-white hover:z-10"
            />
          </Tooltip>
          <Tooltip content="Tania Andrew">
            <Avatar
              size="sm"
              variant="circular"
              alt="tania andrew"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              className="border-2 border-white hover:z-10"
            />
          </Tooltip>
        </div>
        <Typography className="font-normal">January 10</Typography>
      </CardFooter>
    </Card>
  );
};

export default Projects;
