import axios from "axios";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import BackBtn from "../../components/backBtn/BackBtn";
import Pagination from "../../components/pagination/Pagination";
import ProductItem from "../../components/productItem/ProductItem";
import "./filteredProducts.css";

// --------------------
import { Button } from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
// -------------------------
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
            product.name.toLowerCase().includes(location.state.toLowerCase())
          )
        );
      } catch (e) {
        console.log(`Error from useEffect: ${e}`);
      }
    };

    Posts();
  }, [callback, location.state]);
  // console.log(products);

  //  ----------get all categories
  const [categories, setCategories] = useState([]);
  const [catCallback, setCatCallback] = useState(false);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data: response } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}categories`
        );
        setCategories(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    getCategories();
  }, [catCallback]);

  // -----------------------

  // -------get all brands---
  const [brands, setBrands] = useState([]);
  const [brandCallback, setBrandCallback] = useState(false);
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

    getBrands();
  }, [brandCallback]);
  // -----------------

  // ------get All age categories
  const [ages, setAges] = useState([]);
  const [agesCallback, setAgesCallBack] = useState(false);
  useEffect(() => {
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
  }, [agesCallback]);

  // ----------------------

  // ----------------material ui------
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const handleClick1 = () => {
    setOpen1(!open1);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const handleClick3 = () => {
    setOpen3(!open3);
  };
  const [checkedCategories, setCheckedCategories] = React.useState([]);
  const [checkedBrands, setCheckedBrands] = React.useState([]);
  const [checkedAges, setCheckedAges] = React.useState([]);

  const handleToggleCategories = (value) => () => {
    const currentIndex = checkedCategories.indexOf(value);
    const newChecked = [...checkedCategories];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedCategories(newChecked);
  };
  const handleToggleBrands = (value) => () => {
    const currentIndex = checkedBrands.indexOf(value);
    const newChecked = [...checkedBrands];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedBrands(newChecked);
  };

  const handleToggleAges = (value) => () => {
    const currentIndex = checkedAges.indexOf(value);
    const newChecked = [...checkedAges];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedAges(newChecked);
  };

  // --------------------------

  //-------- pagination

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = products.slice(firstPostIndex, lastPostIndex);
  // console.log(categories)
  // console.log(checkedCategories + " - Categories");
  // console.log(checkedBrands + " - Brands");
  // console.log(checkedAges + " - Ages");
  // console.log(products);
  // const applyFilters = () => {
  //   setProducts(
  //     products.filter((product) => {
  //       // const productCategoriesIds = product.categories.map((c) => c.id);
  //       // productCategoriesIds.filter((x) => checkedCategories.includes(x)) > 0 ||
  //       if (
  //         checkedBrands.includes(product.brand_id) ||
  //         checkedAges.includes(product.age_category_id)
  //       ) {
  //         console.log("Product added: ");
  //         console.log(product);
  //         return true;
  //       } else {
  //         console.log("Product was not added");
  //         console.log(product);
  //         return false;
  //       }
  //     })
  //   );
  // };
  function Filter() {
    // let b = products.map((product) =>
    //   product.categories.map((c) => checkedCategories.includes(c.id))
    // );
    // let c = b.filter(arr => arr.includes(true))
    // console.log(c);
    let c = [];
    let b = products.map((product) => {
      return product.categories.filter((el) =>
        checkedCategories.includes(el.id)
      );
    });

    for (let i = 0; i < b.length; i++) {
      if (b[i].length !== 0) {
        c.push(products[i]);
      } else if (
        checkedBrands.includes(products[i].brand_id) ||
        checkedAges.includes(products[i].age_category_id)
      ) {
        c.push(products[i]);
      } else {
      }
    }
    console.log(c);
		if(c.length === 0){
			setProducts(products)
		}else{
			setProducts(c)
		}
  }
  //--------------------
  return (
    <div>
      <BackBtn />
      <div className="row">
        <div className="filter-properties">
          {/* material ui */}
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                <Button variant="contained" onClick={() => Filter()}>
                  <strong>Filter</strong>
                </Button>
              </ListSubheader>
            }
          >
            {/* categories */}
            <ListItemButton onClick={handleClick1}>
              <ListItemText primary="Категорії" />
              {open1 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open1} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {categories.map((item) => (
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={handleToggleCategories(Number(item.id))}
                    dense
                  >
                    <Checkbox
                      edge="start"
                      checked={
                        checkedCategories.indexOf(Number(item.id)) !== -1
                      }
                      tabIndex={-1}
                      disableRipple
                      // inputProps={ 'aria-labelledby'}
                    />

                    <ListItemText primary={item.name} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
            {/* brands */}
            <ListItemButton onClick={handleClick2}>
              <ListItemText primary="Бренди" />
              {open2 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {brands.map((item) => (
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={handleToggleBrands(Number(item.id))}
                    dense
                  >
                    <Checkbox
                      edge="start"
                      checked={checkedBrands.indexOf(Number(item.id)) !== -1}
                      tabIndex={-1}
                      disableRipple
                      // inputProps={ 'aria-labelledby'}
                    />

                    <ListItemText primary={item.name} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
            {/* ages */}
            <ListItemButton onClick={handleClick3}>
              <ListItemText primary="Вікові категорії" />
              {open3 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open3} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {ages.map((item) => (
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={handleToggleAges(Number(item.id))}
                    dense
                  >
                    <Checkbox
                      edge="start"
                      checked={checkedAges.indexOf(Number(item.id)) !== -1}
                      tabIndex={-1}
                      disableRipple
                      // inputProps={ 'aria-labelledby'}
                    />

                    <ListItemText primary={item.name} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </List>
          {/* material ui */}
        </div>
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
