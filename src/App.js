const tryurl = "http://127.0.0.1:5000/";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import { ProductionPropsListsPage } from "./ProductionPropsListsPage";
import ProductionsPage from "./ProductionsPage";
import PropAddPage from "./PropsAddPage";
import PropDetailsPage from "./PropsDetailPage";
import { PropsListPage } from "./PropsListPage";
import Main from "./PropsPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Main />} />
          <Route path="prop/:propID" element={<PropDetailsPage />} />
          <Route path="add-prop" element={<PropAddPage />} />
          {/* https://hygraph.com/blog/routing-in-react#how-to-implement-dynamic-routing-with-react-router */}
          <Route path="productions" element={<ProductionsPage />} />
          {/* <Route path="production/:productionID*" element={<ProductionDetailPage/>} /> would be production details page*/}
          <Route
            path="production/:productionID/props-lists/"
            element={<ProductionPropsListsPage />}
          />
          <Route path="props-list/:propsListID" element={<PropsListPage />} />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function NoMatch() {
  return "Sorry not found.";
}
export default App;
