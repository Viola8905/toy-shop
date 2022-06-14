import React, { useState } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { login, registration } from "../../api/userRequests";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  const [first_name, setFirst_name] = useState("");
  const [middle_name, setMiddle_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const forgotPassword = async (email) => {
    try {
      if (email) {
        alert("якщо ваша пошта є в нашій базі то ми надішлемо вам лист");
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}forgot-password`,
          { email }
        );
        console.log(response);
      } else {
        alert("Вкажіть пошту");
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  return (
    <Container
      className="d-flex justify-content-center align-items-center "
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto"> {isLogin ? "Авторизація " : " Реєстрація"} </h2>
        <Form className="d-flex flex-column">
          {isLogin ? (
            <div className="">
              <Form.Control
                className="mt-2"
                placeholder="Пошта"
                value={email}
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Form.Control
                className="mt-2"
                placeholder="Пароль "
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
                placeholder="Ім'я"
                value={first_name}
                onChange={(e) => {
                  setFirst_name(e.target.value);
                }}
              />
              <Form.Control
                className="mt-2"
                placeholder="По-батькові"
                value={middle_name}
                onChange={(e) => {
                  setMiddle_name(e.target.value);
                }}
              />
              <Form.Control
                className="mt-2"
                placeholder="Прізвище"
                value={last_name}
                onChange={(e) => {
                  setLast_name(e.target.value);
                }}
              />
              <Form.Control
                className="mt-2"
                placeholder="Пошта"
                value={email}
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Form.Control
                className="mt-2"
                placeholder="Пароль"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          )}
        </Form>

        <Row className=" d-flex justify-content-between  mt-3 pl-3 pr-3 ">
          {isLogin ? (
            <>
              <div className="">
                Ще не зареєстровані?
                <NavLink to="/registration">
                  Перейти до створення акаунту!
                </NavLink>
              </div>
              <button
                onClick={() => forgotPassword(email)}
                style={{
                  backgroundColor: "#8ebfed",
                  color: "white",
                  marginTop: "20px",
                }}
              >
                Забули пароль?
              </button>
            </>
          ) : (
            <div>
              Вже є акаунт?
              <NavLink to="/login"> Перейти до авторизації!</NavLink>
            </div>
          )}

          {isLogin ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="primary"
                onClick={() => dispatch(login(email, password))}
                style={{ marginTop: "20px" }}
              >
                <NavLink
                  to="/"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Увійти
                </NavLink>
              </Button>
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
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
              <Button variant={"primary"}>
                <NavLink
                  to="/login"
                  style={{
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  Зареєструватися
                </NavLink>
              </Button>
            </div>
          )}
        </Row>
      </Card>
    </Container>
  );
};

export default Auth;
