import React, { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
const Header = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  const [toggleMenu, setToggleMenu] = useState(false);
  const role = useSelector((state) => state.user.currentUser.role_id);
  return (
    <Navbar bg="black" variant="dark">
      <Container>
        <div onClick={() => dispatch(logout())}>
          <NavLink style={{ color: "white" }} to="/">
            CVE Posts
          </NavLink>
        </div>

        {isAuth ? (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              className="ml-2"
              onClick={() => dispatch(logout())}
            >
              <NavLink to="/">Вийти</NavLink>
            </Button>
            {role == 200 ? (
              <>
                <Button variant={"outline-light"} className="ml-2">
                  <NavLink to="/">Адмін</NavLink>
                </Button>
              </>
            ) : (
              <>
                <Button variant={"outline-light"} className="ml-2">
                  <NavLink to="/">Користувач</NavLink>
                </Button>
              </>
            )}
          </Nav>
        ) : (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button variant={"outline-light"}>
              <NavLink to="/login">Ввійти</NavLink>
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
