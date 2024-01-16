import homebg from "../Images/homebg.png";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import BookComp from "./BookComp";
import pjo from "../Images/Monsters-flat-cover.png";
import pages from "../Images/pages.png";

export default function HomePage() {
  const ref = useRef([]);
  ref.current = [];
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

  useEffect(() => {
    const el = ref.current;
    gsap.fromTo(
      el,
      { scale: 0 },
      {
        scale: 1,
        duration: 2,
        scrub: 0.2,
        scrollTrigger: {
          trigger: el,
        },
      }
    );
  }, []);

  return (
    <div>
      <div className="flex-initial relative">
        <div className="flex-initial bg-white h-16 ">
          <p
            className="bg-gradient-to-r from-[#333D2E] to-[#537D3D] inline-block text-transparent bg-clip-text font-bold text-2xl align-middle"
            style={{ marginTop: "15px", marginLeft: "15px" }}
          >
            BookMarx
          </p>
        </div>
        <img
          className="object-cover"
          src={homebg}
          alt="Background"
          style={{ width: "100%" }}
        />

        <div className="absolute inset-0 flex top-24 left-44 sm:top-32 sm:left-56 w-[200px] sm:w-[390px] min-[320px]:left-32 min-[320px]:top-[80px]">
          <h2 className="text-white text-lg leading-9 sm:text-[40px] sm:leading-relaxed font-bold text-center">
            Discover, Connect, and Explore the World of Books
          </h2>
        </div>

        <div class=" flex justify-center xl:absolute xl:top-44 xl:left-[950px]">
          <form class="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 h-[420px] w-[350px] md:h-[450px]  min-[320px]:h-[420px] min-[320px]:w-[300px] md:w-[450px]">
            <h2 className="font-bold self-center text-center md:text-2xl text-lg  mb-9">
              Join us to discover a wide range of books!
            </h2>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Username
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Password
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
              />
              <a
                class="inline-block align-baseline font-bold text-gray-500 hover:text-blue-800 mt-4 text-xs"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
            <div class="flex items-center justify-between">
              <button
                class="bg-[#FFD666] hover:bg-[#DE971E] hover:text-white text-black  border-[#DE971E] w-full border-1 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                SIGN IN
              </button>
            </div>

            <br />
            <a
              class=" align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mt-4"
              href="#"
            >
              New User? Create Account
            </a>
          </form>
        </div>
        <div id="hero">
          <h2 className="font-bold text-4xl text-black ml-3 mt-11 md:text-5xl md:ml-11">
            What will you read next?
          </h2>
          <div
            className="grid grid-cols-3 grid-rows-2 gap-4"
            style={{ height: "100vh" }}
          >
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
          </div>
        </div>
      </div>
    </div>
  );
}
