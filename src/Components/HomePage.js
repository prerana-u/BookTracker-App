/* eslint-disable no-unused-vars */
import { gsap } from "gsap";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import BookComp from "./BookComp";
import axios from "axios";
import LoginComp from "./LoginComp";
import SignInComp from "./SignUpComp";
import NavBar from "./NavBar";
import horrorIcon from "../Resources/Icons/horrorIcon.png";
import romanceIcon from "../Resources/Icons/romanceIcon.png";
import fantasyIcon from "../Resources/Icons/fantasyIcon.png";
import fictionIcon from "../Resources/Icons/fictionIcon.png";
import mysteryIcon from "../Resources/Icons/mysteryIcon.png";
import thrillerIcon from "../Resources/Icons/thrillerIcon.png";
import scienceFictionIcon from "../Resources/Icons/scienceFictionIcon.png";
import historicalFictionIcon from "../Resources/Icons/historicalFictionIcon.png";
import nonFictionIcon from "../Resources/Icons/nonFictionIcon.png";
import DropDown from "./CommonComponents/DropDown";
export default function HomePage() {
  const ref = useRef([]);
  const [bookdata, setBookData] = useState([]);
  const [bookdatabyGenre, setBookDataByGenre] = useState([]);
  // const [randomNum, setrandomNum] = useState(0);
  const [randomNum1, setrandomNum1] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState("Horror");
  const [isLogin, setIsLogin] = useState(true);

  const options = [
    { value: "horror", label: "Horror", image: horrorIcon },
    { value: "romance", label: "Romance", image: romanceIcon },
    { value: "fantasy", label: "Fantasy", image: fantasyIcon },
    { value: "fiction", label: "Fiction", image: fictionIcon },
    { value: "mystery", label: "Mystery", image: mysteryIcon },
    { value: "thriller", label: "Thriller", image: thrillerIcon },
    {
      value: "science fiction",
      label: "Science Fiction",
      image: scienceFictionIcon,
    },
    {
      value: "historical fiction",
      label: "Historical Fiction",
      image: historicalFictionIcon,
    },
    { value: "non fiction", label: "Non Fiction", image: nonFictionIcon },
    { value: "fantasy romance", label: "Fantasy Romance", image: romanceIcon },
  ];

  const handleSelect = (option) => {
    console.log("Selected:", option);
  };
  ref.current = [];
  //Register Scroll Trigger
  gsap.registerPlugin(ScrollTrigger);

  const fetchData = async () => {
    return await axios
      .get("http://localhost:3001/getbooks")
      .then((res) => {
        const data = res.data;
        setBookData(data);
        console.log(data);
        // setrandomNum(Math.floor(Math.random() * res.data.length));
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
      <div className="flex-initial relative md:d-flex md:flex-column">
        <div
          className="bg-cover bg-no-repeat bg-center "
          style={{
            backgroundImage: "url('/Images/homebg.png')",
            height: "600px",
          }}
        >
          <NavBar />
          <div className=" lg:absolute  mt-20 sm:mt-32 ml-6 sm:ml-12 md:ml-16 lg:mx-auto xl:ml-28 2xl:ml-28 flex flex-col items-center justify-center">
            <h2
              className="text-white text-lg leading-9 sm:text-[44px] sm:leading-relaxed font-bold text-center px-6 w-[400px] sm:w-[600px] md:w-[650px] "
              style={{
                textShadow: "7px 7px 4px rgba(0, 0, 0, 0.88)",
              }}
            >
              Discover, Connect, and Explore the World of{" "}
              <span className="text-[#13B1DF]"> Books </span>
            </h2>
            <div className="flex items-center bg-white border-4 border-[#1282A2] rounded-[6px] px-3 py-2 w-full max-w-md mt-8">
              <input
                type="text"
                placeholder="Search books..."
                className="flex-grow bg-transparent outline-none text-black placeholder-gray-400"
              />
              <svg
                className="w-5 h-5 text-[#1282A2] ml-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>

          <div className="absolute  top-[100%] mt-16 left-0 right-0 lg:left-auto  lg:top-5 lg:right-5 xl:right-20  ">
            {isLogin ? (
              <LoginComp setIsLogin={setIsLogin} />
            ) : (
              <SignInComp setIsLogin={setIsLogin} />
            )}
          </div>
        </div>

        {/*  */}
      </div>
      <div
        id="hero"
        className="xl:h-[700px] md:h-[1300px] md:mt-[65%] mt-[85%] lg:mt-0"
      >
        <h2 className="font-bold text-3xl +text-black ml-3 mt-11 md:text-4xl md:ml-11 mb-20">
          What will you read next?
        </h2>

        <div
          className="grid md:grid-cols-2 xl:grid-cols-4 md:grid-rows-2 xl:grid-rows-1 md:gap-x-4  xl:gap-4  md:gap-y-[600px] grid-cols-1 grid-rows-3 gap-y-[600px] align-middle mx-3 md:mx-11"
          id="book"
        >
          {bookdata.map((data, index) => {
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
        </div>
      </div>
      <div id="topbooks" className="bg-[#003D74] xl:h-[750px] md:h-[1300px]">
        <div className="flex px-5 pl-12 mb-4">
          <h2 className="font-bold text-3xl text-white  lg:mt-16 mt-[1200px] md:text-4xl mb-16 ">
            Top Books By Genre
          </h2>
          <div className="flex items-start ml-auto lg:mt-16 mt-[1200px]">
            <DropDown
              options={options}
              onSelect={(option) => setSelectedGenre(option.label)}
              placeholder="Choose a Genre"
            />
          </div>
        </div>
        <div
          className="grid md:grid-cols-2 xl:grid-cols-4 md:grid-rows-2 xl:grid-rows-1 md:gap-x-4  xl:gap-4  md:gap-y-[600px] grid-cols-1 grid-rows-3 gap-y-[600px] align-middle mx-3 md:mx-11"
          id="book1"
        >
          {bookdatabyGenre.slice(randomNum1, randomNum1 + 4).map((data) => {
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
  );
}
