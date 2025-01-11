"use client";

import Heading from "@/components/sub/Heading";
import Image from "next/image";
import { arrowIcons, reviewsData, starIcons } from "@/assets";
import { useCallback, useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { motion } from "framer-motion";

const Reviews = () => {
  // reviewsData.length = 1;

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(false);
  const prevIndex = useRef(0);
  let slides = useRef([]);

  // const setSlideRef = (el, index) => {
  //   if (el) slides.current[index] = el;
  // };

  // useCallback memoizes the function to set refs
  // Performance Optimization: It prevents unnecessary re-renders caused by re-creating the setSlideRef function on every render
  const setSlideRef = useCallback((el, idx) => {
    if (el) slides.current[idx] = el; // Assign the element to the correct index
  }, []);

  const rightClickHandler = () => {
    animate(slides.current[index], { x: 0 }, { delay: 0.3 });
    animate(slides.current[prevIndex.current], {
      scale: index === 0 ? 1 : 0.4,
      rotate: index === 0 ? 0 : index % 2 === 0 ? 10 : -10,
    });
  };

  const leftClickHandler = () => {
    animate(slides.current[index], { scale: 1, rotate: 0 }, { delay: 0.2 });
    animate(slides.current[prevIndex.current], { x: "100%" });
  };

  useEffect(() => {
    direction ? leftClickHandler() : rightClickHandler();
    prevIndex.current = index;
  }, [index]);

  return (
    <div id="reviews" className="my-20 px-96">
      <Heading text={"Reviews"} />
      <div className="flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative w-[800px] lg:w-[600px] md:w-[95%] sm:w-[280px] h-[500px] lg:h-[450px] md:h-[400px] sm:h-[600px] flex items-center justify-center overflow-hidden"
        >
          {reviewsData.map((review, i) => (
            <motion.div
              initial={{ x: "100%" }}
              key={i}
              className="absolute inset-0 flex flex-col items-center justify-center gap-y-7 lg:py-4 border border-yellow-400 bg-zinc-50 p-14 lg:p-5 rounded-xl"
              // ref={(el) => slides.current.push(el)} // BAD: pushing el into an array on every render, may cause issues because slides.current will grow infinitely with duplicate element
              ref={(el) => setSlideRef(el, i)}
            >
              <Image
                src={review.image}
                alt="client"
                width={130}
                height={130}
                className="w-[130px] aspect-square rounded-full border border-yellow-500 p-4 object-contain"
              />
              <h1 className="text-2xl md:text-xl text-center tracking-wider text-yellow-600">
                {review.name}
              </h1>
              <p className="text-lg md:text-sm text-justify font-extralight tracking-wide text-gray-600 first-letter:pl-2">
                {review.comment}
              </p>
              <div className="flex flex-col items-center justify-center gap-y-2">
                <span className="text-lg font-light text-yellow-600 mr-3">
                  {review.stars
                    .reduce((sum, item) => {
                      return (sum += item);
                    }, 0)
                    .toFixed(1)}
                </span>
                <div className="flex items-center gap-x-2 text-yellow-500">
                  {review.stars.map((star, i) => (
                    <span key={i}>
                      {star === 1 ? starIcons[0] : starIcons[1]}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="flex gap-x-4 text-yellow-500 mt-5">
          <button
            className={`${
              index === 0
                ? "opacity-30 pointer-events-none"
                : "opacity-100 pointer-events-auto"
            } hover:scale-150 transition-all`}
            onClick={() => {
              setDirection(true);
              setIndex(index - 1);
            }}
          >
            {arrowIcons[0]}
          </button>
          <button
            className={`${
              index === reviewsData.length - 1
                ? "opacity-30 pointer-events-none"
                : "opacity-100 pointer-events-auto"
            } hover:scale-150 transition-all`}
            onClick={() => {
              setDirection(false);
              setIndex(index + 1);
            }}
          >
            {arrowIcons[1]}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;

//////////// EXPLANATIONS
/*
  animate() Function
    - The animate() function animates an HTML or React element's CSS properties (or transforms) from its current state to a target state.
    - Syntax: animate(target, animation, options);

    - Parameters
      1. target (Required)
        he DOM element or React ref that you want to animate.
        In this code, the elements are referenced using slides.current[index] or slides.current[prevIndex.current].

      2. animation (Required):
        An object defining the final state (end values) of the properties you want to animate. Common properties include x, y, scale, rotate, opacity, etc.

      3. options (Optional):
        An object defining additional animation settings like delay, duration, easing, etc.
          * delay: Specifies the time (in seconds) to wait before starting the animation.
          * duration: Specifies how long the animation should take (in seconds).
          * ease: Controls the timing function for the animation (e.g., "easeIn", "easeOut", "linear").

 */
