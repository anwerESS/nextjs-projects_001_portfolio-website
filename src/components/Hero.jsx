"use client"; // unnecessary (it's a good pratice to have as many SSC as possible)

import Image from "next/image";
import { heroIcons } from "../../public";
import { useMotionValue, useTransform, motion, useSpring } from "framer-motion";
import { useState } from "react";

const Hero = () => {
  const [windowOffset, setWindowOffset] = useState({
    innerWidth: 0,
    innerHeight: 0,
  });
  const [mouseMove, setMouseMove] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);

  const { innerWidth, innerHeight } = windowOffset;

  /*
   * The useMotionValue allows smooth, performant animations by tracking and updating the x and y values independently of React's rendering lifecycle.
   * In the code, x and y are used to store the mouse cursor's coordinates (clientX and clientY) as the user moves their mouse across the screen.
   * By using useMotionValue, the component avoids excessive re-renders while keeping the motion values updated in real-time.
   */
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // By applying useSpring(), the updates x & y values are smoothed over time using a spring-based animation.
  let xSpring = useSpring(x, { stiffness: 100, damping: 10 });
  let ySpring = useSpring(y, { stiffness: 100, damping: 10 });

  /*
   * This hook creates derived values by mapping one or more MotionValues to a transformed value. In this case, it's used to calculate rotation angles (rotateX and rotateY) based on the mouse's position (x and y).
   */
  const rotateX = useTransform(xSpring, [0, innerWidth], [-30, 30]);
  const rotateY = useTransform(ySpring, [0, innerHeight], [10, -50]);

  const handleMouseMove = ({ clientX, clientY }) => {
    x.set(clientX);
    y.set(clientY);
  };

  const handleMouseEnter = (e) => {
    setWindowOffset({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    });
    setMouseMove(true);
  };

  return (
    <div
      className="h-screen grid place-items-center"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      // onMouseLeave={() => setMouseMove(false)}
    >
      <div>
        <div className="fley flex-col items-center justify-center gap-y-3 font-light capitalize">
          {/* The motion.div allows you to animate CSS properties such as rotateX and rotateY, which are dynamically calculated in the code. These properties are applied to the motion.div's style attribute, making the tilting effect possible.*/}
          <motion.div
            className="flex items-center justify-center"
            style={{
              rotateX: mouseMove ? rotateX : 0,
              rotateY: mouseMove ? rotateY : 0,
              transition: "0.1s",
            }}
          >
            {/*priority attr used to indicate that a specific img is critical to the page's performance & UX*/}
            <Image
              src={"/person.png"}
              alt="Person Image"
              width={400}
              height={400}
              priority={true}
              className="h-auto w-[150px]"
            />
            <motion.span
              className="absolute text-3xl font-semibold text-black"
              initial={{ scale: 0 }}
              animate={{
                opacity: buttonHover ? 0 : 1,
                scale: buttonHover ? 2 : 0,
                y: buttonHover ? -40 : 1,
              }}
              transition={{ opacity: { delay: 0.4 } }}
            >
              Hi
            </motion.span>
          </motion.div>
          <h1 className="text-center text-3xl font-bold tracking-wider text-gray-500 sm:text-2xl">
            {" "}
            My Name is Anouar CHELAYFA
          </h1>
          <p className="text-lg tracking-wider text-gray-700">
            I like animations 😊
          </p>
        </div>
        <div className="mt-8 flex justify-center gap-10 text-yellow-600">
          {heroIcons.map((icon, i) => (
            <a
              href="#"
              key={i}
              className="hover:bg-red-400 hover:text-white transition-colors"
            >
              {icon}
            </a>
          ))}
        </div>
        <a
          href="#"
          className="mx-auto mt-7 block w-max rounded-lg bg-red-400 px-3 py-1 font-light capitalize racking-wider text-white hover:bg-red-500 transition-colors"
          onMouseEnter={() => setButtonHover(true)}
          onMouseLeave={() => setButtonHover(false)}
        >
          Talk to me
        </a>
      </div>
    </div>
  );
};

export default Hero;
