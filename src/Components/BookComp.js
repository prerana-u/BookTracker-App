import pjo from "../Images/Monsters-flat-cover.png";
import pages from "../Images/pages.png";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

export default function BookComp() {
  //Register Scroll Trigger
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
  const ref = useRef([]);

  ref.current = [];

  useEffect(() => {
    const el = ref.current;
    gsap.fromTo(
      el,
      { scale: 0 },
      {
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: el,
        },
      }
    );
  }, []);

  return (
    <div className="relative flex mt-10 mb-14 ml-11 " ref={ref}>
      <img
        src={pjo}
        id="coverimg"
        className="absolute w-[300px] h-[300px] z-10 left-11"
      />
      <img
        src={pages}
        className="absolute w-[200px] h-[302px] z-0 left-[108px]"
      />

      <div className="w-[400px] h-[500px] absolute mb-14 top-[150px] z-[-1] bg-[#FFFCF3] shadow rounded-lg"></div>
    </div>
  );
}
