/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import { SignUp } from "views/signup";
// import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { productApi } from "feature/apiSlice";
import { Provider } from "react-redux";
import { store } from "./store";
import Typography from "views/Typography";
import UserFetch from "Hook/userData";

const username = localStorage.getItem("userData");
const userData = JSON?.parse(username);
console.log("userData", userData?.token);

const root = ReactDOM.createRoot(document.getElementById("root"));

//
// console.log("datassss", dat
root.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      {/* <Provider api={store}> */}
      <BrowserRouter>
        {/* <Provider api={store}> */}
        <Routes>
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/rtl/*" element={<RTLLayout />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/typography" element={<Typography />} />

          <Route
            path="*"
            element={
              userData?.token ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <Navigate to="/signup" replace />
              )
            }
          />
        </Routes>
        {/* </Provider> */}
      </BrowserRouter>
      {/* </Provider> */}
    </BackgroundColorWrapper>
  </ThemeContextWrapper>
);
