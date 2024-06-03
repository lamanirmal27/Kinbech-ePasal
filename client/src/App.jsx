import {Route, Routes} from "react-router-dom"
import Navbar from "./component/header/navbar"
import Home from "./pages/home"
import LoginPage from "./pages/login"
import Register from "./pages/register"

function App() {

  return (
    <div>
    <Navbar/>
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<Register/>} />
    </Routes>
  </div>
  )
}

export default App
