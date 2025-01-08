// import { useMotionValue, motion } from "framer-motion";
//
// const Achievements = ({ title, amount, children }) => {
//   let number = useMotionValue(0);
//
//   const count = (amount) => {
//     let i = 0;
//     const updateCount = () => {
//       let timeout;
//       if (i <= amount) {
//         number.set(i++);
//         timeout = setTimeout(updateCount, 0); // This creates a non-blocking asynchronous loop that avoids freezing the UI, ensuring smooth animations and browser responsiveness.
//       } else {
//         clearTimeout(timeout);
//       }
//     };
//     updateCount();
//   };
//
//   return (
//     <div>
//       <div className="flex items-end gap-x-3">
//         <span className="text-4xl lg:text-2xl text-gray-300">{children}</span>
//         <h1 className="flex flex-col gap-y-2">
//           <motion.span
//             className="text-2xl lg:text-xl font-light text-yellow-500"
//             whileInView={() => count(amount)} //  triggering animations when the element is visible within the viewpor
//             viewport={{ once: true }} // Is a configuration for the whileInView behavior.Ensures the counting animation happens only once per page load, even if the element is scrolled in and out of view multiple times
//           >
//             {number}
//           </motion.span>
//           <span className="text-sm tracking-wider text-gray-500">{title}</span>
//         </h1>
//       </div>
//     </div>
//   );
// };
//
// export default Achievements;

//////////////////////////////////////////////////////////////////////////////////
///                                                                            ///
///  CODE  AND MAKES THE ANIMATION SMOOTHER AND MORE EFFICENT                  ///
///                                                                            ///
//////////////////////////////////////////////////////////////////////////////////

import { useMotionValue, motion } from "framer-motion";
import { useEffect } from "react";

const Achievements = ({ title, amount, children }) => {
  const number = useMotionValue(0);

  const count = (target) => {
    let start = null;
    let current = 0;
    const duration = 2000; // Total duration for the animation in milliseconds (e.g., 2 seconds)

    const updateCount = (timestamp) => {
      // timestamp param provided by requestAnimationFrame
      if (!start) start = timestamp; // Initialize start time
      const elapsed = timestamp - start; // Calculate elapsed time
      const progress = Math.min(elapsed / duration, 1); // Calculate progress (clamped to 1)
      current = Math.round(progress * target); // Increment number based on progress
      number.set(current); // Update the motion value
      if (progress < 1) {
        requestAnimationFrame(updateCount); // Continue animation
      }
    };

    requestAnimationFrame(updateCount); // Start animation
  };

  useEffect(() => {
    // Optional: Cleanup or initialization code if necessary
  }, []);

  return (
    <div>
      <div className="flex items-end gap-x-3">
        <span className="text-4xl lg:text-2xl text-gray-300">{children}</span>
        <h1 className="flex flex-col gap-y-2">
          <motion.span
            className="text-2xl lg:text-xl font-light text-yellow-500"
            whileInView={() => count(amount)} // Trigger the animation when in view
            viewport={{ once: true }} // Only trigger once
          >
            {number}
          </motion.span>
          <span className="text-sm tracking-wider text-gray-500">{title}</span>
        </h1>
      </div>
    </div>
  );
};

export default Achievements;
