import React from "react";
import nobooksfound from "../Resources/Images/nobookfoundillus.svg";
function NoBooksFound() {
  return (
    <div className="w-full h-full flex flex-row justify-between items-center">
      <div>
        <h2 className="w-[300px] text-[58px] font-semibold mb-4 tracking-wider">
          Discover Your{" "}
          <span className="bg-gradient-to-b from-[#3E8FD6] to-[#0E418D] inline-block text-transparent bg-clip-text">
            Next
          </span>{" "}
          Read
        </h2>
      </div>
      <div className="-mt-[50px]">
        {" "}
        <img
          src={nobooksfound}
          alt="No Books Found"
          className="w-[500px] h-[300px] ml-10"
        />
      </div>

      <div className="h-full flex flex-col gap-7 justify-center items-center p-4">
        <p className="text-4xl text-[#002350] font-semibold">
          No Books On Your Shelf
        </p>

        <button
          className="bg-gradient-to-r from-[#2663B3] to-[#57ADD5] text-white text-[22px]  border-[#2663B3] w-full border-1 font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
          type="button"
        >
          Discover Books
        </button>
      </div>
    </div>
  );
}

export default NoBooksFound;
