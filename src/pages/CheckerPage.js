import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import WeeklyChecker from "../components/WeeklyChecker/WeeklyChecker";

function CheckerPage() {
  return (
    <>
      <Header />
      <WeeklyChecker />
      <Footer />
    </>
  );
}

export default CheckerPage;