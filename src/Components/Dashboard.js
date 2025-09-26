/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NavBar from "./NavBar";
import topbooks from "../Resources/Images/topbooks.png";
import BookComp from "./BookComp";
import Lenis from "@studio-freight/lenis";
import NoBooksFound from "./NoBooksFound";

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
      <NavBar color="dashboard" />
      <main>
        <section className="bg-[#D5F1F9] h-fit p-10 ">
          <div className="flex flex-col gap-3 h-full">
            <p className="text-2xl text-[#0E418D] font-semibold">
              Welcome Prerana
            </p>
            <NoBooksFound />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
