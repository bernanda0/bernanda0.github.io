import { useEffect, useState } from "react";
import { navigationElements, snsLink } from "../constant";

interface SidebarProps {
  currentContent: string;
}

const Sidebar = ({ currentContent }: SidebarProps) => {
  const [content, setContent] = useState(currentContent);

  const handleNavigation = (pageId: string) => {
    setContent(pageId);
  };

  useEffect(() => {
    window.location.hash = `#${content}`; // Update the URL with the selected pageId
    const sectionElement = document.getElementById(content);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" }); // Scroll to the selected section
    }
  }, [content]);

  const handleLogoClick = () => {
    window.location.reload(); // Refresh the web page
  };

  return (
    <aside className="h-screen fixed top-0 left-0 w-20">
      <nav className="h-full flex flex-col bg-black border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-center items-center">
          <img
            src="logo.svg"
            className="w-10 mt-4 cursor-pointer hover:scale-110 ease-in-out transition-transform"
            onClick={handleLogoClick}
            alt="logo"
          ></img>
        </div>

        <div className="flex-1 px-3 flex flex-col space-y-3 justify-center items-center">
          {navigationElements.map((element) => (
            <div
              key={element.id}
              className={`rounded-full p-2
            transition-colors
            ${
              currentContent == element.id
                ? "bg-gradient-to-tr from-gray-300 to-gray-200 text-blue-900"
                : "hover:bg-gray-100 text-gray-500"
            }
            `}
            >
              <a key={element.id} href={`#${element.id}`}>
                <element.icon
                  className="hover:scale-110 cursor-pointer"
                  onClick={() => handleNavigation(element.id)}
                />{" "}
              </a>
            </div>
          ))}
        </div>

        <div className="flex flex-col p-3 justify-center items-center space-y-2 mb-4">
          {snsLink.map((element) => (
            <a
              key={element.title}
              href={element.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <element.icon className="hover:scale-110 hover:text-blue-200" />
            </a>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
