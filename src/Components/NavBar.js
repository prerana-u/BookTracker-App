import React from "react";
import { useAuth } from "../Resources/Context/AuthContext";
import logoutIcon from "../Resources/Icons/logout.svg";
import userIcon from "../Resources/Images/userImg.png";
const NavBar = () => {
  const { logout } = useAuth();
  const { isAuthenticated } = useAuth();
  return (
    <div className="flex flex-row  h-16 justify-between ">
      <div>
        <p
          className="bg-gradient-to-r from-[#A8ECFF] to-[#FFFFFF] inline-block text-transparent bg-clip-text font-bold text-3xl align-middle"
          style={{ marginTop: "15px", marginLeft: "15px" }}
        >
          BookMarx
        </p>
      </div>
      {isAuthenticated ? (
        <div className="ml-auto me-4 flex items-center">
          <button onClick={logout} className=" ">
            <img src={logoutIcon} alt="Logout" className="w-6 h-6" />
          </button>
          <button>
            <img src={userIcon} alt="User Profile" className="w-10 h-10 ml-4" />
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

export default NavBar;
