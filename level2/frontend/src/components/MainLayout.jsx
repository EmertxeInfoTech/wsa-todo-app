import React from "react";
import Header from "./Header";
import CopyrightNotice from "./CopyrightNotice";

export const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <CopyrightNotice />
    </div>
  );
};
