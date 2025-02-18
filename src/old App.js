const tryurl = "http://127.0.0.1:5000/";
import "./App.css";
import { useEffect, useState } from "react";
import PropDetailsPage from "./PropsDetailPage";
import PropAddPage from "./PropsAddPage";
import ProductionsPage from "./ProductionsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  


  const [page, setPage] = useState({name: "productions"});
  const [previousPage, setPreviousPage] = useState(null);
  function goToPage(newPage){
    setPreviousPage(page);
    setPage(newPage);
  }
  function goBack(){
    // return to page
    setPage(previousPage);
  }
  return (

    <div className="App">
      <Box sx={{ display: page.name !== "main" ? "none" : "flex" }}>
        <Main setPage={goToPage} />
      </Box>

      {page.name === "prop" && <PropDetailsPage propID={page.propID} goBack={goBack} />}
      <Box sx={{ display: page.name !== "productions" ? "none" : "flex" }}>
        <ProductionsPage setPage={setPage}/>
      </Box>
      <PropAddPage goBack={goBack}/>

    </div>
  );
}

export default App;
