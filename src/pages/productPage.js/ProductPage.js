import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button, Card, Form, Modal, Overlay, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import BackBtn from "../../components/backBtn/BackBtn";
import poshta from "../../img/nova-poshta.png";
import Edit from "../../img/edit.png";
import Checked from "../../img/checked.png";

import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import {
  getProductById,
  postReview,
  removeReview,
} from "../../api/productRequests";
import Delete from "../../img/delete.png";
import { setProduct } from "../../reducers/productsReducer";
import axios from "axios";

const ProductPage = () => {
  const Products = useSelector((state) => state.products.Products);
  const currentUser = useSelector((state) => state.user.currentUser);
  const isAuth = useSelector((state) => state.user.isAuth);
  const location = useLocation();
  let query = location.state;
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.Product);
  const [productReviews, setProductReviews] = useState([]);
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [edit, setEdit] = useState(false);
  const [reviewEditing, setReviewEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editingRating, setEditingRating] = useState(1);
  const [callback, setCallback] = useState(false);
  const [cart, setCart] = useState([]);
  const [isInCart, setIsInCart] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const Posts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}products/${query}`
        );

        dispatch(setProduct(response.data.data));
        setProductReviews(response.data.data.reviews);
        setCallback(!callback);
      } catch (e) {
        console.log(`Error from useEffect: ${e}`);
      }
    };

    Posts();
  }, [query]);

  const deleteReview = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}product-reviews/${id}`,
        {
          headers: { sanctum: `${localStorage.getItem("token")}` },
        }
      );
      // alert(res.data.msg);
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  function submitEdits(reviewId) {
    let rating = editingRating;
    let text = editingText;
    let id = reviewId;
    const product = { rating, text, id };

    fetch(`${process.env.REACT_APP_BASE_URL}product-reviews/${id}`, {
      method: "PATCH",
      headers: {
        sanctum: `${localStorage.getItem("token")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((result) => {
        setCallback(!callback);
      })
      .catch((error) => {
        console.error("Error", error);
      });

    setReviewEditing(null);
  }

  useEffect(() => {
    const getCart = async () => {
      try {
        const { data: response } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}shopping-cart`,
          {
            headers: { sanctum: `${localStorage.getItem("token")}` },
          }
        );
        const find = response.data.find(
          (item) => item.product.id === product.id
        );
        setIsInCart(find ? "yes" : "no");
      } catch (error) {
        console.error(error.message);
      }
    };

    getCart();
  }, [callback]);
  const addToCart = async (product_id) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}shopping-cart`,
        { product_id },
        {
          headers: { sanctum: `${localStorage.getItem("token")}` },
        }
      );
      setCallback(!callback);
      console.log(`${localStorage.getItem("token")}`);
      navigate("/shopping-cart");
    } catch (e) {
      console.log("error");
      alert(e.response.data.message);
    }
  };

  // const Find = () => {
  //   const find = cart.find((item) => item.product.id === product.id);
  //   setIsInCart(find ? "yes" : "no");
  // };
  // useEffect(() => Find(), [Find]);

  return (
    <div>
      <div key={product.id}>
        <BackBtn />
        <Card style={{ margin: "0 15px 0px 15px" }}>
          <div
            className="product-page"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div className="product-page-column" style={{ display: "flex" }}>
              <div className="product-image" style={{ maxWidth: "500px" }}>
                <img
                  src="https://images.pexels.com/photos/12211/pexels-photo-12211.jpeg?cs=srgb&dl=pexels-tetyana-kovyrina-12211.jpg&fm=jpg"
                  alt=""
                  style={{ maxWidth: "100%" }}
                />
              </div>
              <div
                className="product-block"
                style={{ padding: "10px 10px 0 10px" }}
              >
                <div
                  className="product-row"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="product-raiting">
                    {product.average_rating}
                  </div>
                  <div className="product-id">#Ref:{product.id}</div>
                </div>
                <div className="product-name">{product.name}</div>
                <div className="product-price">${product.price}</div>

                <div
                  className="product-button"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {isInCart === "yes" ? (
                    <div
                      onClick={() => navigate("/shopping-cart")}
                      style={{ color: "red" }}
                    >
                      В корзині
                    </div>
                  ) : isInCart === "no" ? (
                    <button
                      style={{
                        backgroundColor: "rgb(121, 176, 238)",
                        padding: "1% 15%",
                        color: "white",
                        borderRadius: "15px",
                        fontSize: "20px",
                      }}
                      onClick={() => addToCart(product.id)}
                    >
                      Купити
                    </button>
                  ) : isAuth ? (
                    <></>
                  ) : (
                    <>
                      <button
                        style={{
                          backgroundColor: "rgb(121, 176, 238)",
                          padding: "1% 15%",
                          color: "white",
                          borderRadius: "15px",
                          fontSize: "20px",
                        }}
                        onClick={() => navigate("/login")}
                      >
                        Купити
                      </button>
                    </>
                  )}

                  <>
                    {/* {cart.map((item) => (
										<>
											{item.id.includes( product.id ) ? "in cart molok" : "nooooooooo"}
										</>
									))} */}
                  </>
                </div>
                <hr />
                <div className="product-samovyvis">Безкоштовний самовивіз</div>
                <hr />
                <div className="product-novaPoshta" style={{ display: "flex" }}>
                  <img
                    src={poshta}
                    alt=""
                    style={{ width: "30px", height: "30px" }}
                  />
                  <div style={{ alignSelf: "center", marginLeft: "5px" }}>
                    Відділення Нова Пошта
                  </div>

                  <div
                    className=""
                    style={{
                      flex: "1 1 100%",
                      textAlign: "end",
                      alignSelf: "center",
                    }}
                  >
                    50грн без комісії за накладений платіж
                  </div>
                </div>
                <hr />
                <div className="product-curier" style={{ display: "flex" }}>
                  <img
                    src={poshta}
                    alt=""
                    style={{ width: "30px", height: "30px" }}
                  />
                  <div style={{ alignSelf: "center", marginLeft: "5px" }}>
                    Кур'єр
                  </div>

                  <div
                    className=""
                    style={{
                      flex: "1 1 100%",
                      textAlign: "end",
                      alignSelf: "center",
                    }}
                  >
                    Доставка 50грн
                  </div>
                </div>
                <hr />
                <div className="detali-dostavky">
                  Деталі на сторінці :
                  <span style={{ color: "blue", cursor: "pointer" }}>
                    Правила доставки
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card style={{ margin: "20px 15px 20px 15px" }}>
          <div className="product-description" style={{ padding: "15px" }}>
            <div
              className="title"
              style={{ fontSize: "20px", fontWeight: 700 }}
            >
              Опис
            </div>
            <div className="description-txt">{product.description}</div>
          </div>
        </Card>

        <Card style={{ margin: "20px 15px 50px 15px" }}>
          <div className="reviews-wrapper" style={{ padding: "15px" }}>
            <div className="reviews-title">
              Відгуки({productReviews.length})
            </div>
            {isAuth ? (
              <>
                <Button
                  onClick={() => setModalShow(true)}
                  style={{ marginTop: "20px" }}
                >
                  Додати Відгук
                </Button>
                <MyVerticallyCenteredModal
                  show={modalShow}
                  product_id={product.id}
                  productReviews={productReviews}
                  onHide={() => setModalShow(false)}
                />
              </>
            ) : (
              <>
                <Button
                  ref={target}
                  onClick={() => setShow(!show)}
                  style={{ marginTop: "20px" }}
                >
                  Додати відгук
                </Button>
                <Overlay target={target.current} show={show} placement="right">
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Ввійдіть,аби додати відгук
                    </Tooltip>
                  )}
                </Overlay>
              </>
            )}

            {productReviews.map((review) => {
              return (
                <div key={review.id}>
                  <Card style={{ marginTop: "20px" }}>
                    <div className="wrapper" style={{ padding: "20px" }}>
                      <div style={{ display: "flex", minWidth: "100%" }}>
                        <div
                          className="review-username"
                          style={{ fontWeight: "700" }}
                        >
                          {review.user.first_name}
                        </div>
                        <div
                          className="review-username"
                          style={{
                            marginLeft: "20px",
                            fontSize: "12px",
                            alignSelf: "center",
                          }}
                        >
                          {new Date(review.user.created_at).toUTCString()}
                        </div>

                        {currentUser.role_id == 200 ? (
                          <>
                            <div
                              className="delete-bin"
                              style={{ marginLeft: "70%" }}
                              onClick={() => deleteReview(review.id)}
                            >
                              <img
                                src={Delete}
                                alt=""
                                style={{
                                  alignSelf: "center",
                                  maxWidth: "30px",
                                }}
                              />
                            </div>
                            {review.user.id === currentUser.id &&
                            review.id === reviewEditing ? (
                              <>
                                <div onClick={() => submitEdits(review.id)}>
                                  <img
                                    src={Checked}
                                    alt=""
                                    style={{
                                      alignSelf: "center",
                                      maxWidth: "30px",
                                      marginLeft: "10px",
                                    }}
                                  />
                                </div>
                              </>
                            ) : (
                              <>
                                {review.user.id === currentUser.id ? (
                                  <div
                                    className="edit"
                                    style={{}}
                                    onClick={() => {
                                      setReviewEditing(review.id);
                                      setEditingText(review.text);
                                      setEditingRating(review.rating);
                                    }}
                                  >
                                    <img
                                      src={Edit}
                                      alt=""
                                      style={{
                                        alignSelf: "center",
                                        maxWidth: "30px",
                                        marginLeft: "10px",
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </>
                            )}
                          </>
                        ) : (
                          <div></div>
                        )}
                      </div>

                      {review.id === reviewEditing ? (
                        <>
                          <Rating
                            name="simple-controlled"
                            value={editingRating}
                            onChange={(event, newValue) => {
                              setEditingRating(newValue);
                            }}
                          />
                          <Form>
                            <Form.Control
                              defaultValue={review.text}
                              onChange={(e) => {
                                setEditingText(e.target.value);
                              }}
                            />
                          </Form>
                        </>
                      ) : (
                        <>
                          <Rating
                            name="read-only"
                            value={review.rating}
                            readOnly
                          />
                          <div className="review-text">{review.text}</div>
                        </>
                      )}
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProductPage;

function MyVerticallyCenteredModal(props) {
  let productId = props.product_id;
  const currentUser = useSelector((state) => state.user.currentUser);

  const [rating, setRating] = useState(1);
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  let newReview = {
    rating: rating,
    text: text,
    user: {
      created_at: Date.now(),
      first_name: currentUser.first_name,
    },
  };

  function sendReview(productId, productReviews, newReview) {
    dispatch(postReview(productId, rating, text));
    productReviews.push(newReview);
    props.onHide();
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Додайте свій відгук!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Typography component="legend">Оцініть продукт</Typography>
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
        <Form>
          <Form.Control
            placeholder="введіть текст відгука"
            onChange={(e) => setText(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => sendReview(productId, props.productReviews, newReview)}
        >
          Надіслати
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
