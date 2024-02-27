import pjo from "../Images/Monsters-flat-cover.png";
import pages from "../Images/pages.png";
import book_base from "../Images/book_base.png";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function BookComp(props) {
  //Register Scroll Trigger
  const [data, setData] = useState([]);
  const [desc, setDesc] = useState("");
  const [author, setAuthor] = useState("");
  const fetchbookddata = () => {
    // console.log(props.name);
    const url1 = `https://www.googleapis.com/books/v1/volumes?q=${props.name}&key=AIzaSyDe8Rz-e1Rc6OM4GUTFdQBhhEZ1sX2dz8w`;
    //  console.log(url1);
    return axios.get(url1).then((res) => {
      setData(res.data.items);
      setDesc(res.data.items[0].volumeInfo.description);
      setAuthor(res.data.items[0].volumeInfo.authors[0]);
      //  console.log(res.data.items[0].volumeInfo.description);
    });
  };
  console.log(desc);
  return (
    <div
      className="relative flex mt-10 mb-14 ml-11 "
      id={props.id}
      onLoad={fetchbookddata}
    >
      <img
        src={props.cover}
        id="coverimg"
        className="absolute lg:w-[200px] lg:h-[300px] z-10 lg:left-24 left-20 w-[150px] h-[200px]"
      />
      <img
        src={pages}
        className="absolute lg:w-[200px] lg:h-[302px] z-0 lg:left-[108px] w-[100px] h-[202px] left-[137px]"
      />
      <img
        src={book_base}
        className="absolute lg:w-[360px] w-[260px] h-[50px] z-0 left-[20px] lg:top-[270px] top-[170px]"
      />

      <div className="lg:w-[400px] lg:h-[500px] w-[300px] h-[400px] absolute mb-14 top-[150px] z-[-1] bg-[#FFFCF3] shadow rounded-lg">
        <p id="title" className="text-2xl font-bold text-center lg:mt-52 mt-28">
          {props.name}
        </p>
        <p
          id="author"
          className="text-lg font-bold text-center mt-2 text-[#537D3D]"
        >
          {author}
        </p>
        <p
          id="author"
          className="text-md font-bold text-center mt-2 text-[#484a47]"
        >
          {props.genre}
        </p>
        <div className="scrollable-div text-sm text-black text-justify p-[20px]">
          <div className="lg:w-[370px] w-[250px] overflow-y-scroll h-[150px] p-[20px]">
            {desc}
          </div>
        </div>
      </div>
    </div>
  );
}
