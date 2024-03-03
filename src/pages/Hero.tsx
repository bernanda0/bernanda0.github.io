import React from "react";

const Hero = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="mb-10 hover:scale-110 ease-in-out transition-transform">
          <img src="me.png" alt="me" className="w-[28rem]" />
        </div>
        <div className="text-center mt-4 font-mono">
          <h1 className="text-4xl font-bold mb-2">Hi, Im Bernanda!</h1>
          <p className="text-2xl">
            {"< "}Software Engineer{" />"}
          </p>
          <p className="text-sm">
            backend | mobile devs | blockchain | computer networks
          </p>
          <p className="text-base mt-4 mx-36 text-center">
            A Computer Engineering student with a passion for IT and software
            engineering. I have dived into backend and system design, computer
            network, and devops, refining my skills hands-on. Excited to
            contribute these skills to a team as I thrive in the dynamic tech
            landscape.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
