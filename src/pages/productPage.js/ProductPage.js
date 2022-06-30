import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button, Card, Form, Modal, Overlay, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import BackBtn from "../../components/backBtn/BackBtn";
import Edit from "../../img/edit.png";
import Checked from "../../img/checked.png";
import "./productPage.css";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { postReview } from "../../api/productRequests";
import Delete from "../../img/delete.png";
import { setProduct } from "../../reducers/productsReducer";
import axios from "axios";
import ProductItem from "../../components/productItem/ProductItem";

const ProductPage = () => {
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
  const [reviewEditing, setReviewEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editingRating, setEditingRating] = useState(1);
  const [callback, setCallback] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const Posts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}products/${query}`
        );

        dispatch(setProduct(response.data.data));
        setProductReviews(response.data.data.reviews);
      } catch (e) {
        console.log(`Error from useEffect: ${e}`);
      }
    };

    Posts();
  }, [callback]);

  useEffect(() => {
    const Products = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}products`
        );

        setFilteredProducts(
          response.data.data.filter((product) => product.is_best_deal === true)
        );
      } catch (e) {
        console.log(`Error from useEffect: ${e}`);
      }
    };

    Products();
  }, []);

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
  }, [callback, product.id]);
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

  console.log(product);
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
              <div className="product-image">
                <img
                  src={
                    product.image_path
                      ? product.image_path
                      : "https://images.pexels.com/photos/12211/pexels-photo-12211.jpeg?cs=srgb&dl=pexels-tetyana-kovyrina-12211.jpg&fm=jpg"
                  }
                  alt=""
                />
              </div>
              <div className="product-block">
                <div
                  className="product-row"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    className="product-raiting"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {product.average_rating ? (
                      <>
                        <img
                          src="https://cdn0.iconfinder.com/data/icons/new-year-holidays-set/200/NewYearIcon7-01-512.png"
                          alt=""
                          style={{ maxWidth: "25px" }}
                        />
                        <div style={{ marginLeft: "5px", fontWeight: "500" }}>
                          {product.average_rating.toFixed(1)}
                        </div>
                      </>
                    ) : (
                      <img
                        src="https://cdn3.iconfinder.com/data/icons/flat-pro-basic-set-4/32/star-grayed-512.png"
                        alt=""
                        style={{ maxWidth: "25px" }}
                      />
                    )}
                  </div>
                  <div className="product-id">#Ref:{product.id}</div>
                </div>
                <div
                  className="product-name"
                  style={{
                    fontSize: "20px",
                    color: "rgb(17, 119, 235)",
                    fontWeight: "700",
                    letterSpacing: "1px",
                    padding: "10px 0",
                  }}
                >
                  {product.name}
                </div>
                <div
                  className="product-price"
                  style={{ fontSize: "20px", fontWeight: "500" }}
                >
                  ₴{product.price}
                </div>

                <div
                  className="product-button"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {isInCart === "yes" ? (
                    <div
                      onClick={() => navigate("/shopping-cart")}
                      style={{
                        color: "#02b857",
                        fontWeight: "600",
                        fontSize: "18px",
                        backgroundColor: "#02b857",
                        padding: "1% 15%",
                        color: "white",
                        borderRadius: "15px",
                        marginTop: "10px ",
                      }}
                    >
                      В корзині
                      <img
                        src="https://cdn4.iconfinder.com/data/icons/aami-web-internet/64/aami6-31-512.png"
                        alt=""
                        style={{ maxWidth: "40px", marginLeft: "5px" }}
                      />
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
                      disabled={product.amount == 0}
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
                </div>
                <hr />
                <div className="product-brand" style={{ padding: "15px" }}>
                  <div className="title" style={{ fontSize: "20px" }}>
                    <b>Бренд</b>: {product.brand?.name}
                  </div>
                </div>
                {/* <div className="product-age-category" style={{ padding: "15px" }}>
                  <div
                    className="title"  
                    style={{ fontSize: "20px" }}
                  >
                    <b>Вікова категорія</b>: { product.age_category?.name }
                  </div>
                </div> */}
                <div
                  className="product-categories"
                  style={{ padding: "15px" }}
                  hidden={product.categories?.length === 0}
                >
                  <div className="title" style={{ fontSize: "20px" }}>
                    <b>Категорії</b>:{" "}
                    {product.categories
                      ?.map((category) => category?.name)
                      .join(", ")}
                  </div>
                </div>
                <br />
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

        <Card style={{ margin: "20px 15px 20px 15px" }}>
          <div
            className=""
            style={{ padding: "15px" }}
            hidden={
              product && product.categories && product.categories.length == 0
            }
          >
            <div
              className="title"
              style={{ fontSize: "20px", fontWeight: 700 }}
            >
              Накращі пропозиції по схожим товарам
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {product &&
              product.categories &&
              product.categories.length > 0 ? (
                filteredProducts
                  .filter((item2) => item2.categories[0])
                  .filter(
                    (item3) =>
                      item3.categories[0].name === product.categories[0].name
                  )
                  .slice(0, 3)
                  .map((item) =>
                    filteredProducts.length > 0 ? (
                      <div className="" key={item.id}>
                        <ProductItem toy={item} />
                      </div>
                    ) : (
                      <></>
                    )
                  )
              ) : (
                <></>
              )}
            </div>
          </div>
        </Card>

        <Card style={{ margin: "20px 15px 50px 15px" }}>
          <div className="reviews-wrapper" style={{ padding: "15px" }}>
            <div
              className="reviews-title"
              style={{ fontSize: "20px", fontWeight: 700 }}
            >
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

                        {currentUser.role_id === 200 ? (
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
