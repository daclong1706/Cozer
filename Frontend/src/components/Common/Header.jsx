import React from "react";
import TopBar from "../Layout/TopBar";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <div>
      <header className="border-b border-gray-200">
        {/* TopBar */}
        {/* <TopBar /> */}
        {/* NavBar */}
        <NavBar />
        {/* Cart Drawer */}
      </header>
    </div>
  );
};

export default Header;
