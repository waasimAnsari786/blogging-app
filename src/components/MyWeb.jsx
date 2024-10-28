import React from "react";
import { Header, Footer } from "./index";
import { Outlet } from "react-router-dom";

export default function MyWeb() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
