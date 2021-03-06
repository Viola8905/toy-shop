import axios from "axios";
import React, { useEffect, useState } from "react";

// -------------------start---------------------------------------------------------
import PropTypes from "prop-types";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import CheckIcon from "@mui/icons-material/Check";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import BackBtn from "../../../components/backBtn/BackBtn";
import { useLocation } from "react-router-dom";
const Root = styled("div")(
  ({ theme }) => `
  color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"
  };
  font-size: 14px;
`
);

const Label = styled("label")`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled("div")(
  ({ theme }) => `
  width: 300px;
  border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
  }

  &.focused {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    color: ${
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.65)"
        : "rgba(0,0,0,.85)"
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`
);

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <img
        src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_exit-256.png"
        alt=""
        style={{ width: "20px", marginLeft: "10px" }}
        onClick={onDelete}
      />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "#fafafa"
  };
  border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`
);

const Listbox = styled("ul")(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus='true'] {
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
);

// -------------------------end------------------------------------------------------------

const AdminEditProduct = () => {
  const [product, setProduct] = useState({});
  const [brands, setBrands] = useState([]);
  const [ages, setAges] = useState([]);
  const [callback, setCallback] = useState(false);
  const [categories1, setCategories1] = useState([]);
  const [defaultCategories, setDefaultCategories] = useState([]);
  const [status, setStatus] = useState("");

  const location = useLocation();
  let query = location.state;

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data: response } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}categories`
        );
        setCategories1(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const Posts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}products/${query}`
        );

        setProduct(response.data.data);
      } catch (err) {
        alert(err.response.data.message);
      }
    };

    Posts();
  }, [callback]);

  useEffect(() => {
    const getBrands = async () => {
      try {
        const { data: response } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}brands`
        );
        setBrands(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    const getAges = async () => {
      try {
        const { data: response } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}age-categories`
        );
        setAges(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    getAges();
    getBrands();
  }, [callback]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      if (document.getElementById("image_path").files[0]) {
        data.append(
          "image_path",
          document.getElementById("image_path").files[0]
        );
      }
      data.append("name", product.name);
      data.append("description", product.description);
      data.append("price", product.price);
      data.append("amount", product.amount);
      data.append("age_category_id", product.age_category_id);
      data.append("is_best_deal", product.is_best_deal ? 1 : 0);
      data.append("brand_id", product.brand_id);
      data.append("category_ids[]", product["category_ids[]"]);
      fetch(
        `https://api.toy-store.dev-1.folkem.xyz/api/v1/admin/products/${query}`,
        {
          method: "POST",
          headers: {
            sanctum: `${localStorage.getItem("token")}`,
          },
          body: data,
        }
      ).then((data) => setStatus(data.status === 200 ? true : false));
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  useEffect(() => {
    setDefaultCategories(
      product.categories?.length ? product.categories?.map((el) => el.name) : []
    );
  }, [product.categories]);
  // ----------start-----------

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",
    defaultValue: defaultCategories,
    multiple: true,
    options: categories1,
    getOptionLabel: (option) => option?.name,
  });

  useEffect(() => {
    setProduct({ ...product, "category_ids[]": value.map((el) => el?.id) });
  }, [value]);

  return (
    <div>
      <BackBtn />

      <div className="create_product">
        <form action="" onSubmit={handleSubmit}>
          <div className="row">
            {/* --------- */}
            <div className="upload">
              <input type="file" name="image_path" id="image_path" />
              <img src={product.image_path} alt="" style={{ width: "400px" }} />
            </div>

            {/* --------- */}
            <label htmlFor="name">??????????:</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={product.name}
              onChange={handleChangeInput}
            />
          </div>
          <div className="row">
            <label htmlFor="description">????????:</label>
            <textarea
              type="text"
              name="description"
              id="description"
              required
              value={product.description}
              rows="5"
              onChange={handleChangeInput}
              placeholder="????????-?????????? ?????????????? ???????? "
            />
          </div>
          <div className="row">
            <label htmlFor="price">????????:</label>
            <input
              type="number"
              name="price"
              id="price"
              required
              value={product.price}
              onChange={handleChangeInput}
            />
          </div>
          <div className="row">
            <label htmlFor="amount">??????????????????:</label>
            <input
              type="number"
              name="amount"
              id="amount"
              required
              value={product.amount}
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="is_best_deal">???????????????? ??????????:</label>
            <input
              type="checkbox"
              id="is_best_deal"
              name="is_best_deal"
              value={product.is_best_deal}
              checked={product.is_best_deal}
              style={{ width: "20px" }}
              onChange={() =>
                setProduct({ ...product, is_best_deal: !product.is_best_deal })
              }
            />
          </div>
          <div className="row">
            <label htmlFor="brand_id">????????????:</label>
            <select
              name="brand_id"
              value={product.brand_id}
              onChange={handleChangeInput}
            >
              <option value="">?????????????? ??????????</option>
              {brands.map((brand) => (
                <option value={brand.id} key={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div className="row">
            <label htmlFor="age_category_id">???????????? ????????????????:</label>
            <select
              name="age_category_id"
              value={product.age_category_id}
              onChange={handleChangeInput}
            >
              <option value=""> ?????????????? ???????????? ??????????????????</option>
              {ages.map((age) => (
                <option value={age.id} key={age.id}>
                  {age.name}
                </option>
              ))}
            </select>
          </div>
          {/* -------------------- */}
          <Root>
            <div {...getRootProps()}>
              <Label {...getInputLabelProps()}>?????????????? ??????????????????</Label>
              <InputWrapper
                ref={setAnchorEl}
                className={focused ? "focused" : ""}
              >
                {value.map((option, index) => (
                  <StyledTag label={option?.name} {...getTagProps({ index })} />
                ))}

                <input {...getInputProps()} />
              </InputWrapper>
            </div>
            {groupedOptions.length > 0 ? (
              <Listbox {...getListboxProps()}>
                {groupedOptions.map((option, index) => (
                  <li {...getOptionProps({ option, index })}>
                    <span>{option?.name}</span>
                    <CheckIcon fontSize="large" />
                  </li>
                ))}
              </Listbox>
            ) : null}
          </Root>

          {/* -------------------- */}

          <button type="submit" style={{ marginTop: "20px" }}>
            ????????????????????
          </button>
          <div>
            {status === true ? (
              <div
                style={{
                  backgroundColor: "#8bf092",
                  fontWeight: "700",
                  textAlign: "center",
                  color: "green",
                  margin: "20px 0",
                  padding: "20px 0",
                }}
              >
                ?????????? ?????????????? ??????????????????????????
              </div>
            ) : status === false ? (
              <div
                style={{
                  backgroundColor: "#f7a094",
                  fontWeight: "700",
                  textAlign: "center",
                  color: "red",
                  margin: "20px 0",
                  padding: "20px 0",
                }}
              >
                ???? ?????????????? ????????????????????,?????????????????? ???????????????????????? ????????????
              </div>
            ) : (
              <></>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditProduct;
