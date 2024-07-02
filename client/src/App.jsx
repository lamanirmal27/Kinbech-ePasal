import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import LoginPage from "./pages/login";
import Register from "./pages/register/Register";
import Header from "./component/header/navbar";

function App() {
  return (
    <div className="flex ">
      {/* <Sidebar /> */}
      <Header />
      <Routes>
        {/* <Route exact path="/" element={<Home />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;