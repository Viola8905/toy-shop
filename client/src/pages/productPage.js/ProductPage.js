import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import BackBtn from '../../components/backBtn/BackBtn';
import poshta from'../../img/nova-poshta.png'
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { getProductById, postReview } from '../../api/productRequests';

function MyVerticallyCenteredModal(props) {
	let productId = props.product_id 


		const [rating, setRating] = useState(1);
    const [text, setText] = useState("");
	 const dispatch = useDispatch()

	 function sendReview(productId){
		 dispatch(postReview(productId, rating, text));
		 props.onHide()
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
          onClick={() =>
            sendReview(productId)
          }
					
        >
          Надіслати
        </Button>
      </Modal.Footer>
    </Modal>
  );
}




const ProductPage = () => {
	const products = useSelector((state) => state.products.Products);
	const location = useLocation();
	let query = location.state;
	const [modalShow, setModalShow] = useState(false);
	const dispatch = useDispatch();
  const product = useSelector((state) => state.products.Product);
  let productReviews = product.reviews
	useEffect(() => {
		dispatch(getProductById(query))
	},[])

		

	return (
		<div>{products.filter(product => product.id == query).map((product) => {
			return (
        <div>
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
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="product-raiting">
                      {product.average_rating} 2.75
                    </div>
                    <div className="product-id">#Ref:{product.id}</div>
                  </div>
                  <div className="product-name">{product.name}</div>
                  <div className="product-price">${product.price}</div>

                  <div
                    className="product-button"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <button
                      style={{
                        backgroundColor: "rgb(121, 176, 238)",
                        padding: "1% 15%",
                        color: "white",
                        borderRadius: "15px",
                        fontSize: "20px",
                      }}
                    >
                      Купити
                    </button>
                  </div>
                  <hr />
                  <div className="product-samovyvis">
                    Безкоштовний самовивіз
                  </div>
                  <hr />
                  <div
                    className="product-novaPoshta"
                    style={{ display: "flex" }}
                  >
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
              <Button
                onClick={() => setModalShow(true)}
                style={{ marginTop: "20px" }}
              >
                Додати Відгук
              </Button>

              {productReviews.map((review) => {
                return (
                  <div>
                    <Card style={{ marginTop: "20px" }}>
                      <div className="wrapper" style={{ padding: "20px" }}>
                        <div style={{ display: "flex" }}>
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
                        </div>
                        <Typography component="legend"></Typography>
                        <Rating
                          name="read-only"
                          value={review.rating}
                          readOnly
                        />
                        <div className="review-text">{review.text}</div>
                      </div>
                    </Card>
                  </div>
                );
              })}

              <MyVerticallyCenteredModal
                show={modalShow}
                product_id={product.id}
                onHide={() => setModalShow(false)}
              />
            </div>
          </Card>
        </div>
      );
		})}
		</div>
	)
}

export default ProductPage