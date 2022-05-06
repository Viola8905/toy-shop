import axios from "axios";
import React, { useEffect, useState } from "react";
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
  name: "front testtt",
  description: "test t",
  price: 30,
  amount: 10,
  is_best_deal: true,
  age_category_id: 2,
  brand_id: 2,
  "category_ids[]": [4],
};
const AdminProduct = () => {
  const [product, setProduct] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [ages, setAges] = useState([]);
  const [callback, setCallback] = useState(false);

	const categories1 = useSelector((state) => state.categories.Categories)

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data: response } = await axios.get(
          "http://api.toy-store.dev-1.folkem.xyz/api/v1/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
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
    getCategories();
    getBrands();
  }, [callback]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    try {
      // if (!isAdmin) return alert("You are not an admin");
      // if (!images) return alert("no image upload");

      const res = await axios.post(
        "http://api.toy-store.dev-1.folkem.xyz/api/v1/admin/products",
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
      alert(err.response.data.msg);
    }
  };


	



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
    defaultValue: [categories1[1]],
    multiple: true,
    options: categories1,
    getOptionLabel: (option) => option.name,
  });

// --------end-----------------








  return (
    <div>
      <BackBtn />
      AdminProduct
      <div className="create_product">
        {/* <div className="upload">
          <input type="file" name="file" id="file_up" onChange={handleUpload} />
          {loading ? (
            <div id="file_img">
              <Loading />
            </div>
          ) : (
            <div id="file_img" style={styleUpload}>
              <img src={images ? images.url : ""} alt="" />
              <span onClick={handleDestroy}>X</span>
            </div>
          )}
        </div> */}

        <form action="" onSubmit={handleSubmit}>
          <div className="row">
            <label htmlFor="product_id">Product Id</label>
            <input
              type="text"
              name="product_id"
              id="product_id"
              required
              value={product.product_id}
              onChange={handleChangeInput}
              // disabled={onEdit}
            />
          </div>

          <div className="row">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={product.title}
              onChange={handleChangeInput}
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
            <label htmlFor="content">content</label>
            <textarea
              type="text"
              name="content"
              id="content"
              required
              value={product.content}
              rows="7"
              onChange={handleChangeInput}
              placeholder="Please provide content"
            />
          </div>

          <div className="row">
            <label htmlFor="categories">categories:</label>
            <select
              name="category"
              // value={product["category_ids[]"]}
              onChange={handleChangeInput}
            >
              <option value="">Please select a category</option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="row">
            <label htmlFor="brands">brands:</label>
            <select
              name="brand"
              // value={product.brand_id}
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
            <label htmlFor="ages">Вікова категорія:</label>
            <select
              name="age-category"
              // value={product.brand_id}
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
          {/* <button type="submit">{onEdit ? "Update" : "Create"}</button> */}
        </form>
      </div>
    </div>
  );
};

export default AdminProduct;
