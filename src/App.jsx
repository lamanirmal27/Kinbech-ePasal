import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import Register from "./pages/register/Register";
import ProductList from "./pages/product/ProductList";
import RequireAuth from "./component/RequireAuth";
import Admin from "./component/Admin";
import Unauthorized from "./component/Unauthorized";
import Layout from "./component/layout";
import PersistLogin from "./component/PersistLogin";
import Detials from "./pages/product/ProductDetails";
import Checkout from "./pages/product/Checkout";
import Success from "./component/Success";

const ROLES = {
  User: 2001,
  Admin: 5150,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route element={<PersistLogin />}>
          <Route path="/" element={<ProductList />} />
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/details" element={<Detials />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
