import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PrivateOutlet from "./components/PrivateOutlet";
function App() {
  const [user, setUser] = useState(false);
  console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login user={user} setUser={setUser} />}
        />
        <Route path="/*" element={<PrivateOutlet user={user} />}>
          <Route path="" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
