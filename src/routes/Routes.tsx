import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Register" element={<Register />}></Route>
        <Route path="/Home" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
