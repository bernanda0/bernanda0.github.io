import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Hero from "./section/Hero";
import Skills from "./section/Skills";
import Projects from "./section/Projects";
import ContactMe from "./section/ContactMe";
import Experience from "./section/Experience";

function App() {
  const [section, setSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll("section");

      let currentSectionId = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          currentSectionId = section.id;
        }
      });

      setSection(currentSectionId);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Sidebar currentContent={section} />
      <div className="flex-1 pl-16 overflow-hidden">
        <section id="home">
          <Hero />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="exp">
          <Experience />
        </section>
        <section id="contact">
          <ContactMe />
        </section>
      </div>
    </>
  );
}

export default App;
