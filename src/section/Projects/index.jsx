import {
  collection,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  query,
} from "@firebase/firestore";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Carousel,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { database } from "../../api/firebase";
import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Dialog,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import {
  BrowseGallery,
  Code,
  CodeOutlined,
  CodeRounded,
  CodeSharp,
  GitHub,
  Image,
  InfoOutlined,
  Link,
  Close,
} from "@mui/icons-material";
import { CodeBracketIcon, ListBulletIcon } from "@heroicons/react/16/solid";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
} from "swiper/modules";
import { CodeBracketSquareIcon } from "@heroicons/react/16/solid";
import QuillViewer from "../../components/quilViewer";
import Editable from "../../components/editable";
import { useAuth } from "../../auth/AuthProvider";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [visibleProjects, setVisibleProjects] = useState(100); // Initial number of projects to display

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

        projectList.sort((a, b) => {
          return b.id - a.id;
        });

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
            <div key={project.id} className="w-1/3">
              <ProjectCard
                title={project.title}
                description={project.description}
                tags={project.tags}
                image={project.image}
                github_links={project.github_links}
                live_links={project.live_links}
                banner_image={project.banner_image}
                date={project.date}
                contentID={project.contentID}
              />
            </div>
          ))}
        </div>
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
  banner_image,
  date,
  contentID,
}) => {
  const imageSrc = "image.png";
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <div>
      <Card className="max-w-[28rem] h-[39rem] overflow-hidden rounded-md m-2 mb-14">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none"
        >
          <div
            className={`flex h-[16rem] w-full bg-gray-800 justify-center items-center relative`}
          >
            {banner_image ? (
              <div>
                <img
                  src={banner_image}
                  alt="Description of the image"
                  className="h-max w-max object-cover rounded-lg"
                />
                {contentID ? (
                  <div
                    onClick={() => {
                      setOpen(true);
                    }}
                    className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 hover:cursor-pointer transition-opacity duration-300 bg-black bg-opacity-50 rounded-lg"
                  >
                    <p className="text-white text-center">
                      Click for more info
                    </p>
                  </div>
                ) : (
                  <div />
                )}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </CardHeader>
        <CardBody className="mb-10">
          <div className="flex items-center mb-6">
            <div className="w-[80px] h-[80px] flex items-center justify-center overflow-hidden rounded-full bg-white hover:scale-110 ease-in-out transition-transform">
              {image ? (
                <img
                  src={image}
                  alt="Logo"
                  className="w-full h-full object-cover"
                  style={{ display: "block", borderRadius: "50%" }}
                />
              ) : (
                <span className="text-black text-[2rem] font-bold">
                  {title &&
                    title
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()}
                </span>
              )}
            </div>
            <div className="ml-8">
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
            </div>
          </div>
          <div className="mb-6"></div>
          <ul>
            {description.map((desc, index) => (
              <li
                key={index}
                className="text-black text-[0.86rem] text-justify bg-gray-50 mb-2 p-2 rounded-lg"
              >
                {desc}
              </li>
            ))}
          </ul>
        </CardBody>
        <CardFooter className="absolute bottom-0 left-0 right-0 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Tooltip content="Live">
              <CodeSharp
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
              ></CodeSharp>
            </Tooltip>

            <Tooltip content="Github">
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

            {/* <Tooltip content="Attachments">
              <Link
                className={"text-blue-800 hover:cursor-pointer"}
                onClick={() => {
                  setOpen(true);
                }}
              ></Link>
            </Tooltip> */}
          </div>
          <Typography>{date ? date : ""}</Typography>
        </CardFooter>
      </Card>

      <Dialog open={open} fullScreen={true} handler={handleOpen}>
        <DialogHeader className="sticky top-0 bg-white bg-opacity-70 z-50 p-4 shadow">
          <Button
            variant="text"
            onClick={() => handleOpen(null)}
            className="mr-1 text-4xl hover:scale-125"
          >
            <Close />
          </Button>
          {/* <h1 className="text-mono text-2xl">BR-Reader</h1> */}
        </DialogHeader>
        {contentID ? <ReaderView contentID={contentID} /> : <div></div>}
      </Dialog>
    </div>
  );
};

const ReaderView = ({ contentID }) => {
  const { isAdmin } = useAuth();
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(database, "contents", contentID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setContent(docSnap.data().content);
      } else {
        setContent("<p>Data will be updated soon!</p>");
      }
    };

    fetchData();
  }, []);

  const handleSave = async (editedContent) => {
    const docRef = doc(database, "contents", contentID);
    try {
      await updateDoc(docRef, {
        content: editedContent,
      });
    } catch (err) {
      console.log("cannot update because", err);
    }
  };

  return (
    <>
      <DialogBody>
        {content ? (
          <div className="px-48">
            {isAdmin ? (
              <Editable htmlContent={content} onSave={handleSave} />
            ) : (
              <QuillViewer content={content} />
            )}
          </div>
        ) : (
          <div></div>
        )}
      </DialogBody>
    </>
  );
};

const ImageCarousel = ({ images }) => {
  return (
    <Card className="h-screen w-[48rem]">
      <ImageListItem sx={{ display: "block" }}>
        {images.map((image) => (
          <img
            key={image}
            src={image}
            alt="Gallery"
            className="w-full object-cover"
          />
        ))}
      </ImageListItem>
    </Card>
  );
};
export default Projects;
