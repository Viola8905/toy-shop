import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackBtn from "../../../components/backBtn/BackBtn";
import {  Button } from "react-bootstrap";
import "./shoppingCart.css";
const ShoppingCart = () => {
  const [callback, setCallback] = useState(false);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

	
  useEffect(() => {
    const getCart = async () => {
      try {
        const { data: response } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}shopping-cart`,
          {
            headers: { sanctum: `${localStorage.getItem("token")}` },
          }
        );
        setCart(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    getCart();
  }, [callback]);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.product.price * item.count;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  const navigate = useNavigate();
  const Details = (name, id) => {
    navigate(`/product-details/${name}`, { state: id });
  };

  const addToCart = async (product_id, count) => {
    await axios.patch(
      `${process.env.REACT_APP_BASE_URL}shopping-cart`,
      { product_id, count },
      {
        headers: { sanctum: `${localStorage.getItem("token")}` },
      }
    );
    setCallback(!callback);
  };

  function F(id, count) {
    addToCart(id, count);
  }

  const increment = (id, count) => {
    addToCart(id, count + 1);
  };

  const decrement = (id, count) => {
    cart.forEach((item) => {
      if (item.product.id === id) {
        item.count === 1 ? (item.count = 1) : addToCart(id, count - 1);
      }
    });
  };

  const removeProduct = async (id) => {
    console.log(id);

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}shopping-cart`,
        // { product_id: id },
        {
          data: { product_id: id },
          headers: { sanctum: `${localStorage.getItem("token")}` },
        }
      );
      setCallback(!callback);
      console.log(`${localStorage.getItem("token")}`);
    } catch (e) {
      console.log("error");
      alert(e.response.data.message);
    }
  };

  if (cart.length === 0)
    return (
      <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Корзина пуста</h2>
    );
  return (
    <div>
      <BackBtn />
      {cart.map((product) => (
        <div className="detail cart" key={product.product.id}>
          <img
            src={
              "https://media.istockphoto.com/photos/brown-teddy-bear-isolated-in-front-of-a-white-background-picture-id909772478?k=20&m=909772478&s=612x612&w=0&h=mzLuJ7ywrSDHmpchf9spOeNF2Ovr2aQBw1z57Szx17g="
            }
            style={{ width: "400px" }}
          />
          <div className="box-detail">
            <h6>#id:{product.product.id}</h6>

            <h3>${(product.product.price * product.count).toFixed(2)}</h3>
            <a
              style={{ fontWeight: "600", cursor: "pointer" }}
              onClick={() => Details(product.product.name, product.product.id)}
            >
              {product.product.name}
            </a>
            {/* <p>{product.product.description}</p> */}

            <div className="amount">
              <button
                onClick={() => decrement(product.product.id, product.count)}
              >
                -
              </button>
              <span>{product.count}</span>
              <button
                onClick={() => increment(product.product.id, product.count)}
              >
                +
              </button>
            </div>

            <button
              // className="delete"
              onClick={() => removeProduct(product.product.id)}
            >
              Закрити
            </button>
          </div>
        </div>
      ))}
      <div className="total">
        <h3>Загальна сума: ${total.toFixed(2)}</h3>
        <Button
          variant="primary"
          onClick={() => navigate("/order-product")}
          style={{ marginTop: "0px" }}
        >
          Оформити замовлення
        </Button>
      </div>
    </div>
  );
};

export default ShoppingCart;
