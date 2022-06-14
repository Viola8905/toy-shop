import axios from "axios";
import React from "react";
import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { login } from "../../api/userRequests";

const ResetPassword = () => {
  const [newPass, setNewPass] = useState("");
  const [newPass2, setNewPass2] = useState("");
  const [status, setStatus] = useState(false);

  const location = useLocation();
  
  const dispatch = useDispatch();
  
  let params = new URLSearchParams(location.search);
  let token = params.get("token");
  let email = params.get("email");
 

  const resetPassword = async (email, token, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}reset-password`,
        { email, token, password }
      );
      if(response.status === 200){
				setStatus(true)
			}
    } catch (e) {
			alert("Щось пішло не так.Пароль не оновився")
      console.error(e);
    }
  };


	
  return (
    <Container
      className="d-flex justify-content-center align-items-center "
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">Оновлення паролю </h2>
        <Form className="d-flex flex-column">
          <div className="">
            <Form.Control
              className="mt-2"
              placeholder="Пароль повиннен містити більше 4 символів"
              value={newPass}
              type="text"
              onChange={(e) => {
                setNewPass(e.target.value);
              }}
            />
            <Form.Control
              className="mt-2"
              placeholder="Ввведіть новий пароль повторно"
              value={newPass2}
              type="text"
              onChange={(e) => {
                setNewPass2(e.target.value);
              }}
            />
          </div>
          {status ? (
            <div style={{ margin: "0 auto", marginTop: "20px" }}>
              <Button
                onClick={() => dispatch(login(email, newPass))}
                type="button"
                variant="success"
              >
                <NavLink to="/" style={{ color: "white" , textDecoration:"none"}}>
                  Увійти в акаунт
                </NavLink>
              </Button>
            </div>
          ) : (
            <div style={{ margin: "0 auto", marginTop: "20px" }}>
              <Button
                onClick={() => resetPassword(email, token, newPass)}
                disabled={
                  newPass === newPass2 && newPass.length > 3 ? false : true
                }
                type="button"
              >
                Оновити пароль
              </Button>
            </div>
          )}
        </Form>
      </Card>
    </Container>
  );
};

export default ResetPassword;
