import { useEffect, useState } from "react";
import Skillsquare from "../../components/Skillsquare";
import { collection, doc, getDoc, getDocs, query } from "@firebase/firestore";
import { database } from "../../api/firebase";

const Skills = () => {
  const [backendSkills, setBackendSkills] = useState([]);
  const [mobileSkills, setMobileSkills] = useState([]);
  const [webSkills, setWebSkills] = useState([]);
  const [otherSkills, setOtherSkills] = useState([]);

  useEffect(() => {
    const fetchBackend = async () => {
      const beList = [];
      const q = query(collection(database, "backend"));
      const qSnap = await getDocs(q);

      if (!qSnap.empty) {
        qSnap.forEach((doc) => {
          beList.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setBackendSkills(beList);
      } else {
        console.log("<p>Data will be updated soon!</p>");
      }
    };

    const fetchMobile = async () => {
      const moList = [];
      const q = query(collection(database, "mobile"));
      const qSnap = await getDocs(q);
      if (!qSnap.empty) {
        qSnap.forEach((doc) => {
          moList.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setMobileSkills(moList);
      } else {
        console.log("<p>Data will be updated soon!</p>");
      }
    };

    const fetchWeb = async () => {
      const webList = [];
      const q = query(collection(database, "web3"));
      const qSnap = await getDocs(q);
      if (!qSnap.empty) {
        qSnap.forEach((doc) => {
          webList.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setWebSkills(webList);
      } else {
        console.log("<p>Data will be updated soon!</p>");
      }
    };

    const fetchOther = async () => {
      const otherList = [];
      const q = query(collection(database, "other"));
      const qSnap = await getDocs(q);
      if (!qSnap.empty) {
        qSnap.forEach((doc) => {
          otherList.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setOtherSkills(otherList);
      } else {
        console.log("<p>Data will be updated soon!</p>");
      }
    };

    fetchBackend();
    fetchMobile();
    fetchWeb();
    fetchOther();
  }, []);

  return (
    <div className="h-full w-full pt-10 flex flex-col justify-center">
      <div className="flex items-center">
        <h1 className="text-4xl ml-8 w-48 font-mono font-bold animate-bounce">
          Skill Set
        </h1>
      </div>

      {/* for backend */}
      <div className="flex items-center ml-24">
        <h1 className="text-xl -rotate-90 font-mono w-20">Backend</h1>
        <div className="flex flex-wrap">
          {backendSkills.map((skill) => (
            <Skillsquare
              key={skill.id}
              logo={skill.logo}
              title={skill.title}
              description={skill.desc}
              expertise={skill.expertise}
            />
          ))}
        </div>
      </div>

      {/* for web */}
      <div className="flex items-center ml-24">
        <h1 className="text-xl -rotate-90 font-mono text-start w-20">
          Website
        </h1>
        <div className="flex flex-wrap">
          {webSkills.map((skill) => (
            <Skillsquare
              key={skill.id}
              logo={skill.logo}
              title={skill.title}
              description={skill.desc}
              expertise={skill.expertise}
            />
          ))}
        </div>
      </div>

      {/* for mobile devs */}
      <div className="flex items-center ml-24">
        <h1 className="text-xl -rotate-90 font-mono text-start w-20">Mobile</h1>
        <div className="flex flex-wrap">
          {mobileSkills.map((skill) => (
            <Skillsquare
              key={skill.id}
              logo={skill.logo}
              title={skill.title}
              description={skill.desc}
              expertise={skill.expertise}
            />
          ))}
        </div>
      </div>

      {/* for other */}
      <div className="flex items-center ml-24">
        <h1 className="text-xl -rotate-90 font-mono text-start w-20">Other</h1>
        <div className="flex flex-wrap">
          {otherSkills.map((skill) => (
            <Skillsquare
              key={skill.id}
              logo={skill.logo}
              title={skill.title}
              description={skill.desc}
              expertise={skill.expertise}
            />
          ))}
        </div>
      </div>

      {/* add sentences telling that the number of star is based on the skill level*/}
      <div className="flex items-center ml-32 mt-4 mb-20">
        <h1 className="text-base font-mono text-start">
          * Star rating is based on expertise level.
        </h1>
      </div>
    </div>
  );
};

export default Skills;
