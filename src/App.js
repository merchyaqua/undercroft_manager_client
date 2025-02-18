const tryurl = "http://127.0.0.1:5000/";
import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Main from "./PropsPage";
import PropDetailsPage from "./PropsDetailPage";
import PropAddPage from "./PropsAddPage";
import ProductionsPage from "./ProductionsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Typography } from "@mui/material";
import {PropsListPage} from "./PropsListPage";
import { ProductionPropsListsPage } from "./ProductionPropsListsPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Main />} />
          <Route path="prop/:propID" element={<PropDetailsPage/>} />
          <Route path="add-prop" element={<PropAddPage/>} />
{/* https://hygraph.com/blog/routing-in-react#how-to-implement-dynamic-routing-with-react-router */}
          <Route path="productions" element={<ProductionsPage />} />
          <Route path="productions/*" element={<ProductionPropsListsPage/>} />
          <Route path="props-list/*" element={<PropsListPage />} />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function NoMatch(){
  return ("Sorry not found.")
}
export default App;
