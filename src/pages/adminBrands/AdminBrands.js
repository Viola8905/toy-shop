import React, { useEffect, useState } from 'react'
import BackBtn from '../../components/backBtn/BackBtn'
import axios from "axios";

import { useDispatch } from "react-redux";
import Pagination from "../../components/pagination/Pagination";
import "./adminBrands.css";
const AdminBrands = () => {
	const [brands, setBrands] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [brand, setBrand] = useState("");
  const [id, setID] = useState("");
  const [callback, setCallback] = useState(false);

	useEffect(() => {
    const getBrands = async () => {
      try {
        const { data: response } = await axios.get(
          "http://api.toy-store.dev-1.folkem.xyz/api/v1/brands"
        );
        setBrands(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    getBrands();
  }, [callback]);


	const createBrand = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.post(
          `http://api.toy-store.dev-1.folkem.xyz/api/v1/admin/brands/${id}`,
          { name: brand },
          {
            headers: { sanctum: `${localStorage.getItem("token")}` },
          }
        );
        // alert(res.data.msg);
      } else {
        const res = await axios.post(
          "http://api.toy-store.dev-1.folkem.xyz/api/v1/admin/brands",
          { name: brand },
          {
            headers: { sanctum: `${localStorage.getItem("token")}` },
          }
        );
        // alert(res.data.msg);
      }
      setOnEdit(false);
      setBrand("");
      setID("");
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const editBrand = async (id, name) => {
    setID(id);
    setBrand(name);
    setOnEdit(true);
  };

  const deleteBrand = async (id) => {
    try {
      const res = await axios.delete(
        `http://api.toy-store.dev-1.folkem.xyz/api/v1/admin/brands/${id}`,
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


	const [currentPage, setCurrentPage] = useState(1);
  const [brandsPerPage] = useState(2);
  const lastPostIndex = currentPage * brandsPerPage;
  const firstPostIndex = lastPostIndex - brandsPerPage;
  const currentBrands = brands.slice(firstPostIndex, lastPostIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


	return (
    <div>
      <BackBtn />
      
      <div className="categories">
        <form onSubmit={createBrand}>
          <label htmlFor="category">Brand</label>
          <input
            type="text"
            name="category"
            value={brand}
            required
            onChange={(e) => setBrand(e.target.value)}
          />

          <button type="submit">{onEdit ? "Update" : "Create"}</button>
        </form>

        <div className="col">
          {currentBrands.map((currBrand) => (
            <>
              {id === currBrand.id ? (
                <div
                  className="row"
                  key={currBrand.id}
                  style={{
                    border: "2px solid green",
                    textAlign: "center",
                    fontWeight: "500",
                  }}
                >
                  <div style={{ color: "green", alignSelf: "center" }}>
                    {currBrand.name}
                  </div>
                </div>
              ) : (
                <div className="row" key={currBrand.id}>
                  <p>{currBrand.name}</p>
                  <div>
                    <button
                      onClick={() =>
                        editBrand(currBrand.id, currBrand.name)
                      }
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteBrand(currBrand.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </>
          ))}
          <Pagination
            postsPerPage={brandsPerPage}
            totalPosts={brands.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminBrands