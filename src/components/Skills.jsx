"use client";

import Heading from "@/components/sub/Heading";
import Image from "next/image";
import { skillsData } from "@/assets";
import { motion } from "framer-motion";

const Skills = () => {
  const variants = {
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 + i * 0.07 },
    }),
    hidden: { opacity: 0, y: 30 },
  };

  return (
    <div
      id="skills"
      className="min-h-screen flex flex-col justify-center items-center gap-y-20"
    >
      <Heading text="Skills" />
      <div className="w-full flex justify-between flex-wrap items-center gap-x-8 gap-y-10 lg:gap-y-6">
        {skillsData.map((item, i) => (
          <motion.div
            custom={i} // passed prop to variant
            variants={variants}
            initial="hidden"
            whileInView="visible" // Animates the element to the visible state when it comes into the viewport.
            whileHover={{ scale: 1.1 }}
            viewport={{
              margin: "50px",
              once: true,
            }} // margin: "50px": Specifies an additional margin around the viewport for triggering the whileInView animation. The element will begin animating even if it's not fully in view, as long as it's within 50px of the viewport's edge
            key={i}
            className="flex items-center justify-center gap-x-3 rounded-xl border border-yellow-500 bg-zinc-200 px-5 py-2 lg:px-2"
          >
            <Image
              src={item.icon}
              alt="Skills Image"
              width={100}
              height={100}
              className="h-auto w-[40px]"
            />
            <p className="text-sm text-gray-600">{item.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
