import homebg from "../Images/homebg.png";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import BookComp from "./BookComp";
import axios from "axios";

export default function HomePage() {
  const ref = useRef([]);
  const [bookdata, setBookData] = useState([]);
  const [bookdatabyGenre, setBookDataByGenre] = useState([]);
  const [randomNum, setrandomNum] = useState(0);
  const [randomNum1, setrandomNum1] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState("Horror");
  ref.current = [];
  //Register Scroll Trigger
  gsap.registerPlugin(ScrollTrigger);

  const fetchData = async () => {
    return await axios
      .get("http://localhost:3001/getbooks")
      .then((res) => {
        const data = res.data;
        setBookData(data);

        setrandomNum(Math.floor(Math.random() * 417));
      })
      .catch((error) => console.log(error));
  };

  const fetchDataByGenre = async (genre) => {
    return await axios
      .get("http://localhost:3001/getbooksbygenre", {
        params: { genre: genre },
      })
      .then((res) => {
        const data = res.data;
        setBookDataByGenre(data);
        setrandomNum1(Math.floor(Math.random() * res.data.length));
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchDataByGenre(selectedGenre);
  }, [selectedGenre]);

  // useEffect(() => {
  //   console.log(bookdata);
  //   if (bookdata !== "undefined") {
  //     console.log(bookdata[0].name);
  //   }
  // }, [bookdata]);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      "#book",
      { scale: 0 },
      {
        scale: 1,
        duration: 1,

        scrollTrigger: {
          trigger: "#hero",
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(
      "#book1",
      { scale: 0 },
      {
        scale: 1,
        duration: 1,

        scrollTrigger: {
          trigger: "#topbooks",
          start: "top bottom-=100",
          end: "bottom",
          toggleActions: "play none none reverse",
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

        <div class=" flex justify-center xl:absolute xl:top-36 xl:left-[950px]">
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
          <h2 className="font-bold text-3xl text-black ml-3 mt-11 md:text-4xl md:ml-11">
            What will you read next?
          </h2>
          <div
            className="grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-4 md:gap-y-[700px] grid-cols-1 grid-rows-3 gap-y-[600px] h-screen"
            id="book"
          >
            {bookdata.slice(randomNum, randomNum + 3).map((data) => {
              return (
                <>
                  <BookComp
                    name={data.name}
                    author={data.author}
                    cover={data.cover}
                    genre={data.genre}
                  />
                </>
              );
            })}
            {/* <BookComp id="book" />
            <BookComp id="book" /> */}
          </div>
        </div>
        <div id="topbooks">
          <div className="flex px-5 pl-12 mb-4">
            <h2 className="font-bold text-3xl text-black  lg:mt-16 mt-[1200px] md:text-4xl ">
              Top Books This Week
            </h2>
            <select
              className="w-[200px] h-[40px] p-2 rounded-md bg-[#FFFCF3] border-solid border border-black text-black  text-lg ml-auto lg:mt-16"
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="Horror">Horror</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Romance">Romance</option>
              <option value="Fiction">Fiction</option>
            </select>
          </div>
          <div
            className="grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-4 md:gap-y-[700px] grid-cols-1  grid-rows-3 gap-y-[600px]"
            style={{ height: "100vh" }}
            id="book1"
          >
            {bookdatabyGenre.slice(randomNum1, randomNum1 + 3).map((data) => {
              return (
                <>
                  <BookComp
                    className="place-items-center"
                    name={data.name}
                    cover={data.cover}
                    genre={data.genre}
                    author={data.author}
                  />
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
