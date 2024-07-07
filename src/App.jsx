import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import LoginPage from "./pages/login";
import Register from "./pages/register/Register";
import Header from "./component/header/navbar";
import ProductList from "./pages/product/ProductList";

function App() {
  return (
    <div className="flex ">
      <Header />
      <Routes>
        <Route exact path="Kinbech-ePasal/" element={<ProductList/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
