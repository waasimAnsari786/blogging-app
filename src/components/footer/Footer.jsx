import React from "react";
import { Container, MyTypoGraphy } from "../index";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Container parentElemClass="bg-customPurple mt-10 p-5">
      <MyTypoGraphy myClass="text-white text-center">
        Copyright all rights reserved | This site is desined by{" "}
        <Link to="https://waasim-portfolio-2.netlify.app/">Waasim Ansari</Link>
      </MyTypoGraphy>
    </Container>
  );
}
