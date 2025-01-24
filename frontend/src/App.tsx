import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import { Navigationbar } from "./components/Navbar";

import { useState } from "react";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    avatar: string;
  } | null>(null);

  return (
    <Router>
      <Navigationbar
        onLoginClick={() => setOpenModal(true)}
        user={user}
        onLogout={() => setUser(null)}
      />
     
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
     
    </Router>
  );
}

export default App;
