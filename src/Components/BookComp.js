import pjo from "../Images/Monsters-flat-cover.png";
import pages from "../Images/pages.png";
import book_base from "../Images/book_base.png";

export default function BookComp(props) {
  //Register Scroll Trigger

  return (
    <div className="relative flex mt-10 mb-14 ml-11 " id={props.id}>
      <img
        src={pjo}
        id="coverimg"
        className="absolute md:w-[300px] md:h-[300px] z-10 left-11 w-[200px] h-[200px]"
      />
      <img
        src={pages}
        className="absolute md:w-[200px] md:h-[302px] z-0 md:left-[108px] w-[100px] h-[202px] left-[85px]"
      />
      <img
        src={book_base}
        className="absolute md:w-[360px] w-[260px] h-[50px] z-0 left-[20px] md:top-[270px] top-[170px]"
      />

      <div className="md:w-[400px] md:h-[500px] w-[300px] h-[400px] absolute mb-14 top-[150px] z-[-1] bg-[#FFFCF3] shadow rounded-lg">
        <p id="title" className="text-xl font-bold text-center mt-52">
          Percy Jackson
        </p>
        <p
          id="author"
          className="text-md font-bold text-center mt-2 text-[#537D3D]"
        >
          Percy Jackson
        </p>
        <p className="text-sm text-black text-justify p-[20px]">
          Lorem ipsum dolor sit amet consectetur. Facilisis ut pharetra montes
          adipiscing ultrices ut amet aenean auctor. Convallis sed facilisis
          ipsum sed mauris ut. Vestibulum volutpat tortor posuere pellentesque
          pretium. Natoque donec faucibus bibendum felis ultricies amet morbi
          senectus.
        </p>
      </div>
    </div>
  );
}
