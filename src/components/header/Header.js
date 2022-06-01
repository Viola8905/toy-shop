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
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
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
              Магазин Іграшок
            </NavLink>
          </div>

          {isAuth ? (
            <Nav className="ml-auto" style={{ color: "white" }}>
              <div
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}
                style={{
                  fontSize: "18px",
                  border: "1px solid white",
                  padding: "3px 10px",
                  borderRadius: "30px",
                  backgroundColor: "rgb(17, 119, 235)",
                }}
              >
                Вийти
              </div>
            </Nav>
          ) : (
            <Nav className="ml-auto" style={{ color: "white" }}>
              <div
                onClick={() => {
                  navigate("/login");
                }}
                style={{
                  fontSize: "18px",
                  border: "1px solid white",
                  padding: "3px 10px",
                  borderRadius: "30px",
                  backgroundColor: "rgb(17, 119, 235)",
                }}
              >
                Ввійти
              </div>
            </Nav>
          )}
        </Container>
      </Navbar>
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
              Категорії
            </NavLink>
          </div>
          <div className="admin-navbar">
            <NavLink
              to="/admin-create-brands"
              style={{ textDecoration: "none", color: "black" }}
            >
              Бренди
            </NavLink>
          </div>
          <div className="admin-navbar">
            <NavLink
              to="/admin-create-age-categ"
              style={{ textDecoration: "none", color: "black" }}
            >
              Вікові категорії
            </NavLink>
          </div>
          <div className="admin-navbar">
            <NavLink
              to="/admin-create-product"
              style={{ textDecoration: "none", color: "black" }}
            >
              Створити продукт
            </NavLink>
          </div>
        </div>
      ) : (
        <>
          <div
            className="header"
            style={{ backgroundColor: "rgb(17, 119, 235)" }}
          >
            <Container>
              <div className="first-row">
                <div
                  className="first-row-flex"
                  style={{ display: "flex", padding: " 20px 0 20px 0" }}
                >
                  <img
                    src={logo}
                    alt=""
                    style={{ marginLeft: "2.5%" }}
                    className="shop-logo"
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
                        placeholder="Щось шукаєте?"
                        style={{ borderRadius: "22px" }}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <img
                        src={search}
                        alt=""
                        className="search-icon"
                        style={{ marginLeft: "2%" }}
                        onClick={() =>
                          navigate(`/search/?text=${searchQuery}`, {
                            state: searchQuery,
                          })
                        }
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
                ></div>
              </div>
            </Container>
          </div>
          <div className="" style={{ textAlign: "center" }}>
            <NavLink
              to="/shopping-cart"
              style={{ textDecoration: "none", color: "black" }}
            >
              Корзина
            </NavLink>{" "}
          </div>
        </>
      )}
    </>
  );
};

export default Header;
