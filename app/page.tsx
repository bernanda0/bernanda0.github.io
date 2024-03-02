"use client";

import ArtBlog from "@/components/ArtBlog";
import ContactMe from "@/components/ContactMe";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Sidebar from "@/components/Sidebar";
import Skills from "@/components/Skills";
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const [section, setSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll('section');
      
      let currentSectionId = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSectionId = section.id;
        }
      });

      setSection(currentSectionId);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <Router>
      <main className="App flex">
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
          <section id="artblog">
            <ArtBlog />
          </section>
          <section id="contact">
            <ContactMe />
          </section>
        </div>
      </main>
    </Router>
  );
}
