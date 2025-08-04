import React, { useState, useEffect } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NavBar from "./NavBar";
import topbooks from "../Resources/Images/topbooks.png";
import BookComp from "./BookComp";
import Lenis from "@studio-freight/lenis";

const Dashboard = () => {
  const [bookdata, setBookData] = useState([]);
  const [hovered, setHovered] = useState(false);
  const fetchData = async () => {
    return await axios
      .get("http://localhost:3001/getbooks")
      .then((res) => {
        const data = res.data;
        setBookData(data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchData();
  }, []);

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
    console.log(hovered);
  }, [hovered]);
  return (
    <div className="dashboard-container">
      <NavBar />
      <main>
        <section>
          <div className="p-9">
            <img
              src={topbooks}
              alt="Top Books"
              id="topbooks"
              className="w-full h-[90%] object-cover"
            />
          </div>
          <div>
            <h2 className="font-bold text-2xl text-black ml-3 mt-4 md:text-4xl md:ml-11">
              Currently Reading
            </h2>
            <div
              className="grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-4 md:gap-y-[700px] grid-cols-1 grid-rows-3 gap-y-[600px] h-screen"
              id="book"
            >
              {bookdata.slice(0, 3).map((data) => {
                return (
                  <BookComp
                    name={data.name}
                    author={data.author}
                    cover={data.cover}
                    genre={data.genre}
                    hovered={hovered}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
