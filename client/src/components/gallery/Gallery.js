import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import { getProducts } from "../../api/productRequests";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../productItem/ProductItem";
import Pagination from "../pagination/Pagination";
// import { useDispatch, useSelector } from "react-redux";

const Gallery = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("");
	const products = useSelector((state) => state.products.Products);
	
	const dispatch = useDispatch()
  const params = window.location.search ? window.location.search : null;

  // useEffect(() => {
  //   const Posts = async () => {
  //     try {
  //       let query;

  //       if (params && !filter) query = params;
  //       else query = filter;

  //       const response = await axios.get(
  //         "http://local.folkem.xyz/api/v1/products?per_page=1"
  //       );

  //       setPosts(response.data.data);
  //       console.log(JSON.stringify(response.data.data) + "result");
  //     } catch (e) {
  //       console.log(`Error from useEffect: ${e}`);
  //     }
  //   };

  //   Posts();
  // }, [filter, params]);

	useEffect(() => {
		dispatch(getProducts());
   
  }, []);

	const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = products.slice(firstPostIndex, lastPostIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  

  return (
    <>
      <div className="gallery-wrapper">
        {currentPost.map((product) => (
          <div key={product.id}>
            <ProductItem toy={product} />
          </div>
        ))}
      </div>
      <div
        className=""
        style={{  marginTop: "10px"}}
      >
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={products.length}
          paginate={paginate}
        />
      </div>
    </>
  );
};

export default Gallery;
