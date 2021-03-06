import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import { getProducts } from "../../api/productRequests";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../productItem/ProductItem";
import Pagination from "../pagination/Pagination";
import { setProduct, setProducts } from "../../reducers/productsReducer";
import { CircularProgress } from "@material-ui/core";

// import { useDispatch, useSelector } from "react-redux";

const Gallery = () => {
  const [products, setProducts1] = useState([]);
  const [callback, setCallback] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const Posts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}products`
        );
        // dispatch(setProducts(response.data.data));
        setProducts1(response.data.data);
        setLoading(false);
      } catch (e) {
        console.log(`Error from useEffect: ${e}`);
      }
    };

    Posts();
  }, [callback]);
  // console.log(process.env.REACT_APP_BASE_URL);

  //-------- pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = products.slice(firstPostIndex, lastPostIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //--------------------
  return (
    <>
		
      {loading ? (
        <div
          style={{
            width: "100wh",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="gallery-wrapper">
            {currentPost.map((product) => (
              <div key={product.id}>
                <ProductItem
                  toy={product}
                  callback={callback}
                  setCallback={setCallback}
                />
              </div>
            ))}
          </div>
          <div className="" style={{ marginTop: "10px" }}>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={products.length}
              paginate={paginate}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Gallery;
