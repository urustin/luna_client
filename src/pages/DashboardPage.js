import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Dashboard from "../components/WeeklyChecker/Dashboard";

function CheckerPage() {
  return (
    <>
      <Header />
      <Dashboard />
      <Footer />
    </>
  );
}

export default CheckerPage;