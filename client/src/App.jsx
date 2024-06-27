import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import LoginPage from "./pages/login";
import Register from "./pages/register/Register";
import Sidebar from "./component/header/sidebar";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
