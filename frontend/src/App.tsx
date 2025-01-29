import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import { Navigationbar } from "./components/Navbar";
import { Login } from "./pages/Home/components/Login";
import Dashboard from "./pages/Admin/Dashboard";
import { CartPage } from "./pages/Common/Cart";
import { Serums } from "./pages/Products/Serums";
import { Creams } from "./pages/Products/Creams";
import { useState } from "react";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    avatar: string;
  } | null>(null);

  const handleLoginClick = () => {
    setOpenModal(true);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleLoginSuccess = (userData: {
    name: string;
    email: string;
    avatar: string;
  }) => {
    setUser(userData);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Router>
      <Navigationbar
        onLoginClick={handleLoginClick}
        user={user}
        onLogout={handleLogout}
      />
      <Login
        openModal={openModal}
        onCloseModal={handleCloseModal}
        onLoginSuccess={handleLoginSuccess}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/serums" element={<Serums />} />
        <Route path="/creams" element={<Creams />} />
      </Routes>
    </Router>
  );
}

export default App;
