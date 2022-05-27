import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BackBtn from "../../components/backBtn/BackBtn";
import Pagination from "../../components/pagination/Pagination";
import ProductItem from "../../components/productItem/ProductItem";
import "./filteredProducts.css"
const FilteredProducts = () => {
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);

  const location = useLocation();
  useEffect(() => {
    const Posts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}products`
        );
        // dispatch(setProducts(response.data.data));
        setProducts(response.data.data);
        setProducts(
          response.data.data.filter((product) =>
            product.name.includes(location.state)
          )
        );
      } catch (e) {
        console.log(`Error from useEffect: ${e}`);
      }
    };

    Posts();
  }, [callback, location.state]);

  //-------- pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = products.slice(firstPostIndex, lastPostIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //--------------------
  return (
    <div>
      <BackBtn />
      <div className="row">
        <div className="filter-properties">Filter</div>
        <div className="gallery-wrapper">
          {currentPost.map((product) => (
            <div key={product.id}>
              <ProductItem toy={product} />
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
      </div>
    </div>
  );
};

export default FilteredProducts;
