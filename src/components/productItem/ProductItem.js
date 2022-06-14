import axios from "axios";
import React from "react";
import { Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./productItem.css";

const ProductItem = ({ toy, callback, setCallback }) => {
  const role = useSelector((state) => state.user.currentUser.role_id);
  const navigate = useNavigate();
  const Details = () => {
    navigate(`/product-details/${toy.id}`, { state: toy.id });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const editProduct = () => {
    navigate(`/admin-edit-product`, { state: toy.id });
  };
  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}admin/products/${id}`,
        {
          headers: { sanctum: `${localStorage.getItem("token")}` },
        }
      );
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <Card style={{ width: "18rem", margin: "20px" }} className="body">
      <Card.Img
        variant="top"
        src={
          toy.image_path
            ? toy.image_path
            : "https://images.pexels.com/photos/12211/pexels-photo-12211.jpeg?cs=srgb&dl=pexels-tetyana-kovyrina-12211.jpg&fm=jpg"
        }
        style={{ width: "287px", height: "200px" }}
      />
      <Card.Body>
        <Card.Title className="toy-name-galleryItem">{toy.name}</Card.Title>
        <Card.Text>${toy.price}</Card.Text>
        {toy.amount > 4 ? (
          <div className="amount is"> в наявності</div>
        ) : toy.amount <= 0 ? (
          <div className="amount isnt"> немає в наявності</div>
        ) : (
          <div className="amount ends">закінчується</div>
        )}
        <Button
          variant="primary"
          onClick={() => Details()}
          style={{ marginTop: "0px" }}
        >
          Детальніше
        </Button>
        {role === 200 ? (
          <>
            <img
              src="https://cdn0.iconfinder.com/data/icons/multimedia-solid-30px/30/edit_modify_write_pen-256.png"
              onClick={() => editProduct()}
              style={{ margin: "0 0 0 20px", width: "30px", cursor: "pointer" }}
              alt=""
            />

            <img
              src="https://cdn0.iconfinder.com/data/icons/multimedia-solid-30px/30/delete_remove_trash_bin-256.png"
              alt=""
              onClick={() => deleteProduct(toy.id)}
              style={{ margin: "0 0 0 20px", width: "30px", cursor: "pointer" }}
            />
          </>
        ) : (
          <></>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
