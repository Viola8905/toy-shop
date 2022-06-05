import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

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
		try{
			const responce = await axios.post(
				`${process.env.REACT_APP_BASE_URL}orders`,
				{ receiver:userData, pay_type:payType },
				{
					headers: { sanctum: `${localStorage.getItem("token")}` },
				}
			);
			responce.status === 200 ? setSuccess(true) : setError(true)
			

		}catch(e){

		}
  };
  console.log(userData);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className="">
        <label htmlFor="name">Ім'я:</label>
        <br />
        <input
          type="text"
          name="name"
          id="name"
          required
          value={userData.name}
          onChange={handleChangeInput}
        />
      </div>
      <div className="">
        <label htmlFor="email">Пошта:</label>
        <br />
        <input
          type="email"
          name="email"
          id="email"
          required
          value={userData.email}
          onChange={handleChangeInput}
        />
      </div>
      <div className="">
        <label htmlFor="phone">Номер телефону:</label>
        <br />
        <input
          type="tel"
          name="phone"
          id="phone"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          required
          value={userData.phone}
          onChange={handleChangeInput}
        />
      </div>
      <div className="">
        <label htmlFor="address">Адреса:</label>
        <br />
        <input
          type="text"
          name="address"
          id="address"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          required
          value={userData.address}
          onChange={handleChangeInput}
        />
      </div>
      <div className="">
        <select value={payType} onChange={handleChangeSelect}>
          <option value="">Оберіть спосіб оплати</option>
          <option value="by_arrival">Готівка</option>
          <option value="online">Онлайн</option>
        </select>
      </div>

      <Button
        variant="primary"
        onClick={() => Order()}
        style={{ marginTop: "0px" }}
      >
        Замовити
      </Button>
      <div className="" style={{ display: `${success ? "block" : "none"}` }}>
        Успіх
      </div>
      <div className="" style={{ display: `${error ? "block" : "none"}` }}>
        Щось пішло не так
      </div>
    </div>
  );
};

export default OrderProduct;
