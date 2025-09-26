import React from "react";
import PropTypes from "prop-types";
import { useAuth } from "../Resources/Context/AuthContext";
import logoutIcon from "../Resources/Icons/logout.svg";
import userIcon from "../Resources/Images/userImg.png";
import Searchbar from "./CommonComponents/Searchbar";
const NavBar = (props) => {
  const { logout } = useAuth();
  const { isAuthenticated } = useAuth();
  return (
    <div
      className={`flex flex-row  h-16 justify-between ${
        props.color === "dashboard"
          ? "bg-gradient-to-r from-[#002350] to-[#0C3A76]"
          : "bg-transparent"
      } `}
    >
      <div>
        <p
          className={`bg-gradient-to-r from-[#A8ECFF] to-[#FFFFFF] inline-block text-transparent bg-clip-text font-bold text-2xl align-middle`}
          style={{ marginTop: "15px", marginLeft: "15px" }}
        >
          BookMarx
        </p>
      </div>
      {isAuthenticated ? (
        <div className="ml-auto me-4 gap-6 flex flex-row items-center ps-6">
          <div className="h-[42px]">
            <Searchbar />
          </div>

          <button onClick={logout} className=" ">
            <img src={logoutIcon} alt="Logout" className="w-6 h-6" />
          </button>
          <button>
            <img src={userIcon} alt="User Profile" className="w-12 h-10 " />
          </button>
        </div>
      ) : (
        <div className="flex gap-8 ml-auto me-4  items-center">
          <button className="text-white font-medium">About Us</button>
          <button className="text-white font-medium ">Contact Us</button>
        </div>
      )}
    </div>
  );
};

NavBar.propTypes = {
  color: PropTypes.string,
};

export default NavBar;
