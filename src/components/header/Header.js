import React, { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";
import logo from "../../img/logo.svg";
import search from "../../img/search.png";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {
  ButtonGroup,
  Dropdown,
  Form,
  NavDropdown,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
const Header = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  const [toggleMenu, setToggleMenu] = useState(false);
  const role = useSelector((state) => state.user.currentUser.role_id);



  return (
    <>
      <Navbar variant="dark" style={{ backgroundColor: "rgb(121, 176, 238)" }}>
        <Container>
          <div onClick={() => dispatch(logout())}>
            <NavLink
              style={{
                color: "black",
                textDecoration: "none",
                fontWeight: "700",
              }}
              to="/"
            >
              Deploy is successful
            </NavLink>
          </div>

          {isAuth ? (
            <Nav className="ml-auto" style={{ color: "white" }}>
              <Button
                variant={"outline-light"}
                className="ml-2"
                onClick={() => dispatch(logout())}
              >
                <NavLink
                  to="/"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Вийти
                </NavLink>
              </Button>
              {role == 200 ? (
                <>
                  <Button variant={"outline-light"} className="ml-2">
                    <NavLink
                      to="/"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Адмін
                    </NavLink>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant={"outline-light"} className="ml-2">
                    <NavLink
                      to="/"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Користувач
                    </NavLink>
                  </Button>
                </>
              )}
            </Nav>
          ) : (
            <Nav className="ml-auto" style={{ color: "white" }}>
              <Button variant={"outline-light"}>
                <NavLink
                  to="/login"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Ввійти
                </NavLink>
              </Button>
            </Nav>
          )}
        </Container>
      </Navbar>

      <div className="header" style={{ backgroundColor: "rgb(17, 119, 235)" }}>
        <Container>
          <div className="first-row">
            <div
              className="first-row-flex"
              style={{ display: "flex", padding: " 20px 0 20px 0" }}
            >
              <img
                src={logo}
                alt=""
                style={{ maxWidth: "150px", marginLeft: "2.5%" }}
              />
              <div
                style={{
                  flex: " 0 0 65%",
                  marginLeft: "5%",
                  alignSelf: "center",
                }}
              >
                <Form style={{ display: "flex" }}>
                  <Form.Control
                    placeholder="I am looking for"
                    style={{ borderRadius: "22px" }}
                  />
                  <img
                    src={search}
                    alt=""
                    style={{ maxWidth: "40px", marginLeft: "2%" }}
                  />
                </Form>
              </div>
            </div>
          </div>
          <div className="second-row" style={{}}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "0 0 5px 0",
              }}
            >
              <Dropdown className="d-inline mx-2">
                <Dropdown.Toggle id="dropdown-autoclose-true">
                  Baby Room
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">Travel Systems</Dropdown.Item>
                  <Dropdown.Item href="#">Cot Beds</Dropdown.Item>
                  <Dropdown.Item href="#">Baby Monitors</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown className="d-inline mx-2">
                <Dropdown.Toggle id="dropdown-autoclose-true">
                  Outdoor
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">Bikes</Dropdown.Item>
                  <Dropdown.Item href="#">Skooters</Dropdown.Item>
                  <Dropdown.Item href="#">Trampolines</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown className="d-inline mx-2">
                <Dropdown.Toggle id="dropdown-autoclose-true">
                  Gaming
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">XBox Gaming</Dropdown.Item>
                  <Dropdown.Item href="#">Play Station Gaming</Dropdown.Item>
                  <Dropdown.Item href="#">PC Gaming</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </Container>
      </div>
      <div>
        {role === 200 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px 0",
              backgroundColor: "#ebebf0",
              cursor: "pointer",
            }}
          >
            <div>
              <NavLink
                to="/admin-create-category"
                style={{ textDecoration: "none", color: "black" }}
              >
                Create Category
              </NavLink>
            </div>
            <div className="admin-navbar">
              <NavLink
                to="/admin-create-brands"
                style={{ textDecoration: "none", color: "black" }}
              >
                Create Brands
              </NavLink>
            </div>
            <div className="admin-navbar">
              <NavLink
                to="/admin-create-age-categ"
                style={{ textDecoration: "none", color: "black" }}
              >
                Create Age-Categories
              </NavLink>
            </div>
          </div>
        ) : (
          <div>
            
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
