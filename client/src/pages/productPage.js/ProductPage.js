import React from 'react'
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import BackBtn from '../../components/backBtn/BackBtn';
import poshta from'../../img/nova-poshta.png'


const ProductPage = () => {
	const products = useSelector((state) => state.products.Products);
	const location = useLocation();
	let query = location.state;
	console.log(query)
	return (
		<div>{products.filter(product => product.id == query).map((product) => {
			return (
        <div>
          <BackBtn />
          <Card>
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
                <div className="product-block" style={{padding:"10px 0 0 10px"}}>
                  <div
                    className="product-row"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="product-raiting">
                      {product.average_rating} 2.75
                    </div>
                    <div className="product-id">Ref:{product.id}</div>
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
                  <div className="detali-dostavky">Деталі на сторінці</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      );
		})}
		</div>
	)
}

export default ProductPage