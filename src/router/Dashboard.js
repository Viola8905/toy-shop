import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Container from "react-bootstrap/Container";

const Dashboard = () => {
  return (
    <div className="wrapper" style={{ boxShadow: "box-shadow: 0 0 35px #eee",}}>
      <Header />
      <div className="main">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Dashboard;
