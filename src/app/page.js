"use client"; // unnecessary (it's a good pratice to have as many SSC as possible)
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Reviews from "@/components/Reviews";
import Projects from "@/components/Projects";
import PricingPlans from "@/components/PricingPlans";
import Contact from "@/components/Contact";
import Questions from "@/components/Questions";
import Navbar from "@/components/Navbar";
import { useEffect, useRef, useState } from "react";
import { navigate } from "next/dist/client/components/segment-cache/navigation";

export default function Home() {
  const [id, setId] = useState(0);
  const compsRef = useRef(null);

  // useEffect to set up an IntersectionObserver
  useEffect(() => {
    // Create a new IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        // For each entry (section) being observed
        entries.forEach((entry) => {
          // Check if the section is intersecting (visible in the viewport)
          const intersecting = entry.isIntersecting;
          if (intersecting) {
            // If the section is intersecting, update the state with its ID
            setId(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }, // Trigger the callback when 30% of the section is visible
    );

    // Get all the child elements (sections) of the container
    const compsArr = Array.from(compsRef.current.children);

    // Observe each section
    compsArr.forEach((comp) => {
      observer.observe(comp);
    });

    // Cleanup function to disconnect the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []); // Empty dependency array means this effect runs only once after the initial render

  return (
    <>
      <Navbar id={id} />
      <div ref={compsRef}>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Reviews />
        <Projects />
        <PricingPlans />
        <Contact />
        <Questions />
      </div>
    </>
  );
}


/// OBSERVER
/*
  Key Points:
    The IntersectionObserver is used to detect which section is currently visible in the viewport.

    The id state is updated based on the visible section, and this state is passed to the Navbar component.

    The useRef hook is used to access the container's child elements (sections) so they can be observed.



  useEffect:

    The useEffect hook is used to set up an IntersectionObserver. This observer monitors the visibility of each section in the viewport.

    The observer is configured with a threshold of 0.3, meaning it will trigger the callback when 30% of a section is visible.

    Inside the callback, the entries array contains information about each section being observed. If a section is intersecting (visible), its id is set as the current id using setId.

  Observing Sections:

    const compsArr = Array.from(compsRef.current.children); converts the child elements of the container into an array.

    compsArr.forEach((comp) => { observer.observe(comp); }); starts observing each section.

  Cleanup:

    The return () => { observer.disconnect(); }; ensures that the observer is disconnected when the component unmounts, preventing memory leaks.
    
 */
