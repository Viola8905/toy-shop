import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Card, Container, Form, Row } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import BackBtn from "../../../components/backBtn/BackBtn";

const OrderProduct = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const initialState = {
    name: currentUser.first_name,
    email: currentUser.email,
    phone: 0,
    address: "",
  };

  const [userData, setUserData] = useState(initialState);
  const [payType, setPayType] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleChangeSelect = (e) => {
    setPayType(e.target.value);
  };

  const Order = async () => {
    try {
      const responce = await axios.post(
        `${process.env.REACT_APP_BASE_URL}orders`,
        { receiver: userData, pay_type: payType },
        {
          headers: { sanctum: `${localStorage.getItem("token")}` },
        }
      );
      responce.status === 200 ? setSuccess(true) : setError(true);
    } catch (err) {
      setError(true);
      alert(err.response.data.message);
    }
  };
  console.log(userData);
  return (
    <>
		<BackBtn/>
      <Container
        className="d-flex justify-content-center align-items-center "
        style={{ height: window.innerHeight - 54 }}
      >
        <Card style={{ width: 600 }} className="p-5">
          <h2 className="m-auto">Форма оформлення замовлення</h2>

          <div className="d-flex flex-column">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Ім'я</InputGroup.Text>
              <Form.Control
                // className="mt-2"
                type="text"
                name="name"
                id="name"
                required
                value={userData.name}
                onChange={handleChangeInput}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Пошта</InputGroup.Text>
              <Form.Control
                placeholder="Пошта"
                type="email"
                name="email"
                id="email"
                required
                value={userData.email}
                onChange={handleChangeInput}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                Номер телефону
              </InputGroup.Text>
              <Form.Control
                type="tel"
                name="phone"
                id="phone"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
                value={userData.phone}
                onChange={handleChangeInput}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Адреса</InputGroup.Text>
              <Form.Control
                type="text"
                name="address"
                id="address"
                required
                value={userData.address}
                onChange={handleChangeInput}
              />
            </InputGroup>
            <Form.Select
              aria-label="Default select example"
              value={payType}
              onChange={handleChangeSelect}
            >
              <option value="">Оберіть спосіб оплати</option>
              <option value="by_arrival">Готівка</option>
              <option value="online">Онлайн</option>
            </Form.Select>
          </div>
          <div style={{ margin: "0 auto", marginTop: "20px" }}>
            <Button
              variant="primary"
              onClick={() => Order()}
              style={{ marginTop: "0px" }}
            >
              Замовити
            </Button>
          </div>
          <div
            className=""
            style={{
              display: `${success ? "block" : "none"}`,
              backgroundColor: "#89f59b",
              padding: "20px 70px",
              color: "white",
              fontSize: "20px",
              marginTop: "20px",
            }}
          >
            Замовлення успішно зроблене
            <img
              src="https://cdn3.iconfinder.com/data/icons/object-emoji/50/Celebration-256.png"
              style={{ width: "50px" }}
            />
          </div>

          <Row className=" d-flex justify-content-between  mt-3 pl-3 pr-3 "></Row>
        </Card>
      </Container>
    </>
  );
};

export default OrderProduct;
