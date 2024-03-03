import React, { useEffect, useState } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { database } from "../../api/firebase";
import { collection, getDocs, query } from "@firebase/firestore";
import { EmojiEvents } from "@mui/icons-material";

const Experience = () => {
  const [open, setOpen] = React.useState(true);
  const [jobExperience, setJobExperience] = useState([]);

  useEffect(() => {
    const fetchJobExperience = async () => {
      const jobList = [];
      const q = query(collection(database, "experience"));
      const qSnap = await getDocs(q);
      if (!qSnap.empty) {
        qSnap.forEach((doc) => {
          jobList.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        // sort by id
        jobList.sort((a, b) => {
          return a.id - b.id;
        });

        setJobExperience(jobList);
      } else {
        console.log("<p>Data will be updated soon!</p>");
      }
    };

    fetchJobExperience();
  }, []);

  return (
    <div className="h-full w-full pt-10 flex flex-col justify-center">
      <div className="flex flex-col">
        <h1 className="text-4xl ml-8 w-48 mb-12 font-mono font-bold animate-bounce">
          Job Experiences
        </h1>
        <Timeline position="alternate">
          {/* Detail cards */}
          {jobExperience.map((job) => (
            <DetailCard
              key={job.id}
              time={job.timeline}
              logo={job.logo}
              title={job.title}
              description={job.description}
            />
          ))}
        </Timeline>
      </div>
    </div>
  );
};

const DetailCard = ({ time, logo, title, description }) => {
  return (
    <TimelineItem>
      <TimelineOppositeContent>
        <h2 className="text-base font-mono white">{time}</h2>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Card className="mt-6 w-full mb-10 rounded-lg">
          <CardBody>
            <div className="rounded-full h-12 mb-4">
              <img
                src={
                  logo ||
                  "https://www.pinclipart.com/picdir/big/157-1578186_user-profile-default-image-png-clipart.png"
                }
                alt="Logo"
                className="h-full object-cover"
                style={{ display: "block" }}
              />
            </div>
            <Typography
              variant="h5"
              color="blue-gray"
              className="my-2 text-blue-800 font-bold text-start"
            >
              {title}
            </Typography>
            <Typography className="text-start">{description}</Typography>
          </CardBody>
          <CardFooter className="pt-0 flex items-center">
            <EmojiEvents className="hover:cursor-pointer" />
            <p className="font-thin text-xs font-mono mx-2">Achievements</p>
            {/* mui icon for achievment */}
          </CardFooter>
        </Card>
      </TimelineContent>
    </TimelineItem>
  );
};

export default Experience;
