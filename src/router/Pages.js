import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Gallery from "../components/gallery/Gallery";
import Dashboard from "./Dashboard";
import AuthPage from "../pages/authPage/AuthPage";
import ProductPage from "../pages/productPage.js/ProductPage";
import AdminCategories from "../pages/adminCategories/AdminCategories";
import AdminBrands from "../pages/adminBrands/AdminBrands";
import AdminAges from "../pages/adminAges/AdminAges";
const Pages = () => {
	 const isAuth = useSelector((state) => state.user.isAuth);
	 const role = useSelector((state) => state.user.currentUser.role_id)
	 
	 
	 function renderRotes(isAuth,role){
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
           <Route
             exact
             path="/admin-create-age-categ"
             element={<AdminAges />}
           />
         </Route>
       );
     } else if (isAuth && role == 100) {
       return (
         <Route exact path="/" element={<Dashboard />}>
           <Route
             exact
             path="/product-details/:name"
             element={<ProductPage />}
           />
           <Route index element={<Gallery />} />
         </Route>
       );
     }
	 }
  return (
    <Routes>
      {renderRotes(isAuth,role)}
    </Routes>
  );
};

export default Pages;
