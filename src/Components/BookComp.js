import pages from "../Resources/Images/pages.png";
import book_base from "../Resources/Images/book_base.png";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function BookComp(props) {
  //Register Scroll Trigger
  const [data, setData] = useState([]);
  const [desc, setDesc] = useState("");
  const [author, setAuthor] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [hovered, setHovered] = useState(false);
  // const url1 =
  //   props.author !== undefined
  //     ? `https://www.googleapis.com/books/v1/volumes?q=intitle:${
  //         props.name
  //       }+inauthor:${
  //         props.author.split(" ")[0]
  //       }&langRestrict=en&printType=books&maxResults=5&key=AIzaSyDe8Rz-e1Rc6OM4GUTFdQBhhEZ1sX2dz8w`
  //     : `https://www.googleapis.com/books/v1/volumes?q=intitle:${props.name}&langRestrict=en&printType=books&maxResults=5&key=AIzaSyDe8Rz-e1Rc6OM4GUTFdQBhhEZ1sX2dz8w`;
  // const fetchbookddata = () => {
  //   // console.log(props.name);

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
          title: props.name,
          ...(props.author && { author: props.author }),
        },
      });

      setData(res.data);
      setDesc(res.data.description);
      setAuthor(res.data.authors[0]);
      setThumbnail(res.data.thumbnail);
    } catch (err) {
      console.error("Error!! Book not found");
    }
  };

  useEffect(() => {
    fetchbookddata();
  }, [props.name]);
  return (
    <div
      className="relative w-[340px] h-auto mx-auto cursor-pointer bg-transparent"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={` transition-opacity duration-500 ease-in-out `}>
        <div
          className={`absolute inset-0 z-20 flex items-center justify-center transition-all duration-500 ease-in-out 
          ${hovered ? "top-5 scale-[60%]" : "top-52 opacity-100 scale-100"}
        `}
          id={props.id}
        >
          <img
            src={props.cover}
            id="coverimg"
            alt={props.name ? `Cover of ${props.name}` : "Book cover"}
            className="absolute z-1 lg:w-[250px] lg:h-[350px]  z-20 lg:left-12 left-20 w-[150px] h-[250px]"
          />
          <img
            src={pages}
            alt={props.name ? `Cover of ${props.name}` : "Book cover"}
            className="absolute lg:w-[250px] lg:h-[352px] z-10  lg:left-[62px] w-[150px] h-[252px] left-[137px]"
          />
          {/* <img
            src={book_base}
            alt={props.name ? `Cover of ${props.name}` : "Book cover"}
            className="absolute lg:w-[360px] w-[260px] h-[50px] z-0 left-[20px] lg:top-[270px] top-[170px]"
          /> */}
        </div>
        <div
          className={`absolute inset-0 z-10 transition-opacity duration-500 ease-in-out ${
            hovered ? "opacity-100" : "opacity-0"
          } text-center`}
        >
          <div className="lg:w-[330px] lg:h-[380px] w-[230px] h-[330px] absolute mb-14 top-[150px] z-[-1] left-2 bg-[#ffffff] border border-[#0E418D] shadow rounded-lg">
            <p
              id="title"
              className="text-[22px] font-bold text-center lg:mt-32 mt-24 text-[#0E418D]"
            >
              {props.name}
            </p>
            <p id="author" className="text-[16px] font-bold text-center mt-2 ">
              {author}
            </p>
            <p
              id="author"
              className="text-[16px] font-bold text-center mt-2 text-[#484a47]"
            >
              {props.genre}
            </p>
            <div className="scrollable-div text-sm text-black text-justify p-[20px]">
              <div className="lg:w-[300px] w-[200px] overflow-y-auto h-[100px] pr-4">
                {desc}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
