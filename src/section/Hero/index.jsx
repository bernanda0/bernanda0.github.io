import { useTypewriter, Cursor } from "react-simple-typewriter";

const Hero = () => {
  const [text] = useTypewriter({
    words: [
      "backend",
      "system design",
      "computer networks",
      "iOS app engineer",
    ],
    loop: true,
    typeSpeed: 120,
    deleteSpeed: 60,
  });

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="mb-10 hover:scale-110 ease-in-out transition-transform">
          <img src="me.png" alt="me" className="w-[28rem]" />
        </div>
        <div className="text-center mt-4 font-mono">
          <h1 className="text-4xl font-bold mb-2 animate-bounce">
            Hi, I'm Bernanda!
          </h1>
          <p className="text-2xl">
            <span className="text-gray-500">{"< "}</span>
            <span>{text}</span>
            <Cursor cursorStyle="|" />
            <span className="text-gray-500">{" /> "}</span>
          </p>
          <p className="text-sm font-bold">...</p>
          <p className="text-base mt-4 mx-36 text-center">
            A passionate and hardworking individual with a keen interest in IT
            and software engineering.{" "}
          </p>
          <p className="text-base mt-4 mx-36 text-center">
            {" "}
            I have immersed myself in various fields such as
            <span className="font-bold"> iOS application development</span>,
            <span className="font-bold"> backend engineering</span>,
            <span className="font-bold"> system design</span>, and
            <span className="font-bold"> computer networks</span>, honing my
            skills through hands-on experience. I am enthusiastic about
            contributing these skills to a team, as I thrive in the dynamic tech
            landscape.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
