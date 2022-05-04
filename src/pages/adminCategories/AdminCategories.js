import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BackBtn from "../../components/backBtn/BackBtn";
import "./adminCategories.css";
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
          "http://api.toy-store.dev-1.folkem.xyz/api/v1/categories"
        );
        setCategories(response.data);
         console.log(response.data)
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
          `http://api.toy-store.dev-1.folkem.xyz/api/v1/admin/categories/${id}`,
          { name: category },
          {
            headers: {sanctum: `${localStorage.getItem("token")}` },
          }
        );
        // alert(res.data.msg);
      } else {
       const res = await axios.post(
        "http://api.toy-store.dev-1.folkem.xyz/api/v1/admin/categories",
        { name: category },
        {
          headers: { sanctum: `${localStorage.getItem("token")}` },
        }
      );
        // alert(res.data.msg);
      }
      setOnEdit(false);
      setCategory("");
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
          `http://api.toy-store.dev-1.folkem.xyz/api/v1/admin/categories/${id}`,
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
 

  return (
    <div>
      {/* <BackBtn /> */}

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
          {categories.map((category) => (
            <div className="row" key={category.id}>
              <p>{category.name}</p>
              <div>
                <button
                onClick={() => editCategory(category.id, category.name)}
                >
                  Edit
                </button>
                <button
                 onClick={() => deleteCategory(category.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
