import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BackBtn from "../../../components/backBtn/BackBtn";
import Pagination from "../../../components/pagination/Pagination";
import "./adminCategories.css";
import { setCategoriesRedux } from "../../../reducers/categoriesReducer";
const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [category, setCategory] = useState("");
  const [id, setID] = useState("");
  const [callback, setCallback] = useState(false);
	
	const dispatch = useDispatch();
  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data: response } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}categories`
        );
        setCategories(response.data);
				dispatch(setCategoriesRedux(response.data));
      } catch (error) {
        console.error(error.message);
      }
    };

    getCategories();
  }, [callback]);

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}admin/categories/${id}`,
          { name: category },
          {
            headers: { sanctum: `${localStorage.getItem("token")}` },
          }
        );
        // alert(res.data.msg);
      } else {
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}admin/categories`,
          { name: category },
          {
            headers: { sanctum: `${localStorage.getItem("token")}` },
          }
        );
        // alert(res.data.msg);
      }
      setOnEdit(false);
      setCategory("");
      setID("");
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const editCategory = async (id, name) => {
    setID(id);
    setCategory(name);
    setOnEdit(true);
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}admin/categories/${id}`,
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
  const [categoriesPerPage] = useState(3);
  const lastPostIndex = currentPage * categoriesPerPage;
  const firstPostIndex = lastPostIndex - categoriesPerPage;
  const currentCategories = categories.slice(firstPostIndex, lastPostIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <BackBtn />

      <div className="categories">
        <form onSubmit={createCategory}>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          />

          <button type="submit">{onEdit ? "Update" : "Create"}</button>
        </form>

        <div className="col">
          {currentCategories.map((currCategory) => (
            <>
              {id === currCategory.id ? (
                <div
                  className="row"
                  key={currCategory.id}
                  style={{
                    border: "2px solid green",
                    textAlign: "center",
                    fontWeight: "500",
                  }}
                >
                  <div style={{ color: "green", alignSelf: "center" }}>
                    {currCategory.name}
                  </div>
                </div>
              ) : (
                <div className="row" key={currCategory.id}>
                  <p>{currCategory.name}</p>
                  <div>
                    <button
                      onClick={() =>
                        editCategory(currCategory.id, currCategory.name)
                      }
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteCategory(currCategory.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </>
          ))}
          <Pagination
            postsPerPage={categoriesPerPage}
            totalPosts={categories.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
