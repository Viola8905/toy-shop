import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import BackBtn from "../../../components/backBtn/BackBtn";
import "./adminProduct.css";

// -------------------start---------------------------------------------------------
import PropTypes from "prop-types";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
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
      {/* <CloseIcon onClick={onDelete} fontSize='large' /> */}
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

const initialState = {
  name: "",
  description: "",
  price: 0,
  amount: 0,
  is_best_deal: false,
  age_category_id: 0,
  brand_id: 0,
  "category_ids[]": [],
};
const AdminProduct = () => {
  const [product, setProduct] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [ages, setAges] = useState([]);
  const [callback, setCallback] = useState(false);

  const categories1 = useSelector((state) => state.categories.Categories);

  let arr = [];

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
    // getCategories();
    getBrands();
  }, [callback]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      // if (!isAdmin) return alert("You are not an admin");
      // if (!images) return alert("no image upload");
      // setProduct({ ...product, "category_ids[]": [4,17,19] });

      console.log(product);
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}admin/products`,
        {
          ...product,
        },
        {
          headers: { sanctum: `${localStorage.getItem("token")}` },
        }
      );
      setCallback(!callback);
      // navigate("/");
    } catch (err) {
      console.log(product);
      alert(err.response.data.msg);
    }
  };

  // ----------start-----------
  // let value1 = value

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
    defaultValue: [categories1[0]],
    multiple: true,
    options: categories1,
    getOptionLabel: (option) => option.name,
  });

  useEffect(() => {
    setProduct({ ...product, "category_ids[]": value.map((el) => el.id) });
  }, [value]);

  // --------end-----------------

  return (
    <div>
      <BackBtn />

      <button onClick={() => handleSubmit()}>Add product</button>
      <div className="create_product">
        <form action="" onSubmit={handleSubmit}>
          <div className="row">
            <label htmlFor="name">Name</label>
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
            <label htmlFor="description">description</label>
            <textarea
              type="text"
              name="description"
              id="description"
              required
              value={product.description}
              rows="5"
              onChange={handleChangeInput}
              placeholder="Please provide description"
            />
          </div>
          <div className="row">
            <label htmlFor="price">price</label>
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
            <label htmlFor="amount">amount</label>
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
            <label htmlFor="is_best_deal">Найкраща угода:</label>
            <input
              type="checkbox"
              id="is_best_deal"
              name="is_best_deal"
              value={product.is_best_deal}
              style={{width:"20px"}}
              onChange={() =>
                setProduct({ ...product, is_best_deal: !product.is_best_deal })
              }
            />
          
          </div>
          <div className="row">
            <label htmlFor="brand_id">brands:</label>
            <select
              name="brand_id"
              value={product.brand_id}
              onChange={handleChangeInput}
            >
              <option value="">Please select a brand</option>
              {brands.map((brand) => (
                <option value={brand.id} key={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div className="row">
            <label htmlFor="age_category_id">Вікова категорія:</label>
            <select
              name="age_category_id"
              value={product.age_category_id}
              onChange={handleChangeInput}
            >
              <option value="">Please select an age category</option>
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
              <Label {...getInputLabelProps()}>Оберіть категорії</Label>
              <InputWrapper
                ref={setAnchorEl}
                className={focused ? "focused" : ""}
              >
                {value.map((option, index) => (
                  <StyledTag label={option.name} {...getTagProps({ index })} />
                ))}

                <input {...getInputProps()} />
              </InputWrapper>
            </div>
            {groupedOptions.length > 0 ? (
              <Listbox {...getListboxProps()}>
                {groupedOptions.map((option, index) => (
                  <li {...getOptionProps({ option, index })}>
                    <span>{option.name}</span>
                    <CheckIcon fontSize="large" />
                  </li>
                ))}
              </Listbox>
            ) : null}
          </Root>

          {/* -------------------- */}

          <button type="submit" style={{ marginTop: "20px" }}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProduct;
