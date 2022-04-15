import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Gallery from "../components/gallery/Gallery";
import Dashboard from "./Dashboard";
import AuthPage from "../pages/authPage/AuthPage";
import ProductPage from "../pages/productPage.js/ProductPage";
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
           <Route exact path="/product-details/:name" element={<ProductPage />} />
         </Route>
       );
     } else if (isAuth && role == 200) {
       return (
        <Route exact path="/" element={<Dashboard />}>
             <Route index element={<Gallery />} />
				</Route>
         
       );
     } else if (isAuth && role == 100) {
       return (
          <Route exact path="/" element={<Dashboard />}>
             <Route index element={<Gallery />} />
					</Route>
           
       );
     }
	 }
  return (
    <Routes>
      {renderRotes()}
    </Routes>
  );
};

export default Pages;
