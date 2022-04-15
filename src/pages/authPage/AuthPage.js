import React, { useState } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { login, registration } from "../../api/userRequests";
import { useDispatch, useSelector } from "react-redux";

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  const [first_name, setFirst_name] = useState("");
  const [middle_name, setMiddle_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  return (
    <Container
      className="d-flex justify-content-center align-items-center "
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto"> {isLogin ? " Login " : " Registration"} </h2>
        <Form className="d-flex flex-column">
          {isLogin ? (
            <div className="">
              <Form.Control
                className="mt-2"
                placeholder="enter email"
                value={email}
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Form.Control
                className="mt-2"
                placeholder="enter password "
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          ) : (
            <div>
              <Form.Control
                className="mt-2"
                placeholder="enter first name"
                value={first_name}
                onChange={(e) => {
                  setFirst_name(e.target.value);
                }}
              />
              <Form.Control
                className="mt-2"
                placeholder="enter middle name"
                value={middle_name}
                onChange={(e) => {
                  setMiddle_name(e.target.value);
                }}
              />
              <Form.Control
                className="mt-2"
                placeholder="enter last name"
                value={last_name}
                onChange={(e) => {
                  setLast_name(e.target.value);
                }}
              />
              <Form.Control
                className="mt-2"
                placeholder="enter email"
                value={email}
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Form.Control
                className="mt-2"
                placeholder="enter password "
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          )}

          <Row className=" d-flex justify-content-between  mt-3 pl-3 pr-3 ">
            {isLogin ? (
              <div className="">
                Don't have an account?
                <NavLink to="/registration">Register!</NavLink>
              </div>
            ) : (
              <div>
                Have an account?
                <NavLink to="/login">Log in!</NavLink>
              </div>
            )}
            {isLogin ? (
              <div style={{ width: "100%" }}>
                <span>Hello</span>
                <Button
                  variant={"outline-dark"}
                  onClick={() => dispatch(login(email, password))}
                >
                  <NavLink to="/">Login</NavLink>
                </Button>
              </div>
            ) : (
              <div
                style={{ width: "100%" }}
                onClick={() =>
                  registration(
                    first_name,
                    middle_name,
                    last_name,
                    email,
                    password
                  )
                }
              >
                <Button variant={"outline-dark"}>
                  <NavLink to="/login">Register</NavLink>
                </Button>
              </div>
            )}
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default Auth;
