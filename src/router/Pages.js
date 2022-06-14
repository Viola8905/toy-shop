import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Gallery from "../components/gallery/Gallery";
import Dashboard from "./Dashboard";
import AuthPage from "../pages/authPage/AuthPage";
import ProductPage from "../pages/productPage.js/ProductPage";
import AdminCategories from "../pages/adminPages/adminCategories/AdminCategories";
import AdminBrands from "../pages/adminPages/adminBrands/AdminBrands";
import AdminAges from "../pages/adminPages/adminAges/AdminAges";
import AdminProduct from "../pages/adminPages/adminProduct/AdminProduct";
import ShoppingCart from "../pages/registeredPages/shoppingCart/ShoppingCart";
import FilteredProducts from "../pages/filteredProducts/FilteredProducts";
import OrderProduct from "../pages/registeredPages/orderProduct/OrderProduct";
import AdminOrders from "../pages/adminPages/adminOrders/AdminOrders";
import ResetPassword from "../pages/resetPassword/ResetPassword";
import AdminEditProduct from "../pages/adminPages/adminEditProduct/AdminEditProduct";
const Pages = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const role = useSelector((state) => state.user.currentUser.role_id);

  function renderRotes(isAuth, role) {
    if (!isAuth) {
      return (
        <Route exact path="/" element={<Dashboard />}>
          <Route index element={<Gallery />} />
          <Route exact path="/login" element={<AuthPage />} />
          <Route exact path="/registration" element={<AuthPage />} />
          <Route
            exact
            path="/product-details/:name"
            element={<ProductPage />}
          />
          <Route path="/search" element={<FilteredProducts />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
      );
    } else if (isAuth && role === 200) {
      return (
        <Route exact path="/" element={<Dashboard />}>
          <Route index element={<Gallery />} />
          <Route
            exact
            path="/product-details/:name"
            element={<ProductPage />}
          />
          <Route
            exact
            path="/admin-create-category"
            element={<AdminCategories />}
          />
          <Route exact path="/admin-create-brands" element={<AdminBrands />} />
          <Route exact path="/admin-create-age-categ" element={<AdminAges />} />
          <Route
            exact
            path="/admin-create-product"
            element={<AdminProduct />}
          />
          <Route
            exact
            path="/admin-edit-product"
            element={<AdminEditProduct />}
          />
          <Route exact path="/admin-orders" element={<AdminOrders />} />
          <Route path="/search" element={<FilteredProducts />} />
        </Route>
      );
    } else if (isAuth && role === 100) {
      return (
        <Route exact path="/" element={<Dashboard />}>
          <Route
            exact
            path="/product-details/:name"
            element={<ProductPage />}
          />
          <Route exact path="/shopping-cart" element={<ShoppingCart />} />
          <Route index element={<Gallery />} />
          <Route path="/search" element={<FilteredProducts />} />
          <Route path="/order-product" element={<OrderProduct />} />
        </Route>
      );
    }
  }
  return <Routes>{renderRotes(isAuth, role)}</Routes>;
};

export default Pages;
