import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar2";

export const UnProtectedLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
