import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BackBtn from "../../../components/backBtn/BackBtn";
import Pagination from "../../../components/pagination/Pagination";
import "./adminAges.css";
const AdminAges = () => {
  const [ages, setAges] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [ageName, setAgeName] = useState("");
  const [ageFrom, setAgeFrom] = useState();
  const [ageTo, setAgeTo] = useState();
  const [id, setID] = useState("");
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getAges = async () => {
      try {
        const { data: response } = await axios.get(
          "http://api.toy-store.dev-1.folkem.xyz/api/v1/age-categories"
        );
        setAges(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    getAges();
  }, [callback]);

  const createAge = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.post(
          `http://api.toy-store.dev-1.folkem.xyz/api/v1/admin/age-categories/${id}`,
          { name: ageName, from: ageFrom, to: ageTo },
          {
            headers: { sanctum: `${localStorage.getItem("token")}` },
          }
        );
        // alert(res.data.msg);
      } else {
        const res = await axios.post(
          "http://api.toy-store.dev-1.folkem.xyz/api/v1/admin/age-categories",
          { name: ageName, from: ageFrom, to: ageTo },
          {
            headers: { sanctum: `${localStorage.getItem("token")}` },
          }
        );
        // alert(res.data.msg);
      }
      setOnEdit(false);
      setAgeName("");
      setAgeFrom("");
      setAgeTo("");
      setID("");
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const editAge = async (id, name, from, to) => {
    setID(id);
    setAgeName(name);
    setAgeFrom(from);
    setAgeTo(to);
    setOnEdit(true);
  };

  const deleteAge = async (id) => {
    try {
      const res = await axios.delete(
        `http://api.toy-store.dev-1.folkem.xyz/api/v1/admin/age-categories/${id}`,
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
  const [agesPerPage] = useState(3);
  const lastPostIndex = currentPage * agesPerPage;
  const firstPostIndex = lastPostIndex - agesPerPage;
  const currentAges = ages.slice(firstPostIndex, lastPostIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <BackBtn />

      <div className="categories">
        <form onSubmit={createAge}>
          {/* ------------------------ */}
          <label htmlFor="age" style={{ marginTop: "0" }}>
            Age CAtegories Name
          </label>
          <input
            type="text"
            name="age"
            value={ageName}
            required
            onChange={(e) => setAgeName(e.target.value)}
          />

          {/* ------------------------ */}
          <label htmlFor="age">months From</label>
          <input
            type="text"
            name="age"
            value={ageFrom}
            required
            onChange={(e) => setAgeFrom(e.target.value)}
          />

          {/* ---------------------------- */}
          <label htmlFor="age">months To</label>
          <input
            type="text"
            name="age"
            value={ageTo}
            required
            onChange={(e) => setAgeTo(e.target.value)}
          />
          {/* ------------------------ */}
          <br />
          <button type="submit" style={{ margin: "30px auto" }}>
            {onEdit ? "Update" : "Create"}
          </button>
        </form>

        <div className="col">
          {currentAges.map((currAge) => (
            <div key={currAge.id}>
              {id === currAge.id ? (
                <div
                  className="row"
                  key={currAge.id}
                  style={{
                    border: "2px solid green",
                    textAlign: "center",
                    fontWeight: "500",
                  }}
                >
                  <div style={{ color: "green", alignSelf: "center" }}>
                    {currAge.name}
                  </div>
                </div>
              ) : (
                <div className="row" key={currAge.id}>
                  <p>{currAge.name}</p>
                  <div>
                    <button
                      onClick={() =>
                        editAge(
                          currAge.id,
                          currAge.name,
                          currAge.from,
                          currAge.to
                        )
                      }
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteAge(currAge.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          <Pagination
            postsPerPage={agesPerPage}
            totalPosts={ages.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminAges;
