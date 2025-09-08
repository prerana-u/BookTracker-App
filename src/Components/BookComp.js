import pages from "../Resources/Images/pages.png";
// import book_base from "../Resources/Images/book_base.png";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import horrorIcon from "../Resources/Icons/horrorIcon.png";
import romanceIcon from "../Resources/Icons/romanceIcon.png";
import fantasyIcon from "../Resources/Icons/fantasyIcon.png";
import fictionIcon from "../Resources/Icons/fictionIcon.png";
import mysteryIcon from "../Resources/Icons/mysteryIcon.png";
import thrillerIcon from "../Resources/Icons/thrillerIcon.png";
import scienceFictionIcon from "../Resources/Icons/scienceFictionIcon.png";
import historicalFictionIcon from "../Resources/Icons/historicalFictionIcon.png";
import PropTypes from "prop-types";
import nonFictionIcon from "../Resources/Icons/nonFictionIcon.png";

export default function BookComp({ name, cover, genre, author, id }) {
  //Register Scroll Trigger
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);
  const [desc, setDesc] = useState("");
  const [author1, setAuthor] = useState("");
  const [, setThumbnail] = useState("");
  const [hovered, setHovered] = useState(false);
  const genreIcons = {
    horror: horrorIcon,
    romance: romanceIcon,
    fiction: fictionIcon,
    fantasy: fantasyIcon,
    mystery: mysteryIcon,
    thriller: thrillerIcon,
    "non fiction": nonFictionIcon,
    "fantasy romance": romanceIcon,
    "science fiction": scienceFictionIcon,
    "historical fiction": historicalFictionIcon,
  };
  // const url1 =
  //   author !== undefined
  //     ? `https://www.googleapis.com/books/v1/volumes?q=intitle:${
  //         name
  //       }+inauthor:${
  //         author.split(" ")[0]
  //       }&langRestrict=en&printType=books&maxResults=5&key=AIzaSyDe8Rz-e1Rc6OM4GUTFdQBhhEZ1sX2dz8w`
  //     : `https://www.googleapis.com/books/v1/volumes?q=intitle:${name}&langRestrict=en&printType=books&maxResults=5&key=AIzaSyDe8Rz-e1Rc6OM4GUTFdQBhhEZ1sX2dz8w`;
  // const fetchbookddata = () => {
  //   // console.log(name);

  //   //  console.log(url1);
  //   return axios.get(url1).then((res) => {
  //     setData(res.data.items);
  //     setDesc(res.data.items[0].volumeInfo.description);
  //     setAuthor(res.data.items[0].volumeInfo.authors[0]);
  //     //  console.log(res.data.items[0].volumeInfo.description);
  //   });
  // };
  const fetchbookddata = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/getbookdata`, {
        params: {
          title: name,
          ...(author && { author: author }),
        },
      });

      setData(res.data);
      setDesc(res.data.description);
      setAuthor(res.data.authors[0]);
      setThumbnail(res.data.thumbnail);
    } catch (err) {
      console.error("Error!! Book not found", err);
    }
  };

  useEffect(() => {
    fetchbookddata();
  }, [name]);
  return (
    <div
      className="relative w-[340px] h-auto mx-auto cursor-pointer bg-transparent"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={` transition-opacity duration-500 ease-in-out h-full flex items-start justify-center`}
      >
        <div
          className={`absolute inset-0 z-20 flex items-start justify-center transition-all duration-500 ease-in-out 
          ${hovered ? "top-0 scale-[60%]" : "top-0 opacity-100 scale-100"}
        `}
          id={id}
        >
          <img
            src={cover}
            id="coverimg"
            alt={name ? `Cover of ${name}` : "Book cover"}
            className="absolute z-1 md:w-[250px] md:h-[350px]  z-20 md:left-12 left-9 w-[200px] h-[250px]"
          />
          <img
            src={pages}
            alt={name ? `Cover of ${name}` : "Book cover"}
            className="absolute md:w-[250px] md:h-[352px] z-10  md:left-[62px] w-[200px] h-[252px] left-[50px]"
          />
          {/* <img
            src={book_base}
            alt={name ? `Cover of ${name}` : "Book cover"}
            className="absolute lg:w-[360px] w-[260px] h-[50px] z-0 left-[20px] lg:top-[270px] top-[170px]"
          /> */}
        </div>
        <div
          className={`absolute inset-0 z-10 transition-opacity duration-500 ease-in-out ${
            hovered ? "opacity-100" : "opacity-0"
          } text-center`}
        >
          <div className="md:w-[330px] md:h-[380px] w-[300px] h-[330px] absolute mb-14 top-[120px] z-[-1] left-2 bg-[#ffffff] border border-[#0E418D] shadow rounded-lg">
            <p
              id="title"
              className="text-[22px] font-bold text-center lg:mt-32 mt-24 text-[#0E418D]"
            >
              {name}
            </p>
            <p id="author" className="text-[16px] font-bold text-center mt-2 ">
              {author1}
            </p>
            <div className="flex justify-center items-center mt-2">
              <img
                // eslint-disable-next-line react/prop-types
                src={genreIcons[genre.toLowerCase()]}
                alt="genreIcon"
                width={20}
                height={20}
              />
              <p
                id="genre"
                className="text-[16px] font-bold text-center  text-[#484a47] ms-1"
              >
                {genre}
              </p>
            </div>

            <div className="scrollable-div text-sm text-black text-justify p-[20px]">
              <div className="md:w-[300px] w-[260px] overflow-y-auto h-[100px] pr-4">
                {desc}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

BookComp.propTypes = {
  name: PropTypes.string,
  cover: PropTypes.string,
  genre: PropTypes.string,
  author: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
