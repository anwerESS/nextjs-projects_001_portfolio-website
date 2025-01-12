"use client";

import Heading from "@/components/sub/Heading";
import { projectsButton, projectsData } from "@/assets";
import Project from "@/components/sub/Project";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, motion } from "framer-motion";

const Projects = () => {
  const [tech, setTech] = useState("All");
  const [index, setIndex] = useState(0);

  const prevIndex = useRef(0);
  let buttonRef = useRef([]);

  const handleClick = () => {
    animate(buttonRef.current[prevIndex.current], { opacity: 0.5, scale: 1 });
    animate(buttonRef.current[index], { opacity: 1, scale: 1.2 });
  };

  useEffect(() => {
    handleClick();
    prevIndex.current = index;
  }, [index]);

  // useLayoutEffect(() => {
  //   handleClick();
  //   prevIndex.current = index;
  // }, [index]);

  return (
    <div id="projects" className="min-h-screen py-20">
      <Heading text="Projects" />
      <div className="flex flex-wrap items-center justify-between gap-4 py-10">
        {projectsButton.map((text, i) => (
          <motion.button
            key={i}
            ref={(el) => buttonRef.current.push(el)}
            // ref={(el) => {
            //   if (el && !buttonRef.current[i]) {
            //     buttonRef.current[i] = el;
            //   }
            // }}
            initial={{ opacity: i === 0 ? 1 : 0.5, scale: i === 0 ? 1.2 : 1 }}
            onClick={() => {
              setIndex(i);
              setTech(text);
            }}
            className="border border-yellow-500 rounded-xl px-2 py-1 text-sm font-light tracking-wider text-gray-400"
          >
            {text}
          </motion.button>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5">
        {projectsData
          .filter((project) => {
            return project.tech.some((item) =>
              tech === "All" ? true : item === tech,
            );
          })
          .map((data, i) => (
            <motion.div key={`id-${i}`} layout>
              <Project data={data} index={i} />
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default Projects;
