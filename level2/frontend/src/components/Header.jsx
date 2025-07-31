import React from "react";
import WsaLogo from "../assets/wsa-logo.svg";

const Header = () => {
  return (
    <div className="header-container-div">
      <img src={WsaLogo} width={182} height={62} alt="WSA Logo" />
    </div>
  );
};

export default Header;
